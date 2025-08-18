import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Educateurs = () => {
  const [educateurs, setEducateurs] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const educateursPerPage = 4;

  useEffect(() => {
    fetch(`https://mediumvioletred-mole-607585.hostingersite.com/public/api/get_educ_backend`)
      .then((res) => res.json())
      .then((data) => {
        setEducateurs(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Filtrer les éducateurs selon la recherche
  const filteredEducateurs = educateurs.filter(
    (educateur) =>
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
          <h2 style={{ margin: 0, fontSize: 16 }}>Educateurs</h2>
          <p style={{ color: "#555", margin: 0, paddingTop: 8, fontSize: 14 }}>
            Gérer les éducateurs
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

      {/* Line separator with lighter color and thinner width */}
      <div style={{ borderBottom: "1px solid #ddd", marginBottom: "20px" }}></div>

      <div style={{ height: "10px" }}></div>

      {/* List of educators filtrée avec pagination */}
      {filteredEducateurs.length === 0 ? (
        <div style={{ textAlign: "center", color: "#999", marginTop: "50px" }}>
          <div style={{ fontSize: "50px", marginBottom: "10px" }}>⚠️</div>
          <p style={{ fontSize: "16px" }}>Aucun éducateur trouvé.</p>
        </div>
      ) : (
        <>
          {filteredEducateurs
            .slice((currentPage - 1) * educateursPerPage, currentPage * educateursPerPage)
            .map((educateur, index) => (
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
                    src={`data:image/jpeg;base64,${educateur.Photo_educateur}`}
                    alt="avatar"
                    style={{ width: 50, height: 50, borderRadius: "50%", marginRight: "10px" }}
                  />
                  <div>
                    <p style={{ margin: 0, fontWeight: "bold" }}>{educateur.Name} {educateur.Firstname}</p>
                    <p style={{ margin: 0, color: "#666", fontSize: "14px" }}> Enseignant en {educateur.Matiere}</p>
                  </div>
                </div>
                <Link to={`/DetailsEducateur?NPI=${educateur.NPI}`}>
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
              Page {currentPage} / {Math.max(1, Math.ceil(filteredEducateurs.length / educateursPerPage))}
            </span>
            <button
              onClick={() => setCurrentPage((prev) =>
                prev < Math.ceil(filteredEducateurs.length / educateursPerPage) ? prev + 1 : prev
              )}
              disabled={currentPage >= Math.ceil(filteredEducateurs.length / educateursPerPage)}
              style={{
                padding: "8px 16px",
                marginLeft: "10px",
                borderRadius: "5px",
                border: "1px solid #004aad",
                background: currentPage >= Math.ceil(filteredEducateurs.length / educateursPerPage) ? "#eee" : "#fff",
                color: currentPage >= Math.ceil(filteredEducateurs.length / educateursPerPage) ? "#aaa" : "#004aad",
                cursor: currentPage >= Math.ceil(filteredEducateurs.length / educateursPerPage) ? "not-allowed" : "pointer",
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

export default Educateurs;
