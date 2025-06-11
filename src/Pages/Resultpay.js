import React from "react";

const App = () => {
  // Récupération du paramètre status dans l'URL
  const params = new URLSearchParams(window.location.search);
  const status = params.get("status")?.toLowerCase(); // Normaliser en minuscules

  // Déterminer le texte à afficher en fonction du status
  let message = "Cette page fournit le statut de votre paiement."; 
  if (status === "approved") {
    message = "Votre paiement est terminé.";
  } else if (status === "pending") {
    message = "Votre paiement est en cours.";
  }

  return (
    <div style={styles.container}>
      <img
        src="https://i.postimg.cc/9QvqpzQZ/access-2.png"
        alt="Access"
        style={styles.image}
      />
      <h1 style={styles.heading}>Bienvenue sur Access - Tutorat !</h1>
      <p style={styles.paragraph}>{message}</p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "start",
   
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    margin: 0,
    padding: 100,
  },
  image: {
    width: "150px",
    height: "150px",
    borderRadius: "10px",
  },
  heading: {
    fontSize: "20px",
    color: "#1f2937",
    marginBottom: "10px",
  },
  paragraph: {
    color: "#4b5563",
    maxWidth: "400px",
  },
};

export default App;
