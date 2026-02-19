const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

/**
 * Helper pour les headers d'authentification
 */
const getHeaders = async (getToken: () => Promise<string | null>) => {
  const token = await getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
  };
};

// 1. Récupérer toutes les échéances
export const getDeadlines = async (getToken: () => Promise<string | null>) => {
  const response = await fetch(`${API_BASE_URL}/deadlines`, {
    method: "GET",
    headers: await getHeaders(getToken),
  });

  if (!response.ok) throw new Error("Erreur lors de la récupération des échéances");
  return await response.json();
};

// 2. Récupérer les échéances d'un client spécifique
export const getClientDeadlines = async (getToken: () => Promise<string | null>, clientId: string) => {
  const response = await fetch(`${API_BASE_URL}/deadlines/client/${clientId}`, {
    method: "GET",
    headers: await getHeaders(getToken),
  });

  if (!response.ok) throw new Error("Erreur lors de la récupération des échéances du client");
  return await response.json();
};

// 3. Créer une nouvelle échéance
export const createDeadline = async (getToken: () => Promise<string | null>, data: any) => {
  const response = await fetch(`${API_BASE_URL}/deadlines`, {
    method: "POST",
    headers: await getHeaders(getToken),
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Erreur lors de la création de l'échéance");
  return await response.json();
};

// 4. Mettre à jour le statut
export const updateDeadlineStatus = async (
  getToken: () => Promise<string | null>, 
  id: string, 
  status: "PENDING" | "COMPLETED" | "OVERDUE" | "INACTIVE"
) => {
  const response = await fetch(`${API_BASE_URL}/deadlines/${id}/status`, {
    method: "PATCH",
    headers: await getHeaders(getToken),
    body: JSON.stringify({ status }),
  });

  if (!response.ok) throw new Error("Erreur lors de la mise à jour du statut");
  return await response.json();
};

// 5. Supprimer une échéance
export const deleteDeadline = async (getToken: () => Promise<string | null>, id: string) => {
  const response = await fetch(`${API_BASE_URL}/deadlines/${id}`, {
    method: "DELETE",
    headers: await getHeaders(getToken),
  });

  if (!response.ok) throw new Error("Erreur lors de la suppression de l'échéance");
  return await response.json();
};