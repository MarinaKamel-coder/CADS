const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

/**
 * Helper pour les headers d'authentification (version Upload)
 * On ne met PAS de Content-Type ici pour le FormData
 */
const getAuthHeaders = async (getToken: () => Promise<string | null>) => {
  const token = await getToken();
  return {
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
  };
};

/**
 * Upload d'un document
 */
export const uploadDocument = async (
  getToken: () => Promise<string | null>, 
  clientId: string, 
  file: File, 
  type: string
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);
  formData.append("clientId", clientId);

  const response = await fetch(`${API_BASE_URL}/documents/upload`, {
    method: "POST",
    headers: await getAuthHeaders(getToken), // Fetch ajoutera lui-même le boundary
    body: formData,
  });

  if (!response.ok) throw new Error("Erreur lors de l'upload du document");
  return await response.json();
};

/**
 * Récupérer les documents d'un client
 */
export const getClientDocuments = async (getToken: () => Promise<string | null>, clientId: string) => {
  const token = await getToken();
  const response = await fetch(`${API_BASE_URL}/documents/client/${clientId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) throw new Error("Erreur lors de la récupération des documents");
  
  const data = await response.json();
  return data.documents || [];
};