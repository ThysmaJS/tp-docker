const fs = require("fs");
const path = require("path");

// Génération de paramètres dynamiques
const settings = {
    backendUrl: process.env.BACKEND_URL || "http://localhost:5000",
    frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
    environment: process.env.NODE_ENV || "development",
};

// Chemin vers le fichier settings.json
const settingsDir = "/app/public";
const settingsFilePath = path.join(settingsDir, "settings.json");

// Assurez-vous que le répertoire public existe
if (!fs.existsSync(settingsDir)) {
    fs.mkdirSync(settingsDir, { recursive: true });
}

// Écrire le fichier settings.json
fs.writeFileSync(settingsFilePath, JSON.stringify(settings, null, 2));
console.log(`Settings file generated at ${settingsFilePath}`);
console.log(settings);
