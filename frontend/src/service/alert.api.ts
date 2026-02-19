import type { Alert } from '../types/alerts';

// On récupère l'URL de base définie dans ton .env
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
/**
 * Helper pour configurer les headers communs (JSON + Auth)
 */
const getHeaders = async (getToken: () => Promise<string | null>) => {
  const token = await getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
  };
};

/**
 * Récupère toutes les notifications/alertes
 */
export const getAlerts = async (getToken: () => Promise<string | null>): Promise<Alert[]> => {
  const response = await fetch(`${API_BASE_URL}/alerts`, {
    method: "GET",
    headers: await getHeaders(getToken),
  });

  if (!response.ok) throw new Error("Erreur serveur");
  
  const data = await response.json(); 
  
  // Si data est déjà un tableau, on le renvoie tel quel. 
  // Sinon on renvoie un tableau vide pour éviter le 'undefined'.
  return Array.isArray(data) ? data : [];
};

/**
 * Marque une alerte spécifique comme lue
 */
export const markAlertAsRead = async (getToken: () => Promise<string | null>, id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/alerts/${id}/read`, {
    method: "PATCH",
    headers: await getHeaders(getToken),
  });

  if (!response.ok) throw new Error("Impossible de marquer l'alerte comme lue");
};

/**
 * Supprime les alertes lues
 */
export const clearReadAlerts = async (getToken: () => Promise<string | null>): Promise<{ message: string }> => {
  const response = await fetch(`${API_BASE_URL}/alerts/clear`, {
    method: "DELETE",
    headers: await getHeaders(getToken),
  });

  if (!response.ok) throw new Error("Erreur lors du nettoyage des alertes");

  return await response.json();
};