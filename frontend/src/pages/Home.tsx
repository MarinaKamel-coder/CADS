import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link, Navigate } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  return (
    <div className="home-page-wrapper">
      <SignedIn>
        <Navigate to="/dashboard" />
      </SignedIn>

      <SignedOut>
        <div className="home-content">
  
          <div className="logo-cads">CADS</div>

          <h1 className="home-title">
            Solutions de Comptabilité <br /> et Gestion Fiscale
          </h1>
          
          <p className="home-subtitle">
            Optimise Vos Finances. Simplifie la Conformité.
          </p>
          
          <div className="home-actions">
            <Link to="/sign-in" className="btn-neon-blue">
              Se Connecter / S'inscrire
            </Link>
          </div>
        </div>
      </SignedOut>
    </div>
  );
}