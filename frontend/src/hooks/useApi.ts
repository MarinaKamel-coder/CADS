import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { useEffect } from "react";

const api = axios.create({ baseURL: API_BASE_URL });

export const useApi = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    const interceptor = api.interceptors.request.use(async (config) => {
      const token = await getToken();
      console.log("JWT token:", token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => api.interceptors.request.eject(interceptor);
  }, [getToken]);

  return api;
};
