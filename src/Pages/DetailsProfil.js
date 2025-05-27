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
    setDocumentContent(<img src={`data:image/png;base64,${doc}`} alt="Document" style={{ maxWidth: "100%" }} />);
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
            <div style={{ marginTop: "15px", background: "#f9f9f9", padding: "15px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
              <div style={{ marginBottom: "10px" }}>
                <label>Étoiles : </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={etoiles}
                  onChange={(e) => setEtoiles(e.target.value)}
                  style={{ marginLeft: "10px", padding: "5px", borderRadius: "4px" }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label>Niveau : </label>
                <input
                  type="text"
                  value={niveau}
                  onChange={(e) => setNiveau(e.target.value)}
                  style={{ marginLeft: "10px", padding: "5px", borderRadius: "4px" }}
                />
              </div>
              <button
                onClick={handleSubmitValidation}
                style={{ background: "blue", color: "white", padding: "8px 12px", border: "none", borderRadius: "5px", cursor: "pointer" }}
              >
                Soumettre
              </button>
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
  profileSection: { display: "flex", alignItems: "center", background: "white", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)", padding: "10px", borderRadius: "8px" },
  profileImage: { width: "200px", height: "200px", borderRadius: "8px", objectFit: "cover", marginRight: "30px", padding: "30px" },
  profileInfo: { marginLeft: "5px", fontSize: "13px" },
  documentSection: { marginTop: "15px", background: "white", padding: "12px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)" },
  document: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", height: "6vh", fontSize: "13px" },
  icon: { fontSize: "20px", color: "orange", marginLeft: "10px", cursor: "pointer" },
  buttonGroup: { display: "flex", justifyContent: "space-between", marginTop: "15px" },
  rejectButton: { background: "red", color: "white", border: "none", padding: "10px", width: "48%", borderRadius: "5px", cursor: "pointer" },
  acceptButton: { background: "green", color: "white", border: "none", padding: "10px", width: "48%", borderRadius: "5px", cursor: "pointer" },
  emptyCard: { background: "white", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)", flexGrow: 1, height: "75vh", padding: "20px", overflowY: "auto", display: "flex", justifyContent: "center", alignItems: "center" }
};

export default ProfileCard;
