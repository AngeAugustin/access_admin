import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Eleves = () => {
  const [enfants, setEnfants] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const elevesPerPage = 4;

  const avatarGarcon = "https://i.postimg.cc/7Yks2MRJ/gar-on.jpg"; 
  const avatarFille = "https://i.postimg.cc/6p6MH6t9/fille.jpg";

  // Récupérer les produits depuis l'API
  useEffect(() => {
    fetch(`https://mediumvioletred-mole-607585.hostingersite.com/public/api/get_all_enfants`)
      .then((res) => res.json())
      .then((data) => {
        setEnfants(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Filtrer les élèves selon la recherche
  const filteredEnfants = enfants.filter(
    (enfant) =>
      enfant.Nom_enfant?.toLowerCase().includes(search.toLowerCase()) ||
      enfant.Prenom_enfant?.toLowerCase().includes(search.toLowerCase()) ||
      enfant.NPI_enfant?.toLowerCase().includes(search.toLowerCase()) ||
      enfant.Classe_actuelle?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      {/* Header section avec barre de recherche à droite */}
      <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 16 }}>Élèves</h2>
          <p style={{ color: "#555", margin: 0, paddingTop: 8, fontSize: 14 }}>
            Gérer les élèves
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
      <div style={{ borderBottom: "1px solid #ddd", marginBottom: "20px" }}></div>

      <div style={{ height: "10px" }}></div>

      {/* List of students filtrée avec pagination */}
      {filteredEnfants.length === 0 ? (
        <div style={{ textAlign: "center", color: "#999", marginTop: "50px" }}>
          <div style={{ fontSize: "50px", marginBottom: "10px" }}>⚠️</div>
          <p style={{ fontSize: "16px" }}>Aucun élève trouvé.</p>
        </div>
      ) : (
        <>
          {filteredEnfants
            .slice((currentPage - 1) * elevesPerPage, currentPage * elevesPerPage)
            .map((enfant, index) => (
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
                <Link to={`/DetailsEleve?NPI_enfant=${enfant.NPI_enfant}`}>
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
              Page {currentPage} / {Math.max(1, Math.ceil(filteredEnfants.length / elevesPerPage))}
            </span>
            <button
              onClick={() => setCurrentPage((prev) =>
                prev < Math.ceil(filteredEnfants.length / elevesPerPage) ? prev + 1 : prev
              )}
              disabled={currentPage >= Math.ceil(filteredEnfants.length / elevesPerPage)}
              style={{
                padding: "8px 16px",
                marginLeft: "10px",
                borderRadius: "5px",
                border: "1px solid #004aad",
                background: currentPage >= Math.ceil(filteredEnfants.length / elevesPerPage) ? "#eee" : "#fff",
                color: currentPage >= Math.ceil(filteredEnfants.length / elevesPerPage) ? "#aaa" : "#004aad",
                cursor: currentPage >= Math.ceil(filteredEnfants.length / elevesPerPage) ? "not-allowed" : "pointer",
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

export default Eleves;
