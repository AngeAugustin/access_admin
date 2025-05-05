import React, { useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Connexion = () => {

  const navigate = useNavigate();
  const [Email, setEmailUser] = useState('');
  const { setEmail } = useAuth();
  const { setNPI } = useAuth();
  const [passwordUser, setPasswordUser] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleConnexion = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!Email || !passwordUser) {
      setErrorMessage('Veuillez remplir tous les champs.');
      setSuccessMessage('');
      setIsLoading(false);
    } else {
      try {
        const myConnexion = {
          Email: Email,
          Password: passwordUser,
          Role: "ADMIN"
        };

        const options = {
          method: 'POST',
          body: JSON.stringify(myConnexion),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch('https://mediumvioletred-mole-607585.hostingersite.com/AccessBackend/public/api/login', options);

        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);
          setEmail(responseData.Email);
          setNPI(responseData.NPI);

          // Storing Username in local storage
          localStorage.setItem('Email', responseData.Email);

          navigate('/profil');
        } else {
          throw new Error("Une erreur s'est produite");
        }
      } catch (error) {
        console.log(error.message);
        setErrorMessage('Informations incorrectes');
        setSuccessMessage('');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div style={{ display: 'flex', height: '97vh', width: '210vh', backgroundColor: '#F4F4F4' }}>
      {/* Section de gauche */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#f1f1f0',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
        }}
      >
        
        {/* Contenu central */}
        <img
          src="https://i.postimg.cc/MKCL3Xwx/ff.webp" 
          alt="Colis"
          style={{ width: '80%', marginTop: 30 }}
        />
      </div>

      {/* Section de droite */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <img
            src="https://i.postimg.cc/9QvqpzQZ/access-2.png" // Remplace par un lien pour l'icône utilisateur
            alt="Profil"
            style={{
                width: 120,
                height: 120, // La hauteur doit être égale à la largeur
                borderRadius: '',
                objectFit: 'cover', // Assure que l'image est bien contenue dans le cercle
              }}
          />
          <h2 style={{ margin: 0, fontSize: 16 }}>Salut à nouveau !</h2>
          <p style={{ fontSize: 14 }}>Pour vous connecter, veuillez entrer vos identifiants.</p>
        </div>
        {errorMessage && <p style={{ color: 'red', fontSize: 14 }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green',  fontSize: 14 }}>{successMessage}</p>}
        <form style={{ width: '100%', maxWidth: 400 }}>
          <input
            type="email"
            placeholder="Adresse email"
            style={{ ...inputStyle, marginBottom: '15px', width: '100%' }}
            value={Email}
            onChange={(e) => setEmailUser(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            style={{ ...inputStyle, marginBottom: '15px', width: '100%' }}
            value={passwordUser}
            onChange={(e) => setPasswordUser(e.target.value)}
          />
          
          <button onClick={handleConnexion} disabled={isLoading}
            type="submit"
            style={{
              width: '422px',
              padding: '10px',
              backgroundColor: '#004aad',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
            }}
          >
            {isLoading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>
        <p style={{ marginTop: 20,  fontSize: 14 }}>
          Vous n'avez pas de compte ? <a href="/inscription" style={{ color: '#004aad', fontWeight: "bold",  fontSize: 14 }}>Inscrivez-vous</a>
        </p>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  fontSize: '12px',
  marginBottom: '15px',
  height: 20
};

export default Connexion;
