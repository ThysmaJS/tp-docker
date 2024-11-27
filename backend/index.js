const express = require("express");
const mysql = require("mysql");

const app = express();
const PORT = 5000;

// Connexion à la base de données
const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
db.connect((err) => {
  if (err) throw err;
  console.log("Connecté à la base de données");
});

// Route pour remplir la base de données
app.post("/fill-database", (req, res) => {
  const sql = `
    INSERT INTO users (name, email) VALUES
    ('Alice', 'alice@example.com'),
    ('Bob', 'bob@example.com'),
    ('Charlie', 'charlie@example.com');
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Erreur lors de l'insertion :", err);
      res.status(500).send("Erreur lors de l'insertion des données");
    } else {
      res.status(200).send("Base de données remplie avec succès !");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Backend démarré sur http://localhost:${PORT}`);
});
