import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Pages/AuthContext';
import Connexion from './Pages/Connexion';
import Inscription from './Pages/Inscription';
import Profil from './Pages/Profil';
import DetailsProfil from './Pages/DetailsProfil';
import Notifications from './Pages/Notifications';
import Reclamations from './Pages/Reclamations';
import DetailsReclamation from './Pages/DetailsReclamation';
import DetailsPaiement from './Pages/DetailsPaiement';
import Parents from './Pages/Parents';
import Educateurs from './Pages/Educateurs';
import Paiements from './Pages/Paiements';
import Seances from './Pages/Seances';
import Eleves from './Pages/Eleves';
import DetailsParent from './Pages/DetailsParent';
import DetailsEducateur from './Pages/DetailsEducateur';
import DetailsEleve from './Pages/DetailsEleve';
import DetailsSeance from './Pages/DetailsSeance';
import ResultPay from './Pages/Resultpay';
import Accueil from './Pages/Accueil';
import PrivateRoute from './PrivateRoute';
import Layout from './Layout'; 
import './index.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Point d’entrée : la page de connexion */}
          <Route path="/Connexion" element={<Connexion />} />
          <Route path="/Inscription" element={<Inscription />} />
          <Route path="/ResultPay" element={<ResultPay />} />

          {/* Routes protégées */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index element={<Accueil />} />
            <Route path="Accueil" element={<Accueil />} />
            <Route path="Notifications" element={<Notifications />} />
            <Route path="Profil" element={<Profil />} />
            <Route path="DetailsProfil" element={<DetailsProfil />} />
            <Route path="Educateurs" element={<Educateurs />} />
            <Route path="Parents" element={<Parents />} />
            <Route path="Paiements" element={<Paiements />} />
            <Route path="Seances" element={<Seances />} />
            <Route path="Eleves" element={<Eleves />} />
            <Route path="DetailsParent" element={<DetailsParent />} />
            <Route path="DetailsEducateur" element={<DetailsEducateur />} />
            <Route path="DetailsEleve" element={<DetailsEleve />} />
            <Route path="DetailsSeance" element={<DetailsSeance />} />
            <Route path="Reclamations" element={<Reclamations />} />
            <Route path="DetailsReclamation" element={<DetailsReclamation />} />
            <Route path="DetailsPaiement" element={<DetailsPaiement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
