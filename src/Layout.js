import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from './Pages/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt,
  faUserCircle,
  faBell,
  faHome,
  faBook,
  faMoneyBillTransfer,
  faCalendarAlt,
  faUserGraduate, 
} from '@fortawesome/free-solid-svg-icons';

const Layout = () => {

  const { Email } = useAuth();
  const { NPI } = useAuth();
  return (
    <div className="dashboard-container">
      {/* Barre supérieure */}
      <header className="top-bar">
        <div className="user-info">
          <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
          <div className="user-details">
            <span className="user-name">{NPI}</span>
            <span className="user-email">{Email}</span>
          </div>
        </div>
      </header>
 
      {/* Barre latérale */}
      <aside className="sidebar">
        <div className="sidebar-header" style={{ marginBottom: '10px' }}>
          <img
            src="https://i.postimg.cc/9QvqpzQZ/access-2.png"
            alt="Logo"
            className="sidebar-image" 
            style={{ width: '130px', height: '130px', marginBottom: '5px' }}
          />
        </div>
        <nav>
          <ul>
            <li>
                <NavLink
                  to="/accueil"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <FontAwesomeIcon icon={faHome} className="menu-icon" />
                  Tableau de bord
                </NavLink>
            </li>
            <li>
                <NavLink
                  to="/parents"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <FontAwesomeIcon icon={faHome} className="menu-icon" />
                  Parents
                </NavLink>
            </li>
            <li>
                <NavLink
                  to="/educateurs"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <FontAwesomeIcon icon={faBook} className="menu-icon" />
                  Educateurs
                </NavLink>
            </li>
            <li>
                <NavLink
                  to="/eleves"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <FontAwesomeIcon icon={faUserGraduate} className="menu-icon" />
                  Elèves
                </NavLink>
            </li>
            <li>
                <NavLink
                  to="/seances"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <FontAwesomeIcon icon={faCalendarAlt} className="menu-icon" />
                  Séances
                </NavLink>
            </li>
            <li>
                <NavLink
                  to="/profil"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <FontAwesomeIcon icon={faUserCircle} className="menu-icon" />
                  Profils
                </NavLink>
            </li>
            <li>
                <NavLink
                  to="/paiements"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <FontAwesomeIcon icon={faMoneyBillTransfer} className="menu-icon" />
                  Paiements
                </NavLink>
            </li>
            <li>
                <NavLink
                  to="/notifications"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <FontAwesomeIcon icon={faBell} className="menu-icon" />
                  Notifications
                </NavLink>
            </li>
          </ul>
        </nav>

        {/* Lien Déconnexion */}
        <div className="logout-section">
          <a href="/connexion" className="logout-link">
            <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" />
            Déconnexion
          </a>
        </div>
      </aside>

      {/* Contenu principal */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
 