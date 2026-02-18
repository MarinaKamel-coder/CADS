import type { ClientForm } from "../types/client";
import { useApi } from "../hooks/useApi";

/**
 * On définit des interfaces pour correspondre à la structure du Backend
 * le backend renvoie : { client: {...} } ou { clients: [...] }
 */
interface ClientResponse {
  client: ClientForm & { id: string; createdAt: string };
}

interface ClientsListResponse {
  clients: (ClientForm & { id: string; createdAt: string })[];
}

// Ajouter un client
export const createClient = async (api: ReturnType<typeof useApi>, data: ClientForm) => {
  // On attend la réponse d'Axios
  const response = await api.post<ClientResponse>("/clients", data,{withCredentials:true});
  // On retourne uniquement l'objet client pour simplifier l'usage dans le composant
  return response.data.client;
};

// Récupérer tous les clients
export const getClients = async (api: ReturnType<typeof useApi>) => {
  const response = await api.get<ClientsListResponse>("/clients");
  // On retourne le tableau de clients
  return response.data.clients || [];
};

// Récupérer un seul client par ID
export const getClientById = async (api: ReturnType<typeof useApi>, id: string) => {
  const response = await api.get<ClientResponse>(`/clients/${id}`);
  return response.data.client;
};

// Supprimer un client
export const deleteClient = async (api: ReturnType<typeof useApi>, id: string) => {
  const response = await api.delete<{ message: string }>(`/clients/${id}`);
  return response.data;
};

// Mettre à jour un client
export const updateClient = async (api: ReturnType<typeof useApi>, id: string, data: Partial<ClientForm>) => {
  const response = await api.patch<{ message: string }>(`/clients/${id}`, data);
  return response.data;
};