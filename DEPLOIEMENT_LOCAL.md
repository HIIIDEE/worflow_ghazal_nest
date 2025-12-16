# 🚀 Guide de Déploiement Local - Workflow Ghazal

Ce guide vous explique comment déployer et exécuter votre projet en local pour effectuer des modifications.

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants sur votre machine Windows :

1. **Node.js** (version 18 ou supérieure)
   - Télécharger depuis : https://nodejs.org/
   - Vérifier l'installation : `node --version` et `npm --version`

2. **PostgreSQL** (version 14 ou supérieure)
   - Télécharger depuis : https://www.postgresql.org/download/windows/
   - Ou utiliser Docker (voir section Docker ci-dessous)

3. **Git** (pour cloner et gérer le code)
   - Télécharger depuis : https://git-scm.com/download/win

## 🗄️ Configuration de la Base de Données

### Option 1 : PostgreSQL Local

1. **Installer PostgreSQL** sur votre machine
2. **Créer une base de données** :
   ```sql
   CREATE DATABASE workflow;
   ```
3. **Créer un utilisateur** (optionnel, vous pouvez utiliser postgres) :
   ```sql
   CREATE USER workflow_user WITH PASSWORD 'votre_mot_de_passe';
   GRANT ALL PRIVILEGES ON DATABASE workflow TO workflow_user;
   ```

### Option 2 : PostgreSQL avec Docker

Si vous préférez utiliser Docker pour la base de données uniquement :

```powershell
cd backend
docker-compose up -d postgres_db_ghazal_workflow
```

Cela démarrera PostgreSQL sur le port **5433** (pour éviter les conflits avec une installation locale).

## ⚙️ Configuration du Backend

### 1. Créer le fichier `.env`

Créez un fichier `.env` dans le dossier `backend` avec le contenu suivant :

```env
# Configuration de la base de données
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/workflow"

# OU si vous utilisez Docker :
# DATABASE_URL="postgresql://postgres:your_password@localhost:5433/workflow"

# Configuration JWT
JWT_SECRET="votre_secret_jwt_tres_securise_changez_moi"
JWT_EXPIRATION="7d"

# Configuration du serveur
PORT=3000
NODE_ENV=development

# Configuration CORS (pour le frontend)
CORS_ORIGIN="http://localhost:5173"
```

> **⚠️ Important** : Remplacez `your_password` par le mot de passe que vous avez défini pour PostgreSQL.

### 2. Installer les dépendances

```powershell
cd backend
npm install
```

### 3. Générer le client Prisma

```powershell
npm run prisma:generate
```

### 4. Exécuter les migrations de la base de données

```powershell
npm run prisma:deploy
```

Ou pour le développement (avec seed) :

```powershell
npm run prisma:dev:migrate
```

### 5. (Optionnel) Initialiser les données de test

Si vous avez un fichier seed :

```powershell
npm run prisma:seed
```

### 6. Démarrer le backend en mode développement

```powershell
npm run start:dev
```

Le backend sera accessible sur **http://localhost:3000**

## 🎨 Configuration du Frontend

### 1. Créer le fichier `.env`

Créez un fichier `.env` dans le dossier `frontend` avec le contenu suivant :

```env
VITE_API_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3000
```

### 2. Installer les dépendances

```powershell
cd frontend
npm install
```

### 3. Démarrer le frontend en mode développement

```powershell
npm run dev
```

Le frontend sera accessible sur **http://localhost:5173**

## 🔧 Commandes Utiles

### Backend

| Commande | Description |
|----------|-------------|
| `npm run start:dev` | Démarre le backend en mode développement (avec hot-reload) |
| `npm run build` | Compile le backend pour la production |
| `npm run start:prod` | Démarre le backend en mode production |
| `npm run prisma:studio` | Ouvre l'interface Prisma Studio pour gérer la base de données |
| `npm run prisma:generate` | Génère le client Prisma |
| `npm run prisma:dev:migrate` | Crée et applique une nouvelle migration |
| `npm run lint` | Vérifie le code avec ESLint |

### Frontend

| Commande | Description |
|----------|-------------|
| `npm run dev` | Démarre le frontend en mode développement |
| `npm run build` | Compile le frontend pour la production |
| `npm run preview` | Prévisualise le build de production |
| `npm run lint` | Vérifie le code avec ESLint |

## 🐛 Débogage et Résolution de Problèmes

### Le backend ne démarre pas

1. **Vérifier que PostgreSQL est en cours d'exécution**
   ```powershell
   # Si vous utilisez Docker
   docker ps
   
   # Si vous utilisez PostgreSQL local, vérifier le service Windows
   ```

2. **Vérifier la connexion à la base de données**
   - Assurez-vous que `DATABASE_URL` dans `.env` est correct
   - Testez la connexion avec `npm run prisma:studio`

3. **Vérifier les migrations**
   ```powershell
   npm run prisma:status
   ```

### Le frontend ne peut pas se connecter au backend

1. **Vérifier que le backend est démarré** sur http://localhost:3000
2. **Vérifier le fichier `.env` du frontend** : `VITE_API_URL` doit pointer vers le backend
3. **Vérifier la configuration CORS** dans le backend

### Erreurs de compilation TypeScript

```powershell
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build
```

## 📊 Accès à Prisma Studio

Pour visualiser et modifier les données de votre base de données :

```powershell
cd backend
npm run prisma:studio
```

Prisma Studio s'ouvrira dans votre navigateur sur **http://localhost:5555**

## 🔄 Workflow de Développement Recommandé

1. **Démarrer PostgreSQL** (Docker ou local)
2. **Démarrer le backend** dans un terminal :
   ```powershell
   cd backend
   npm run start:dev
   ```
3. **Démarrer le frontend** dans un autre terminal :
   ```powershell
   cd frontend
   npm run dev
   ```
4. **Ouvrir votre navigateur** sur http://localhost:5173

## 🔐 Compte Administrateur par Défaut

Si votre seed crée un compte admin, les identifiants sont généralement :
- **Email** : admin@example.com (vérifier dans `backend/prisma/seed.ts`)
- **Mot de passe** : admin123 (vérifier dans `backend/prisma/seed.ts`)

## 📝 Modifications et Développement

### Modifier le Backend

1. Les fichiers source sont dans `backend/src/`
2. Le serveur redémarre automatiquement grâce à `--watch`
3. Pour ajouter/modifier des modèles de base de données :
   - Modifier `backend/prisma/schema.prisma`
   - Exécuter `npm run prisma:dev:migrate`
   - Exécuter `npm run prisma:generate`

### Modifier le Frontend

1. Les fichiers source sont dans `frontend/src/`
2. Vite recharge automatiquement les modifications
3. Les composants sont organisés par fonctionnalités dans `frontend/src/features/`

## 🚢 Synchronisation avec la Production

### Récupérer les dernières modifications

```powershell
git pull origin main
```

Puis réinstaller les dépendances si nécessaire :

```powershell
# Backend
cd backend
npm install
npm run prisma:generate
npm run prisma:deploy

# Frontend
cd frontend
npm install
```

### Pousser vos modifications

```powershell
git add .
git commit -m "Description de vos modifications"
git push origin main
```

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs du backend et du frontend
2. Consultez la documentation de NestJS : https://docs.nestjs.com/
3. Consultez la documentation de Prisma : https://www.prisma.io/docs/

---

**Bon développement ! 🎉**
