import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { uploadDocument } from "../service/document.api";

export default function FileUploader({ clientId, onUploadSuccess }: { clientId: string, onUploadSuccess: () => void }) {
  const { getToken } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      await uploadDocument(getToken , clientId, file, "FACTURE"); // Type par défaut
      setFile(null);
      onUploadSuccess();
      alert("Document ajouté avec succès !");
    } catch (err) {
      alert("Erreur lors de l'envoi");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="file-uploader card">
      <h4>Ajouter un document</h4>
      <input type="file" aria-label="Choisir un fichier" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button 
        onClick={handleUpload} 
        disabled={!file || uploading}
        className="primary-btn"
      >
        {uploading ? "Envoi..." : "Uploader"}
      </button>
    </div>
  );
}