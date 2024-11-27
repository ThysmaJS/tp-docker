# Utiliser une image Node.js
FROM node:18

# Définir le dossier de travail
WORKDIR /app

# Copier uniquement les fichiers nécessaires pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers
COPY . .

# Exposer le port 3000 pour React
EXPOSE 3000

# Démarrer le serveur de développement React
CMD ["npm", "start"]
