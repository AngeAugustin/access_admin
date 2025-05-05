import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const DetailsSeance = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const seanceId = searchParams.get("Id_seance"); // ✅ Correction du nom de variable

  const [seanceData, setSeanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupération des données de la séance depuis l'API
  useEffect(() => {
    const fetchSeanceDetails = async () => {
      try {
        const response = await fetch(`https://mediumvioletred-mole-607585.hostingersite.com/AccessBackend/public/api/details_seance_back/${seanceId}`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        const data = await response.json();
        setSeanceData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (seanceId) {
      fetchSeanceDetails();
    }
  }, [seanceId]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  if (!seanceData) {
    return <div>Aucun détail trouvé pour cette séance.</div>;
  }

  // Extraction des données récupérées du backend
  const {
    Id_seance,
    Date_seance,
    NomEnfant,
    PrenomEnfant,
    NomEducateur,
    PrenomEducateur,
    MatiereEducateur,
    Heure_seance,
    Observation,
    Travail_effectue,
  } = seanceData;

  return (
    <div style={{ padding: "20px" }}>
      {/* Header section */}
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ margin: 0, fontSize: 18 }}>Détails de la séance</h2>
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
          gap: "80px",
        }}
      >
        {/* Image */}
        <img
          src="https://i.postimg.cc/nhCP8Xrc/Seance.png"
          alt="Séance"
          style={{ width: 120, height: 120, borderRadius: "10%" }}
        />

        {/* Infos */}
        <div>
          <p><strong>ID de la séance :</strong> {Id_seance}</p>
          <p><strong>Date de la séance :</strong> {Date_seance}</p>
          <p><strong>Heure :</strong> {Heure_seance}</p>
          <p><strong>Observation :</strong> {Observation}</p>
          <p><strong>Travail effectué :</strong> {Travail_effectue}</p>
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
            justifyContent: "space-evenly",
            gap: "70px",
          }}
        >
          {/* Educateur */}
          <div>
            <h3 style={{ color: "#004aad", fontSize: "16px" }}>Éducateur</h3>
            <p><strong></strong> {NomEducateur} {PrenomEducateur}</p>
            <p><strong></strong> Professeur de {MatiereEducateur}</p>
          </div>

          {/* Travail éffectué */}
          <div>
            <h3 style={{ color: "#004aad", fontSize: "16px" }}>Travail effectué</h3>
            <p><strong></strong> {Travail_effectue} </p>
          </div>

          {/* Élève */}
          <div>
            <h3 style={{ color: "#004aad", fontSize: "16px" }}>Élève</h3>
            <p><strong></strong> {NomEnfant} {PrenomEnfant}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DetailsSeance;
