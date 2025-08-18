import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const DetailsEleve = () => {
  const [showParcours, setShowParcours] = useState(false);
  const [showProfilpsycho, setShowProfilpsycho] = useState(false);
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const NPI_enfant = queryParams.get("NPI_enfant");
  const avatarGarcon = "https://i.postimg.cc/7Yks2MRJ/gar-on.jpg";
  const avatarFille = "https://i.postimg.cc/6p6MH6t9/fille.jpg";

  useEffect(() => {
    if (NPI_enfant) {
      fetch(`https://mediumvioletred-mole-607585.hostingersite.com/public/api/get_enfant/${NPI_enfant}`)
        .then((res) => res.json())
        .then((data) => {
          setDetails(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [NPI_enfant]); 

  if (loading) {
    return <p>Chargement des données...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      {/* Header section */}
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ margin: 0, fontSize: 16 }}>Détails de l'élève</h2>
        <p style={{ color: "#555", margin: 0, paddingTop: 8, fontSize: 14 }}>
          Gérer les détails de l'élève
        </p>
      </div>

      <div style={{ height: "5px" }}></div>

      {/* Line separator */}
      <div style={{ borderBottom: "1px solid #ddd", marginBottom: "20px" }}></div>

      {/* Parent image and info */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "80px",
        }}
      >
        <img
              src={details.Sexe_enfant === "M" ? avatarGarcon : avatarFille}
              alt="avatar"
              style={{ width: 120, height: 120, borderRadius: "50%", marginRight: "10px" }}
            />
        <div>
          <p><strong>NPI de l'enfant : </strong> {details.NPI_enfant}</p>
          <p><strong>État Civil : </strong> {details.Nom_enfant} {details.Prenom_enfant}</p>
          <p><strong>Date de naissance : </strong> {details.Date_naissance}</p>
          <p><strong>Sexe : </strong> {details.Sexe_enfant}</p>
        </div>
      </div>

      {/* Conteneur blanc */}
      <div
        style={{
          marginTop: "20px",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            gap: "70px",
          }}
        >
          {/* Informations */}
          <div>
            <h3 style={{ color: "#004aad", fontSize: "16px" }}>Quelques informations</h3>
            <p><strong>Classe précédente : </strong> {details.Classe_precedente}</p>
            <p><strong>Établissement précédent : </strong> {details.Ecole_precedente}</p>
            <p><strong>Classe Actuelle : </strong> {details.Classe_actuelle}</p>
            <p><strong>Établissement Actuel : </strong> {details.Ecole_actuelle}</p>
          </div>

          {/* Parcours et Profil psychologique */}
          <div>
            <h3 style={{ color: "#004aad", fontSize: "16px" }}>Parcours</h3>
            <button
              style={buttonStyle}
              onClick={() => setShowParcours(true)}
            >
              Voir le menu
            </button>

            <h3 style={{ color: "#004aad", fontSize: "16px" }}>Profil psychologique</h3>
            <button
              style={buttonStyle}
              onClick={() => setShowProfilpsycho(true)}
            >
              Voir le menu
            </button>
          </div>
        </div>
      </div>

      {/* Modal du menu Parcours */}
      {showParcours && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h2 style={{ color: "#004aad", marginBottom: "20px", fontSize: "14px" }}>Parcours</h2>
            <div style={{ width: '100%', maxWidth: 400 }}>
              {/* Notes sous forme de badges colorés */}
              {(() => {
                const notes = [
                  details.Niveau_francais,
                  details.Niveau_anglais,
                  details.Niveau_philosophie,
                  details.Niveau_svt,
                  details.Niveau_pct,
                  details.Niveau_mathematique,
                  details.Niveau_histegeo,
                  details.Niveau_allemand,
                  details.Niveau_espagnol
                ].map(n => parseFloat(n)).filter(n => !isNaN(n));
                const moyenne = notes.length ? (notes.reduce((a, b) => a + b, 0) / notes.length) : null;
                let observation = "Pas d'observation disponible.";
                let color = "#bdc3c7";
                if (moyenne !== null) {
                  if (moyenne >= 15) {
                    observation = "Excellent parcours scolaire. Félicitations !";
                    color = "#27ae60";
                  } else if (moyenne >= 10) {
                    observation = "Parcours scolaire satisfaisant. Peut mieux faire.";
                    color = "#f1c40f";
                  } else {
                    observation = "Parcours scolaire à renforcer. Un accompagnement est conseillé.";
                    // eslint-disable-next-line no-unused-vars
                    color = "#e74c3c";
                  }
                }
                return (
                  <div style={{ marginBottom: "18px" }}>
                    {/* Notes */}
                    {[ 
                      { label: "Français", value: details.Niveau_francais },
                      { label: "Anglais", value: details.Niveau_anglais },
                      { label: "Philosophie", value: details.Niveau_philosophie },
                      { label: "SVT", value: details.Niveau_svt },
                      { label: "PCT", value: details.Niveau_pct },
                      { label: "Mathématiques", value: details.Niveau_mathematique },
                      { label: "Histoire-Géo", value: details.Niveau_histegeo },
                      { label: "Allemand", value: details.Niveau_allemand },
                      { label: "Espagnol", value: details.Niveau_espagnol },
                    ].map((field, idx) => (
                      <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                        <span style={{ fontSize: "14px", fontWeight: 500 }}>{field.label}</span>
                        <span style={{
                          display: "inline-block",
                          minWidth: "48px",
                          padding: "7px 0",
                          borderRadius: "18px",
                          textAlign: "center",
                          fontWeight: "bold",
                          color: "#fff",
                          background:
                            field.value >= 15 ? "#27ae60" :
                            field.value >= 10 ? "#f1c40f" :
                            field.value !== undefined && field.value !== null ? "#e74c3c" : "#bdc3c7",
                          fontSize: "15px",
                        }}>
                          {field.value !== undefined && field.value !== null && field.value !== "" ? field.value : "-"}
                        </span>
                      </div>
                    ))}
                    {/* Observation générale après les notes */}
                    <div style={{
                      background: '#004aad',
                      color: "#fff",
                      borderRadius: "8px",
                      padding: "12px 18px",
                      fontWeight: "bold",
                      fontSize: "15px",
                      textAlign: "center",
                      marginTop: "18px"
                    }}>
                      {observation}
                      {moyenne !== null && (
                        <span style={{ marginLeft: "12px", fontWeight: "normal", fontSize: "13px" }}>
                          (Moyenne : {moyenne.toFixed(2)})
                        </span>
                      )}
                    </div>
                  </div>
                );
              })()}
              <button onClick={() => setShowParcours(false)} type="button" style={closeButtonStyle}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal du menu Profil psychologique */}
      {showProfilpsycho && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h2 style={{ color: "#004aad", marginBottom: "20px", fontSize: "14px" }}>Profil psychologique</h2>
            <div style={{ width: '100%', maxWidth: 600 }}>
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "22px",
                alignItems: "center",
                marginBottom: "18px"
              }}>
                {/* Carte Parent/Tuteur */}
                <div style={{
                  background: "#f8f8f8",
                  borderRadius: "12px",
                  padding: "18px 24px",
                  minWidth: "180px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}>
                  <span style={{ fontSize: "16px", fontWeight: 600, color: "#004aad", marginBottom: "8px" }}>
                    <span role="img" aria-label="parent">👨‍👩‍👧‍👦</span> Parent/Tuteur
                  </span>
                  <span style={{ fontSize: "15px", color: "#222" }}>{details.Parent_tuteur || "-"}</span>
                </div>
                {/* Carte Matières préférées */}
                <div style={{
                  background: "#eaf6ff",
                  borderRadius: "12px",
                  padding: "18px 24px",
                  minWidth: "180px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}>
                  <span style={{ fontSize: "16px", fontWeight: 600, color: "#004aad", marginBottom: "8px" }}>
                    <span role="img" aria-label="livre">📚</span> Matières préférées
                  </span>
                  <span style={{ fontSize: "15px", color: "#222" }}>{details.Matieres_preferes || "-"}</span>
                </div>
                {/* Carte Centre d'intérêts */}
                <div style={{
                  background: "#fff7e6",
                  borderRadius: "12px",
                  padding: "18px 24px",
                  minWidth: "180px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}>
                  <span style={{ fontSize: "16px", fontWeight: 600, color: "#004aad", marginBottom: "8px" }}>
                    <span role="img" aria-label="étoile">⭐</span> Centres d'intérêt
                  </span>
                  <span style={{ fontSize: "15px", color: "#222" }}>{details.Centre_interet || "-"}</span>
                </div>
              </div>
              <button onClick={() => setShowProfilpsycho(false)} type="button" style={closeButtonStyle}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const buttonStyle = {
  background: "#004aad",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px",
  cursor: "pointer",
  width: "150px",
  textAlign: "center",
  fontSize: "14px",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle = {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "450px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    maxHeight: "85vh", // Limite la hauteur à 85% de la fenêtre
    overflowY: "auto", // Active le scroll vertical
    scrollbarWidth: "none", // Cache la scrollbar (Firefox)
    msOverflowStyle: "none", // Cache la scrollbar (Edge)
  };

const closeButtonStyle = {
  marginTop: "15px",
  background: "red",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "5px",
  cursor: "pointer",
  width: "100%",
  fontSize: "12px",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
};

export default DetailsEleve;
