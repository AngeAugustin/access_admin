import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [NPI, setNPI] = useState(null);
  const [Email, setEmail] = useState(null);
  const [Role, setRole] = useState(null);

  return (
    <AuthContext.Provider value={{ NPI, setNPI, Email, setEmail, Role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};
