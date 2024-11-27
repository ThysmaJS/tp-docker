const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Route par défaut
app.get("/", (req, res) => {
    res.send("Backend API is running!");
});

// Lancer le serveur
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
