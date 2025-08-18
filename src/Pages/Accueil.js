import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
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
  const [paiementsData, setPaiementsData] = useState([]);
  const [inscriptionsData, setInscriptionsData] = useState([]);

  useEffect(() => {
    fetch("https://mediumvioletred-mole-607585.hostingersite.com/public/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        // Statistiques principales
        const statsArray = [
          { title: "Éducateurs", value: data.nbEducateurs, Icon: FiUsers, link: "/educateurs" },
          { title: "Élèves", value: data.nbEnfants, Icon: FiBook, link: "/eleves" },
          { title: "Parents", value: data.nbParents, Icon: FiUser, link: "/parents" },
          { title: "Notifications", value: 0, Icon: FiBell, link: "/notifications" },
          { title: "Nouveaux profils", value: data.nbEducateursNouveaux, Icon: FiUserPlus, link: "/profil" },
          { title: "Paiements en attente", value: 0, Icon: FiClock, link: "/paiements-attente" },
          {
            title: "Paiements effectués",
            value: data.nbPaiementsParent + data.nbPaiementsAdmin,
            Icon: FiCheckCircle,
            link: "/paiements",
          },
          { title: "Réclamations", value: data.nbReclamations, Icon: FiAlertCircle, link: "/reclamations" },
        ];
        setStats(statsArray);

        // Traitement des paiements par mois
        function countByMonth(dates) {
          const counts = {};
          dates.forEach((d) => {
            if (!d) return;
            const date = new Date(d);
            if (isNaN(date)) return;
            const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
            counts[key] = (counts[key] || 0) + 1;
          });
          return counts;
        }

        // Paiements
        const parentCounts = countByMonth(data.datesPaiementsParent || []);
        const adminCounts = countByMonth(data.datesPaiementsAdmin || []);
        const allMonthsPaiements = Array.from(new Set([...Object.keys(parentCounts), ...Object.keys(adminCounts)])).sort();
        const chartPaiements = allMonthsPaiements.map((month) => ({
          month,
          Parents: parentCounts[month] || 0,
          Admins: adminCounts[month] || 0,
        }));
        setPaiementsData(chartPaiements);

        // Inscriptions
        const educCounts = countByMonth(data.datesInscriptionEducateurs || []);
        const parentInscrCounts = countByMonth(data.datesInscriptionParents || []);
        const enfantCounts = countByMonth(data.datesInscriptionEnfants || []);
        const allMonthsInscriptions = Array.from(new Set([
          ...Object.keys(educCounts),
          ...Object.keys(parentInscrCounts),
          ...Object.keys(enfantCounts),
        ])).sort();
        const chartInscriptions = allMonthsInscriptions.map((month) => ({
          month,
          Educateurs: educCounts[month] || 0,
          Parents: parentInscrCounts[month] || 0,
          Enfants: enfantCounts[month] || 0,
        }));
        setInscriptionsData(chartInscriptions);
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

      {/* Diagramme d'évolution des paiements par mois */}
      <div style={{ marginTop: 40, background: "#fff", borderRadius: 10, boxShadow: "0 2px 5px rgba(0,0,0,0.07)", padding: 20 }}>
        <h3 style={{ fontSize: 15, marginBottom: 10 }}>Évolution des paiements effectués par mois</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={paiementsData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Parents" fill="#004aad" name="Parents" />
            <Bar dataKey="Admins" fill="#FFA500" name="Admins" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Diagramme d'évolution des inscriptions par mois */}
      <div style={{ marginTop: 40, background: "#fff", borderRadius: 10, boxShadow: "0 2px 5px rgba(0,0,0,0.07)", padding: 20 }}>
        <h3 style={{ fontSize: 15, marginBottom: 10 }}>Évolution des inscriptions par mois</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={inscriptionsData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Educateurs" fill="#004aad" name="Éducateurs" />
            <Bar dataKey="Parents" fill="#FFA500" name="Parents" />
            <Bar dataKey="Enfants" fill="#00C49F" name="Enfants" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Accueil;
