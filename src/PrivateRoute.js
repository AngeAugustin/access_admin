import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './Pages/AuthContext';

const PrivateRoute = ({ children }) => {
  const { Email, isLoading } = useAuth();

  if (isLoading) {
    // Optionnel : affiche un spinner ou un texte
    return <div>Chargement...</div>;
  }

  if (!Email) {
    return <Navigate to="/Connexion" replace />;
  }

  return children;
};

export default PrivateRoute;
