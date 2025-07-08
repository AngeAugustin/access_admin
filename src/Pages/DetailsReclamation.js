import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa"; 
import { Link } from "react-router-dom";

const DetailsReclamation = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const ID = searchParams.get("ID");

  const [reclamation, setReclamation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReclamationDetails = async () => {
      try {
        const response = await fetch(
          `https://mediumvioletred-mole-607585.hostingersite.com/public/api/reclamation_details/${ID}`
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setReclamation(data[0]);
        } else {
          setReclamation(null);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (ID) {
      fetchReclamationDetails();
    }
  }, [ID]);

  const getStatutImage = (statut) => {
    if (statut === "Nouveau") {
      return "https://i.postimg.cc/qvZjD03p/G.png";
    }
    if (statut === "Traité") {
      return "https://i.postimg.cc/zDpzPfzq/converted-1.jpg";
    }
    return "https://cdn-icons-png.flaticon.com/512/595/595067.png"; // fallback
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (!reclamation) return <div>Aucune réclamation trouvée.</div>;

  return (
    <div style={{ padding: "20px" }}>
      {/* En-tête */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 16 }}>Détails de la réclamation</h2>
          <p style={{ color: "#555", margin: 0, paddingTop: 8, fontSize: 14 }}>
            Informations sur la réclamation
          </p>
        </div>
          <Link to="/reclamations">
            <button
              style={{
                backgroundColor: "#004aad",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                display: "flex", 
                alignItems: "center", 
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <FaExclamationTriangle style={{ marginRight: "10px" }} /> 
              Traiter la réclamation
            </button>
          </Link>
      </div>

      <div style={{ borderBottom: "1px solid #ddd", marginBottom: "20px" }}></div>

      {/* Image et infos principales */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "80px",
          marginBottom: "30px",
        }}
      >
        {/* Image statique */}
        <img
          src="https://i.postimg.cc/j5dJNBpz/10002106.png"
          alt="Réclamation"
          style={{ width: 120, height: 120 }}
        />

        {/* Infos principales avec icône de statut */}
        <div>
          <p>
            <strong>ID de Réclamation :</strong> {reclamation.Id_reclamation}
            <img
              src={getStatutImage(reclamation.Statut)}
              alt={reclamation.Statut}
              style={{
                width: 20,
                height: 20,
                marginRight: 10,
                verticalAlign: "middle",
              }}
            />
          </p>
          <p><strong>NPI du demandant :</strong> {reclamation.NPI_demandant}</p>
          <p><strong>Nom du demandant :</strong> {reclamation.Nom_demandant}</p>
          <p><strong>Prénom du demandant :</strong> {reclamation.Prenom_demandant}</p>
        </div>
      </div>

      {/* Bloc principal */}
      <div
        style={{
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
          {/* Détails à gauche */}
          <div style={{ flex: 1 }}>
            <h3 style={{ color: "#004aad", fontSize: "16px" }}>Détails</h3>
            <p>{reclamation.Details}</p>
          </div>

          {/* Infos complémentaires à droite */}
          <div style={{ flex: 1 }}>
            <h3 style={{ color: "#004aad", fontSize: "16px" }}>Informations complémentaires</h3>
            <p><strong>Email :</strong> {reclamation.Mail_demandant}</p>
            <p><strong>Date de demande :</strong> {reclamation.Date_demande}</p>
            <p><strong>Motif :</strong> {reclamation.Motif}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsReclamation;
