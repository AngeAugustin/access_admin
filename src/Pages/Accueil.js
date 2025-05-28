import React from "react";
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
        <FiArrowUpRight style={{ cursor: "pointer", color: "#FFA500", fontSize: 20 }} />
      </Link>
    </div>
  </div>
);

const Accueil = () => {
  const stats = [
    { title: "Éducateurs", value: 89, Icon: FiUsers, link: "/educateurs" },
    { title: "Élèves", value: 201, Icon: FiBook, link: "/eleves" },
    { title: "Parents", value: 129, Icon: FiUser, link: "/parents" },
    { title: "Notifications", value: 6, Icon: FiBell, link: "/notifications" },
    { title: "Nouveaux profils", value: 3, Icon: FiUserPlus, link: "/nouveaux-profils" },
    { title: "Paiements en attente", value: 28, Icon: FiClock, link: "/paiements-" },
    { title: "Paiements effectués", value: 305, Icon: FiCheckCircle, link: "/paiements" },
    { title: "Réclamations", value: 12, Icon: FiAlertCircle, link: "/reclamations" },
  ];

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
          width:"100%",
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
