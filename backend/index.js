const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const fs = require("fs"); // Pour manipuler les fichiers

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Autoriser toutes les origines par défaut

// Configuration de la connexion à la base de données
const db = mysql.createPool({
    connectionLimit: 10, // Limite de connexions simultanées
    host: process.env.DB_HOST || "db",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "mydb",
});

// Générer le fichier settings.json au démarrage
const settings = {
    backendUrl: process.env.BACKEND_URL || "http://localhost:5000",
    frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
    environment: process.env.NODE_ENV || "development",
};
const settingsPath = "./public/settings.json";
fs.mkdirSync("./public", { recursive: true }); // Assure que le dossier existe
fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
console.log(`settings.json generated at ${settingsPath}`);

// Servir le fichier settings.json
app.use("/settings.json", express.static(settingsPath));

// Test de connexion à la base de données
db.getConnection((err, connection) => {
    if (err) {
        console.error("Erreur lors de la connexion au pool MySQL:", err.message);
    } else {
        console.log("Connecté au pool MySQL.");
        connection.release(); // Libérer la connexion pour d'autres requêtes
    }
});

// Gestion des erreurs MySQL
db.on("error", (err) => {
    console.error("Erreur MySQL:", err.message);
});

// Route par défaut
app.get("/", (req, res) => {
    res.send("Backend API is running!");
});

// Route POST pour ajouter une contribution
app.post("/add", (req, res) => {
    const { name, amount } = req.body;

    // Validation des données
    if (!name || amount == null) {
        return res
            .status(400)
            .send("Veuillez fournir un nom et une somme dans le corps de la requête.");
    }

    if (isNaN(amount)) {
        return res.status(400).send("Le champ 'amount' doit être un nombre valide.");
    }

    // Requête SQL pour insérer les données
    const sql = "INSERT INTO cagnottes (name, amount) VALUES (?, ?)";
    db.query(sql, [name, parseFloat(amount)], (err, result) => {
        if (err) {
            console.error("Erreur lors de l'insertion:", err.message, err.stack);
            res.status(500).json({ message: "Erreur serveur", error: err.message });
        } else {
            // Envoyer un statut de succès et les données ajoutées
            res.status(201).json({
                id: result.insertId,
                name,
                amount,
            });
        }
    });
});

// Route GET pour récupérer les contributions
app.get("/contributions", (req, res) => {
    const sql = "SELECT name, amount FROM cagnottes";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Erreur lors de la récupération des contributions:", err.message);
            res.status(500).json({ message: "Erreur serveur", error: err.message });
        } else {
            res.json(results);
        }
    });
});

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access settings.json at ${settings.backendUrl}/settings.json`);
});
