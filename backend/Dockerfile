# Utiliser une image Node.js
FROM node:18

# Définir le dossier de travail
WORKDIR /app

# Copier les fichiers nécessaires
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le contenu dans l'image
COPY . .

# Lancer l'application
CMD ["npm", "run", "start"]
