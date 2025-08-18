import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Seances = () => {
  const [seances, setSeances] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const seancesPerPage = 4;

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

  // Filtrer les séances selon la recherche et la date
  const filteredSeances = seances.filter(
    (seance) => {
      const matchSearch =
        seance.NomEducateur?.toLowerCase().includes(search.toLowerCase()) ||
        seance.PrenomEducateur?.toLowerCase().includes(search.toLowerCase()) ||
        seance.NomEnfant?.toLowerCase().includes(search.toLowerCase()) ||
        seance.PrenomEnfant?.toLowerCase().includes(search.toLowerCase()) ||
        seance.Id_seance?.toString().includes(search) ||
        seance.Heure_seance?.toLowerCase().includes(search.toLowerCase());
      const matchDate = dateFilter
        ? (seance.Date_seance && seance.Date_seance.startsWith(dateFilter))
        : true;
      return matchSearch && matchDate;
    }
  );

  return (
    <div style={{ padding: "20px" }}>
      {/* Header section avec barre de recherche à droite */}
      <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 16 }}>Séances</h2>
          <p style={{ color: "#555", margin: 0, paddingTop: 8, fontSize: 14 }}>
            Gérer les séances
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Icône calendrier + input date */}
          <span style={{ marginRight: "8px", display: "flex", alignItems: "center" }}>
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#004aad" style={{ marginRight: "4px" }}>
              <rect x="3" y="5" width="18" height="16" rx="2" strokeWidth="2" stroke="#004aad" fill="#fff"/>
              <path d="M16 3v4M8 3v4" strokeWidth="2" stroke="#004aad"/>
              <path d="M3 9h18" strokeWidth="2" stroke="#004aad"/>
            </svg>
            <input
              type="date"
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
              style={{
                padding: "6px 10px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                fontSize: "14px",
                outline: "none",
                marginRight: "12px"
              }}
            />
          </span>
          <span style={{ display: "flex", alignItems: "center", marginRight: "8px" }}>
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
      </div>

      {/* Line separator */}
      <div style={{ borderBottom: "1px solid #ddd", marginBottom: "20px" }}></div>

      {/* Affichage du chargement ou message d'erreur */}
      {filteredSeances.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            color: "#999",
            marginTop: "50px",
          }}
        >
          <div style={{ fontSize: "50px", marginBottom: "10px" }}>⚠️</div>
          <p style={{ fontSize: "16px" }}>Aucune séance trouvée.</p>
        </div>
      ) : (
        <>
          {/* Pagination: calcul des séances à afficher */}
          {filteredSeances
            .slice((currentPage - 1) * seancesPerPage, currentPage * seancesPerPage)
            .map((seance) => (
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
              Page {currentPage} / {Math.max(1, Math.ceil(filteredSeances.length / seancesPerPage))}
            </span>
            <button
              onClick={() => setCurrentPage((prev) =>
                prev < Math.ceil(filteredSeances.length / seancesPerPage) ? prev + 1 : prev
              )}
              disabled={currentPage >= Math.ceil(filteredSeances.length / seancesPerPage)}
              style={{
                padding: "8px 16px",
                marginLeft: "10px",
                borderRadius: "5px",
                border: "1px solid #004aad",
                background: currentPage >= Math.ceil(filteredSeances.length / seancesPerPage) ? "#eee" : "#fff",
                color: currentPage >= Math.ceil(filteredSeances.length / seancesPerPage) ? "#aaa" : "#004aad",
                cursor: currentPage >= Math.ceil(filteredSeances.length / seancesPerPage) ? "not-allowed" : "pointer",
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

export default Seances;
