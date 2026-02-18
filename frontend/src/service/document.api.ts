export const uploadDocument = async (
  api: { request: Function }, 
  clientId: string, 
  file: File, 
  type: string
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);
  formData.append("clientId", clientId);

  return await api.request("/documents/upload", {
    method: "POST",
    body: formData, // Fetch détecte le FormData et gère les headers
  });
};

// Récupérer les documents d'un client
export const getClientDocuments = async (api: { request: Function }, clientId: string) => {
  const data = await api.request(`/documents/client/${clientId}`);
  return data.documents || [];
};