FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de l'application
COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Installer Netcat (version OpenBSD)
RUN apt-get update && apt-get install -y netcat-openbsd

# Ajouter le script wait-for-it
COPY wait-for-it.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Exposer le port 5000
EXPOSE 5000

# Lancer l'application après avoir attendu MySQL
CMD ["wait-for-it.sh", "db", "3306", "--", "npm", "start"]
