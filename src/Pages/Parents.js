import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const defaultAvatar = "https://i.postimg.cc/mkMpkFPX/converted-1.jpg"

const Parents = () => {
  const [parents, setParents] = useState([]);

  useEffect(() => {
        fetch(`https://mediumvioletred-mole-607585.hostingersite.com/AccessBackend/public/api/get_all_parents`)
          .then((res) => res.json())
          .then((data) => {
            setParents(data);
          })
          .catch((err) => console.log(err));
      }, []);

  return (
    <div style={{ padding: "20px" }}>
      {/* Header section */}
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ margin: 0, fontSize: 16 }}>Parents</h2>
        <p style={{ color: "#555", margin: 0, paddingTop: 8, fontSize: 14 }}>
          Gérer les parents
        </p>
      </div>

      <div style={{ height: "5px" }}></div>

      {/* Line separator with lighter color and thinner width */}
      <div style={{ borderBottom: "1px solid #ddd", marginBottom: "20px" }}></div>

      <div style={{ height: "10px" }}></div>

      {/* List of parents */}
      {parents.map((parent, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#fff",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "10px",
            fontSize: "14px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={parent.avatar || defaultAvatar}
              alt="avatar"
              style={{ width: 50, height: 50, borderRadius: "50%", marginRight: "10px" }}
            />
            <div>
              <p style={{ margin: 0, fontWeight: "bold" }}>{parent.Name} {parent.Firstname}</p>
              <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>{parent.Nombre_enfants} enfants</p>
            </div>
          </div>
          <Link to={`/DetailsParent?NPI=${parent.NPI}`}>
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

export default Parents;
