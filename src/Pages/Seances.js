import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Seances = () => {
  const [seances, setSeances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeances = async () => {
      try {
        const response = await fetch(`https://mediumvioletred-mole-607585.hostingersite.com/public/api/get_all_seances`);
        if (!response.ok) throw new Error("Aucune séance trouvée.");
        const data = await response.json();
        setSeances(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSeances();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {/* Header section */}
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ margin: 0, fontSize: 16 }}>Séances</h2>
        <p style={{ color: "#555", margin: 0, paddingTop: 8, fontSize: 14 }}>
          Gérer les séances
        </p>
      </div>

      {/* Line separator */}
      <div style={{ borderBottom: "1px solid #ddd", marginBottom: "20px" }}></div>

      {/* Affichage du chargement ou message d'erreur */}
      {loading ? (
        <p>Chargement des séances...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : seances.length === 0 ? (
        <p>Aucune séance disponible.</p>
      ) : (
        // Liste des séances
        seances.map((seance) => (
          <div
            key={seance.Id_seance}
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
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* Avatar par défaut ou suppression si non nécessaire */}
              <img
                src="https://i.postimg.cc/nhCP8Xrc/Seance.png"
                alt="avatar"
                style={{ width: 50, height: 50, borderRadius: "50%", marginRight: "10px" }}
              />
              <div>
                <p style={{ margin: 0, fontWeight: "bold" }}>
                  Séance de {seance.NomEducateur} {seance.PrenomEducateur} avec {seance.NomEnfant} {seance.PrenomEnfant}
                </p>
                <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
                  Durée : {seance.Heure_seance}
                </p>
              </div>
            </div>
            <Link to={`/DetailsSeance?Id_seance=${seance.Id_seance}`}>
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
        ))
      )}
    </div>
  );
};

export default Seances;
