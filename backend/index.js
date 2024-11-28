const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Autoriser toutes les origines par défaut

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
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
