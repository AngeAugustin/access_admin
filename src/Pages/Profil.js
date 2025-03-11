import React, { useState } from "react";
import { Link } from "react-router-dom";

const profils = [
  {
    id: 1,
    nom: "FACHEHOUN Augustin",
    fonction: "Enseignant de Mathématiques",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    statut: "Nouveau",
  },
  {
    id: 2,
    nom: "FACHEHOUN Augustin",
    fonction: "Enseignant de Mathématiques",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    statut: "Nouveau",
  },
  {
    id: 3,
    nom: "FACHEHOUN Augustin",
    fonction: "Enseignant de Mathématiques",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    statut: "Vérifié",
  },
  {
    id: 4,
    nom: "FACHEHOUN Augustin",
    fonction: "Enseignant de Mathématiques",
    avatar: "", // Pas d'avatar => image par défaut
    statut: "Nouveau",
  },
];

const defaultAvatar = "https://via.placeholder.com/40"; // Avatar par défaut

const Profil = () => {
  const [statutActif, setStatutActif] = useState("Nouveau");

  return (
    <div style={{padding: "20px" }}>
      {/* Header section */}
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ margin: 0,fontSize: 16 }}>Profil </h2>
        <p style={{ color: "#555", margin: 0, paddingTop: 8, fontSize: 14 }}>Gérer les profils</p>
      </div>

      <div style={{ height: "5px" }}></div>

      {/* Line separator */}
      <div style={{ borderBottom: "1px solid #ddd", marginBottom: "20px" }}></div>

      {/* Onglets de sélection */}
      <div
        style={{
          display: "flex",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          padding: "5px",
          marginBottom: "20px",
        }}
      >
        {["Nouveau", "Vérifié"].map((statut) => (
          <button
            key={statut}
            onClick={() => setStatutActif(statut)}
            style={{
              flex: 1,
              padding: "10px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              backgroundColor: statutActif === statut ? "#004aad" : "white",
              color: statutActif === statut ? "#fff" : "#000",
              transition: "0.3s",
            }}
          >
            {statut === "Nouveau" ? "Nouveaux" : "Vérifiés"}
          </button>
        ))}
      </div>

      {/* Liste des profils filtrés */}
      {profils
        .filter((profil) => profil.statut === statutActif)
        .map((profil) => (
          <div
            key={profil.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#ffffff",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "10px",
              border: "1px solid #fff",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={profil.avatar || defaultAvatar}
                alt="Avatar"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginRight: "10px",
                }}
              />
              <div>
                <strong style={{ fontSize: 14 }} >{profil.nom}</strong>
                <p style={{ margin: 0, color: "#666", fontSize: 12 }}>{profil.fonction}</p>
              </div>
            </div>
            <Link to="/DetailsProfil">
            <button
              style={{
                backgroundColor: profil.statut === "Vérifié" ? "orange" : "#004aad",
                color: "white",
                border: "none",
                fontWeight: "bold",
                padding: "10px 15px",
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

export default Profil;
