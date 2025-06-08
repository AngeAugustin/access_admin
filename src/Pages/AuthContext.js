import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [NPI, setNPI] = useState(null);
  const [Email, setEmail] = useState(null);
  const [Name, setName] = useState(null);
  const [Firstname, setFirstname] = useState(null);

  // Charge les données depuis le localStorage au démarrage
  useEffect(() => {
    const storedEmail = localStorage.getItem('Email');
    const storedNPI = localStorage.getItem('NPI');
    const storedName = localStorage.getItem('Name');
    const storedFirstname = localStorage.getItem('Firstname');

    if (storedEmail) setEmail(storedEmail);
    if (storedNPI) setNPI(storedNPI);
    if (storedName) setName(storedName);
    if (storedFirstname) setFirstname(storedFirstname);
  }, []);

  // Met à jour le localStorage dès qu'une valeur change
  useEffect(() => {
    if (Email) localStorage.setItem('Email', Email);
    else localStorage.removeItem('Email');
  }, [Email]);

  useEffect(() => {
    if (NPI) localStorage.setItem('NPI', NPI);
    else localStorage.removeItem('NPI');
  }, [NPI]);

  useEffect(() => {
    if (Name) localStorage.setItem('Name', Name);
    else localStorage.removeItem('Name');
  }, [Name]);

  useEffect(() => {
    if (Firstname) localStorage.setItem('Firstname', Firstname);
    else localStorage.removeItem('Firstname');
  }, [Firstname]);

  return (
    <AuthContext.Provider value={{ NPI, setNPI, Email, setEmail, Name, setName, Firstname, setFirstname }}>
      {children}
    </AuthContext.Provider>
  );
};
