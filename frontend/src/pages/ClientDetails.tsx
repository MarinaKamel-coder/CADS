import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { getClientById, updateClient } from "../service/client.api";
import { getClientDocuments } from "../service/document.api";
import FileUploader from "../components/FileUploader";
import AddDeadlineForm from "../components/AddDeadlineForm";

import '../styles/clientDetails.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

type TabType = "overview" | "obligations" | "documents";

// Interface stricte pour le formulaire de modification
interface EditClientForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  nasNumber: string;
  status: "ACTIVE" | "INACTIVE";
}

export default function ClientDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getToken } = useAuth();
 
  
  const [client, setClient] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [showNas, setShowNas] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modale Obligation
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modale Profil

  // État du formulaire de modification
  const [editFormData, setEditFormData] = useState<EditClientForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    nasNumber: "",
    status: "ACTIVE"
  });

  const loadData = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const clientData = await getClientById(getToken, id);
      setClient(clientData);
      
      // On pré-remplit les champs de modification avec les données actuelles
      setEditFormData({
        firstName: clientData.firstName || "",
        lastName: clientData.lastName || "",
        email: clientData.email || "",
        phone: clientData.phone || "",
        address: clientData.address || "",
        nasNumber: clientData.nasNumber || "",
        status: clientData.status as "ACTIVE" | "INACTIVE"
      });
      
      const docsData = await getClientDocuments(getToken, id);
      setDocuments(Array.isArray(docsData) ? docsData : docsData.documents || []);
    } catch (err) {
      console.error("Erreur lors du chargement des données:", err);
    }
  }, [id, getToken]);

  useEffect(() => {
    loadData();
  }, [loadData]);

const handleEditSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    // 1. On envoie TOUT l'objet editFormData (qui contient le status) au backend
    // Le backend verra le changement de status et déclenchera la transaction Prisma
    await updateClient(getToken, id!, editFormData);

    setIsEditModalOpen(false);
    
    // 2. On recharge les données : le client ET ses deadlines seront à jour 
    await loadData(); 
    
    alert("Le profil et les obligations ont été synchronisés avec succès !");
  } catch (err) {
    console.error("Erreur mise à jour:", err);
    alert("Erreur lors de la mise à jour.");
  }
};

  const handleDeleteDoc = async (docId: string) => {
    if (!window.confirm("Supprimer ce document ?")) return;
    try {
      const token = await getToken();
      const response = await fetch(`${API_BASE_URL}/documents/${docId}`, { 
        method: 'DELETE',
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!response.ok) throw new Error();
      loadData();
    } catch (err) { alert("Erreur lors de la suppression."); }
  };

  const handleDeleteDeadline = async (deadlineId: string) => {
    if (!window.confirm("Supprimer cette obligation fiscale ?")) return;
    try {
      const token = await getToken();
      const response = await fetch(`${API_BASE_URL}/deadlines/${deadlineId}`, { 
        method: 'DELETE',
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!response.ok) throw new Error();
      loadData();
    } catch (err) { alert("Erreur lors de la suppression."); }
  };
  
  if (loading && !client) return <div className="loader-container">Chargement...</div>;
  if (!client) return <div className="error">Client introuvable.</div>;

  const formatNas = (nas: string) => {
    if (!nas) return "N/A";
    return showNas ? nas : `***-***-${nas.slice(-3)}`;
  };

  return (
    <div className="client-details-page">
      {/* --- EN-TÊTE --- */}
      <header className="details-header">
        <button className="back-btn" onClick={() => navigate("/clients")}>← Retour</button>
        <div className="header-content">
          <div className="title-section">
            <h1>{client.lastName.toUpperCase()}, {client.firstName}</h1>
            <div className="meta-tags">
              <span className={`status-badge ${client.status.toLowerCase()}`}>
                {client.status === "ACTIVE" ? "● Actif" : "○ Inactif"}
              </span>
              <span className="nas-badge" onClick={() => setShowNas(!showNas)}>
                BN: {formatNas(client.nasNumber)} {showNas ? '🔓' : '🔒'}
              </span>
            </div>
          </div>
          <div className="header-actions">
            <button className="secondary-btn" onClick={() => setIsEditModalOpen(true)}>
              Modifier le profil
            </button>
          </div>
        </div>
      </header>

      {/* --- NAVIGATION --- */}
      <nav className="details-tabs">
        <button className={`tab-item ${activeTab === "overview" ? "active" : ""}`} onClick={() => setActiveTab("overview")}>Vue d'ensemble</button>
        <button className={`tab-item ${activeTab === "obligations" ? "active" : ""}`} onClick={() => setActiveTab("obligations")}>Obligations ({client.deadlines?.length || 0})</button>
        <button className={`tab-item ${activeTab === "documents" ? "active" : ""}`} onClick={() => setActiveTab("documents")}>Documents ({documents.length})</button>
      </nav>

      {/* --- PANNEAUX --- */}
      <div className="tab-panel">
        {activeTab === "overview" && (
          <div className="overview-grid">
            <div className="info-card main-info">
              <h3>Coordonnées Générales</h3>
              <div className="info-group"><label>Courriel</label><p>{client.email}</p></div>
              <div className="info-group"><label>Téléphone</label><p>{client.phone || "Non spécifié"}</p></div>
              <div className="info-group"><label>Adresse</label><p>{client.address || "Non spécifiée"}</p></div>
              <div className="info-group"><label>NAS / BN</label><p>{formatNas(client.nasNumber)}</p></div>
            </div>
            <div className="info-card stats-summary">
              <h3>Résumé</h3>
              <div className="stats-row">
                <div className="stat-item"><span className="stat-num">{documents.length}</span><span className="stat-label">Fichiers</span></div>
                <div className="stat-item"><span className="stat-num">{client.deadlines?.length || 0}</span><span className="stat-label">Échéances</span></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "obligations" && (
          <div className={`obligations-view ${client.status === "INACTIVE" ? "client-is-inactive" : ""}`}>
            <div className="section-header">
              <h3>Calendrier</h3>
              <button 
                className="ajouterDeadline-btn" 
                onClick={() => setIsModalOpen(true)}
                disabled={client.status === "INACTIVE"}
              >
                + Ajouter
              </button>
            </div>

            {client.status === "INACTIVE" && (
              <div className="status-alert">
                ⚠️ Ce dossier est inactif. Les obligations ne peuvent plus être modifiées.
              </div>
            )}

            <div className="deadlines-list">
              {client.deadlines?.map((d: any) => (
                <div key={d.id} className={`deadline-item ${d.priority.toLowerCase()} ${client.status === "INACTIVE" ? "locked" : ""}`}>
                  <div className="deadline-info">
                    <h4>{d.title}</h4>
                    <p>{new Date(d.dueDate).toLocaleDateString()} - {d.priority}</p>
                  </div>
                  
                  {/* On n'affiche le bouton supprimer que si le client est actif */}
                  {client.status === "ACTIVE" && (
                    <button className="del-btn" onClick={() => handleDeleteDeadline(d.id)}>🗑️</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "documents" && (
          <div className={`documents-view ${client.status === "INACTIVE" ? "client-is-inactive" : ""}`}>
            {client.status === "ACTIVE" ? (
              <div className="upload-section">
                <FileUploader clientId={id!} onUploadSuccess={loadData} />
              </div>
            ) : (
              <div className="status-alert">
                🔒 Dossier inactif : L'ajout de nouveaux documents est désactivé.
              </div>
            )}
            
            <div className="docs-grid">
              {documents.map((doc) => (
                <div key={doc.id} className={`document-tile ${client.status === "INACTIVE" ? "locked" : ""}`}>
                  <div className="file-details">
                    <span className="file-name">{doc.name}</span>
                    <span className="file-meta">
                      {(doc.size / 1024).toFixed(1)} KB • {new Date(doc.uploadedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="file-actions">
                    <a 
                      href={`${API_BASE_URL}/documents/download/${doc.id}?action=view`} 
                      target="_blank" 
                      className="action-icon"
                    >
                      👁️
                    </a>
                    {/* On cache le bouton supprimer si inactif */}
                    {client.status === "ACTIVE" && (
                      <button onClick={() => handleDeleteDoc(doc.id)} className="action-icon del">
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- MODALE : ÉDITION DU PROFIL --- */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Modifier le profil client</h3>
            <button className="close-btn" onClick={() => setIsEditModalOpen(false)}>&times;</button>
            <form onSubmit={handleEditSubmit} className="edit-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Prénom</label>
                  <input aria-label="edit" type="text" value={editFormData.firstName} onChange={e => setEditFormData({...editFormData, firstName: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Nom</label>
                  <input aria-label="edit" type="text" value={editFormData.lastName} onChange={e => setEditFormData({...editFormData, lastName: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Courriel</label>
                  <input aria-label="edit" type="email" value={editFormData.email} onChange={e => setEditFormData({...editFormData, email: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Téléphone</label>
                  <input aria-label="edit" type="text" value={editFormData.phone} onChange={e => setEditFormData({...editFormData, phone: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>NAS / BN</label>
                  <input aria-label="edit" type="text" value={editFormData.nasNumber} onChange={e => setEditFormData({...editFormData, nasNumber: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Statut</label>
                  <select  aria-label="edit" value={editFormData.status} onChange={e => setEditFormData({...editFormData, status: e.target.value as "ACTIVE" | "INACTIVE"})}>
                    <option value="ACTIVE">Actif</option>
                    <option value="INACTIVE">Inactif</option>
                  </select>
                </div>
                <div className="form-group full-width"> {/* Adresse prend toute la largeur */}
                  <label>Adresse</label>
                  <input aria-label="edit" type="text" value={editFormData.address} onChange={e => setEditFormData({...editFormData, address: e.target.value})} />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="secondary-btn" onClick={() => setIsEditModalOpen(false)}>Annuler</button>
                <button type="submit" className="primary-btn">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODALE : AJOUT OBLIGATION --- */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
            <AddDeadlineForm clientId={id} onSuccess={() => { loadData(); setIsModalOpen(false); }} onCancel={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}