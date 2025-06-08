import React from "react";

const App = () => {
  // Récupération du paramètre status dans l'URL
  const params = new URLSearchParams(window.location.search);
  const status = params.get("status");

  // Déterminer le texte à afficher en fonction du status
  let message = "Ceci est une démonstration d'une page centrée avec une image et du texte.";
  if (status === "Approved") {
    message = "Votre paiement est terminé.";
  } else if (status === "Pending") {
    message = "Votre paiement est en cours.";
  }

  return (
    <div style={styles.container}>
      <img
        src="https://i.postimg.cc/9QvqpzQZ/access-2.png"
        alt="Access"
        style={styles.image}
      />
      <h1 style={styles.heading}>Bienvenue sur votre page de résultat !</h1>
      <p style={styles.paragraph}>{message}</p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f3f4f6",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    margin: 0,
    padding: 0,
  },
  image: {
    width: "200px",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    marginBottom: "20px",
  },
  heading: {
    fontSize: "2rem",
    color: "#1f2937",
    marginBottom: "10px",
  },
  paragraph: {
    color: "#4b5563",
    maxWidth: "400px",
  },
};

export default App;
