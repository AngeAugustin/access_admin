import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiUsers,
  FiBook,
  FiUser,
  FiBell,
  FiUserPlus,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowUpRight,
} from "react-icons/fi";

const StatCard = ({ title, value, Icon, link }) => (
  <div
    style={{
      backgroundColor: "#fff",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      borderRadius: 10,
      padding: "20px",
      width: 220,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      gap: "10px",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: 14, color: "#555" }}>{title}</div>
      <Icon style={{ color: "#999", fontSize: 18 }} />
    </div>

    <div style={{ fontWeight: "bold", fontSize: 22, color: "#004aad" }}>
      {value}
    </div>

    <div style={{ alignSelf: "flex-end" }}>
      <Link to={link}>
        <FiArrowUpRight
          style={{ cursor: "pointer", color: "#FFA500", fontSize: 20 }}
        />
      </Link>
    </div>
  </div>
);

const Accueil = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("https://mediumvioletred-mole-607585.hostingersite.com/public/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        // Construire le tableau attendu à partir de la réponse de l'API
        const statsArray = [
          { title: "Éducateurs", value: data.nbEducateurs, Icon: FiUsers, link: "/educateurs" },
          { title: "Élèves", value: data.nbEnfants, Icon: FiBook, link: "/eleves" },
          { title: "Parents", value: data.nbParents, Icon: FiUser, link: "/parents" },
          { title: "Notifications", value: 0, Icon: FiBell, link: "/notifications" }, // Pas dans backend, valeur statique
          { title: "Nouveaux profils", value: data.nbEducateursNouveaux, Icon: FiUserPlus, link: "/profil" },
          { title: "Paiements en attente", value: 0, Icon: FiClock, link: "/paiements-attente" }, // Pas dans backend, valeur statique
          {
            title: "Paiements effectués",
            value: data.nbPaiementsParent + data.nbPaiementsAdmin,
            Icon: FiCheckCircle,
            link: "/paiements",
          },
          { title: "Réclamations", value: data.nbReclamations, Icon: FiAlertCircle, link: "/reclamations" },
        ];
        setStats(statsArray);
      });
  }, []);

  if (!stats) {
    return <div>Chargement...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ margin: 0, fontSize: 16 }}>Tableau de bord</h2>
        <p style={{ color: "#555", margin: 0, paddingTop: 8, fontSize: 14 }}>
          Gérer le tableau de bord
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          width: "100%",
        }}
      >
        {stats.map((item, index) => (
          <StatCard
            key={index}
            title={item.title}
            value={item.value}
            Icon={item.Icon}
            link={item.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Accueil;
