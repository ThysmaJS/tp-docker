import { useState, useEffect } from "react";
import MyIcon from './Bloc_Marianne.svg.png';

function App() {
  const [formData, setFormData] = useState({ name: "", amount: "" });
  const [contributions, setContributions] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [target, setTarget] = useState(1000); // Montant cible de la cagnotte

  // Récupérer les contributions depuis le serveur
  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch("http://localhost:5000/contributions");
        if (response.ok) {
          const data = await response.json();
          setContributions(data);
          const total = data.reduce((sum, item) => sum + parseFloat(item.amount), 0);
          setTotalAmount(total);
        } else {
          console.error("Erreur lors de la récupération des contributions");
        }
      } catch (err) {
        console.error("Erreur de connexion au serveur:", err);
      }
    };

    fetchContributions();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submission = {
      name: formData.name.trim() || "Anonyme",
      amount: parseFloat(formData.amount),
    };

    try {
      const response = await fetch("http://localhost:5000/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submission),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Donnée ajoutée avec succès :", result);

        setContributions((prevContributions) => [...prevContributions, result]);
        setTotalAmount((prev) => prev + parseFloat(submission.amount));
        setFormData({ name: "", amount: "" });
      } else {
        const error = await response.text();
        console.error(`Erreur: ${error}`);
      }
    } catch (err) {
      console.error(`Erreur lors de la connexion au serveur: ${err.message}`);
    }
  };

  const progress = Math.min((totalAmount / target) * 100, 100);

  // Trier les contributions par montant décroissant
  const sortedContributions = [...contributions].sort((a, b) => b.amount - a.amount);

  return (
    <div className="min-h-screen bg-customGreen flex flex-col items-center justify-center">
      {/* Section avec le SVG et le texte */}
      <div className="text-center mb-8">
        {/* SVG */}
        <img
          src={MyIcon}
          alt="Icone donation"
          className="mx-auto h-20 w-50"
        />

        {/* Texte sous le SVG */}
        <h1 className="mt-4 text-3xl font-semibold text-gray-800">
          Merci de faire un don pour m'aider à payer mes amendes.
        </h1>
      </div>

      {/* Contenu principal */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg border border-blue-500">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">Ajouter à la cagnotte</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nom (facultatif)"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Somme:</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Montant"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600"
          >
            Envoyer
          </button>
        </form>

        <h2 className="text-xl font-semibold text-gray-800 mt-8">Contributeurs</h2>
        {/* Liste des contributions avec un scroll si > 3 */}
        <ul className="space-y-2 mt-4 max-h-[12rem] overflow-y-auto">
          {sortedContributions.map((contribution, index) => (
            <li
              key={index}
              className="bg-gray-50 p-4 rounded-md shadow-sm flex justify-between border border-gray-300"
            >
              <span className="text-blue-700 font-medium">{contribution.name}</span>
              <span className="text-red-600">{contribution.amount} €</span>
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mt-8">Progression de la cagnotte</h2>
        <div className="w-full bg-gray-200 rounded-full h-4 mt-4 border border-gray-300">
          <div
            style={{ width: `${progress}%` }}
            className={`h-full rounded-full ${
              progress === 100 ? "bg-red-600" : "bg-blue-500"
            }`}
          ></div>
        </div>
        <p className="text-gray-600 mt-2 text-sm">
          {totalAmount} € collectés sur {target} €
        </p>
      </div>
    </div>
  );
}

export default App;
