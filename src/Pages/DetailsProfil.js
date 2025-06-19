import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faDownload } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";

const ProfileCard = () => {
  const [documentContent, setDocumentContent] = useState("Aucun document");
  const location = useLocation();
  const navigate = useNavigate(); 
  const searchParams = new URLSearchParams(location.search);
  const NPI = searchParams.get("NPI");
  const [showValidationMenu, setShowValidationMenu] = useState(false);
  const [etoiles, setEtoiles] = useState("");
  const [niveau, setNiveau] = useState("");

  const [educateur, setEducateur] = useState(null);

  const handleValidateProfile = () => {
    setShowValidationMenu(true);
  };
  
  const handleSubmitValidation = () => {
    if (NPI) {
      fetch(`https://mediumvioletred-mole-607585.hostingersite.com/public/api/valider/${NPI}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ etoiles, niveau }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message || "Erreur lors de la validation du profil.");
          navigate("/profil");
        })
        .catch((err) => console.log("Erreur lors de la validation du profil :", err));
    }
  };
  

  useEffect(() => {
    if (NPI) {
      fetch(`https://mediumvioletred-mole-607585.hostingersite.com/public/api/get_profil_details/${NPI}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            console.log(data.message);
          } else {
            setEducateur(data);
          }
        })
        .catch((err) => console.log("Erreur lors du chargement des détails :", err));
    }
  }, [NPI]);

  const handleViewDocument = (doc) => {
    setDocumentContent(<img src={`data:image/png;base64,${doc}`} alt="Document" style={{width: "100%", height: "100%", objectFit: "contain"}} />);
  };

  const handleDownload = (doc, filename) => {
    const element = document.createElement("a");
    element.href = `data:image/png;base64,${doc}`;
    element.download = `${filename}.png`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };


  const handleRejectProfile = () => {
    if (NPI) {
      fetch(`https://mediumvioletred-mole-607585.hostingersite.com/public/api/rejeter/${NPI}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message || "Erreur lors du rejet du profil.");
          navigate("/profil");
        })
        .catch((err) => console.log("Erreur lors du rejet du profil :", err));
    }
  };

  if (!educateur) {
    return <div style={{ padding: "20px", color: "red" }}>Chargement des détails de l'éducateur : {NPI}</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.profileSection}>
          <img src={`data:image/png;base64,${educateur.Photo_educateur}`} alt={educateur.Name} style={styles.profileImage} />
          <div style={styles.profileInfo}>
            <p><strong>NPI : </strong>{educateur.NPI}</p>
            <p><strong>Etat Civil : </strong>{educateur.Name} {educateur.Firstname}</p>
            <p><strong>Email : </strong>{educateur.Email}</p>
            <p><strong>Adresse : </strong>{educateur.Adresse}</p>
            <p><strong>Téléphone : </strong>{educateur.Telephone}</p>
            <p><strong>Situation matrimoniale : </strong>{educateur.Situation_matrimoniale}</p>
            <p><strong>Garant 1 :</strong> {educateur.Garant_1 || "Non renseigné"}</p>
            <p><strong>Garant 2 :</strong> {educateur.Garant_2 || "Non renseigné"}</p>
          </div>
        </div>

        <div style={styles.documentSection}>
          {[{ name: "Carte d’Identité", key: "Carte_identite" }, { name: "Casier Judiciaire", key: "Casier_judiciaire" }, 
            { name: "Dernier diplôme académique", key: "Diplome_academique" },
            { name: "Dernier diplôme professionnel", key: "Diplome_professionnel" }
          ].map((doc, index) => (
            <div key={index} style={styles.document}>
              <p><strong>{doc.name}</strong></p>
              <div>
                <FontAwesomeIcon icon={faFilePdf} style={styles.icon} onClick={() => handleViewDocument(educateur[doc.key])} />
                <FontAwesomeIcon icon={faDownload} style={styles.icon} onClick={() => handleDownload(educateur[doc.key], doc.name)} />
              </div>
            </div>
          ))}
        </div>

        {educateur.Statut_profil !== "Vérifié" && (
          <div style={styles.buttonGroup}>
            <button style={styles.rejectButton} onClick={handleRejectProfile}>Rejeter le profil</button>
            <button style={styles.acceptButton} onClick={handleValidateProfile}>Valider le profil</button>
          </div>
        )}

        {showValidationMenu && (
          <div style={styles.fullscreenOverlay}>
            <div style={styles.validationModal}>
              <h2>Validation du profil</h2>
              <div style={{ marginBottom: "10px" }}>
                <label>Étoiles : </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={etoiles}
                  onChange={(e) => setEtoiles(e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label>Niveau : </label>
                <select
                  value={niveau}
                  onChange={(e) => setNiveau(e.target.value)}
                  style={styles.input}
                >
                  <option value="">-- Sélectionnez un niveau --</option>
                  <option value="Cycle I">Cycle I</option>
                  <option value="Cycle II">Cycle II</option>
                  <option value="Cycle III">Cycle III</option>
                </select>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "20px" }}>
                <button style={styles.cancelButton} onClick={() => setShowValidationMenu(false)}>Annuler</button>
                <button style={styles.submitButton} onClick={handleSubmitValidation}>Soumettre</button>
              </div>
            </div>
          </div>
        )}
        </div>
                <div style={styles.emptyCard}>{documentContent}</div>
              </div>
            );
          };
           

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "80vh", width: "100%" },
  card: { background: "", padding: "15px", borderRadius: "8px", width: "650px", marginRight: "15px", display: "flex", flexDirection: "column", height: "80vh" },
  profileSection: { display: "flex", alignItems: "center", background: "white", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)", padding: "10px", borderRadius: "8px", marginTop: "10px" },
  profileImage: { width: "200px", height: "200px", borderRadius: "8px", objectFit: "cover", marginRight: "30px", padding: "30px" },
  profileInfo: { marginLeft: "5px", fontSize: "13px" },
  documentSection: { marginTop: "20px", background: "white", padding: "12px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)" },
  document: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", height: "6vh", fontSize: "13px" },
  icon: { fontSize: "20px", color: "orange", marginLeft: "10px", cursor: "pointer" },
  buttonGroup: { display: "flex", justifyContent: "space-between", marginTop: "15px" },
  rejectButton: { background: "red", color: "white", border: "none", padding: "10px", width: "48%", borderRadius: "5px", cursor: "pointer" },
  acceptButton: { background: "green", color: "white", border: "none", padding: "10px", width: "48%", borderRadius: "5px", cursor: "pointer" },
  emptyCard: {background: "white", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)", width: "600px", height: "500px", padding: "20px", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center"},
  fullscreenOverlay: {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000
},
validationModal: {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  minWidth: "300px",
  maxWidth: "500px",
  width: "80%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
},
input: {
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  marginLeft: "10px",
  width: "220px"
},
cancelButton: {
  background: "gray",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
},
submitButton: {
  background: "blue",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
}

};

export default ProfileCard;
