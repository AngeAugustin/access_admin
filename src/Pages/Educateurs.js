import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Educateurs = () => {
  const [educateurs, setEducateurs] = useState([]);

  useEffect(() => {
      fetch(`https://mediumvioletred-mole-607585.hostingersite.com/public/api/get_educ_backend`)
        .then((res) => res.json())
        .then((data) => {
          setEducateurs(data);
        })
        .catch((err) => console.log(err));
    }, []);

  return (
    <div style={{ padding: "20px" }}>
      {/* Header section */}
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ margin: 0, fontSize: 16 }}>Educateurs</h2>
        <p style={{ color: "#555", margin: 0, paddingTop: 8, fontSize: 14 }}>
          Gérer les éducateurs
        </p>
      </div>

      <div style={{ height: "5px" }}></div>

      {/* Line separator with lighter color and thinner width */}
      <div style={{ borderBottom: "1px solid #ddd", marginBottom: "20px" }}></div>

      <div style={{ height: "10px" }}></div>

      {/* List of educators */}
      {educateurs.map((educateur, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#fff",
            fontSize: "14px",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "10px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={`data:image/jpeg;base64,${educateur.Photo_educateur}`}
              alt="avatar"
              style={{ width: 50, height: 50, borderRadius: "50%", marginRight: "10px" }}
            />
            <div>
              <p style={{ margin: 0, fontWeight: "bold" }}>{educateur.Name} {educateur.Firstname}</p>
              <p style={{ margin: 0, color: "#666", fontSize: "14px" }}> Enseignant en {educateur.Matiere}</p>
            </div>
          </div>
          <Link to={`/DetailsEducateur?NPI=${educateur.NPI}`}>
          <button
            style={{
              background: "#004aad",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Voir les détails
          </button>
          </Link>
          
        </div>
      ))}
    </div>
  );
};

export default Educateurs;
