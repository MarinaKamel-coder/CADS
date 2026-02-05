// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Home from "./pages/Home";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ClientDetails from "./pages/ClientDetails";
import Layout from "./components/Layout";
import Clients from './pages/Clients'

import Obligations from "./pages/Obligations";

import "./styles/components.css"
import Alerts from "./pages/Alerts";


export default function App() {
  return (
    <Router>
      <Routes>
        {/* Page d'accueil publique */}
        <Route path="/" element={<Home />} />

        {/* SignIn / SignUp */}
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />

        {/* Routes Protégées */}
        <Route
          path="/dashboard"
          element={
            <SignedIn>
              <Dashboard />
            </SignedIn>
          }
        />
        
        {/* Route dynamique pour les détails du client */}
        <Route
          path="/clients/:id"
          element={
            <SignedIn>
              <Layout>
                <ClientDetails />
              </Layout>
            </SignedIn>
          }
        />

        {/* Route dynamique pour les détails du client */}
        <Route
          path="/clients"
          element={
            <SignedIn>
              <Layout>
                <Clients/>
              </Layout>
            </SignedIn>
          }
        />



        {/* Route dynamique pour les détails du client */}
        <Route
          path="/deadlines"
          element={
            <SignedIn>
              <Layout>
                <Obligations/>
              </Layout>
            </SignedIn>
          }
        />

        {/* Route dynamique pour les détails du client */}
        <Route
          path="/alerts"
          element={
            <SignedIn>
              <Layout>
                <Alerts/>
              </Layout>
            </SignedIn>
          }
        />

        <Route path="*" element={<SignedOut><RedirectToSignIn /></SignedOut>} />
      </Routes>
    </Router>
  );
}
