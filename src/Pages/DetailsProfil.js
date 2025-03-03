import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faDownload } from "@fortawesome/free-solid-svg-icons";

const ProfileCard = () => {
  const [documentContent, setDocumentContent] = useState("Aucun document");

  // Fonction pour afficher le document dans la carte vide
  const handleViewDocument = (doc) => {
    setDocumentContent(`Contenu du document ${doc}`);
  };

  // Fonction pour télécharger le document
  const handleDownload = (doc) => {
    const element = document.createElement("a");
    const file = new Blob([`Contenu du document ${doc}`], { type: "application/pdf" });
    element.href = URL.createObjectURL(file);
    element.download = `${doc}.pdf`;
    document.body.appendChild(element); // Nécessaire pour le déclenchement du téléchargement
    element.click();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Section Profil */}
        <div style={styles.profileSection}>
          <img
            src="https://i.postimg.cc/3NBFwXJw/cv-Ifzc-NECNm3i-VG6-On-Ly9-T.png"
            alt="Profile"
            style={styles.profileImage}
          />
          <div style={styles.profileInfo}>
            <p><strong>NPI : </strong> 5476543790</p>
            <p><strong>Etat Civil : </strong> DOSSOU Franck</p>
            <p><strong>Email : </strong> franckdossou@gmail.com</p>
            <p><strong>Adresse : </strong> Abomey Calavi</p>
            <p><strong>Téléphone : </strong> 0154035660</p>
            <p><strong>Situation matrimoniale : </strong> Célibataire</p>
          </div>
        </div>

        {/* Section Documents */}
        <div style={styles.documentSection}>
          {["Carte d’Identité ou CIP", "Casier Judiciaire", "Garant 1 - IBODOUN Blaise", "Garant 2 - KOUYAMI Sénan"].map((doc, index) => (
            <div key={index} style={styles.document}>
              <p><strong>{doc}</strong></p>
              <div>
                <FontAwesomeIcon
                  icon={faFilePdf}
                  style={styles.icon}
                  onClick={() => handleViewDocument(doc)}
                />
                <FontAwesomeIcon
                  icon={faDownload}
                  style={styles.icon}
                  onClick={() => handleDownload(doc)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Boutons */}
        <div style={styles.buttonGroup}>
          <button style={styles.rejectButton}>Rejeter le profil</button>
          <button style={styles.acceptButton}>Valider le profil</button>
        </div>
      </div>

      {/* Deuxième carte qui est vide */}
      <div style={styles.emptyCard}>
        <p>{documentContent}</p>
      </div>
    </div>
  );
};

// Définition du style CSS directement dans l'objet styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
    width: "100%",
  },
  card: {
    background: "",
    padding: "15px",
    borderRadius: "8px",
    width: "650px",
    marginRight: "15px",
    display: "flex",
    flexDirection: "column",
    height: "80vh",
  },
  profileSection: {
    display: "flex",
    alignItems: "center",
    background: "white",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    padding: "10px",
    borderRadius: "8px",
  },
  profileImage: {
    width: "150px",
    height: "150px",
    borderRadius: "8px",
    objectFit: "cover",
    marginRight: "30px",
    padding: "30px"
  },
  profileInfo: {
    marginLeft: "20px",
    fontSize: "14px"
  },
  documentSection: {
    marginTop: "15px",
    background: "white",
    padding: "12px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
  },
  document: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
    height: "6vh",
    fontSize: "14px",
  },
  icon: {
    fontSize: "20px",
    color: "orange",
    marginLeft: "10px",
    cursor: "pointer",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  },
  rejectButton: {
    background: "red",
    color: "white",
    border: "none",
    padding: "10px",
    width: "48%",
    borderRadius: "5px",
    cursor: "pointer",
  },
  acceptButton: {
    background: "green",
    color: "white",
    border: "none",
    padding: "10px",
    width: "48%",
    borderRadius: "5px",
    cursor: "pointer",
  },
  emptyCard: {
    background: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    flexGrow: 1,
    height: "75vh",
    padding: "20px",
    overflowY: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default ProfileCard;
