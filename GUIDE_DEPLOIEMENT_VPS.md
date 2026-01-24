# Guide de Déploiement VPS - Workflow Ghazal GPL

Ce guide vous accompagne dans le déploiement de l'application Workflow Ghazal sur un serveur VPS (Virtual Private Server) en production.

## Table des matières

1. [Prérequis](#prérequis)
2. [Préparation du VPS](#préparation-du-vps)
3. [Installation des dépendances](#installation-des-dépendances)
4. [Configuration de la base de données](#configuration-de-la-base-de-données)
5. [Déploiement du Backend](#déploiement-du-backend)
6. [Déploiement du Frontend](#déploiement-du-frontend)
7. [Configuration Nginx](#configuration-nginx)
8. [SSL/HTTPS avec Let's Encrypt](#sslhttps-avec-lets-encrypt)
9. [Gestion des processus avec PM2](#gestion-des-processus-avec-pm2)
10. [Surveillance et logs](#surveillance-et-logs)
11. [Sauvegarde et maintenance](#sauvegarde-et-maintenance)

---

## Prérequis

- Un VPS avec Ubuntu 20.04 LTS ou 22.04 LTS (minimum 2 Go RAM, 2 vCPU)
- Un nom de domaine pointant vers votre VPS (ex: www.ghazal.dz)
- Accès SSH root ou sudo au serveur
- Git installé sur le serveur

## Préparation du VPS

### 1. Mise à jour du système

```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Création d'un utilisateur non-root

```bash
# Créer un utilisateur pour l'application
sudo adduser ghazal

# Ajouter aux sudoers
sudo usermod -aG sudo ghazal

# Passer à cet utilisateur
su - ghazal
```

### 3. Configuration du pare-feu

```bash
# Autoriser SSH
sudo ufw allow OpenSSH

# Autoriser HTTP et HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Activer le pare-feu
sudo ufw enable
```

## Installation des dépendances

### 1. Installer Node.js (v20.x LTS)

```bash
# Installer nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Installer Node.js 20
nvm install 20
nvm use 20
nvm alias default 20

# Vérifier
node -v  # Doit afficher v20.x.x
npm -v
```

### 2. Installer PostgreSQL

```bash
# Installer PostgreSQL 14
sudo apt install postgresql postgresql-contrib -y

# Vérifier le service
sudo systemctl status postgresql
```

### 3. Installer Nginx

```bash
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
```

### 4. Installer PM2 (Process Manager)

```bash
npm install -g pm2
```

## Configuration de la base de données

### 1. Créer la base de données et l'utilisateur

```bash
# Se connecter à PostgreSQL
sudo -u postgres psql

# Dans psql:
CREATE DATABASE workflow;
CREATE USER ghazal_user WITH ENCRYPTED PASSWORD 'VOTRE_MOT_DE_PASSE_FORT';
GRANT ALL PRIVILEGES ON DATABASE workflow TO ghazal_user;
\q
```

### 2. Configurer PostgreSQL pour écouter sur localhost

```bash
# Éditer pg_hba.conf
sudo nano /etc/postgresql/14/main/pg_hba.conf

# Ajouter cette ligne (si elle n'existe pas):
# local   all             all                                     md5
```

## Déploiement du Backend

### 1. Cloner le projet depuis GitHub

```bash
cd ~
git clone https://github.com/VOTRE_USERNAME/workflow-ghazal.git
cd workflow-ghazal/backend
```

### 2. Installer les dépendances

```bash
npm install --production
```

### 3. Configurer les variables d'environnement

```bash
# Copier le fichier exemple
cp .env.example .env

# Éditer le fichier .env
nano .env
```

**Configuration .env du backend:**

```env
# DATABASE
DATABASE_URL="postgresql://ghazal_user:VOTRE_MOT_DE_PASSE_FORT@localhost:5432/workflow?schema=public"
POSTGRES_USER=ghazal_user
POSTGRES_PASSWORD=VOTRE_MOT_DE_PASSE_FORT
POSTGRES_DB=workflow
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
DATABASE_SCHEMA=public

# SERVER
NESTJS_PORT=3000
NODE_ENV=production

# JWT - IMPORTANT: Générer un secret fort!
JWT_SECRET=VOTRE_SECRET_JWT_TRES_FORT_64_CARACTERES
JWT_EXPIRES_IN=24h

# CORS
FRONTEND_URL=https://www.ghazal.dz/workflow
CORS_ORIGINS=https://www.ghazal.dz,https://ghazal.dz

# API
API_PREFIX=apiworkflow

# WEBSOCKET
WS_PATH=/apiworkflow/socket.io
```

**Générer un JWT_SECRET fort:**

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 4. Exécuter les migrations Prisma

```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma migrate deploy

# Peupler la base de données (optionnel, pour les données initiales)
npx prisma db seed
```

### 5. Builder l'application

```bash
npm run build
```

### 6. Démarrer avec PM2

```bash
# Créer un fichier ecosystem pour PM2
nano ecosystem.config.js
```

**Contenu de ecosystem.config.js:**

```javascript
module.exports = {
  apps: [{
    name: 'workflow-backend',
    script: 'dist/main.js',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      NESTJS_PORT: 3000
    },
    error_file: 'logs/err.log',
    out_file: 'logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',
    max_memory_restart: '1G'
  }]
};
```

```bash
# Créer le dossier logs
mkdir -p logs

# Démarrer l'application
pm2 start ecosystem.config.js

# Sauvegarder la configuration PM2
pm2 save

# Configurer PM2 pour démarrer au boot
pm2 startup
# Exécuter la commande affichée par PM2
```

## Déploiement du Frontend

### 1. Aller dans le dossier frontend

```bash
cd ~/workflow-ghazal/frontend
```

### 2. Configurer les variables d'environnement

```bash
# Copier le fichier exemple
cp .env.example .env

# Éditer le fichier
nano .env
```

**Configuration .env du frontend:**

```env
# API Configuration
VITE_API_URL=https://www.ghazal.dz/apiworkflow

# WebSocket Configuration
VITE_WS_URL=https://www.ghazal.dz
VITE_WS_PATH=/apiworkflow/socket.io

# General
VITE_NODE_ENV=production
```

### 3. Installer et builder

```bash
npm install
npm run build
```

### 4. Copier les fichiers buildés vers le dossier web

```bash
# Créer le dossier pour le frontend
sudo mkdir -p /var/www/ghazal/workflow

# Copier les fichiers
sudo cp -r dist/* /var/www/ghazal/workflow/

# Définir les permissions
sudo chown -R www-data:www-data /var/www/ghazal
sudo chmod -R 755 /var/www/ghazal
```

## Configuration Nginx

### 1. Créer le fichier de configuration Nginx

```bash
sudo nano /etc/nginx/sites-available/ghazal
```

**Configuration Nginx:**

```nginx
# Redirection HTTP vers HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name www.ghazal.dz ghazal.dz;

    # Rediriger vers HTTPS
    return 301 https://$server_name$request_uri;
}

# Configuration HTTPS
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name www.ghazal.dz ghazal.dz;

    # Certificats SSL (sera configuré avec Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/www.ghazal.dz/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/www.ghazal.dz/privkey.pem;

    # Paramètres SSL recommandés
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Logs
    access_log /var/log/nginx/ghazal_access.log;
    error_log /var/log/nginx/ghazal_error.log;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Frontend - Servir les fichiers statiques
    location /workflow {
        alias /var/www/ghazal/workflow;
        try_files $uri $uri/ /workflow/index.html;

        # Cache des assets statiques
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Backend API - Proxy vers le serveur NestJS
    location /apiworkflow/ {
        proxy_pass http://localhost:3000/apiworkflow/;
        proxy_http_version 1.1;

        # Headers
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_cache_bypass $http_upgrade;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # WebSocket - Configuration spéciale pour Socket.IO
    location /apiworkflow/socket.io/ {
        proxy_pass http://localhost:3000/apiworkflow/socket.io/;
        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Timeouts plus longs pour WebSocket
        proxy_connect_timeout 7d;
        proxy_send_timeout 7d;
        proxy_read_timeout 7d;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

### 2. Activer le site et tester la configuration

```bash
# Créer le lien symbolique
sudo ln -s /etc/nginx/sites-available/ghazal /etc/nginx/sites-enabled/

# Tester la configuration
sudo nginx -t

# Si OK, recharger Nginx
sudo systemctl reload nginx
```

## SSL/HTTPS avec Let's Encrypt

### 1. Installer Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 2. Obtenir le certificat SSL

```bash
# Obtenir le certificat pour votre domaine
sudo certbot --nginx -d www.ghazal.dz -d ghazal.dz

# Suivre les instructions et fournir votre email
```

### 3. Renouvellement automatique

```bash
# Tester le renouvellement
sudo certbot renew --dry-run

# Le renouvellement automatique est déjà configuré via cron
```

## Gestion des processus avec PM2

### Commandes utiles PM2

```bash
# Voir les processus en cours
pm2 list

# Voir les logs en temps réel
pm2 logs workflow-backend

# Redémarrer l'application
pm2 restart workflow-backend

# Arrêter l'application
pm2 stop workflow-backend

# Voir les métriques
pm2 monit

# Recharger sans downtime
pm2 reload workflow-backend
```

## Surveillance et logs

### 1. Logs du Backend

```bash
# Logs PM2
pm2 logs workflow-backend

# Logs applicatifs (dans backend/logs/)
tail -f ~/workflow-ghazal/backend/logs/combined.log
tail -f ~/workflow-ghazal/backend/logs/error.log
```

### 2. Logs Nginx

```bash
# Logs d'accès
sudo tail -f /var/log/nginx/ghazal_access.log

# Logs d'erreurs
sudo tail -f /var/log/nginx/ghazal_error.log
```

### 3. Logs PostgreSQL

```bash
sudo tail -f /var/log/postgresql/postgresql-14-main.log
```

## Sauvegarde et maintenance

### 1. Script de sauvegarde de la base de données

Créer un script de sauvegarde:

```bash
nano ~/backup-db.sh
```

**Contenu:**

```bash
#!/bin/bash
BACKUP_DIR=~/backups
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

# Backup PostgreSQL
pg_dump -U ghazal_user -h localhost workflow > $BACKUP_DIR/workflow_$DATE.sql

# Garder seulement les 7 dernières sauvegardes
find $BACKUP_DIR -name "workflow_*.sql" -mtime +7 -delete

echo "Backup créé: workflow_$DATE.sql"
```

```bash
# Rendre exécutable
chmod +x ~/backup-db.sh

# Ajouter au crontab (tous les jours à 2h du matin)
crontab -e

# Ajouter cette ligne:
0 2 * * * /home/ghazal/backup-db.sh
```

### 2. Mise à jour de l'application

```bash
cd ~/workflow-ghazal

# Pull les dernières modifications
git pull origin main

# Backend
cd backend
npm install --production
npm run build
pm2 restart workflow-backend

# Frontend
cd ../frontend
npm install
npm run build
sudo cp -r dist/* /var/www/ghazal/workflow/

# Recharger Nginx
sudo systemctl reload nginx
```

### 3. Monitoring des ressources

```bash
# Installer htop
sudo apt install htop -y

# Voir les ressources
htop

# Voir l'espace disque
df -h

# Voir la mémoire
free -h
```

---

## Points de vérification après déploiement

- [ ] Le frontend est accessible sur https://www.ghazal.dz/workflow
- [ ] L'API répond sur https://www.ghazal.dz/apiworkflow/health
- [ ] Les WebSockets se connectent correctement
- [ ] Les certificats SSL sont valides
- [ ] PM2 démarre automatiquement au boot
- [ ] Les sauvegardes automatiques fonctionnent
- [ ] Les logs sont accessibles et compréhensibles
- [ ] Le pare-feu est correctement configuré

## Support et dépannage

### Problèmes courants

1. **502 Bad Gateway**
   - Vérifier que le backend tourne: `pm2 list`
   - Vérifier les logs: `pm2 logs workflow-backend`

2. **WebSocket ne se connecte pas**
   - Vérifier la configuration Nginx pour `/apiworkflow/socket.io/`
   - Vérifier les CORS dans le backend

3. **Base de données inaccessible**
   - Vérifier PostgreSQL: `sudo systemctl status postgresql`
   - Vérifier les credentials dans `.env`

4. **Frontend affiche une page blanche**
   - Vérifier les permissions: `ls -la /var/www/ghazal/workflow`
   - Vérifier la configuration Nginx
   - Vérifier la console du navigateur pour les erreurs

---

**Auteur:** Workflow Ghazal GPL
**Version:** 1.0
**Dernière mise à jour:** Janvier 2026
