# 📦 Déploiement sur un Nouveau Serveur

## 🚀 Instructions de Déploiement Simplifiées

### 1. **Cloner le Projet**
```bash
git clone <votre-repo>
cd worflow_ghazal_nest
```

### 2. **Configuration Backend**
```bash
cd backend
npm install
```

Créer le fichier `.env` :
```env
DATABASE_URL="postgresql://user:password@localhost:5432/workflow_db"
JWT_SECRET="votre-secret-jwt-securise"
PORT=3000
```

### 3. **Configuration Frontend**
```bash
cd ../frontend
npm install
```

Créer le fichier `.env` :
```env
VITE_API_URL=http://localhost:3000
```

### 4. **Base de Données**

#### Créer la base de données PostgreSQL
```bash
createdb workflow_db
```

#### Exécuter les migrations Prisma
```bash
cd backend
npx prisma migrate deploy
```

#### Initialiser les données (étapes, admin, permissions)
```bash
npm run seed
```

**C'est tout !** Le seed crée maintenant directement les 10 étapes avec les bons noms.

### 5. **Démarrer l'Application**

**Mode Développement :**
```bash
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

**Mode Production :**
```bash
# Backend
cd backend
npm run build
npm run start:prod

# Frontend
cd frontend
npm run build
npm run preview
```

---

## 📁 Structure des Fichiers Importants

```
backend/
├── prisma/
│   ├── migrations/          # Migrations Prisma (NE PAS MODIFIER)
│   ├── schema.prisma        # Schéma de base de données
│   └── seed.ts              # Données initiales (admin + 10 étapes)
├── src/                     # Code source
└── .env                     # Variables d'environnement (À CRÉER)

frontend/
├── src/                     # Code source
└── .env                     # Variables d'environnement (À CRÉER)
```

---

## 🔐 Compte Admin par Défaut

Après le seed, vous pouvez vous connecter avec :
- **Email :** admin@ghazal.com
- **Mot de passe :** admin123

⚠️ **IMPORTANT :** Changez ce mot de passe en production !

---

## 🔧 Commandes Utiles

### Réinitialiser complètement la base de données
```bash
npx prisma migrate reset
```
Cette commande :
1. Supprime toutes les données
2. Réexécute toutes les migrations
3. Lance automatiquement le seed

### Voir la base de données (interface graphique)
```bash
npx prisma studio
```

### Régénérer le client Prisma
```bash
npx prisma generate
```

---

## ✅ Vérifications Post-Déploiement

1. **Backend démarré :** http://localhost:3000
2. **Frontend démarré :** http://localhost:5173
3. **Connexion admin fonctionne**
4. **10 étapes visibles dans les workflows**
5. **Noms des étapes corrects** (Reception, Demontage, etc.)

---

## 🐳 Déploiement Docker (Optionnel)

Si vous souhaitez utiliser Docker, créez un `docker-compose.yml` :

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: workflow_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://postgres:postgres@postgres:5432/workflow_db
    depends_on:
      - postgres

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

---

## ⚠️ Notes Importantes

1. **Pas de scripts SQL manuels nécessaires** - Tout est géré par Prisma et le seed
2. **Les migrations sont automatiques** - `prisma migrate deploy` suffit
3. **Le seed est idempotent** - Peut être exécuté plusieurs fois sans problème
4. **Toujours tester sur staging** avant de déployer en production
