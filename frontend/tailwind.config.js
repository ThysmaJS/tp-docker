/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Inclure tous les fichiers React
  ],
  theme: {
    extend: {
      colors: {
        customGreen: "#B8ECD9", // Nom personnalisé pour la couleur
      },
    },
  },
  plugins: [],
};
