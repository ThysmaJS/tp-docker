import React from "react";

const FillDatabaseButton = () => {
  const handleFillDatabase = async () => {
    try {
      const response = await fetch("http://localhost:5000/fill-database", {
        method: "POST",
      });
      if (response.ok) {
        alert("Base de données remplie avec succès !");
      } else {
        alert("Erreur lors du remplissage de la base de données");
      }
    } catch (error) {
      console.error("Erreur :", error);
      alert("Une erreur est survenue");
    }
  };

  return (
    <button onClick={handleFillDatabase}>
      Remplir la base de données
    </button>
  );
};

export default FillDatabaseButton;
