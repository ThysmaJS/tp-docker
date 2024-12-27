
# **Projet Dockerisé : Frontend, Backend, Base de Données et phpMyAdmin**

Ce projet est une application complète contenant :

- **Frontend** : React
- **Backend** : Node.js (Express)
- **Base de données** : MySQL
- **phpMyAdmin** : Interface d'administration pour la base de données

---

## **Prérequis**

Avant de commencer, assurez-vous d'avoir installé :

1. [Docker](https://www.docker.com/products/docker-desktop)
2. [Docker Compose](https://docs.docker.com/compose/install/)

---

## **Structure du projet**

```
project/
├── frontend/      # Code du frontend React
│   ├── Dockerfile
│   ├── package.json
│   ├── src/
├── backend/       # Code du backend Node.js
│   ├── Dockerfile
│   ├── package.json
│   ├── index.js
├── docker-compose.yml
├── .env           # Variables d'environnement
└── README.md
```

---

## **Installation et Lancement**

### Étape 1 : Clonez le projet

Clonez ce dépôt sur votre machine locale :

```bash
git clone <URL_DU_DEPOT>
cd project
```

---

### Étape 2 : Configuration des variables d’environnement

Créez un fichier `.env` à la racine du projet pour configurer les variables d’environnement (remplacez si nécessaire) :

```env
# Frontend
REACT_APP_API_URL=http://localhost:5000

# Backend
DB_HOST=db
DB_USER=root
DB_PASSWORD=root
DB_NAME=mydb
```

---

### Étape 3 : Construisez et démarrez les conteneurs

Lancez Docker Compose pour construire et démarrer tous les services :

```bash
docker-compose up --build
```

---

### Étape 4 : Accédez aux services

- **Frontend (React)** : [http://localhost:3000](http://localhost:3000)
- **Backend (API)** : [http://localhost:5000](http://localhost:5000)
- **phpMyAdmin** : [http://localhost:8080](http://localhost:8080)
  - **Utilisateur** : `root`
  - **Mot de passe** : `root`
- **Portainer** : [https://localhost:9443](https://localhost:9443)
- **uptimeKuma** : [http://localhost:3001](http://localhost:3001)

---

## **Arrêter les services**

Pour arrêter les conteneurs, utilisez :

```bash
docker-compose down
```

---

## **Notes**

- Les ports utilisés :
  - Frontend : **3000**
  - Backend : **5000**
  - MySQL : **3306**
  - phpMyAdmin : **8080**
  - Portainer : **9443**
  - uptimeKuma : **3001**
- Assurez-vous que ces ports ne sont pas utilisés par d'autres applications.

---
