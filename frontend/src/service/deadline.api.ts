import { useApi } from "../hooks/useApi";
import type { Deadline } from "../types/deadlines";

// Interface pour correspondre à ton schéma Prisma

// 1. Récupérer toutes les échéances (Dashboard / Page Obligations)
export const getDeadlines = async (api: ReturnType<typeof useApi>) => {
  const response = await api.get<Deadline[]>("/deadlines");
  return response.data; // Ton backend renvoie directement le tableau
};

// 2. Récupérer les échéances d'un client spécifique
export const getClientDeadlines = async (api: ReturnType<typeof useApi>, clientId: string) => {
  const response = await api.get<Deadline[]>(`/deadlines/client/${clientId}`);
  return response.data;
};

// 3. Créer une nouvelle échéance
export const createDeadline = async (api: ReturnType<typeof useApi>, data: Partial<Deadline>) => {
  const response = await api.post<Deadline>("/deadlines", data);
  return response.data;
};

// 4. Mettre à jour le statut (C'est ce que ton bouton utilise)
export const updateDeadlineStatus = async (
  api: ReturnType<typeof useApi>, 
  id: string, 
  status: string
) => {
  const response = await api.patch<{ message: string }>(`/deadlines/${id}/status`, { status });
  return response.data;
};

// 5. Supprimer une échéance
export const deleteDeadline = async (api: ReturnType<typeof useApi>, id: string) => {
  const response = await api.delete<{ message: string }>(`/deadlines/${id}`);
  return response.data;
};