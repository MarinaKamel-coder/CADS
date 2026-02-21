import { useEffect, useState, useMemo } from "react";
import { useAuth } from "@clerk/clerk-react";
import { getDeadlines, updateDeadlineStatus, deleteDeadline } from "../service/deadline.api";
import type { Deadline } from "../types/deadlines";
import AddDeadlineForm from "../components/AddDeadlineForm";
import "../styles/obligations.css";

type SortOption = "date" | "priority";

export default function Obligations() {
  const { getToken } = useAuth();
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // ÉTATS POUR LE TRI ET LE FILTRAGE
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [hideCompleted, setHideCompleted] = useState(true); 

  const fetchDeadlines = async () => {
    try {
      setLoading(true);
      const data = await getDeadlines(getToken);
      setDeadlines(data);
    } catch (error) {
      console.error("Erreur chargement:", error);
    } finally {
      setLoading(false);
    }
  };

  // Recharger les données au montage du composant
  useEffect(() => {
    fetchDeadlines();
  }, [getToken]);

  // LOGIQUE DE FILTRAGE + TRI
  const processedDeadlines = useMemo(() => {
    const priorityWeight = { HIGH: 3, MEDIUM: 2, LOW: 1 };
    
    // 1. Filtrer : On cache si c'est complété OU si c'est inactif (quand hideCompleted est vrai)
    let result = deadlines.filter(d => {
      if (hideCompleted) {
        return d.status !== "COMPLETED" && d.status !== "INACTIVE";
      }
      return true;
    });

    // 2. Trier
    return result.sort((a, b) => {
      if (sortBy === "priority") {
        return priorityWeight[b.priority] - priorityWeight[a.priority];
      } else {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
    });
  }, [deadlines, sortBy, hideCompleted]);

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    // Sécurité : Interdire la modification si l'obligation est INACTIVE
    if (currentStatus === "INACTIVE") return;

    const newStatus = currentStatus === "PENDING" ? "COMPLETED" : "PENDING";
    try {
      await updateDeadlineStatus(getToken, id, newStatus);
      // Mise à jour locale de l'état
      setDeadlines(prev => prev.map(d => 
        d.id === id ? { ...d, status: newStatus as any } : d
      ));
    } catch (error) {
      alert("Impossible de modifier le statut. Le dossier est peut-être inactif.");
    }
  };

  const handleDelete = async (id: string, status: string) => {
    if (status === "INACTIVE") {
      alert("Impossible de supprimer une obligation verrouillée.");
      return;
    }
    if (!window.confirm("Supprimer cette échéance ?")) return;
    try {
      await deleteDeadline(getToken, id);
      setDeadlines(prev => prev.filter(d => d.id !== id));
    } catch (error) {
      alert("Erreur lors de la suppression.");
    }
  };

  return (
    <div className="obligations-container">
      <header className="page-header">
        <div className="header-main">
          <h1>📅 Obligations & Échéances</h1>
          <div className="header-controls">
            <div className="filter-group">
              <span className="label">Trier par :</span>
              <button className={`chip ${sortBy === "date" ? "active" : ""}`} onClick={() => setSortBy("date")}>📅 Date</button>
              <button className={`chip ${sortBy === "priority" ? "active" : ""}`} onClick={() => setSortBy("priority")}>🔥 Priorité</button>
            </div>
            
            <div className="divider"></div>

            <label className="toggle-hide">
              <input 
                type="checkbox" 
                checked={hideCompleted} 
                onChange={(e) => setHideCompleted(e.target.checked)} 
              />
              Masquer archivées
            </label>
            
            {/* Bouton de rafraîchissement manuel */}
            <button className="refresh-btn" onClick={fetchDeadlines} title="Actualiser">🔄</button>
          </div>
        </div>
        <button className="ajouterDeadline-btn" onClick={() => setIsModalOpen(true)}>+ Ajouter</button>
      </header>

      <div className="table-card">
        {loading ? (
          <div className="loading-spinner">Chargement des données...</div>
        ) : (
          <table className="obligations-table">
            <thead>
              <tr>
                <th>Échéance</th>
                <th>Client</th>
                <th>Obligation</th>
                <th>Priorité</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {processedDeadlines.length > 0 ? (
                processedDeadlines.map((item) => {
                  const isOverdue = new Date(item.dueDate) < new Date() && item.status === "PENDING";
                  const isInactive = item.status === "INACTIVE";

                  return (
                    <tr key={item.id} className={`
                      ${isOverdue ? "row-overdue" : ""} 
                      ${item.status === "COMPLETED" ? "row-completed" : ""}
                      ${isInactive ? "row-inactive" : ""}
                    `}>
                      <td className="date-cell">
                        {new Date(item.dueDate).toLocaleDateString("fr-CA")}
                        {isOverdue && <span className="badge-error">RETARD</span>}
                        {isInactive && <span className="badge-inactive">INACTIF</span>}
                      </td>
                      <td className="client-cell">
                        <strong>{item.client ? `${item.client.lastName}, ${item.client.firstName}` : "N/A"}</strong>
                      </td>
                      <td className="info-cell">
                        <strong>{item.title}</strong>
                        <p>{item.description}</p>
                      </td>
                      <td><span className={`prio ${item.priority.toLowerCase()}`}>{item.priority}</span></td>
                      <td>
                        <button 
                          className={`status-btn ${item.status.toLowerCase()}`} 
                          onClick={() => handleToggleStatus(item.id, item.status)}
                          disabled={isInactive}
                        >
                          {item.status === "COMPLETED" ? "✅ Fait" : isInactive ? "🔒 Verrouillé" : "⏳ À faire"}
                        </button>
                      </td>
                      <td>
                        {!isInactive && (
                          <button className="btn-icon" onClick={() => handleDelete(item.id, item.status)} title="Supprimer">
                            🗑️
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr><td colSpan={6} className="empty">Aucune obligation trouvée.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
            <AddDeadlineForm 
              onSuccess={() => { setIsModalOpen(false); fetchDeadlines(); }}
              onCancel={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}