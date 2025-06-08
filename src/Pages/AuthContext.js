import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [NPI, setNPI] = useState(null);
  const [Email, setEmail] = useState(null);
  const [Name, setName] = useState(null);
  const [Firstname, setFirstname] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Récupère les infos dans localStorage
    const storedEmail = localStorage.getItem('Email');
    const storedNPI = localStorage.getItem('NPI');
    const storedName = localStorage.getItem('Name');
    const storedFirstname = localStorage.getItem('Firstname');

    if (storedEmail) setEmail(storedEmail);
    if (storedNPI) setNPI(storedNPI);
    if (storedName) setName(storedName);
    if (storedFirstname) setFirstname(storedFirstname);

    // Marque le chargement comme terminé
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        NPI, setNPI,
        Email, setEmail,
        Name, setName,
        Firstname, setFirstname,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
