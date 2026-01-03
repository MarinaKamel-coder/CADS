import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "../components/DashboardLayout";
import StatCard from "../components/StatCard";
import AddClientForm from "../components/AddClientForm";
import { getClients } from "../service/client.api";
import { useApi } from "../hooks/useApi";
import "../styles/dashboard.css";
import '../styles/variables.css';


export default function Dashboard() {
  const api = useApi();
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openAddClient, setOpenAddClient] = useState(false);

  // 1. Fonction pour récupérer les clients
  const fetchClients = useCallback(async () => {
    try {
      const data = await getClients(api);
      setClients(data);
    } catch (err) {
      console.error("Erreur lors de la récupération des clients:", err);
    } finally {
      setLoading(false);
    }
  }, [api]);

  // 2. Charger les données au montage du composant
  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  // 3. Calculer les statistiques dynamiquement
  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.status === "ACTIVE").length;

  return (
    <DashboardLayout onAddClient={() => setOpenAddClient(true)}>
      <div className="stats-grid">
        {/* Valeurs maintenant basées sur la base de données */}
        <StatCard title="Clients Totals" value={totalClients} />
        <StatCard title="Clients Actifs" value={activeClients} />
        <StatCard title="Documents" value={0} />
        <StatCard title="Obligations en retard" value={0} />
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h4>Liste des Clients</h4>
          {loading ? (
            <p>Chargement...</p>
          ) : clients.length > 0 ? (
            <ul className="client-list">
              {clients.map((client) => (
                <li key={client.id} className="client-item">
                  <span className="client-name">
                    {client.firstName} {client.lastName}
                  </span>
                  {/* La pastille de statut */}
                  <span className={`status-badge ${client.status.toLowerCase()}`}>
                    {client.status === "ACTIVE" ? "Actif" : "Inactif"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucun client trouvé.</p>
          )}
        </div>

        <div className="card">
          <h4>Activité récente</h4>
          <ul>
            <li>Système prêt — Aucun document récent</li>
          </ul>
        </div>
      </div>

      {openAddClient && (
        <div className="modal-overlay">
          <div className="modal">
            <AddClientForm
              onSuccess={() => {
                setOpenAddClient(false);
                fetchClients(); 
              }}
            />
            <button
              className="secondary-btn"
              onClick={() => setOpenAddClient(false)}
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}