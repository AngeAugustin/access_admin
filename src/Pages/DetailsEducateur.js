import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const DetailsEducateur = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const NPI = searchParams.get("NPI");

  const [educateur, setEducateur] = useState(null);
  const [loading, setLoading] = useState(true); // Ajout de l'état de chargement

  useEffect(() => {
    if (NPI) {
      setLoading(true); // Démarre le chargement
      fetch(`https://mediumvioletred-mole-607585.hostingersite.com/public/api/get_educateur/${NPI}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            // Si l'éducateur n'est pas trouvé, afficher une erreur
            console.log(data.message);
          } else {
            // Si les données sont présentes, les stocker dans l'état
            setEducateur(data.data);
          }
        })
        .catch((err) => {
          console.log("Erreur lors du chargement des détails :", err);
        })
        .finally(() => {
          setLoading(false); // Fin du chargement
        });
    }
  }, [NPI]);

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <p>Chargement des détails...</p>
      </div>
    );
  }

  if (!educateur || !educateur.educateur || educateur.educateur.length === 0) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        <p>Aucun éducateur trouvé pour le NPI : {NPI}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ margin: 0, fontSize: 18 }}>Détails de l'éducateur</h2>
      </div>

      <div style={{ height: "5px" }}></div>
      <div style={{ borderBottom: "1px solid #ddd", marginBottom: "20px" }}></div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "80px",
        }}
      >
        <img
          src={educateur.educateur[0]?.Photo_educateur ? `data:image/png;base64,${educateur.educateur[0].Photo_educateur}` : "https://i.postimg.cc/3RBB0hNc/A.jpg"}
          alt={educateur.educateur[0]?.Name}
          style={{ width: 120, height: 120, borderRadius: "10%" }}
        />

        <div>
          <p><strong>NPI : </strong> {educateur.educateur[0]?.NPI}</p>
          <p><strong>État Civil : </strong> {educateur.educateur[0]?.Name} {educateur.educateur[0]?.Firstname}</p>
          <p><strong>Email : </strong> {educateur.educateur[0]?.Email}</p>
          <p><strong>Adresse : </strong> {educateur.educateur[0]?.Adresse}</p>
        </div>
      </div>

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
          <div>
            <h3 style={{ color: "#004aad", fontSize: "16px" }}>Parcours</h3>
            <p><strong>Matière : </strong> {educateur.educateur[0]?.Matiere}</p>
            <p>
              <strong>Niveau : </strong>
              {educateur.educateur[0]?.Niveau === "Cycle I"
                ? "Professeur(e) Adjoint(e)"
                : educateur.educateur[0]?.Niveau === "Cycle II"
                ? "Professeur(e) Certifié(e)"
                : educateur.educateur[0]?.Niveau}
            </p>
            <p><strong>Expérience : </strong> {educateur.educateur[0]?.Experience} ans</p>
            <p><strong>Parcours : </strong> {educateur.educateur[0]?.Parcours}</p>
          </div>

          <div>
            <h3 style={{ color: "#004aad", fontSize: "16px" }}>
              Elèves actuels & Durée du tutorat
            </h3>
            <ul>
              {educateur.tutorat && educateur.tutorat.length > 0 ? (
                educateur.tutorat.map((tutorat, index) => (
                  <li key={index}>
                    {tutorat.Nom_enfant} {tutorat.Prenom_enfant} - {tutorat.Classe_actuelle} - {tutorat.Duree_tutorat}
                  </li>
                ))
              ) : (
                <li>Aucun élève actuel.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsEducateur;
