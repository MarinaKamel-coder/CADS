import { useState } from "react";
import { useApi } from "../hooks/useApi";
import type { ClientForm } from "../types/client";
import { createClient } from "../service/client.api";
import '../styles/components.css';
import '../styles/variables.css';

export default function AddClientForm({ onSuccess }: { onSuccess: () => void }) {
  const api = useApi();
  const [loading, setLoading] = useState(false); // État pour gérer l'attente
  const [error, setError] = useState<string | null>(null); // État pour afficher les erreurs UI

  const [form, setForm] = useState<ClientForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nasNumber: "",
    address: "",
    status: "ACTIVE",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createClient(api, form); 
      
      // Réinitialisation du formulaire
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        nasNumber: "",
        address: "",
        status: "ACTIVE",
      });

      // Déclenche le rechargement de la liste dans Dashboard.tsx
      onSuccess(); 
      
    } catch (err: any) {
      console.error("Error creating client:", err);
      setError(err.response?.data?.message || "Une erreur est survenue lors de l'ajout.");
    } finally {
      setLoading(false);
    }
  };

 return (
  <form className="AddClientForm" onSubmit={handleSubmit}>
    <h3>Nouveau Client</h3>
    
    {error && <div className="error-message">{error}</div>}

    {/* Ligne 1 : Prénom et Nom */}
    <div className="form-row">
      <div className="form-group">
        <label>Prénom</label>
        <input name="firstName" placeholder="Jean" value={form.firstName} onChange={handleChange} required disabled={loading} />
      </div>
      <div className="form-group">
        <label>Nom</label>
        <input name="lastName" placeholder="Tremblay" value={form.lastName} onChange={handleChange} required disabled={loading} />
      </div>
    </div>

    {/* Ligne 2 : Email */}
    <div className="form-group">
      <label>Courriel</label>
      <input name="email" type="email" placeholder="exemple@email.com" value={form.email} onChange={handleChange} required disabled={loading} />
    </div>

    {/* Ligne 3 : Téléphone et NAS */}
    <div className="form-row">
      <div className="form-group">
        <label>Téléphone</label>
        <input name="phone" placeholder="(514) 123-4567" value={form.phone} onChange={handleChange} required disabled={loading} />
      </div>
      <div className="form-group">
        <label>Numéro NAS</label>
        <input name="nasNumber" placeholder="000 000 000" value={form.nasNumber} onChange={handleChange} required disabled={loading} />
      </div>
    </div>

    {/* Ligne 4 : Adresse */}
    <div className="form-group">
      <label>Adresse complète</label>
      <input name="address" placeholder="123 rue, Ville, Province, Code Postal" value={form.address} onChange={handleChange} required disabled={loading} />
    </div>

    {/* Ligne 5 : Statut */}
    <div className="form-group">
      <label>Statut du dossier</label>
      <select name="status" value={form.status} onChange={handleChange} required aria-label="Status" disabled={loading}>
        <option value="ACTIVE">ACTIF</option>
        <option value="INACTIVE">INACTIF</option>
      </select>
    </div>

    <button type="submit" disabled={loading} className="primary-btn">
      {loading ? "Enregistrement..." : "Confirmer l'ajout"}
    </button>
  </form>
  );
}