import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const defaultAvatar = "https://i.postimg.cc/Y9wnm83h/instabutton-png-design-5690390.png"; // Avatar par défaut

const Profil = () => {
  const [statutActif, setStatutActif] = useState("Nouveau"); // Le statut actif initial est "Nouveau"
  const [educateurs, setEducateurs] = useState([]);

  useEffect(() => {
    fetch(`https://mediumvioletred-mole-607585.hostingersite.com/AccessBackend/public/api/get_educ_backend`)
      .then((res) => res.json())
      .then((data) => {
        setEducateurs(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {/* Header section */}
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ margin: 0, fontSize: 16 }}>Profil</h2>
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
        {["Nouveau", "Vérifié", "Rejeté"].map((statut) => (
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
            {statut === "Nouveau" ? "Nouveaux" : statut === "Vérifié" ? "Vérifiés" : "Rejetés"}
          </button>
        ))}
      </div>

      {/* Liste des profils filtrés */}
      {educateurs
        .filter((educateur) => educateur.Statut_profil === statutActif)
        .map((educateur) => (
          <div
            key={educateur.NPI}
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
                src={educateur.avatar || defaultAvatar}
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
                <strong style={{ fontSize: 14 }}>
                  {educateur.Name} {educateur.Firstname}
                </strong>
                <p style={{ margin: 0, color: "#666", fontSize: 12 }}>
                  Enseignant en {educateur.Matiere}
                </p>
              </div>
            </div>
            <Link to={`/DetailsProfil?NPI=${educateur.NPI}`}>
              <button
                style={{
                  backgroundColor:
                    educateur.Statut_profil === "Vérifié"
                      ? "green"
                      : educateur.Statut_profil === "Rejeté"
                      ? "red"
                      : "#004aad",
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
