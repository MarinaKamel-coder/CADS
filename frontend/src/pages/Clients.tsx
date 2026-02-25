import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { getClients, updateClient, deleteClient } from "../service/client.api"; // Importe updateClient
import "../styles/clients.css";

export default function Clients() {
  const [clients, setClients] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // --- ÉTATS POUR LA PAGINATION ---
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 12;

  const { getToken } = useAuth();
  const navigate = useNavigate();

  // Reset de la page si on fait une recherche
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

// 1. Chargement des données
  const fetchClients = async () => {
    try {
      const data = await getClients(getToken);
      setClients(data);
    } catch (error) {
      console.error("Erreur lors du chargement des clients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [getToken]);

  // 2. Changer le statut (Active / Inactive)
  const handleToggleStatus = async (e: React.MouseEvent, client: any) => {
    e.stopPropagation(); // Empêche d'ouvrir les détails du client au clic sur le badge
    
    const newStatus = client.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    
    try {
      // Appel API : PUT /api/clients/:id avec { status: "..." }
      await updateClient(getToken, client.id, { status: newStatus });
      
      // Mise à jour de l'état local pour un feedback visuel immédiat
      setClients(prev => prev.map(c => 
        c.id === client.id ? { ...c, status: newStatus } : c
      ));
    } catch (error) {
      console.error("Erreur lors du changement de statut:", error);
      alert("Erreur 404: Vérifiez que la route PUT /clients/:id est bien définie.");
    }
  };

  // 3. Supprimer un client
  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!window.confirm("Supprimer ce client définitivement ?")) return;

    try {
      await deleteClient(getToken, id);
      setClients(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      alert("Erreur lors de la suppression");
    }
  };

  // --- LOGIQUE DE FILTRAGE + PAGINATION ---
  const filteredClients = clients.filter(client => 
    `${client.firstName} ${client.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcul des index pour la page actuelle
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);

  // Nombre total de pages
  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

  return (
<div className="clients-page">
        <div className="clients-header">
          <h2>Répertoire des Clients</h2>
          <div className="header-controls">
            <input 
              type="text" 
              placeholder="Rechercher un nom..." 
              className="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-container">
          {loading ? (
            <div className="loader">Chargement des dossiers...</div>
          ) : (
            <>
              <table className="clients-table">
                <thead>
                  <tr>
                    <th>Nom complet</th>
                    <th>Courriel</th>
                    <th>Date d'ajout</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentClients.map((client) => (
                    <tr 
                      key={client.id} 
                      className="client-row"
                      onClick={() => navigate(`/clients/${client.id}`)}
                    >
                      <td className="client-name">
                        {client.lastName}, {client.firstName}
                      </td>
                      <td className="client-email">{client.email}</td>
                      <td>{new Date(client.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button 
                          className={`status-btn ${client.status.toLowerCase()}`}
                          onClick={(e) => handleToggleStatus(e, client)}
                          title="Cliquer pour changer le statut"
                        >
                          {client.status === "ACTIVE" ? "🟢 Actif" : "🔴 Inactif"}
                        </button>
                      </td>
                      <td className="actions-cell">
                        <button 
                          className="delete-icon-btn" 
                          onClick={(e) => handleDelete(e, client.id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            {/* --- CONTRÔLES DE PAGINATION --- */}
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className="page-btn"
                >
                  Précédent
                </button>
                
                <span className="page-info">
                  Page <strong>{currentPage}</strong> sur <strong>{totalPages}</strong>
                </span>

                <button 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="page-btn"
                >
                  Suivant
                </button>
              </div>
            )}
          </>
          )}
          {!loading && filteredClients.length === 0 && (
            <div className="empty-state">Aucun client trouvé.</div>
          )}
        </div>
      </div>
  );
}