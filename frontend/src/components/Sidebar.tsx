import { NavLink } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import "../styles/layout.css"

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo-container">
        <NavLink to="/dashboard">
          <img src="/assets/CADS.png" alt="CADS Logo" className="sidebar-logo-img" />
        </NavLink>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
          Tableau de bord
        </NavLink>
        <NavLink to="/clients" className={({ isActive }) => isActive ? "active" : ""}>
          Clients
        </NavLink>
        <NavLink to="/deadlines" className={({ isActive }) => isActive ? "active" : ""}>
          Obligations
        </NavLink>
        <NavLink to="/documents" className={({ isActive }) => isActive ? "active" : ""}>
          Documents
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => isActive ? "active" : ""}>
          Paramètres
        </NavLink>
      </nav>

      <div className="sidebar-footer">
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
  );
}
