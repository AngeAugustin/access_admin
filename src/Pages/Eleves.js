import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Eleves = () => {
  const [enfants, setEnfants] = useState([]);

  const avatarGarcon = "https://i.postimg.cc/7Yks2MRJ/gar-on.jpg";
  const avatarFille = "https://i.postimg.cc/6p6MH6t9/fille.jpg";

  // Récupérer les produits depuis l'API
  useEffect(() => {
    fetch(`https://access-backend-a961a1f4abb2.herokuapp.com/api/get_all_enfants`)
      .then((res) => res.json())
      .then((data) => {
        setEnfants(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {/* Header section */}
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ margin: 0, fontSize: 16 }}>Élèves</h2>
        <p style={{ color: "#555", margin: 0, paddingTop: 8, fontSize: 14 }}>
          Gérer les élèves
        </p>
      </div>

      <div style={{ height: "5px" }}></div>

      {/* Line separator */}
      <div style={{ borderBottom: "1px solid #ddd", marginBottom: "20px" }}></div>

      <div style={{ height: "10px" }}></div>

      {/* List of students */}
      {enfants.map((enfant, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#fff",
            fontSize: "14px",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "10px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={enfant.Sexe_enfant === "M" ? avatarGarcon : avatarFille}
              alt="avatar"
              style={{ width: 50, height: 50, borderRadius: "50%", marginRight: "10px" }}
            />
            <div>
              <p style={{ margin: 0, fontWeight: "bold" }}>
                {enfant.Nom_enfant} {enfant.Prenom_enfant}
              </p>
              <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
                {enfant.Classe_actuelle}
              </p>
            </div>
          </div>
          <Link to={`/DetailsEleve/${enfant.NPI_enfant}`}>
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

export default Eleves;
