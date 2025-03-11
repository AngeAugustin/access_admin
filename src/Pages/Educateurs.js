import React from "react";
import { Link } from "react-router-dom";

const Educateurs = () => {
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
      {[
        {
          name: "FACHEHOUN Augustin",
          role: "Enseignant de Mathématiques",
          avatar: "https://via.placeholder.com/50",
        },
        {
          name: "FACHEHOUN Augustin",
          role: "Enseignant de Mathématiques",
          avatar: "https://via.placeholder.com/50",
        },
        {
          name: "FACHEHOUN Augustin",
          role: "Enseignant de Mathématiques",
          avatar: "https://via.placeholder.com/50",
        },
      ].map((educator, index) => (
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
              src={educator.avatar}
              alt="avatar"
              style={{ width: 50, height: 50, borderRadius: "50%", marginRight: "10px" }}
            />
            <div>
              <p style={{ margin: 0, fontWeight: "bold" }}>{educator.name}</p>
              <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>{educator.role}</p>
            </div>
          </div>
          <Link to="/DetailsEducateur">
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
