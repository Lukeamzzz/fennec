import { useEffect, useState } from "react";
import api from "@/services/api";
import { useAuth } from "@/providers/AuthProvider";

export function useAverageM2Price(alcaldia: string, tipo: string) {
  const [cantidad_m2, setCantidad] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { loading: authLoading, idToken } = useAuth();

  useEffect(() => {
    if (authLoading || !alcaldia) return;
    if (idToken === null) return;

    setLoading(true);
    setError(null);
    
    const endpoint = tipo === "Casa" ? "/api/casa/m2_promedio" : "/api/departamento/m2_promedio";
    
    api
      .post(endpoint, { alcaldia })
      .then((res) => {
        setCantidad(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener precio promedio por m2", err);
        setError("Error al obtener precio por m2");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [alcaldia, authLoading, idToken, tipo]);

  return { cantidad_m2, loading, error };
}