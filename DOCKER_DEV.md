# 🐳 Guide de Déploiement Docker - Développement Local

Ce guide vous explique comment déployer votre projet **Workflow Ghazal** en local avec **Docker** pour effectuer des modifications.

## ✅ Prérequis

- **Docker Desktop** installé et en cours d'exécution
- **Git** (pour gérer le code)

## 🚀 Démarrage Rapide (3 commandes)

```powershell
# 1. Naviguer vers le projet
cd "c:\Users\TogsO\OneDrive\Desktop\Nouveau dossier\worflow_ghazal_nest"

# 2. Construire et démarrer tous les services
docker-compose -f docker-compose.dev.yml up --build

# 3. Accéder à l'application
# Frontend: http://localhost:5173
# Backend API: http://localhost:3000
```

C'est tout ! 🎉

## 📋 Ce qui est déployé

Le fichier `docker-compose.dev.yml` déploie **3 services** :

| Service | Description | Port | URL |
|---------|-------------|------|-----|
| **postgres** | Base de données PostgreSQL 16 | 5432 | - |
| **backend** | API NestJS (mode dev avec hot-reload) | 3000 | http://localhost:3000 |
| **frontend** | Application React + Vite (mode dev) | 5173 | http://localhost:5173 |

## 🔧 Commandes Docker Utiles

### Démarrer l'environnement

```powershell
# Démarrer tous les services (en arrière-plan)
docker-compose -f docker-compose.dev.yml up -d

# Démarrer avec reconstruction des images
docker-compose -f docker-compose.dev.yml up --build

# Voir les logs en temps réel
docker-compose -f docker-compose.dev.yml logs -f

# Voir les logs d'un service spécifique
docker-compose -f docker-compose.dev.yml logs -f backend
docker-compose -f docker-compose.dev.yml logs -f frontend
```

### Arrêter l'environnement

```powershell
# Arrêter tous les services
docker-compose -f docker-compose.dev.yml down

# Arrêter et supprimer les volumes (⚠️ efface la base de données)
docker-compose -f docker-compose.dev.yml down -v
```

### Gérer les services individuellement

```powershell
# Redémarrer un service spécifique
docker-compose -f docker-compose.dev.yml restart backend
docker-compose -f docker-compose.dev.yml restart frontend

# Reconstruire un service
docker-compose -f docker-compose.dev.yml up --build backend
```

### Accéder aux containers

```powershell
# Ouvrir un shell dans le backend
docker exec -it ghazal_backend_dev sh

# Ouvrir un shell dans le frontend
docker exec -it ghazal_frontend_dev sh

# Accéder à PostgreSQL
docker exec -it ghazal_postgres_dev psql -U postgres -d workflow
```

## 🗄️ Gestion de la Base de Données

### Exécuter les migrations Prisma

```powershell
# Créer une nouvelle migration
docker exec -it ghazal_backend_dev npx prisma migrate dev --name nom_de_la_migration

# Appliquer les migrations
docker exec -it ghazal_backend_dev npx prisma migrate deploy

# Réinitialiser la base de données
docker exec -it ghazal_backend_dev npx prisma migrate reset
```

### Ouvrir Prisma Studio

```powershell
# Démarrer Prisma Studio
docker exec -it ghazal_backend_dev npx prisma studio
```

Puis ouvrir : http://localhost:5555

### Exécuter le seed

```powershell
docker exec -it ghazal_backend_dev npm run prisma:seed
```

## 🔄 Hot-Reload (Rechargement Automatique)

Les modifications de code sont **automatiquement détectées** :

### Backend
- Modifiez les fichiers dans `backend/src/`
- Le serveur NestJS redémarre automatiquement
- Vérifiez les logs : `docker-compose -f docker-compose.dev.yml logs -f backend`

### Frontend
- Modifiez les fichiers dans `frontend/src/`
- Vite recharge automatiquement la page
- Les changements sont visibles immédiatement dans le navigateur

### Modifications du schéma Prisma
Si vous modifiez `backend/prisma/schema.prisma` :

```powershell
# Générer le client Prisma
docker exec -it ghazal_backend_dev npx prisma generate

# Créer et appliquer la migration
docker exec -it ghazal_backend_dev npx prisma migrate dev
```

## 🐛 Débogage

### Voir les logs

```powershell
# Tous les services
docker-compose -f docker-compose.dev.yml logs -f

# Service spécifique
docker-compose -f docker-compose.dev.yml logs -f backend
docker-compose -f docker-compose.dev.yml logs -f postgres
```

### Vérifier l'état des services

