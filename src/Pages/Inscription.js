import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Inscription = () => {
  const navigate = useNavigate();

  const [NPI, setNPI] = useState('');
  const [Name, setName] = useState('');
  const [Firstname, setFirstname] = useState('');
  const [Email, setEmail] = useState('');
  const [Telephone, setTelephone] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const generateUsername = (email, npi) => {
    const emailPrefix = email.split('@')[0];
    const npiPart = npi.substring(0, 5);
    return `${emailPrefix}${npiPart}`;
  };

  const handleInscription = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!NPI || !Name || !Firstname || !Email || !Telephone || !Password || !ConfirmPassword) {
      setErrorMessage('Veuillez remplir tous les champs.');
      return;
    }

    if (Password !== ConfirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    const Username = generateUsername(Email, NPI);

    const myInscription = {
      NPI,
      Name,
      Firstname,
      Telephone,
      Email,
      Password,
      Username,
      Role: 'ADMIN',
    };

    try {
      const response = await fetch('https://access-backend-a961a1f4abb2.herokuapp.com//api/register', {
        method: 'POST',
        body: JSON.stringify(myInscription),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();
      
      if (response.ok) {
        setSuccessMessage(responseData.Message);
        navigate('/connexion');
      } else {
        setErrorMessage(responseData.error || 'Une erreur est survenue.');
      }
    } catch (error) {
      setErrorMessage('Erreur lors de la connexion au serveur.');
    }
  };

  return (
    <div style={{ display: 'flex', height: '97vh', width: '210vh', backgroundColor: '#F4F4F4' }}>
      <div style={{ flex: 1, backgroundColor: '#f1f1f0', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <img src="https://i.postimg.cc/MKCL3Xwx/ff.webp" alt="Access" style={{ width: '80%', marginTop: 30 }} />
      </div>
      <div style={{ flex: 1, backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <img src="https://i.postimg.cc/9QvqpzQZ/access-2.png" alt="Profil" style={{ width: 100, height: 100 }} />
          <h2 style={{ margin: 0, fontSize: 16 }}>Bienvenue à l'Espace Admin Access !</h2>
          <p style={{ fontSize: 14 }}>Pour vous inscrire, veuillez remplir les champs suivants.</p>
        </div>
        {errorMessage && <p style={{ color: 'red', margin: '10px 0', fontSize: 14 }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green', margin: '10px 0', fontSize: 14 }}>{successMessage}</p>}
        <form onSubmit={handleInscription} style={{ width: '100%', maxWidth: 400 }}>
          <input type="text" placeholder="NPI" value={NPI} onChange={(e) => setNPI(e.target.value)} style={inputStyle} />
          <input type="text" placeholder="Nom" value={Name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
          <input type="text" placeholder="Prénoms" value={Firstname} onChange={(e) => setFirstname(e.target.value)} style={inputStyle} />
          <input type="email" placeholder="Email" value={Email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
          <input type="tel" placeholder="Téléphone" value={Telephone} onChange={(e) => setTelephone(e.target.value)} style={inputStyle} />

          {/* Champ Mot de Passe avec icône */}
          <div style={passwordContainerStyle}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Mot de passe"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              style={passwordInputStyle}
            />
            <span onClick={() => setShowPassword(!showPassword)} style={eyeIconStyle}>
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </span>
          </div>

          {/* Champ Confirmation Mot de Passe avec icône */}
          <div style={passwordContainerStyle}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirmer mot de passe"
              value={ConfirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={passwordInputStyle}
            />
            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={eyeIconStyle}>
              {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
            </span>
          </div>

          <button type="submit" style={buttonStyle}>S'inscrire</button>
        </form>
        <p style={{ marginTop: 20, fontSize: 14 }}>
          Vous avez déjà un compte ? <a href="/connexion" style={{ color: '#004aad', fontWeight: 'bold', fontSize: 14 }}>Connectez-vous</a>
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

const passwordContainerStyle = {
  position: 'relative',
  width: '100%',
  marginBottom: '15px'
};

const passwordInputStyle = {
  width: '380px',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  fontSize: '12px',
  height: 20,
  paddingRight: '30px'
};

const eyeIconStyle = {
  position: 'absolute',
  right: '10px',
  top: '50%',
  transform: 'translateY(-50%)',
  cursor: 'pointer',
  fontSize: '16px'
};

const buttonStyle = {
  width: '420px',
  padding: '10px',
  backgroundColor: '#004aad',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  fontSize: '14px',
  cursor: 'pointer',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
};

export default Inscription;
