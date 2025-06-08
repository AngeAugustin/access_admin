import React from "react";

const App = () => {
  return (
    <div style={styles.container}>
      <img
        src="https://via.placeholder.com/200"
        alt="Exemple"
        style={styles.image}
      />
      <h1 style={styles.heading}>Bienvenue sur ma page React !</h1>
      <p style={styles.paragraph}>
        Ceci est une démonstration d'une page centrée avec une image et du texte.
      </p>
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
