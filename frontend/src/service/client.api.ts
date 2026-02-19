import type { ClientForm } from "../types/client";

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

// Récupérer tous les clients
export const getClients = async (getToken: () => Promise<string | null>) => {
  const response = await fetch(`${API_BASE_URL}/clients`, {
    method: "GET",
    headers: await getHeaders(getToken),
  });

  if (!response.ok) throw new Error("Erreur lors de la récupération des clients");
  
  const data = await response.json();
  return data.clients || [];
};

// Créer un client
export const createClient = async (getToken: () => Promise<string | null>, clientData: ClientForm) => {
  const response = await fetch(`${API_BASE_URL}/clients`, {
    method: "POST",
    headers: await getHeaders(getToken),
    body: JSON.stringify(clientData),
  });

  if (!response.ok) throw new Error("Erreur lors de la création du client");
  return await response.json();
};

// Récupérer un seul client par ID
export const getClientById = async (getToken: () => Promise<string | null>, id: string) => {
  const response = await fetch(`${API_BASE_URL}/clients/${id}`, {
    method: "GET",
    headers: await getHeaders(getToken),
  });

  if (!response.ok) throw new Error("Client introuvable");
  
  const data = await response.json();
  return data.client;
};

// Mettre à jour un client
export const updateClient = async (getToken: () => Promise<string | null>, id: string, data: any) => {
  const response = await fetch(`${API_BASE_URL}/clients/${id}`, {
    method: "PATCH",
    headers: await getHeaders(getToken),
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Erreur lors de la mise à jour");
  return await response.json();
};

// Supprimer un client
export const deleteClient = async (getToken: () => Promise<string | null>, id: string) => {
  const response = await fetch(`${API_BASE_URL}/clients/${id}`, {
    method: "DELETE",
    headers: await getHeaders(getToken),
  });

  if (!response.ok) throw new Error("Erreur lors de la suppression");
  return await response.json();
};