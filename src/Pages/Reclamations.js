import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Reclamations = () => {
  const [reclamations, setReclamations] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const reclamationsPerPage = 4;

  useEffect(() => {
    fetch(`https://mediumvioletred-mole-607585.hostingersite.com/public/api/get_all_reclamations`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Réponse API :", data); // Pour debugger la structure
        if (data && Array.isArray(data)) {
          setReclamations(data);
        } else if (data && Array.isArray(data.reclamations)) {
          setReclamations(data.reclamations);
        } else {
          setReclamations([]);
        }
      })
      .catch((err) => {
        console.error("Erreur API :", err);
        setReclamations([]);
      });
  }, []);

  // Filtrer les réclamations selon la recherche
  const filteredReclamations = reclamations.filter(
    (rec) =>
      rec.Id_reclamation?.toString().includes(search) ||
      rec.Prenom_demandant?.toLowerCase().includes(search.toLowerCase()) ||
      rec.Nom_demandant?.toLowerCase().includes(search.toLowerCase()) ||
      rec.Date_demande?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      {/* Header section avec barre de recherche à droite */}
      <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 16 }}>Réclamations</h2>
          <p style={{ color: "#555", margin: 0, paddingTop: 8, fontSize: 14 }}>
            Gérer mes réclamations
          </p>
        </div>
        <span style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#004aad" style={{ marginRight: "4px" }}>
            <circle cx="11" cy="11" r="8" stroke="#004aad" strokeWidth="2" fill="#fff" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="#004aad" strokeWidth="2" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              padding: "6px 10px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "14px",
              outline: "none",
              boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
              transition: "border 0.2s",
              minWidth: "220px",
              marginLeft: "0"
            }}
          />
        </span>
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

      {/* Affichage si pas de réclamations ou liste paginée */}
      {filteredReclamations.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            color: "#999",
            marginTop: "50px",
          }}
        >
          <div style={{ fontSize: "50px", marginBottom: "10px" }}>⚠️</div>
          <p style={{ fontSize: "16px" }}>Il n'y a aucune réclamation.</p>
        </div>
      ) : (
        <>
          {filteredReclamations
            .slice((currentPage - 1) * reclamationsPerPage, currentPage * reclamationsPerPage)
            .map((rec, index) => (
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
                  src="https://i.postimg.cc/j5dJNBpz/10002106.png"
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
          {/* Pagination controls */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={{
                padding: "8px 16px",
                marginRight: "10px",
                borderRadius: "5px",
                border: "1px solid #004aad",
                background: currentPage === 1 ? "#eee" : "#fff",
                color: currentPage === 1 ? "#aaa" : "#004aad",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
              }}
            >
              Précédent
            </button>
            <span style={{ alignSelf: "center", fontSize: "15px", color: "#004aad" }}>
              Page {currentPage} / {Math.max(1, Math.ceil(filteredReclamations.length / reclamationsPerPage))}
            </span>
            <button
              onClick={() => setCurrentPage((prev) =>
                prev < Math.ceil(filteredReclamations.length / reclamationsPerPage) ? prev + 1 : prev
              )}
              disabled={currentPage >= Math.ceil(filteredReclamations.length / reclamationsPerPage)}
              style={{
                padding: "8px 16px",
                marginLeft: "10px",
                borderRadius: "5px",
                border: "1px solid #004aad",
                background: currentPage >= Math.ceil(filteredReclamations.length / reclamationsPerPage) ? "#eee" : "#fff",
                color: currentPage >= Math.ceil(filteredReclamations.length / reclamationsPerPage) ? "#aaa" : "#004aad",
                cursor: currentPage >= Math.ceil(filteredReclamations.length / reclamationsPerPage) ? "not-allowed" : "pointer",
              }}
            >
              Suivant
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Reclamations;
