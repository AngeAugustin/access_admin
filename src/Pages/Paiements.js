import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from './AuthContext';

const defaultAvatar = "https://via.placeholder.com/40";

let profilStore = null; // Variable pour stocker le profil sélectionné
let fedaPayInitialized = false; // Variable pour vérifier si FedaPay est initialisé

const Paiements = () => {
  const [paiements, setPaiements] = useState([]);
  const [statutActif, setStatutActif] = useState("En attente");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { NPI } = useAuth();

  // Fonction à appeler pour initialiser FedaPay sur les boutons .pay-btn
  function initFedaPay(profil) {
    if (!window.FedaPay) {
      alert("Le module FedaPay n'est pas chargé.");
      return;
    }
    if(!fedaPayInitialized) {
      window.FedaPay.init('.pay-btn', {
        public_key: 'pk_sandbox_DhKTKbhyY1s7p7ewvKEZdc1T',
        onComplete: handlePayment
      });
      fedaPayInitialized = true; // Marquer FedaPay comme initialisé
    }
    profilStore = profil; // Stocker le profil sélectionné
  }

  // Fonction de callback pour le paiement
  function handlePayment(response) {
    const reason = response.reason;
    if (reason === "CHECKOUT COMPLETE") {
      const status = response.transaction.status;
      if (status === "approved") {
        const transaction = response.transaction.id;
        const paiement = response.transaction.custom_metadata.paiement;
        handlePayer(profilStore,transaction,paiement); // Appeler la fonction pour payer
      } else {
        console.error("Payment failed: ", response.transaction);
      }
    } else {
      console.error("Payment failed: Widget closed or payment were not completed.");
    }
  }

  useEffect(() => {
    const fetchPaiements = async () => {
      try {
        const response = await fetch(
          "https://mediumvioletred-mole-607585.hostingersite.com/public/api/admin_paiements"
        );
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des paiements");
        }
        const data = await response.json();

        const transform = (items, statut) =>
          items.map((item) => ({
            id: item.Id_paiement,
            nom: `${item.Nom_educateur} ${item.Prenom_educateur}`,
            montant: item.Montant_paiement,
            avatar: defaultAvatar,
            statut: statut,
            date: item.Date_paiement,
            paiement: item.Paiement, 
          }));

        const provisoire = transform(data.provisoire, "En attente");
        const effectues = transform(data.effectues, "Payé");

        setPaiements([...provisoire, ...effectues]);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPaiements();
  }, []);

  const handlePayer = async (profil, transaction, paiement) => {
  console.log("=== Profil sélectionné ===");
  console.log(profil);

  const payload = {
    Id_paiement: profil.id,
    Id_transaction: transaction, 
    Paiement: paiement,
    NPI_agent: NPI,
    Nom_agent: NPI,
    Prenom_agent: NPI,
    Role_agent: 'Admin',
    Montant_paiement: profil.montant,
  };

  console.log("=== Payload envoyé ===");
  console.log(payload);

  // Optionnel : log les clés manquantes si elles sont nulles ou undefined
  Object.entries(payload).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      console.warn(`🚨 Donnée manquante : ${key}`);
    }
  });

  try {
    const response = await fetch(
      "https://mediumvioletred-mole-607585.hostingersite.com/public/api/payer_admin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur lors de l'envoi du paiement");
    }

    alert("Paiement effectué avec succès !");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};


  const paiementsFiltres = paiements.filter(
    (p) => p.statut === statutActif
  );

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ margin: 0, fontSize: 16 }}>Paiements</h2>
        <p style={{ color: "#555", margin: 0, paddingTop: 8, fontSize: 14 }}>
          Gérer les paiements
        </p>
      </div>

      <div style={{ borderBottom: "1px solid #ddd", marginBottom: "20px" }}></div>

      <div
        style={{
          display: "flex",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          padding: "5px",
          marginBottom: "20px",
        }}
      >
        {["Payé", "En attente"].map((statut) => (
          <button
            key={statut}
            onClick={() => setStatutActif(statut)}
            style={{
              flex: 1,
              padding: "10px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              backgroundColor: statutActif === statut ? "#004aad" : "white",
              color: statutActif === statut ? "#fff" : "#000",
              transition: "0.3s",
            }}
          >
            {statut === "En attente" ? "En attente" : "Payés"}
          </button>
        ))}
      </div>

      {loading && <p>Chargement des paiements...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {paiementsFiltres.map((profil) => (
        <div
          key={profil.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#ffffff",
            padding: "15px",
            borderRadius: "8px",
            fontSize: "14px",
            marginBottom: "10px",
            border: "1px solid #fff",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={profil.avatar}
              alt="Avatar"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: "10px",
              }}
            />
            <div>
              <strong style={{ fontSize: 14 }}>{profil.nom}</strong>
              <p style={{ margin: 0, color: "#666", fontSize: 12 }}>
                {profil.montant} FCFA
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <Link to={`/DetailsPaiement?ID=${profil.paiement}`}>
              <button
                style={{
                  backgroundColor:
                    profil.statut === "Payé" ? "orange" : "#004aad",
                  color: "white",
                  border: "none",
                  fontWeight: "bold",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Voir les détails
              </button>
            </Link>
            {profil.statut === "En attente" && (
              <button className="pay-btn"  
              data-transaction-amount={profil.montant}
              data-transaction-description="Acheter mon produit"
              data-customer-email="johndoe@gmail.com"
              data-customer-phone_number-number="64000001"
              data-customer-lastname="Doe"
              data-customer-firstname="John"
              data-transaction-custom_metadata-paiement={profil.paiement}
                onClick={() => initFedaPay(profil)}
                style={{
                  backgroundColor: "green",
                  color: "white",
                  border: "none",
                  fontWeight: "bold",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Payer
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Paiements;
