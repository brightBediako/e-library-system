import axios, { AxiosError } from "axios";
import { useAuthStore } from "@/store/auth-store";

/**
 * Same-origin `/api` is rewritten by Next to the Nest server (see `next.config.ts`) — no CORS in dev.
 * Set `NEXT_PUBLIC_API_BASE_URL` to an absolute URL to talk to the API directly (e.g. production).
 */
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";

export const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (typeof FormData !== "undefined" && config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => Promise.reject(error),
);
