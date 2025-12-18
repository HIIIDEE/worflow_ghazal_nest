# 🚀 Démarrage Rapide - Docker

Pour déployer votre projet **Workflow Ghazal** en local avec Docker :

```powershell
cd "c:\Users\TogsO\OneDrive\Desktop\Nouveau dossier\worflow_ghazal_nest"
docker-compose -f docker-compose.dev.yml up --build
```

Puis accédez à :
- **Frontend** : http://localhost:5173
- **Backend** : http://localhost:3000

## 📚 Documentation Complète

- **[DOCKER_DEV.md](DOCKER_DEV.md)** - Guide complet Docker avec toutes les commandes
- **[DEPLOIEMENT_LOCAL.md](DEPLOIEMENT_LOCAL.md)** - Alternative sans Docker (installation manuelle)

## 🔄 Hot-Reload Activé

Modifiez le code dans `backend/src/` ou `frontend/src/` et les changements seront automatiquement détectés !

## ⚙️ Commandes Utiles

```powershell
# Démarrer en arrière-plan
docker-compose -f docker-compose.dev.yml up -d

# Voir les logs
docker-compose -f docker-compose.dev.yml logs -f

# Arrêter
docker-compose -f docker-compose.dev.yml down

# Prisma Studio (gestion DB)
docker exec -it ghazal_backend_dev npx prisma studio
```
