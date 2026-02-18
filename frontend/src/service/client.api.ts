import type { ClientForm } from "../types/client";

// Récupérer tous les clients
export const getClients = async (api: { request: Function }) => {
  const data = await api.request("/clients");
  return data.clients || [];
};

// Créer un client
export const createClient = async (api: { request: Function }, clientData: ClientForm) => {
  return await api.request("/clients", {
    method: "POST",
    body: JSON.stringify(clientData),
  });
};
// Récupérer un seul client par ID
export const getClientById = async (api: { request: Function }, id: string) => {
  const data = await api.request(`/clients/${id}`);
  return data.client;
};

// Mettre à jour un client
export const updateClient = async (api: { request: Function }, id: string, data: any) => {
  return await api.request(`/clients/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

// Supprimer un client
export const deleteClient = async (api: { request: Function }, id: string) => {
  return await api.request(`/clients/${id}`, { method: "DELETE" });
};