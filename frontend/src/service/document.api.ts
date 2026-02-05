import { useApi } from "../hooks/useApi";

export const uploadDocument = async (
  api: ReturnType<typeof useApi>, 
  clientId: string, 
  file: File, 
  type: string
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);
  formData.append("clientId", clientId);

  const response = await api.post(`/documents/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getClientDocuments = async (api: ReturnType<typeof useApi>, clientId: string) => {
  const response = await api.get(`/documents/client/${clientId}`);
  return response.data.documents;
};