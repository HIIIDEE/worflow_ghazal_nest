# 🔒 Modifications de Sécurité - WorkflowGhazal

**Date:** 17 Décembre 2025
**Développeur:** Claude Code
**Objectif:** Amélioration de la sécurité, logging d'audit et cohérence des données

---

## 📋 Table des Matières

1. [Exclusion du Mot de Passe](#1-exclusion-du-mot-de-passe)
2. [Système de Logging de Sécurité](#2-système-de-logging-de-sécurité)
3. [💳 Transactions de Base de Données](#3-transactions-de-base-de-données) ⭐ **NOUVEAU**
4. [Fichiers Créés](#4-fichiers-créés)
5. [Fichiers Modifiés](#5-fichiers-modifiés)
6. [Impact et Bénéfices](#6-impact-et-bénéfices)
7. [Tests Recommandés](#7-tests-recommandés)

---

## 📢 IMPORTANT : Documentation Transactions

Une documentation complète sur les transactions a été créée dans le fichier :
**`TRANSACTIONS_IMPLEMENTATION.md`**

Ce document explique en détail :
- ✅ Qu'est-ce qu'une transaction et propriétés ACID
- ✅ Pourquoi utiliser des transactions (avec exemples concrets)
- ✅ Les 2 transactions implémentées dans ce projet
- ✅ Scénarios de bugs évités grâce aux transactions
- ✅ Tests de validation et monitoring

**→ Consulter ce fichier pour comprendre l'implémentation complète.**

---

## 1. Exclusion du Mot de Passe

### 🎯 Problème Identifié
Le mot de passe hashé était potentiellement exposé dans les réponses API via la méthode `findByEmail()`, créant un risque de sécurité.

### ✅ Solution Implémentée

#### **Fichier:** `backend/src/users/users.service.ts`

**Modifications:**

```typescript
// AVANT - Retournait TOUT, y compris le password
async findByEmail(email: string) {
    return this.prisma.user.findUnique({
        where: { email }
    });
}

// APRÈS - Exclut explicitement le password
async findByEmail(email: string) {
    return this.prisma.user.findUnique({
        where: { email },
        select: {
            id: true,
            email: true,
            nom: true,
            prenom: true,
            role: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
            // password: false (implicite)
        }
    });
}

// NOUVEAU - Méthode dédiée pour l'authentification
async findByEmailWithPassword(email: string) {
    return this.prisma.user.findUnique({
        where: { email }
        // Retourne TOUT y compris password pour validation
    });
}
```

**Pourquoi cette modification ?**
- ✅ Sépare les préoccupations : authentification vs récupération utilisateur
- ✅ Empêche l'exposition accidentelle du hash du mot de passe
- ✅ Rend le code plus sûr par défaut
- ✅ Le password n'est accessible QUE lors de l'authentification

---

#### **Fichier:** `backend/src/auth/auth.service.ts`

**Modifications:**

```typescript
// AVANT
async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email); // ❌ Risque
    if (user && await bcrypt.compare(pass, user.password)) {
        const { password, ...result } = user;
        return result;
    }
    return null;
}

// APRÈS
async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmailWithPassword(email); // ✅ Sécurisé
    if (user && await bcrypt.compare(pass, user.password)) {
        const { password, ...result } = user;
        return result;
    }
    return null;
}
```

**Pourquoi cette modification ?**
- ✅ Utilise la méthode dédiée qui retourne le password uniquement pour auth
- ✅ Intention claire dans le code
- ✅ Pas de changement de comportement, seulement amélioration de sécurité

---

## 2. Système de Logging de Sécurité

### 🎯 Problème Identifié
Aucun logging des événements de sécurité :
- ❌ Pas de trace des tentatives de connexion échouées
- ❌ Pas d'audit trail pour les opérations sensibles
- ❌ Impossible de détecter des tentatives d'intrusion
- ❌ Aucune traçabilité pour la conformité RGPD

### ✅ Solution Implémentée

#### **Architecture du Système de Logging**

```
┌─────────────────────────────────────────────┐
│         SecurityLoggerService               │
│  (Service global pour tous les logs)        │
└──────────────┬──────────────────────────────┘
               │
       ┌───────┴────────┐
       │                │
   ┌───▼────┐      ┌────▼────┐
   │ Console│      │  Files  │
   │ Logger │      │  (JSON) │
   └────────┘      └─────────┘
                   ├─ security.log
                   └─ security-critical.log
```

---

### 📦 Fichiers Créés et Leur Rôle

#### **1. `common/logger/security-logger.service.ts`**

**Rôle:** Service centralisé pour logger TOUS les événements de sécurité

**Fonctionnalités:**
- 13 types d'événements de sécurité définis
- Logs formatés en JSON pour parsing automatique
- Séparation logs normaux / critiques
- Enrichissement automatique avec timestamp

**Types d'événements:**
```typescript
enum SecurityEventType {
  LOGIN_SUCCESS,           // ✅ Connexion réussie
  LOGIN_FAILED,            // ⚠️ Tentative échouée
  ACCESS_DENIED,           // ⚠️ Accès refusé (rôle insuffisant)
  PERMISSION_VIOLATION,    // ⚠️ Permission manquante
  UNAUTHORIZED_ACCESS,     // ⚠️ Token invalide/absent
  INVALID_TOKEN,           // ⚠️ JWT expiré/malformé
  USER_CREATED,            // 📝 Création utilisateur
  USER_UPDATED,            // 📝 Modification utilisateur
  USER_DELETED,            // ⚠️ Suppression utilisateur
  WORKFLOW_CANCELLED,      // ⚠️ Annulation workflow
  RATE_LIMIT_EXCEEDED,     // ⚠️ Trop de requêtes
  LOGOUT,                  // ✅ Déconnexion
}
```

**Méthodes principales:**
- `logLoginSuccess()` - Trace connexions réussies
- `logLoginFailed()` - Alerte tentatives échouées
- `logAccessDenied()` - Logs accès non autorisés
- `logPermissionViolation()` - Logs permissions manquantes
- `logUserCreated/Updated/Deleted()` - Audit utilisateurs
- `logWorkflowCancelled()` - Trace annulations workflow

**Pourquoi ce fichier ?**
- ✅ Centralisation : un seul endroit pour tout le logging sécurité
- ✅ Consistency : format uniforme pour tous les logs
- ✅ Maintenabilité : facile d'ajouter nouveaux événements
- ✅ Audit trail : traçabilité complète pour conformité

---

#### **2. `common/decorators/client-info.decorator.ts`**

**Rôle:** Decorator NestJS pour capturer automatiquement les infos client

**Fonctionnalités:**
- Extraction automatique de l'IP (supporte proxies avec X-Forwarded-For)
- Capture du User-Agent
- Utilisable dans n'importe quel contrôleur

**Utilisation:**
```typescript
@Post('login')
async login(
    @Body() dto: LoginDto,
    @ClientInfo() clientInfo: { ip: string; userAgent: string }
) {
    // clientInfo.ip = "192.168.1.100"
    // clientInfo.userAgent = "Mozilla/5.0..."
}
```

**Pourquoi ce fichier ?**
- ✅ DRY : pas besoin de répéter le code d'extraction IP/UA
- ✅ Sécurité : gère correctement les proxies/load balancers
- ✅ Simplicité : une ligne pour capturer les infos client

---

#### **3. `common/common.module.ts`**

**Rôle:** Module global pour les services partagés

**Contenu:**
```typescript
@Global()
@Module({
  providers: [SecurityLoggerService],
  exports: [SecurityLoggerService],
})
export class CommonModule {}
```

**Pourquoi ce fichier ?**
- ✅ `@Global()` : SecurityLogger disponible partout sans import
- ✅ Évite duplication du provider dans chaque module
- ✅ Architecture propre et modulaire

---

### 📝 Fichiers Modifiés et Raisons

#### **4. `app.module.ts`**

**Modification:**
```typescript
// AJOUTÉ
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    CommonModule, // ⬅️ NOUVEAU : Rend SecurityLogger global
    CacheModule.register(...),
    // ... autres modules
  ],
})
```

**Pourquoi ?**
- ✅ Active le module global des services communs
- ✅ SecurityLogger maintenant injecté automatiquement partout

---

#### **5. `auth/auth.controller.ts`**

**Modifications:**

```typescript
// AJOUTÉ les imports
import { SecurityLoggerService } from '../common/logger/security-logger.service';
import { ClientInfo } from '../common/decorators/client-info.decorator';

// AJOUTÉ dans le constructor
constructor(
    private authService: AuthService,
    private securityLogger: SecurityLoggerService, // ⬅️ NOUVEAU
) { }

// MODIFIÉ la méthode login
@Post('login')
async login(
    @Body() req,
    @ClientInfo() clientInfo: { ip: string; userAgent: string }, // ⬅️ NOUVEAU
) {
    const user = await this.authService.validateUser(req.email, req.password);

    if (!user) {
        // ⬅️ NOUVEAU : Log tentative échouée
        this.securityLogger.logLoginFailed(
            req.email,
            clientInfo.ip,
            clientInfo.userAgent,
            'Invalid credentials',
        );
        throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    // ⬅️ NOUVEAU : Log connexion réussie
    this.securityLogger.logLoginSuccess(
        user.email,
        user.id,
        clientInfo.ip,
        clientInfo.userAgent,
    );

    return this.authService.login(user);
}
```

**Pourquoi ces modifications ?**
- ✅ **Détection d'attaques** : Les tentatives de connexion échouées sont maintenant tracées
- ✅ **Forensics** : En cas d'incident, on peut retrouver qui a tenté de se connecter
- ✅ **Conformité** : Audit trail des connexions pour RGPD
- ✅ **Monitoring** : Possibilité d'alerter sur X tentatives échouées

**Exemple de log généré:**
```json
{
  "timestamp": "2025-12-17T10:30:45.123Z",
  "eventType": "LOGIN_FAILED",
  "userEmail": "hacker@evil.com",
  "ip": "123.45.67.89",
  "userAgent": "curl/7.68.0",
  "success": false,
  "message": "Tentative de connexion échouée pour hacker@evil.com",
  "metadata": { "reason": "Invalid credentials" }
}
```

---

#### **6. `common/guards/jwt-auth.guard.ts`**

**Modifications:**

```typescript
// AVANT - Guard simple sans logging
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

// APRÈS - Guard avec logging des accès non autorisés
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private securityLogger: SecurityLoggerService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const ip = request.ip || request.headers['x-forwarded-for'] || 'unknown';
    const userAgent = request.headers['user-agent'] || 'unknown';
    const resource = `${request.method} ${request.url}`;

    if (err || !user) {
      // ⬅️ NOUVEAU : Log tentative accès sans token valide
      this.securityLogger.logUnauthorizedAccess(
        resource,
        ip,
        userAgent,
        info?.message || err?.message || 'No token provided',
      );

      throw err || new UnauthorizedException('Token invalide ou expiré');
    }

    return user;
  }
}
```

**Pourquoi cette modification ?**
- ✅ **Détection d'intrusion** : Trace tous les accès avec token invalide/expiré
- ✅ **Identification d'attaquants** : IP + User-Agent des tentatives non autorisées
- ✅ **Alerting** : Possibilité d'alerter sur trop de tentatives depuis une IP
- ✅ **Debug** : Aide à identifier les problèmes de token côté client

**Quand ce log est déclenché ?**
- Token JWT absent dans le header Authorization
- Token JWT expiré
- Token JWT malformé
- Token JWT avec signature invalide

---

#### **7. `common/guards/admin.guard.ts`**

**Modifications:**

```typescript
// AVANT - Pas de logging
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user?.role !== 'ADMIN') {
      throw new ForbiddenException('Admin access required');
    }
    return true;
  }
}

// APRÈS - Avec logging des tentatives d'accès non-admin
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private securityLogger: SecurityLoggerService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const ip = request.ip || request.headers['x-forwarded-for'] || 'unknown';
    const resource = `${request.method} ${request.url}`;

    if (user?.role !== 'ADMIN') {
      // ⬅️ NOUVEAU : Log accès refusé
      this.securityLogger.logAccessDenied(
        user?.userId || 'unknown',
        user?.email || 'unknown',
        user?.role || 'unknown',
        resource,
        'admin-only action',
        ip,
      );

      throw new ForbiddenException('Accès réservé aux administrateurs');
    }

    return true;
  }
}
```

**Pourquoi cette modification ?**
- ✅ **Détection de privilege escalation** : Si un GESTIONNAIRE tente d'accéder à une route admin
- ✅ **Audit** : Trace QUI a essayé d'accéder à QUOI
- ✅ **Conformité** : Preuve que les restrictions de rôles fonctionnent
- ✅ **Monitoring** : Alerter si un utilisateur tente régulièrement des accès non autorisés

**Exemple de log:**
```json
{
  "timestamp": "2025-12-17T11:00:00.000Z",
  "eventType": "ACCESS_DENIED",
  "userId": "abc-123",
  "userEmail": "gestionnaire@ghazal.dz",
  "userRole": "GESTIONNAIRE",
  "resourceType": "DELETE /users/xyz",
  "action": "admin-only action",
  "ip": "192.168.1.50",
  "success": false,
  "message": "Accès refusé: gestionnaire@ghazal.dz (GESTIONNAIRE) a tenté d'accéder à DELETE /users/xyz"
}
```

---

#### **8. `common/guards/etape-permission.guard.ts`**

**Modifications:**

```typescript
// AJOUTÉ dans le constructor
constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
    private securityLogger: SecurityLoggerService, // ⬅️ NOUVEAU
) {}

// MODIFIÉ la section de refus de permission
if (!hasPermission) {
    const ip = request.ip || request.headers['x-forwarded-for'] || 'unknown';
    const resource = `Etape ${numeroEtape}`;

    // ⬅️ NOUVEAU : Log violation de permission
    this.securityLogger.logPermissionViolation(
        user.userId,
        user.email,
        user.role,
        requiredPermission,
        resource,
        ip,
    );

    throw new ForbiddenException(
        `Vous n'avez pas la permission ${requiredPermission} pour cette étape`,
    );
}
```

**Pourquoi cette modification ?**
- ✅ **Audit granulaire** : Trace les tentatives d'accès aux étapes sans permission
- ✅ **Détection d'abus** : Si un user tente systématiquement d'accéder à des étapes interdites
- ✅ **Configuration** : Aide à identifier les problèmes de configuration de permissions
- ✅ **Compliance** : Preuve que le système de permissions fonctionne

**Cas d'usage:**
Un technicien essaie de modifier l'étape 5 (Certification) mais n'a que les permissions pour l'étape 2 (Installation).

---

#### **9. `users/users.controller.ts`**

**Modifications:**

```typescript
// AJOUTÉ les imports
import { SecurityLoggerService } from '../common/logger/security-logger.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ClientInfo } from '../common/decorators/client-info.decorator';

// AJOUTÉ dans constructor
constructor(
    private readonly usersService: UsersService,
    private readonly securityLogger: SecurityLoggerService, // ⬅️ NOUVEAU
) {}

// MODIFIÉ create()
@Post()
async create(
    @Body() createUserDto: CreateUserDto,
    @CurrentUser() currentUser: any, // ⬅️ NOUVEAU
    @ClientInfo() clientInfo: { ip: string; userAgent: string }, // ⬅️ NOUVEAU
) {
    const newUser = await this.usersService.create(createUserDto);

    // ⬅️ NOUVEAU : Log création utilisateur
    this.securityLogger.logUserCreated(
        newUser.id,
        newUser.email,
        currentUser.userId,
        currentUser.email,
        clientInfo.ip,
    );

    return newUser;
}

// MODIFIÉ update()
@Put(':id')
async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: any, // ⬅️ NOUVEAU
    @ClientInfo() clientInfo: { ip: string; userAgent: string }, // ⬅️ NOUVEAU
) {
    const updatedUser = await this.usersService.update(id, updateUserDto);

    // ⬅️ NOUVEAU : Log modification avec champs modifiés
    const changes = Object.keys(updateUserDto);
    this.securityLogger.logUserUpdated(
        updatedUser.id,
        updatedUser.email,
        currentUser.userId,
        currentUser.email,
        clientInfo.ip,
        changes, // ⬅️ Liste des champs modifiés
    );

    return updatedUser;
}

// MODIFIÉ remove()
@Delete(':id')
async remove(
    @Param('id') id: string,
    @CurrentUser() currentUser: any, // ⬅️ NOUVEAU
    @ClientInfo() clientInfo: { ip: string; userAgent: string }, // ⬅️ NOUVEAU
) {
    // Récupère les infos AVANT suppression
    const userToDelete = await this.usersService.findOne(id);

    await this.usersService.remove(id);

    // ⬅️ NOUVEAU : Log suppression
    this.securityLogger.logUserDeleted(
        userToDelete.id,
        userToDelete.email,
        currentUser.userId,
        currentUser.email,
        clientInfo.ip,
    );
}
```

**Pourquoi ces modifications ?**
- ✅ **Audit trail complet** : Qui a créé/modifié/supprimé quel utilisateur, quand, depuis où
- ✅ **Conformité RGPD** : Traçabilité obligatoire des opérations sur données personnelles
- ✅ **Détection d'abus** : Si un admin supprime massivement des users
- ✅ **Forensics** : En cas d'incident, retrouver l'origine des changements

**Exemple de log - Suppression utilisateur:**
```json
{
  "timestamp": "2025-12-17T14:30:00.000Z",
  "eventType": "USER_DELETED",
  "userId": "admin-789",
  "userEmail": "admin@ghazal.dz",
  "resourceId": "user-456",
  "resourceType": "user",
  "action": "delete",
  "ip": "10.0.0.5",
  "success": true,
  "message": "Utilisateur supprimé: technicien@ghazal.dz par admin@ghazal.dz"
}
```

---

#### **10. `workflows/workflows.controller.ts`**

**Modifications:**

```typescript
// AJOUTÉ les imports
import { ClientInfo } from '../common/decorators/client-info.decorator';
import { SecurityLoggerService } from '../common/logger/security-logger.service';

// AJOUTÉ dans constructor
constructor(
    private readonly workflowsService: WorkflowsService,
    private readonly securityLogger: SecurityLoggerService, // ⬅️ NOUVEAU
) { }

// MODIFIÉ cancelWorkflow()
@Post(':id/cancel')
async cancelWorkflow(
    @Param('id') id: string,
    @Body() cancelWorkflowDto: CancelWorkflowDto,
    @CurrentUser() user: any,
    @ClientInfo() clientInfo: { ip: string; userAgent: string }, // ⬅️ NOUVEAU
) {
    // Récupère les infos workflow AVANT annulation
    const workflow = await this.workflowsService.findOne(id);

    const result = await this.workflowsService.cancelWorkflow(
        id,
        cancelWorkflowDto.raison,
        user.userId,
        `${user.nom} ${user.prenom}`,
        user.role,
    );

    // ⬅️ NOUVEAU : Log annulation avec raison
    this.securityLogger.logWorkflowCancelled(
        workflow.id,
        workflow.vehicle.immatriculation,
        user.userId,
        user.email,
        cancelWorkflowDto.raison,
        clientInfo.ip,
    );

    return result;
}
```

**Pourquoi cette modification ?**
- ✅ **Audit critique** : L'annulation d'un workflow est une action sensible
- ✅ **Traçabilité** : QUI a annulé QUEL workflow, QUAND, et POURQUOI
- ✅ **Analyse métier** : Identifier les raisons fréquentes d'annulation
- ✅ **Conformité** : Preuve que seuls les ADMIN peuvent annuler

**Exemple de log:**
```json
{
  "timestamp": "2025-12-17T16:00:00.000Z",
  "eventType": "WORKFLOW_CANCELLED",
  "userId": "admin-123",
  "userEmail": "admin@ghazal.dz",
  "resourceId": "workflow-abc-456",
  "resourceType": "workflow",
  "action": "cancel",
  "ip": "192.168.1.10",
  "success": true,
  "message": "Workflow annulé: AB-123-CD (workflow-abc-456) par admin@ghazal.dz",
  "metadata": {
    "reason": "Client a demandé l'annulation - ne souhaite plus la conversion GPL"
  }
}
```

---

## 3. Fichiers Créés

| Fichier | Rôle | Lignes |
|---------|------|--------|
| `common/logger/security-logger.service.ts` | Service de logging centralisé | ~280 |
| `common/decorators/client-info.decorator.ts` | Decorator pour capturer IP/UA | ~25 |
| `common/common.module.ts` | Module global des services communs | ~10 |

**Total:** 3 nouveaux fichiers, ~315 lignes de code

---

## 4. Fichiers Modifiés

| Fichier | Modifications | Raison |
|---------|--------------|--------|
| `users/users.service.ts` | Séparation `findByEmail()` / `findByEmailWithPassword()` | Sécurité - Exclusion password |
| `auth/auth.service.ts` | Utilise `findByEmailWithPassword()` | Sécurité - Exclusion password |
| `auth/auth.controller.ts` | Logs login success/failed | Audit - Détection intrusions |
| `auth/auth.module.ts` | Nettoyage (SecurityLogger déjà global) | Clean code |
| `app.module.ts` | Import CommonModule | Architecture - Provider global |
| `common/guards/jwt-auth.guard.ts` | Logs unauthorized access | Audit - Tentatives avec token invalide |
| `common/guards/admin.guard.ts` | Logs access denied | Audit - Tentatives escalation privilèges |
| `common/guards/etape-permission.guard.ts` | Logs permission violations | Audit - Violations de permissions |
| `users/users.controller.ts` | Logs CRUD utilisateurs | Audit RGPD - Traçabilité données |
| `workflows/workflows.controller.ts` | Logs annulations workflow | Audit métier - Actions critiques |

**Total:** 10 fichiers modifiés

---

## 5. Impact et Bénéfices

### 🔒 Sécurité

| Amélioration | Avant | Après |
|--------------|-------|-------|
| **Exposition password** | ⚠️ Hash potentiellement exposé | ✅ Password jamais exposé sauf auth |
| **Détection intrusions** | ❌ Aucune | ✅ Tous les accès non autorisés loggés |
| **Audit trail** | ❌ Aucun | ✅ Traçabilité complète |
| **Forensics** | ❌ Impossible | ✅ Logs JSON parsables |

### 📊 Conformité

- ✅ **RGPD Article 30** : Registre des traitements → Logs des opérations sur données
- ✅ **RGPD Article 32** : Sécurité → Détection et logging des incidents
- ✅ **ISO 27001** : Gestion incidents → Audit trail
- ✅ **SOC 2** : Contrôles d'accès → Logs des tentatives non autorisées

### 🔍 Monitoring

**Possibilités offertes:**
- Alerter sur X tentatives de login échouées depuis une IP
- Détecter des patterns d'attaque (brute force, credential stuffing)
- Identifier les utilisateurs tentant des escalations de privilèges
- Analyser les raisons d'annulation de workflows
- Tracer l'origine de modifications de données sensibles

### 📁 Fichiers de Logs Générés

```
logs/
├── security.log              # Tous les événements de sécurité
├── security-critical.log     # Événements warn/error uniquement
├── combined.log             # Logs généraux de l'app
├── error.log                # Erreurs de l'app
├── exceptions.log           # Exceptions non gérées
└── rejections.log           # Promise rejections non gérées
```

---

## 6. Tests Recommandés

### ✅ Tests Fonctionnels

#### Test 1: Exclusion Password
```bash
# Tester que le password n'est PAS retourné
curl -H "Authorization: Bearer <token>" http://localhost:3000/users

# Vérifier qu'aucun objet user ne contient "password"
```

#### Test 2: Login Réussi
```bash
# Login valide
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ghazal.dz","password":"correct"}'

# Vérifier logs/security.log contient:
# "eventType":"LOGIN_SUCCESS"
```

#### Test 3: Login Échoué
```bash
# Login invalide
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ghazal.dz","password":"wrong"}'

# Vérifier logs/security.log contient:
# "eventType":"LOGIN_FAILED"
```

#### Test 4: Accès Sans Token
```bash
# Accès sans Authorization header
curl http://localhost:3000/workflows

# Vérifier logs/security.log contient:
# "eventType":"UNAUTHORIZED_ACCESS"
```

#### Test 5: Accès Non-Admin
```bash
# Login en tant que GESTIONNAIRE
TOKEN_GESTIONNAIRE=<token>

# Tenter suppression utilisateur (réservé ADMIN)
curl -X DELETE http://localhost:3000/users/<user_id> \
  -H "Authorization: Bearer $TOKEN_GESTIONNAIRE"

# Vérifier logs/security.log contient:
# "eventType":"ACCESS_DENIED"
```

#### Test 6: Annulation Workflow
```bash
# Login en tant qu'ADMIN
TOKEN_ADMIN=<token>

# Annuler un workflow
curl -X POST http://localhost:3000/workflows/<id>/cancel \
  -H "Authorization: Bearer $TOKEN_ADMIN" \
  -H "Content-Type: application/json" \
  -d '{"raison":"Test annulation"}'

# Vérifier logs/security.log contient:
# "eventType":"WORKFLOW_CANCELLED"
```

#### Test 7: Création Utilisateur
```bash
# Créer un utilisateur
curl -X POST http://localhost:3000/users \
  -H "Authorization: Bearer $TOKEN_ADMIN" \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@ghazal.dz",
    "password":"Test123!",
    "nom":"Test",
    "prenom":"User",
    "role":"GESTIONNAIRE"
  }'

# Vérifier logs/security.log contient:
# "eventType":"USER_CREATED"
```

---

### 📊 Vérification des Logs

#### Format JSON attendu:
```json
{
  "timestamp": "2025-12-17T10:30:45.123Z",
  "eventType": "LOGIN_SUCCESS",
  "userId": "abc-123",
  "userEmail": "admin@ghazal.dz",
  "userRole": "ADMIN",
  "ip": "192.168.1.100",
  "userAgent": "Mozilla/5.0...",
  "success": true,
  "message": "Connexion réussie pour admin@ghazal.dz"
}
```

#### Commandes de vérification:
```bash
# Voir tous les logs de sécurité
cat logs/security.log

# Voir uniquement les événements critiques
cat logs/security-critical.log

# Compter les tentatives de connexion échouées
grep "LOGIN_FAILED" logs/security.log | wc -l

# Voir les accès refusés
grep "ACCESS_DENIED" logs/security.log | jq .

# Derniers événements (JSON pretty-print)
tail -f logs/security.log | jq .
```

---

## 7. Prochaines Étapes Recommandées

### Court Terme (1-2 semaines)

1. **Tests d'intégration**
   - Écrire tests automatisés pour vérifier les logs
   - Valider que tous les événements génèrent bien des logs

2. **Rotation des logs**
   ```bash
   npm install winston-daily-rotate-file
   ```
   - Rotation automatique par jour
   - Compression des anciens logs
   - Rétention configurable (ex: 90 jours)

3. **Monitoring basique**
   - Script pour détecter X tentatives de login échouées
   - Alerte email/Slack en cas d'événements suspects

### Moyen Terme (1-2 mois)

4. **Dashboard de monitoring**
   - ELK Stack (Elasticsearch + Logstash + Kibana) OU
   - Grafana + Loki OU
   - CloudWatch (si AWS) OU
   - Datadog / New Relic

5. **Alerting automatisé**
   - > 5 LOGIN_FAILED depuis même IP en 5 min → Alerte
   - > 10 ACCESS_DENIED par user → Alerte
   - WORKFLOW_CANCELLED par non-ADMIN → Alerte critique

6. **Rate limiting intelligent**
   - Bloquer IP après X tentatives échouées
   - Captcha après 3 échecs
   - Throttling progressif

### Long Terme (3-6 mois)

7. **SIEM Integration**
   - Centralisation logs multi-services
   - Corrélation d'événements
   - Détection automatique de patterns d'attaque

8. **Compliance automatique**
   - Génération automatique de rapports d'audit
   - Export logs pour auditeurs externes
   - Dashboards conformité RGPD/ISO

---

## 8. Glossaire

| Terme | Définition |
|-------|------------|
| **Audit Trail** | Piste d'audit - enregistrement chronologique des événements système |
| **Forensics** | Analyse post-incident pour comprendre ce qui s'est passé |
| **RGPD** | Règlement Général sur la Protection des Données |
| **JWT** | JSON Web Token - standard pour l'authentification stateless |
| **Guard** | Mécanisme NestJS pour contrôler l'accès aux routes |
| **Decorator** | Annotation TypeScript pour ajouter des métadonnées/comportements |
| **Winston** | Bibliothèque de logging pour Node.js |
| **IP Spoofing** | Falsification d'adresse IP - mitigé par X-Forwarded-For |

---

## 9. Support et Contact

**Questions techniques:**
- Revoir ce document
- Consulter la documentation NestJS : https://docs.nestjs.com
- Documentation Winston : https://github.com/winstonjs/winston

**Problèmes rencontrés:**
1. Vérifier que le dossier `logs/` existe et est accessible en écriture
2. Vérifier que CommonModule est bien importé dans AppModule
3. Vérifier les imports TypeScript (chemins relatifs corrects)

**Pour rollback ces modifications:**
```bash
git log --oneline  # Trouver le commit avant modifications
git revert <commit_hash>  # Annuler les modifications
```

---

## 10. Checklist de Déploiement

Avant de déployer en production :

- [ ] ✅ Tests fonctionnels passés (voir section 6)
- [ ] ✅ Logs générés correctement dans `logs/security.log`
- [ ] ✅ Vérifier espace disque suffisant pour les logs
- [ ] ✅ Configurer rotation des logs
- [ ] ✅ Tester performance (les logs n'impactent pas les temps de réponse)
- [ ] ✅ Configurer monitoring/alerting
- [ ] ✅ Documenter pour l'équipe ops
- [ ] ✅ Backup des logs configuré
- [ ] ✅ Politique de rétention définie (ex: 90 jours)
- [ ] ⚠️ **IMPORTANT:** Ne jamais logger de mots de passe en clair !

---

**Fin du document** - Version 1.0 - 17/12/2025

Pour toute question, contacter l'équipe de développement.
