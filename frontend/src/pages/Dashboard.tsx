import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {  PieChart, Pie, Cell, ResponsiveContainer,Tooltip, Legend} from 'recharts';

import DashboardLayout from "../components/DashboardLayout";
import StatCard from "../components/StatCard";
import AddClientForm from "../components/AddClientForm";
import { getClients } from "../service/client.api";
import { useApi } from "../hooks/useApi";

import "../styles/dashboard.css";
import '../styles/variables.css';

export default function Dashboard() {
  const { request } = useApi();
  const apiObj = { request };
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openAddClient, setOpenAddClient] = useState(false);

  // 1. Récupération des données
  const fetchClients = useCallback(async () => {
    try {
      const data = await getClients(apiObj);
      setClients(data);
    } catch (err) {
      console.error("Erreur lors de la récupération des clients:", err);
    } finally {
      setLoading(false);
    }
  }, [request]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  // 2. Préparation des statistiques
  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.status === "ACTIVE").length;
  const inactiveClients = totalClients - activeClients;

  // CALCUL DES TOTAUX GLOBAUX
  const totalDocuments = clients.reduce((acc, client) => acc + (client._count?.documents || 0), 0);
  const totalDeadlines = clients.reduce((acc, client) => acc + (client._count?.deadlines || 0), 0);

  // Données pour le graphique en secteurs (Répartition)
  const pieData = [
    { name: 'Actifs', value: activeClients },
    { name: 'Inactifs', value: inactiveClients },
  ];

  const COLORS = ['#4ade80', '#f87171']; // Vert émeraude et Rouge corail

  return (
    <DashboardLayout onAddClient={() => setOpenAddClient(true)}>
      {/* Grille de statistiques rapides */}
      <div className="stats-grid">
        <StatCard title="Clients Totaux" value={totalClients} />
        <StatCard title="Clients Actifs" value={activeClients} />
        <StatCard title="Documents" value={totalDocuments} />
        <StatCard title="Obligations" value={totalDeadlines} />
      </div>

      <div className="dashboard-grid">
        {/* GRAPHIQUE DE RÉPARTITION */}
        <div className="card chart-card">
          <h4>Répartition du Portefeuille</h4>
          <div className="chart-container" style={{ width: '100%', height: 300 }}>
            {loading ? (
              <div className="loader-placeholder">Chargement...</div>
            ) : totalClients > 0 ? (
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="empty-chart">Aucune donnée à afficher</div>
            )}
          </div>
        </div>

        {/* ACTIVITÉ RÉCENTE OU LISTE RAPIDE */}
        <div className="card">
          <div className="card-header">
            <h4>Derniers Clients</h4>
            <Link to="/clients" className="view-all">Voir tout</Link>
          </div>
          <div className="recent-list">
            {loading ? (
              <p>Chargement...</p>
            ) : clients.length > 0 ? (
              clients.slice(0, 5).map((client) => (
                <div key={client.id} className="recent-item">
                  <div className="recent-info">
                    <p className="name">{client.firstName} {client.lastName}</p>
                    <p className="email">{client.email}</p>
                  </div>
                  <span className={`status-dot ${client.status.toLowerCase()}`}></span>
                </div>
              ))
            ) : (
              <p className="empty-msg">Aucun client récent.</p>
            )}
          </div>
        </div>
      </div>

      {/* MODAL AJOUT CLIENT */}
      {openAddClient && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Nouveau Dossier Client</h3>
              <button className="close-btn" onClick={() => setOpenAddClient(false)}>&times;</button>
            </div>
            <AddClientForm
              onSuccess={() => {
                setOpenAddClient(false);
                fetchClients(); 
              }}
            />
            <div className="modal-footer">
              <button className="secondary-btn" onClick={() => setOpenAddClient(false)}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}