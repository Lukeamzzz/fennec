import { useEffect, useState } from "react";
import api from "@/services/api";
import { useAuth } from "@/providers/AuthProvider";

export function useCasaCount(alcaldia: string) {
  const [cantidad, setCantidad] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { loading: authLoading, idToken } = useAuth(); // Get auth state

  useEffect(() => {
    // Don't make request if auth is still loading or no alcaldia
    if (authLoading || !alcaldia) return;
    
    // If user is authenticated but no token yet, wait
    if (idToken === null) return;

    setLoading(true);
    setError(null);
    
    api
      .post("/api/casa/cantidad", { alcaldia })
      .then((res) => {
        setCantidad(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener cantidad de casas", err);
        setError("Error al obtener cantidad");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [alcaldia, authLoading, idToken]); // Wait for the auth dependencies

  return { cantidad, loading, error };
}