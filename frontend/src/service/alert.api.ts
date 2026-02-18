import type { Alert } from '../types/alerts';

/**
 * Récupère toutes les notifications/alertes de l'utilisateur.
 * Backend : GET /api/alerts
 */
export const getAlerts = async (api: { request: Function }): Promise<Alert[]> => {
  return await api.request("/alerts");
};

/**
 * Marque une alerte spécifique comme lue.
 * Backend : PATCH /api/alerts/:id/read
 */
export const markAlertAsRead = async (api: { request: Function }, id: string): Promise<void> => {
  await api.request(`/alerts/${id}/read`, {
    method: "PATCH"
  });
};

/**
 * Supprime définitivement toutes les alertes ayant le statut 'read: true'.
 * Backend : DELETE /api/alerts/clear
 */
export const clearReadAlerts = async (api: { request: Function }): Promise<{ message: string }> => {
  return await api.request("/alerts/clear", {
    method: "DELETE"
  });
};