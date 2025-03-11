import React from "react";

const DetailsEducateur = () => {
  return (
    <div style={{ padding: "20px" }}>
      {/* Header section */}
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ margin: 0, fontSize: 18 }}>Détails de l'éducateur</h2>
      </div>

      <div style={{ height: "5px" }}></div>

      {/* Line separator with lighter color and thinner width */}
      <div style={{ borderBottom: "1px solid #ddd", marginBottom: "20px" }}></div>

      {/* Parent image and info in a centered flex row */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "80px", // Added space between the image and the info
        }}
      >
        {/* Parent image */}
        <img
          src="https://i.postimg.cc/3NBFwXJw/cv-Ifzc-NECNm3i-VG6-On-Ly9-T.png"
          alt="Franck DOSSOU"
          style={{ width: 120, height: 120, borderRadius: "10%" }}
        />
        
        {/* Parent info */}
        <div>
          <p><strong>NPI : </strong> 7654379056</p>
          <p><strong>État Civil : </strong> DOSSOU Franck</p>
          <p><strong>Email : </strong> franckdossou@gmail.com</p>
          <p><strong>Adresse : </strong> Abomey Calavi</p>
          
          
        </div>
      </div>

      {/* Conteneur blanc large */}
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
            justifyContent: "space-evenly", // This will evenly space the two columns
            gap: "70px",
          }}
        >
          {/* Parcours */}
          <div>
            <h3 style={{ color: "#004aad", fontSize: "16px" }}>Parcours</h3>
            <p><strong>Matière : </strong> Mathématiques </p>
            <p><strong>Expérience : </strong> 12 années </p>
            <p><strong>Parcours : </strong> Ste Bakhita - CEG 1 Abomey Calavi - CPEG L'entente </p>
          </div>

          {/* Elèves et Mode Accompagnateur */}
          <div>

            <h3 style={{ color: "#004aad", fontSize: "16px" }}>Elèves actuels & Durée du tutorat</h3>
            <ul>
              <li>DOSSOU Emma - 6ème - 2 mois</li>
              <li>DOSSOU Bashorun - 1ère - 3 mois</li>
              <li>BADA Claire - 2nde - 2 mois </li>
            </ul> 

            <h3 style={{ color: "#004aad" }}>Mode Accompagnateur & Durée du tutorat </h3>
            <ul>
              <li>Maison FAYOMI André - 7 mois</li>
            </ul>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsEducateur;
