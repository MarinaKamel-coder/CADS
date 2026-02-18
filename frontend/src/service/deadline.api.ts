
// 1. Récupérer toutes les échéances
export const getDeadlines = async (api: { request: Function }) => {
  return await api.request("/deadlines");
};

// 2. Récupérer les échéances d'un client spécifique
export const getClientDeadlines = async (api: { request: Function }, clientId: string) => {
  return await api.request(`/deadlines/client/${clientId}`);
};

// 3. Créer une nouvelle échéance
export const createDeadline = async (api: { request: Function }, data: any) => {
  return await api.request("/deadlines", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// 4. Mettre à jour le statut
export const updateDeadlineStatus = async (
  api: { request: Function }, 
  id: string, 
  status: "PENDING" | "COMPLETED" | "OVERDUE"
) => {
  return await api.request(`/deadlines/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
};

// 5. Supprimer une échéance
export const deleteDeadline = async (api: { request: Function }, id: string) => {
  return await api.request(`/deadlines/${id}`, {
    method: "DELETE",
  });
};