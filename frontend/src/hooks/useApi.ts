import { useAuth } from "@clerk/clerk-react";
import { useCallback } from "react";

export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const useApi = () => {
  const { getToken } = useAuth();

  const request = useCallback(async (endpoint: string, options: RequestInit = {}) => {
    const token = await getToken();
    
    const headers = new Headers(options.headers);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    // Si on n'envoie pas de FormData, on définit le JSON par défaut
    if (!(options.body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }

    // Nettoyage rigoureux :
    const base = API_BASE_URL.replace(/\/$/, '');
    const path = endpoint.replace(/^\//, '');

    // FORCE l'ajout de /api si tu vois qu'il manque dans les logs
    const cleanUrl = base.includes('/api') 
      ? `${base}/${path}` 
      : `${base}/api/${path}`;

    console.log("Appel API vers :", cleanUrl);

      const response = await fetch(cleanUrl, {
        ...options,
        headers,
      });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Erreur réseau");
    }

    // Pour les DELETE sans contenu
    if (response.status === 204) return null;

    return response.json();
  }, [getToken]);

  return { request };
};