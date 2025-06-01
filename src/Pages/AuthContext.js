import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [NPI, setNPI] = useState(null);
  const [Email, setEmail] = useState(null);
  const [Name, setName] = useState(null);
  const [Firstname, setFirstname] = useState(null);

  return (
    <AuthContext.Provider value={{ NPI, setNPI, Email, setEmail, Name, setName, Firstname, setFirstname }}>
      {children}
    </AuthContext.Provider>
  );
};
