# Système de Gestion Workflow - Ghazal GPL

Application de gestion administrative pour le workflow de transformation de véhicules GPL chez Ghazal GPL.

## Architecture

### Backend (NestJS + Prisma + PostgreSQL)
- **Framework**: NestJS
- **ORM**: Prisma
- **Base de données**: PostgreSQL
- **Port**: 3000

### Frontend (React + TypeScript + Vite)
- **Framework**: React avec TypeScript
- **Build tool**: Vite
- **Routing**: React Router
- **State management**: TanStack Query (React Query)
- **HTTP client**: Axios
- **Port**: 5173

## Structure de la Base de Données

### Modèles Principaux

1. **Client** - Informations des clients
   - Nom, prénom, email, téléphone
   - Adresse complète (adresse, ville, code postal)

2. **Vehicle** - Informations des véhicules
   - Immatriculation, marque, modèle, année
   - Numéro de série
   - Relation avec le client

3. **Workflow** - Workflow de transformation GPL
   - Lié à un véhicule
   - Statut: EN_COURS, TERMINE, ANNULE
   - Suivi de l'étape actuelle (1-10)
   - Dates de début et fin

4. **WorkflowEtape** - Les 10 étapes du processus
   - Numéro et nom de l'étape
   - Statut: EN_ATTENTE, EN_COURS, TERMINE, BLOQUE
   - Formulaire (JSON) pour stocker les données spécifiques
   - Dates, validateur, commentaires

5. **EtapeDefinition** - Templates des étapes
   - Définition des 10 étapes standards
   - Configuration des champs de formulaire

6. **HistoriqueModification** - Traçabilité
   - Suivi de toutes les modifications
   - Anciennes et nouvelles valeurs

## Les 10 Étapes du Workflow GPL

1. **Réception du véhicule** - Vérification initiale et réception
2. **Contrôle technique pré-transformation** - Contrôle avant transformation
3. **Démontage et préparation** - Démontage des pièces nécessaires
4. **Installation du système GPL** - Installation du réservoir et kit GPL
5. **Branchement électrique** - Branchement du système électrique GPL
6. **Tests de fonctionnement** - Tests du système GPL installé
7. **Contrôle technique post-transformation** - Contrôle après transformation
8. **Homologation** - Procédure d'homologation du véhicule
9. **Documentation administrative** - Finalisation des documents
10. **Livraison au client** - Remise du véhicule au client

## Configuration de la Base de Données

```
Base de données: workflow
Utilisateur: postgres
Mot de passe: 123456
Port: 5433
Host: localhost
```

## Installation et Démarrage

### Prérequis
- Node.js (v18+)
- PostgreSQL (v14+)
- npm ou yarn

### Backend

```bash
cd backend

# Installer les dépendances
npm install

# Configurer la base de données (fichier .env déjà configuré)
# DATABASE_URL="postgresql://postgres:123456@localhost:5433/workflow?schema=public"

# Appliquer les migrations Prisma
npx prisma migrate dev

# Générer le client Prisma
npx prisma generate

# Démarrer le serveur en mode développement
npm run start:dev
```

Le backend sera accessible sur `http://localhost:3000`

### Frontend

```bash
cd frontend

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

Le frontend sera accessible sur `http://localhost:5173`

## API Endpoints

### Clients
- `GET /api/clients` - Liste des clients
- `GET /api/clients/:id` - Détails d'un client
- `POST /api/clients` - Créer un client
- `PATCH /api/clients/:id` - Modifier un client
- `DELETE /api/clients/:id` - Supprimer un client

### Véhicules
- `GET /api/vehicles` - Liste des véhicules
- `GET /api/vehicles/:id` - Détails d'un véhicule
- `POST /api/vehicles` - Créer un véhicule
- `PATCH /api/vehicles/:id` - Modifier un véhicule
- `DELETE /api/vehicles/:id` - Supprimer un véhicule

### Workflows
- `GET /api/workflows` - Liste des workflows
- `GET /api/workflows/:id` - Détails d'un workflow
- `POST /api/workflows` - Créer un workflow
- `PATCH /api/workflows/:id` - Modifier un workflow
- `DELETE /api/workflows/:id` - Supprimer un workflow
- `GET /api/workflows/:id/etapes` - Étapes d'un workflow
- `PATCH /api/workflows/:id/etapes/:numeroEtape` - Modifier une étape

## Prochaines Étapes

Les formulaires pour chaque étape seront implémentés dans les prochaines phases du développement. La structure actuelle permet de:

1. Créer des clients et véhicules
2. Initialiser des workflows avec les 10 étapes prédéfinies
3. Suivre la progression de chaque transformation
4. Visualiser l'état de chaque étape
5. Stocker des données de formulaire en JSON pour chaque étape

## Technologies Utilisées

### Backend
- NestJS 10+
- Prisma 7+
- PostgreSQL 14+
- TypeScript

### Frontend
- React 18+
- TypeScript
- Vite
- React Router 6+
- TanStack Query (React Query)
- Axios

## License

Projet propriétaire - Ghazal GPL
