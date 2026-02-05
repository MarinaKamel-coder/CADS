import type {Alert} from '../types/alerts';


/**
 * Récupère toutes les alertes de l'utilisateur connecté
 */
export const getAlerts = async (api: any): Promise<Alert[]> => {
  // On enlève le premier /api car il est déjà dans la config de base
  const response = await api.get("/alerts"); 
  return response.data;
};

export const markAlertAsRead = async (api: any, id: string): Promise<void> => {
  await api.patch(`/alerts/${id}/read`);
};

export const clearReadAlerts = async (api: any): Promise<{ message: string }> => {
  const response = await api.delete("/alerts/clear");
  return response.data;
};