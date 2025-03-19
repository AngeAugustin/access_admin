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
      fetch(`https://access-backend-a961a1f4abb2.herokuapp.com/api/get_enfant/${NPI_enfant}`)
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
        <h2 style={{ margin: 0, fontSize: 18 }}>Détails de l'élève</h2>
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
            <p><strong>Parent : </strong> {details.Parent_tuteur}</p>
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
            <form style={{ width: '100%', maxWidth: 400 }}>
              {[
                { label: "Moyenne en Français", value: details.Niveau_francais },
                { label: "Moyenne en Anglais", value: details.Niveau_anglais },
                { label: "Moyenne en Philosophie", value: details.Niveau_philosophie },
                { label: "Moyenne en SVT", value: details.Niveau_svt },
                { label: "Moyenne en PCT", value: details.Niveau_pct },
                { label: "Moyenne en Mathématiques", value: details.Niveau_mathematique },
                { label: "Moyenne en Histoire et Géographie", value: details.Niveau_histegeo },
                { label: "Moyenne en Allemand", value: details.Niveau_allemand },
                { label: "Moyenne en Espagnol", value: details.Niveau_espagnol },
                { label: "Classe précédemment fréquentée", value: details.Classe_precedente },
                { label: "École précédemment fréquentée", value: details.Ecole_precedente },
              ].map((field, index) => (
                <div key={index} style={{ width: "100%", marginBottom: "10px" }}>
                  <label style={labelStyle}>{field.label} :</label>
                  <input
                    type="text"
                    value={field.value}
                    readOnly
                    style={inputStyle}
                  />
                </div>
              ))}
              <button onClick={() => setShowParcours(false)} type="button" style={closeButtonStyle}>
                Fermer
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal du menu Profil psychologique */}
      {showProfilpsycho && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h2 style={{ color: "#004aad", marginBottom: "20px", fontSize: "14px" }}>Profil psychologique</h2>
            <form style={{ width: '100%', maxWidth: 400 }}>
              {[
                { label: "Parent ou Tuteur", value: details.Parent_tuteur },
                { label: "Matières préférées", value: details.Matieres_preferes },
                { label: "Centre d'intérêts", value: details.Centre_interet },
              ].map((field, index) => (
                <div key={index} style={{ width: "100%", marginBottom: "10px" }}>
                  <label style={labelStyle}>{field.label} :</label>
                  <input
                    type="text"
                    value={field.value}
                    readOnly
                    style={inputStyle}
                  />
                </div>
              ))}
              <button onClick={() => setShowProfilpsycho(false)} type="button" style={closeButtonStyle}>
                Fermer
              </button>
            </form>
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

const labelStyle = {
  display: "block",
  textAlign: "left",
  marginBottom: "5px",
  fontSize: "12px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ddd",
  backgroundColor: "white",
  textAlign: "left",
  fontSize: "12px",
};

const closeButtonStyle = {
  marginTop: "15px",
  background: "red",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "5px",
  cursor: "pointer",
  width: "105%",
  fontSize: "12px",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
};

export default DetailsEleve;
