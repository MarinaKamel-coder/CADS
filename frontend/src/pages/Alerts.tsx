import { useEffect, useState, useMemo } from "react";
import { useAuth } from "@clerk/clerk-react"
import { getAlerts, markAlertAsRead, clearReadAlerts} from "../service/alert.api";
import type {Alert} from '../types/alerts';
import "../styles/alerts.css";

export default function Alerts() {
// On récupère getToken directement depuis Clerk
  const { getToken } = useAuth();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"ALL" | "UNREAD">("ALL");

  const [searchQuery, setSearchQuery] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getAlerts(getToken);
      console.log("Données reçues du serveur :", data);
      setAlerts(data|| []);
    } catch (error) {
      console.error("Erreur lors du chargement des alertes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [getToken]);

  // Filtrage des alertes selon le choix de l'utilisateur
const filteredAlerts = useMemo(() => {
    return alerts.filter(a => {
      // Filtre par statut (Lu/Non lu)
      const matchesTab = filter === "ALL" || !a.read;
      
      // Filtre par recherche (Nom du client ou Titre de l'alerte)
      const searchLower = searchQuery.toLowerCase();
      const clientName = a.client ? `${a.client.firstName} ${a.client.lastName}`.toLowerCase() : "";
      const matchesSearch = 
        clientName.includes(searchLower) || 
        a.title.toLowerCase().includes(searchLower);

      return matchesTab && matchesSearch;
    });
  }, [alerts, filter, searchQuery]);

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAlertAsRead(getToken, id);
      setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
    } catch (error) {
      alert("Erreur lors de la mise à jour.");
    }
  };

  const handleClearRead = async () => {
    const hasReadAlerts = alerts.some(a => a.read);
    if (!hasReadAlerts) return;

    if (window.confirm("Voulez-vous supprimer définitivement toutes les alertes lues ?")) {
      try {
        await clearReadAlerts(getToken);
        setAlerts(prev => prev.filter(a => !a.read));
      } catch (error) {
        alert("Erreur lors du nettoyage.");
      }
    }
  };

  return (
    <div className="alerts-container">
      <header className="alerts-header">
        <div className="title-section">
          <h1>🔔 Centre de Notifications</h1>
          <p>Restez informé des échéances et des documents de vos clients.</p>
        </div>
        
        <div className="alerts-actions">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Chercher un client ou une alerte..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="tabs">
            <button 
              className={filter === "ALL" ? "active" : ""} 
              onClick={() => setFilter("ALL")}
            >
              Toutes ({alerts.length})
            </button>
            <button 
              className={filter === "UNREAD" ? "active" : ""} 
              onClick={() => setFilter("UNREAD")}
            >
              Non lues ({alerts.filter(a => !a.read).length})
            </button>
          </div>
          <button className="btn-clear" onClick={handleClearRead}>
            🗑️ Nettoyer les lues
          </button>
        </div>
      </header>

      {loading ? (
        <div className="loader">Chargement des notifications...</div>
      ) : (
        <div className="alerts-list">
          {filteredAlerts.length === 0 ? (
            <div className="empty-state">
              <p>Aucune notification à afficher.</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`alert-card ${alert.read ? "read" : "unread"} ${alert.priority.toLowerCase()}`}
              >
                <div className="alert-type-icon">
                  {alert.type === "DEADLINE" && "📅"}
                  {alert.type === "DOCUMENT" && "📄"}
                  {alert.type === "SYSTEM" && "⚙️"}
                </div>
                
                <div className="alert-body">
                  <div className="alert-main">
                    {/* Conteneur pour aligner Titre + Badge Client */}
                    <div className="alert-header-row">
                      <h3>{alert.title}</h3>
                      {alert.client && (
                        <span className="client-badge">
                          👤 {alert.client.firstName} {alert.client.lastName}
                        </span>
                      )}
                    </div>
                    
                    <p>{alert.message}</p>
                  </div>

                  <div className="alert-meta">
                    <span className={`priority-tag ${alert.priority.toLowerCase()}`}>
                      {alert.priority}
                    </span>
                    <span className="date">
                      {new Date(alert.createdAt).toLocaleString("fr-CA", {
                        dateStyle: "short",
                        timeStyle: "short"
                      })}
                    </span>
                  </div>
                </div>

                <div className="alert-control">
                  {!alert.read && (
                    <button 
                      onClick={() => handleMarkAsRead(alert.id)}
                      title="Marquer comme lu"
                    >
                      ✅
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}