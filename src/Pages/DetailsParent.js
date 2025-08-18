import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const DetailsParent = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const NPI = searchParams.get("NPI");

  const [parentData, setParentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching parent details from API
  useEffect(() => {
    const fetchParentDetails = async () => {
      try {
        const response = await fetch(`https://mediumvioletred-mole-607585.hostingersite.com/public/api/get_parents_details/${NPI}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        setParentData(data.data); // On assigne les données récupérées
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (NPI) {
      fetchParentDetails();
    }
  }, [NPI]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  if (!parentData) {
    return <div>Aucun détail trouvé pour ce parent.</div>;
  }

  const { parent, enfants, educateurs } = parentData;

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ margin: 0, fontSize: 16 }}>Détails du parent</h2>
        <p style={{ color: "#555", margin: 0, paddingTop: 8, fontSize: 14 }}>
          Gérer les détails du parent
        </p>
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
          src="https://i.postimg.cc/FRDHTppm/1.png"
          alt={parent.Name}
          style={{ width: 120, height: 120, borderRadius: "10%" }}
        />

        {/* Parent info */}
        <div>
          <p><strong>NPI : </strong> {parent.NPI}</p>
          <p><strong>État Civil : </strong> {parent.Name} {parent.Firstname}</p>
          <p><strong>Email : </strong> {parent.Email}</p>
          <p><strong>Adresse : </strong> {parent.Adresse}</p>
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
            <h3 style={{ color: "#004aad", fontSize: "16px" }}>Mes enfants</h3>
            <ul>
              {enfants.map((enfant, index) => (
                <li key={index}>{enfant.Nom_enfant} {enfant.Prenom_enfant} - {enfant.Classe_actuelle}</li>
              ))}
            </ul>
          </div>

          {/* Éducateurs & Accompagnateurs */}
          <div>
            <h3 style={{ color: "#004aad", fontSize: "16px" }}>Mes éducateurs </h3>
            <ul>
              {educateurs.map((educateur, index) => (
                <li key={index}>{educateur.Name} {educateur.Firstname} - {educateur.Matiere} - {educateur.Statut_tutorat}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsParent;
