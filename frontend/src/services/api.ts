import type { Incident } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const api = {
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

    create: async (data: Omit<Incident, "id" | "createdAt">) => {
      const res = await fetch(`${API_URL}/incidents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Falha ao criar incidente");
      return res.json();
    },

    update: async (id: string, data: Partial<Incident>) => {
      const res = await fetch(`${API_URL}/incidents/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Falha ao atualizar incidente");
      return res.json();
    },

    delete: async (id: string) => {
      const res = await fetch(`${API_URL}/incidents/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Falha ao deletar incidente");
    },
  },
};
