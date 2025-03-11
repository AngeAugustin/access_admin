import React from "react";

const Seances = () => {
 

  return (
    <div style={{ padding: "20px" }}>
      {/* Header section */}
      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: 0, fontSize: 16 }}>Séances</h2>
        <p style={{ color: "#555", margin: 0, paddingTop: 8, fontSize: 14  }}>Gérer les seances</p>
      </div>

      <div style={{ height: "5px" }}></div>

      {/* Line separator with lighter color and thinner width */}
      <div style={{ borderBottom: "1px solid #ddd", marginBottom: "20px" }}></div> {/* Légère et moins large */}

      <div style={{ height: "10px" }}></div>
      
    </div>
  );
};

export default Seances;
