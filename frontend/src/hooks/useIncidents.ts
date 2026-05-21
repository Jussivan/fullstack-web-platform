import { useState, useEffect } from "react";
import type { Incident } from "../types";
import { api } from "../services/api";

export function useIncidents() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadIncidents = async () => {
    try {
      setLoading(true);
      const data = await api.incidents.getAll();
      setIncidents(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao carregar incidentes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIncidents();
  }, []);

  return {
    incidents,
    loading,
    error,
    refetch: loadIncidents,
  };
}
