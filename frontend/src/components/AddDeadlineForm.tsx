import { useState, useEffect } from "react";
import { useApi } from "../hooks/useApi";
import { getClients } from "../service/client.api";
import { createDeadline } from "../service/deadline.api";

interface AddDeadlineFormProps {
  clientId?: string; // Optionnel : si on est déjà sur la fiche d'un client
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AddDeadlineForm({ clientId, onSuccess, onCancel }: AddDeadlineFormProps) {
  const { request } = useApi();
  const apiObj = { request };
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    clientId: clientId || "", // Utilise le prop s'il existe
    title: "",
    description: "",
    dueDate: "",
    priority: "MEDIUM" as "HIGH" | "MEDIUM" | "LOW",
    type: "FEDERAL" as "FEDERAL" | "PROVINCIAL" | "MUNICIPAL"
  });

  useEffect(() => {
    // On ne charge les clients que si on n'a pas déjà un clientId
    if (!clientId) {
      getClients(apiObj).then(setClients).catch(console.error);
    }
  }, [clientId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Transformation de la date en ISO 8601 pour Prisma
      const payload = {
        ...formData,
        dueDate: new Date(formData.dueDate).toISOString(),
      };
      
      await createDeadline(apiObj, payload);
      onSuccess();
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Erreur lors de la création de l'obligation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-deadline-form">
      <h3>Nouvelle Obligation</h3>
      
      {/* Affiche la sélection seulement si on n'est pas sur une fiche client précise */}
      {!clientId && (
        <div className="form-group">
          <label>Client</label>
          <select 
           aria-label="edit"
            required 
            value={formData.clientId}
            onChange={(e) => setFormData({...formData, clientId: e.target.value})}
          >
            <option value="">Choisir un client...</option>
            {clients.map(c => (
              <option key={c.id} value={c.id}>{c.lastName.toUpperCase()} {c.firstName}</option>
            ))}
          </select>
        </div>
      )}

      <div className="form-group">
        <label>Titre de l'obligation</label>
        <input 
          type="text" 
          placeholder="Ex: Remise de TPS/TVQ" 
          required
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Palier</label>
          <select 
          aria-label="edit"
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value as any})}
          >
            <option value="FEDERAL">🇨🇦 Fédéral</option>
            <option value="PROVINCIAL">⚜️ Provincial</option>
            <option value="MUNICIPAL">🏙️ Municipal</option>
          </select>
        </div>

        <div className="form-group">
          <label>Priorité</label>
          <select 
          aria-label="edit"
            value={formData.priority}
            onChange={(e) => setFormData({...formData, priority: e.target.value as any})}
          >
            <option value="LOW">Basse</option>
            <option value="MEDIUM">Moyenne</option>
            <option value="HIGH">Haute 🔥</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Date d'échéance</label>
        <input
        aria-label="edit" 
          type="date" 
          required
          value={formData.dueDate}
          onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
        />
      </div>

      <div className="form-group">
        <label>Notes (optionnel)</label>
        <textarea 
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          placeholder="Instructions particulières..."
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="cancel-btn">Annuler</button>
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Enregistrement..." : "Créer l'échéance"}
        </button>
      </div>
    </form>
  );
}