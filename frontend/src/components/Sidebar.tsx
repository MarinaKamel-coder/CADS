import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import "../styles/layout.css"

export default function Sidebar() {
  const [isDark, setIsDark] = useState(localStorage.getItem("theme") === "dark");
  const [isOpen, setIsOpen] = useState(false); // État pour le menu mobile

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  return (
    <>
      {/* Bouton Burger (mobile uniquement) */}
      <button 
        className={`burger-menu ${isOpen ? "open" : ""}`} 
        onClick={toggleMenu}
        aria-label="Menu"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* Overlay (mobile uniquement) */}
      {isOpen && <div className="sidebar-overlay show" onClick={closeMenu}></div>}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-logo-container">
          <NavLink to="/dashboard" onClick={closeMenu}>
            <img src="/assets/CADS.png" alt="CADS Logo" className="sidebar-logo-img" />
          </NavLink>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""} onClick={closeMenu}>
            📊 Tableau de bord
          </NavLink>
          <NavLink to="/clients" className={({ isActive }) => isActive ? "active" : ""} onClick={closeMenu}>
            👥 Clients
          </NavLink>
          <NavLink to="/deadlines" className={({ isActive }) => isActive ? "active" : ""} onClick={closeMenu}>
            📅 Obligations
          </NavLink>
          <NavLink to="/alerts" className={({ isActive }) => isActive ? "active" : ""} onClick={closeMenu}>
            🔔 Alerts
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          {/* Bouton Dark Mode ajouté ici */}
          <button 
            className="sidebar-theme-toggle" 
            onClick={() => setIsDark(!isDark)}
            aria-label="Changer le mode de couleur"
          >
            {isDark ? "☀️ Mode Clair" : "🌙 Mode Sombre"}
          </button>

          <div className="user-profile-info">
            <UserButton showName={true} 
            appearance={{
              elements: {
                userButtonOuterIdentifier: {
                  color: "white",        
                  fontWeight: "600",     
                },
                userButtonTrigger: {
                  "&:focus": {
                    boxShadow: "0 0 0 2px rgba(255, 140, 50, 0.5)"
                  }
                }
              }
            }}
            />
          </div>
        </div>
      </aside>
    </>
  );
}
