import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './Pages/AuthContext';

const PrivateRoute = ({ children }) => {
  const { Email } = useAuth(); // Email indique la connexion
  
  // Pas connecté => redirection
  if (!Email) {
    return <Navigate to="/Connexion" replace />;
  }

  return children;
};

export default PrivateRoute;
