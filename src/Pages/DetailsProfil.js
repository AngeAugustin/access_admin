import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

const DetailsProfil = () => {
  const [pdfUrl, setPdfUrl] = useState("");

  const handleViewPdf = (pdfPath) => setPdfUrl(pdfPath);

  return (
    <div style={{ textAlign: "center", padding: "2px" }}>
      <h3 style={{ fontSize: "15px" }}>Verification de profil</h3>
      <div
        style={{
          display: "flex",
          gap: "15px", // Ajout d’un espacement entre les champs et le frame
          padding: "10px",
          maxWidth: "1150px",
          margin: "auto",
        }}
      >
        {/* Partie gauche avec les champs */}
        <div
          style={{
            flex: "2 1 66%",
            padding: "6px",
            borderRadius: "8px",
            background: "#f9f9f9",
            boxSizing: "border-box",
            marginRight: "10px", // Espacement supplémentaire pour éloigner du frame
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="Avatar"
              style={{ borderRadius: "50%", width: "65px", height: "65px" }}
            />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: "10px",
              rowGap: "8px",
            }}
          >
            {[
              { title: "NPI", value: "76543790" },
              { title: "État Civil", value: "DOSSOU Franck" },
              { title: "Email", value: "franckdossou@gmail.com" },
              { title: "Statut", value: "Nouveau" },
              { title: "Profession", value: "Enseignant Primaire" },
              { title: "Adresse", value: "Tokan" },
              { title: "Téléphone", value: "2345678" },
              { title: "Statut matrimonial", value: "Célibataire" },
              { title: "Informations du garant 1", value: "KOKOU Landry" },
              { title: "Informations du garant 2", value: "ZALOITR Iramoe" },
            ].map((info, i) => (
              <div key={i} style={{ fontSize: "13px", textAlign: "left" }}>
                <label
                  htmlFor={info.title}
                  style={{
                    display: "block",
                    fontSize: "10px",
                    fontWeight: "bold",
                    marginBottom: "4px",
                    color: "black",
                  }}
                >
                  {info.title}
                </label>
                <input
                  id={info.title}
                  type="text"
                  placeholder={info.title}
                  value={info.value}
                  style={{
                    width: "96%",
                    height: 20,
                    padding: "5px",
                    fontSize: "12px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    backgroundColor: "#f9f9f9",
                  }}
                  readOnly
                />
              </div>
            ))}
          </div>

          {/* Boutons Documents sur une ligne */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "5px",
              marginTop: "5px",
            }}
          >
            {[
              "Garant 1"," Garant 2","Carte d'Identité.pdf", "Casier Judiciaire.pdf",
            ].map((doc, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "#ff9800",
                  padding: "3px",
                  borderRadius: "6px",
                }}
              >
                <span style={{ flex: 1, fontSize: "12px", color: "white" }}>{doc}</span>
                <button
                  onClick={() => handleViewPdf("/path_to.pdf")}
                  style={{
                    background: "transparent",
                    border: "none",
                    height: 15,
                    marginRight: "5px",
                    cursor: "pointer",
                    fontSize: "10px",
                    color: "white",
                    padding: "0px",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FontAwesomeIcon icon={faFilePdf} />
                </button>
                <a href="/path_to.pdf" download style={{ textDecoration: "none" }}>
                  <button
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: "6px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      color: "white",
                    }}
                  >
                    <FontAwesomeIcon icon={faDownload} />
                  </button>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Partie droite avec l'iframe */}
        <div
          style={{
            flex: "1 1 33%",
            border: "1px solid #ddd",
            borderRadius: "8px",
            minHeight: "230px",
            padding: "10px",
            background: "#fff",
            boxSizing: "border-box",
          }}
        >
          {pdfUrl ? (
            <iframe
              src={pdfUrl}
              title="Aperçu PDF"
              width="100%"
              height="100%"
              style={{ border: "none" }}
            ></iframe>
          ) : (
            <p style={{ textAlign: "center", fontSize: "13px", color: "#888" }}>Aucun document</p>
          )}
        </div>
      </div>

      <Link to="/profil">
      <button
        style={{
          background: "#004aad",
          color: "white",
          padding: "9px",
          marginTop: "0px",
          width: "20%",
          border: "none",
          borderRadius: "6px",
          fontSize: "12px",
          marginRight: "30px", // Espacement entre les boutons
        }}
      >
        Valider
      </button>
      </Link>

      <Link to="/profil">
      <button
        style={{
          background: "#d32f2f",
          color: "white",
          padding: "9px",
          marginTop: "2px",
          width: "20%",
          border: "none",
          borderRadius: "6px",
          fontSize: "12px",
        }}
      >
        Rejeter
      </button>
      </Link>

    </div>
  );
};

export default DetailsProfil;
