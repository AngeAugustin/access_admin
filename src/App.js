import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Pages/AuthContext';
import Connexion from './Pages/Connexion';
import Inscription from './Pages/Inscription';
import Profil from './Pages/Profil';
import DetailsProfil from './Pages/DetailsProfil';
import Notifications from './Pages/Notifications';
import Parents from './Pages/Parents';
import Educateurs from './Pages/Educateurs';
import Paiements from './Pages/Paiements';
import Seances from './Pages/Seances';
import Layout from './Layout'; 
import './index.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Routes publiques, sans Layout */}
          <Route path="/Connexion" element={<Connexion />} />
          <Route path="/Inscription" element={<Inscription />} />

          {/* Routes protégées avec Layout */}
          <Route path="/" element={<Layout />}>
          <Route index element={<Notifications />} />
            <Route path="Notifications" element={<Notifications />} />
            <Route path="Profil" element={<Profil />} />
            <Route path="DetailsProfil" element={<DetailsProfil />} />
            <Route path="Educateurs" element={<Educateurs />} />
            <Route path="Parents" element={<Parents />} />
            <Route path="Paiements" element={<Paiements />} />
            <Route path="Seances" element={<Seances />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
