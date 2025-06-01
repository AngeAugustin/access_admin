import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Reclamations = () => {
  const [reclamations, setReclamations] = useState([]);

  useEffect(() => {
    fetch(`https://mediumvioletred-mole-607585.hostingersite.com/public/api/get_all_reclamations`)
      .then((res) => res.json())
      .then((data) => {
        setReclamations(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {/* Header section */}
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ margin: 0, fontSize: 16 }}>Réclamations</h2>
        <p style={{ color: "#555", margin: 0, paddingTop: 8, fontSize: 14 }}>
          Gérer mes réclamations
        </p>
      </div>

      <div style={{ height: "5px" }}></div>

      {/* Line separator */}
      <div
        style={{
          borderBottom: "1px solid #ddd",
          marginBottom: "20px",
        }}
      ></div>

      <div style={{ height: "10px" }}></div>

      {/* Liste des réclamations */}
      {reclamations.map((rec, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#fff",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "10px",
            fontSize: "14px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Image */}
          <img
            src="https://i.postimg.cc/yNBL2Ld3/Z.png" 
            alt="Réclamation"
            style={{
              width: "40px",
              height: "40px",
              marginRight: "15px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />

          {/* Contenu texte */}
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0 }}>
              Réclamation N°{" "}
              <span style={{ fontWeight: "bold" }}>{rec.Id_reclamation}</span> de{" "}
              <span style={{ fontWeight: "bold" }}>
                {rec.Prenom_demandant} {rec.Nom_demandant}
              </span>
            </p>
            <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
              Envoyée le {rec.Date_demande}
            </p>
          </div>

          {/* Bouton */}
          <Link to={`/DetailsReclamation?ID=${rec.Id_reclamation}`}>
            <button
              style={{
                background: "#004aad",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Voir les détails
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Reclamations;
