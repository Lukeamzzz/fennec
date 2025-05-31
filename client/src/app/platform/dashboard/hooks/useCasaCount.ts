import { useEffect, useState } from "react";
import api from "@/services/api";
import { useAuth } from "@/providers/AuthProvider";

export function useCasaCount(alcaldia: string, tipo: string) {
  const [cantidad, setCantidad] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { loading: authLoading, idToken } = useAuth();

  useEffect(() => {
    if (authLoading || !alcaldia) return;
    if (idToken === null) return;

    setLoading(true);
    setError(null);
    
    const endpoint = tipo === "Casa" ? "/api/casa/cantidad" : "/api/departamento/cantidad";
    
    api
      .post(endpoint, { alcaldia })
      .then((res) => {
        setCantidad(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener cantidad de propiedades", err);
        setError("Error al obtener cantidad");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [alcaldia, authLoading, idToken, tipo]);

  return { cantidad, loading, error };
}