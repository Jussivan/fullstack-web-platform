import type { Incident, AuthResponse, LoginInput, RegisterInput } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
  auth: {
    register: async (data: RegisterInput): Promise<AuthResponse> => {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Falha ao registrar");
      }
      const response = await res.json();
      localStorage.setItem("token", response.token);
      return response;
    },

    login: async (data: LoginInput): Promise<AuthResponse> => {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Falha ao fazer login");
      }
      const response = await res.json();
      localStorage.setItem("token", response.token);
      return response;
    },

    logout: () => {
      localStorage.removeItem("token");
    },

    getToken: () => localStorage.getItem("token"),
  },

  incidents: {
    getAll: async (): Promise<Incident[]> => {
      const res = await fetch(`${API_URL}/incidents`);
      if (!res.ok) throw new Error("Falha ao buscar incidentes");
      return res.json();
    },

    getById: async (id: string): Promise<Incident> => {
      const res = await fetch(`${API_URL}/incidents/${id}`);
      if (!res.ok) throw new Error("Falha ao buscar incidente");
      return res.json();
    },

    create: async (data: Omit<Incident, "id" | "createdAt" | "updatedAt" | "userId">) => {
      const res = await fetch(`${API_URL}/incidents`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Falha ao criar incidente");
      return res.json();
    },

    update: async (id: string, data: Partial<Incident>) => {
      const res = await fetch(`${API_URL}/incidents/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Falha ao atualizar incidente");
      return res.json();
    },

    delete: async (id: string) => {
      const res = await fetch(`${API_URL}/incidents/${id}`, {
        method: "DELETE",
        headers: getAuthHeader(),
      });
      if (!res.ok) throw new Error("Falha ao deletar incidente");
    },
  },
};
