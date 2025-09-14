import React from "react";

export default function PolitiqueEducateurs() {
  return (
    <div className="container" style={{
      maxWidth: "900px",
      margin: "auto",
      padding: "2rem",
      backgroundColor: "#fff",
      boxShadow: "0 0 20px rgba(0,0,0,0.05)",
      borderRadius: "8px",
      marginTop: "2rem",
      marginBottom: "3rem"
    }}>
      <img
        src="https://i.postimg.cc/9QvqpzQZ/access-2.png"
        alt="Logo AccessÉducateurs"
        className="logo"
        style={{
          display: "block",
          margin: "2rem auto 1rem",
          maxWidth: "120px"
        }}
      />
      <h1 style={{
        textAlign: "center",
        fontSize: "1.8rem",
        fontWeight: "bold",
        marginBottom: "2rem"
      }}>
        Politique de Confidentialité – Access Educateurs
      </h1>
      <p><strong>Dernière mise à jour :</strong> 08 Juillet 2025</p>
      <p><strong>Éditeur :</strong> SMS EXPERTISES - ILOSIWAJU TECH</p>
      <p><strong>Adresse :</strong> Zogbo, Cotonou, Bénin</p>
      <p><strong>Contact :</strong> augustinfachehoun97@gmail.com, +229 0154 053 660</p>

      <h2 style={{ color: "#005eab", marginTop: "1.5rem" }}>1. Qui sommes-nous ?</h2>
      <p>
        AccessÉducateurs est une application gérée par SMS EXPERTISES. Elle permet aux éducateurs béninois de proposer leurs services et d'être sélectionnés par les parents pour un accompagnement pédagogique personnalisé.
      </p>

      <h2 style={{ color: "#005eab", marginTop: "1.5rem" }}>2. Données collectées</h2>
      <p>
        Nous collectons vos noms, prénoms, adresses, numéro de téléphone, email, diplômes, pièce d'identité, casier judiciaire de moins de 6 mois, informations de garant et votre NPI.
      </p>

      <h2 style={{ color: "#005eab", marginTop: "1.5rem" }}>3. Finalités</h2>
      <p>
        Vos données servent à créer votre compte, vérifier vos compétences, gérer les séances et paiements, et permettre la mise en relation avec les parents.
      </p>

      <h2 style={{ color: "#005eab", marginTop: "1.5rem" }}>4. Confidentialité et sécurité</h2>
      <p>
        Vos données sont conservées en toute sécurité. Aucun partage sans votre accord explicite, sauf exigence légale.
      </p>

      <h2 style={{ color: "#005eab", marginTop: "1.5rem" }}>5. Conservation</h2>
      <p>
        Les données sont conservées tant que votre compte est actif et jusqu’à 2 ans après sa clôture.
      </p>

      <h2 style={{ color: "#005eab", marginTop: "1.5rem" }}>6. Vos droits</h2>
      <p>
        Vous pouvez accéder, corriger ou supprimer vos données en nous contactant à l'adresse mentionnée ci-dessous.
      </p>

      <footer style={{ textAlign: "center", marginTop: "2rem", padding: "1rem 0" }}>
        <div className="icons">
          <a href="mailto:contact@smsexpertises.bj" title="Envoyer un mail" style={{ margin: "0 10px", fontSize: "1.6rem", textDecoration: "none" }}>
            <i className="fas fa-envelope" style={{ color: "#d44638" }}></i>
          </a>
          <a href="https://wa.me/22990000000" target="_blank" rel="noopener noreferrer" title="Nous contacter sur WhatsApp" style={{ margin: "0 10px", fontSize: "1.6rem", textDecoration: "none" }}>
            <i className="fab fa-whatsapp" style={{ color: "#25d366" }}></i>
          </a>
        </div>
      </footer>
    </div>
  );
}
