import { useCallback, useState } from "react";
import type { Incident } from "../types";
import type { IncidentFormData } from "../schemas/incident.schema";
import { api } from "../services/api";

export function useIncidentForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createIncident = useCallback(
    async (data: IncidentFormData) => {
      try {
        setLoading(true);
        setError(null);
        const result = await api.incidents.create(data);
        return result;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Falha ao criar incidente";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateIncident = useCallback(
    async (id: string, data: Partial<Incident>) => {
      try {
        setLoading(true);
        setError(null);
        const result = await api.incidents.update(id, data);
        return result;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Falha ao atualizar incidente";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteIncident = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await api.incidents.delete(id);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Falha ao deletar incidente";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    createIncident,
    updateIncident,
    deleteIncident,
  };
}
