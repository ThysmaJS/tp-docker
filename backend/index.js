const express = require("express");
const mysql = require("mysql2");
const app = express();

// Middleware
app.use(express.json());

// Configuration de la connexion à la base de données
const db = mysql.createPool({
    connectionLimit: 10, // Limite de connexions simultanées
    host: "db",
    user: "root",
    password: "root",
    database: "mydb",
});

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
db.on('error', (err) => {
    console.error("Erreur MySQL:", err.message);
});

// Route par défaut
app.get("/", (req, res) => {
    res.send("Backend API is running!");
});

// Route POST pour ajouter un utilisateur
app.post("/add", (req, res) => {
    const { name, age } = req.body;

    if (!name || !age) {
        return res.status(400).send("Veuillez fournir un nom et un âge dans le corps de la requête.");
    }

    // Requête SQL pour insérer les données
    const sql = "INSERT INTO users (name, age) VALUES (?, ?)";
    db.query(sql, [name, age], (err, result) => {
        if (err) {
            console.error("Erreur lors de l'insertion:", err.message, err.stack);
            res.status(500).json({ message: "Erreur serveur", error: err.message });
        } else {
            res.status(201).send(`Utilisateur ajouté avec l'ID: ${result.insertId}`);
        }
    });
});

// Lancer le serveur
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
