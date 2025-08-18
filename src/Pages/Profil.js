import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Profil = () => {
  const [statutActif, setStatutActif] = useState("Nouveau"); // Le statut actif initial est "Nouveau"
  const [educateurs, setEducateurs] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const profilsPerPage = 4;

  useEffect(() => {
    fetch(`https://mediumvioletred-mole-607585.hostingersite.com/public/api/get_educ_backend`)
      .then((res) => res.json())
      .then((data) => {
        setEducateurs(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Filtrer les profils selon le statut et la recherche
  const filteredEducateurs = educateurs
    .filter((educateur) => educateur.Statut_profil === statutActif)
    .filter((educateur) =>
      educateur.Name?.toLowerCase().includes(search.toLowerCase()) ||
      educateur.Firstname?.toLowerCase().includes(search.toLowerCase()) ||
      educateur.NPI?.toLowerCase().includes(search.toLowerCase()) ||
      educateur.Matiere?.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div style={{ padding: "20px" }}>
      {/* Header section avec barre de recherche à droite */}
      <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 16 }}>Profil</h2>
          <p style={{ color: "#555", margin: 0, paddingTop: 8, fontSize: 14 }}>Gérer les profils</p>
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

      {/* Liste des profils filtrés avec pagination */}
      {filteredEducateurs.length === 0 ? (
        <div style={{ textAlign: "center", color: "#999", marginTop: "50px" }}>
          <div style={{ fontSize: "50px", marginBottom: "10px" }}>⚠️</div>
          <p style={{ fontSize: "16px" }}>Aucun profil trouvé.</p>
        </div>
      ) : (
        <>
          {filteredEducateurs
            .slice((currentPage - 1) * profilsPerPage, currentPage * profilsPerPage)
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
                    src={`data:image/jpeg;base64,${educateur.Photo_educateur}`}
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
              Page {currentPage} / {Math.max(1, Math.ceil(filteredEducateurs.length / profilsPerPage))}
            </span>
            <button
              onClick={() => setCurrentPage((prev) =>
                prev < Math.ceil(filteredEducateurs.length / profilsPerPage) ? prev + 1 : prev
              )}
              disabled={currentPage >= Math.ceil(filteredEducateurs.length / profilsPerPage)}
              style={{
                padding: "8px 16px",
                marginLeft: "10px",
                borderRadius: "5px",
                border: "1px solid #004aad",
                background: currentPage >= Math.ceil(filteredEducateurs.length / profilsPerPage) ? "#eee" : "#fff",
                color: currentPage >= Math.ceil(filteredEducateurs.length / profilsPerPage) ? "#aaa" : "#004aad",
                cursor: currentPage >= Math.ceil(filteredEducateurs.length / profilsPerPage) ? "not-allowed" : "pointer",
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

export default Profil;
