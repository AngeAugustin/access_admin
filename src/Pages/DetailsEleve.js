import React, { useState } from "react";

const DetailsEducateur = () => {
  const [showParcours, setShowParcours] = useState(false);
  const [showProfilpsycho, setShowProfilpsycho] = useState(false);

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
          src="https://i.postimg.cc/3NBFwXJw/cv-Ifzc-NECNm3i-VG6-On-Ly9-T.png"
          alt="Franck DOSSOU"
          style={{ width: 120, height: 120, borderRadius: "10%" }}
        />
        <div>
          <p><strong>NPI : </strong> 7654379056</p>
          <p><strong>État Civil : </strong> DOSSOU Franck</p>
          <p><strong>Age : </strong> 14 ans</p>
          <p><strong>Sexe : </strong> Masculin </p>
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
            <p><strong>Parent : </strong> FASSINOU Georges </p>
            <p><strong>Adresse : </strong> Québec, Canada </p>
            <p><strong>Classe Actuelle : </strong> 4ème </p>
            <p><strong>Etablissement Actuel : </strong> CPEG Brice Sinsin </p>
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

            <h3 style={{ color: "#004aad", fontSize: "16px" }}> Profil psychologique </h3>
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
                { label: "Moyenne en Français", value: 14 },
                { label: "Moyenne en Anglais", value: 17 },
                { label: "Moyenne en Philosophie", value: 14 },
                { label: "Moyenne en SVT", value: 14 },
                { label: "Moyenne en PCT", value: 16 },
                { label: "Moyenne en Mathématiques", value: 15 },
                { label: "Moyenne en Histoire et Géographie", value: 14 },
                { label: "Moyenne en Allemand", value: 14 },
                { label: "Moyenne en Espagnol", value: 14 },
                { label: "Classe précédemment fréquenté", value: "5ème" },
                { label: "Ecole précédemment fréquentée", value: "Jean Piaget 2" },
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
                { label: "Parent ou Tuteur", value: "Père" },
                { label: "Matières préférées", value: "SVT car elle traite de l'anatomie. " },
                { label: "Cntre d'intérêts", value: "Mangas, Sport, Football" },
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

export default DetailsEducateur;
