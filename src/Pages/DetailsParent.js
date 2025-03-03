import React from "react";

const DetailsParent = () => {
  return (
    <div style={{ padding: "20px" }}>
      {/* Header section */}
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ margin: 0, fontSize: 18 }}>Détails du parent</h2>
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
          {/* Enfants */}
          <div>
            <h3 style={{ color: "#004aad" }}>Mes enfants</h3>
            <ul>
              <li>DOSSOU Emma - 6ème</li>
              <li>DOSSOU Bashorun - 1ère</li>
              <li>BADA Claire - 2nde</li>
            </ul>
          </div>

          {/* Éducateurs & Accompagnateurs */}
          <div>
            <h3 style={{ color: "#004aad" }}>Mes éducateurs & Accompagnateurs</h3>
            <ul>
              <li>XALOGUN Yves - Mathématiques</li>
              <li>ZINSOU Wenceslas - PCT</li>
              <li>GBEDOU Xavier - SVT</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsParent;