```powershell
# Lister les containers en cours d'exécution
docker ps

# Voir les détails d'un service
docker-compose -f docker-compose.dev.yml ps
```

### Problèmes courants

#### Le backend ne démarre pas

```powershell
# Vérifier les logs
docker-compose -f docker-compose.dev.yml logs backend

# Reconstruire le service
docker-compose -f docker-compose.dev.yml up --build backend
```

#### La base de données ne se connecte pas

```powershell
# Vérifier que PostgreSQL est prêt
docker exec -it ghazal_postgres_dev pg_isready -U postgres

# Vérifier la connexion
docker exec -it ghazal_postgres_dev psql -U postgres -d workflow -c "SELECT 1;"
```

#### Erreur "port already in use"

Un service utilise déjà le port. Options :
1. Arrêter le service local qui utilise le port
2. Modifier le port dans `docker-compose.dev.yml`

```powershell
# Voir ce qui utilise le port 3000
netstat -ano | findstr :3000

# Voir ce qui utilise le port 5173
netstat -ano | findstr :5173
```

#### Réinitialiser complètement l'environnement

```powershell
# Arrêter et supprimer tout
docker-compose -f docker-compose.dev.yml down -v

# Supprimer les images
docker-compose -f docker-compose.dev.yml down --rmi all

# Redémarrer proprement
docker-compose -f docker-compose.dev.yml up --build
```

## 📦 Installer de nouvelles dépendances

### Backend

```powershell
# Installer une dépendance
docker exec -it ghazal_backend_dev npm install nom-du-package

# Reconstruire l'image pour persister
docker-compose -f docker-compose.dev.yml up --build backend
```

### Frontend

```powershell
# Installer une dépendance
docker exec -it ghazal_frontend_dev npm install nom-du-package

# Reconstruire l'image pour persister
docker-compose -f docker-compose.dev.yml up --build frontend
```

## 🔐 Identifiants par Défaut

### Base de données
- **Utilisateur** : `postgres`
- **Mot de passe** : `postgres123`
- **Base de données** : `workflow`

### Application (après seed)
- **Email** : `admin@example.com`
- **Mot de passe** : `admin123`

## 📁 Structure des Fichiers Docker

```
worflow_ghazal_nest/
├── docker-compose.dev.yml          # Configuration Docker pour le développement
├── .env.docker.dev                 # Variables d'environnement (optionnel)
├── backend/
│   ├── Dockerfile                  # Dockerfile de production
│   └── Dockerfile.dev              # Dockerfile de développement
└── frontend/
    └── Dockerfile.dev              # Dockerfile de développement
```

## 🔄 Workflow de Développement

1. **Démarrer Docker Desktop**

2. **Lancer l'environnement** :
   ```powershell
   docker-compose -f docker-compose.dev.yml up
   ```

3. **Développer** :
   - Modifier le code dans `backend/src/` ou `frontend/src/`
   - Les changements sont automatiquement détectés
   - Rafraîchir le navigateur si nécessaire

4. **Tester** :
   - Frontend : http://localhost:5173
   - Backend API : http://localhost:3000
   - Prisma Studio : http://localhost:5555

5. **Arrêter** :
   ```powershell
   # Ctrl+C dans le terminal
   # Ou
   docker-compose -f docker-compose.dev.yml down
   ```

## 🚢 Synchronisation avec la Production

### Récupérer les modifications

```powershell
# Arrêter les services
docker-compose -f docker-compose.dev.yml down

# Récupérer les dernières modifications
git pull origin main

# Redémarrer avec reconstruction
docker-compose -f docker-compose.dev.yml up --build
```

### Pousser vos modifications

```powershell
git add .
git commit -m "Description de vos modifications"
git push origin main
```

## 💡 Astuces

### Nettoyer Docker

```powershell
# Supprimer les containers arrêtés
docker container prune

# Supprimer les images non utilisées
docker image prune

# Supprimer les volumes non utilisés
docker volume prune

# Tout nettoyer (⚠️ attention)
docker system prune -a --volumes
```

### Optimiser les performances

Sur Windows, assurez-vous que :
- WSL 2 est activé (Docker Desktop > Settings > General)
- Les fichiers sont dans le système de fichiers WSL pour de meilleures performances

### Mode détaché (arrière-plan)

```powershell
# Démarrer en arrière-plan
docker-compose -f docker-compose.dev.yml up -d

# Voir les logs quand nécessaire
docker-compose -f docker-compose.dev.yml logs -f
```

---

**Bon développement avec Docker ! 🐳**
