import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import api from "@/services/api";
import {AxiosError} from "axios";

export function useAverageM2AllCasa() {
  const [averageM2Price, setAveragePrice] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoading(true);
        setError(null);

        try {
          const response = await api.post("/api/casa/m2_todas");
          setAveragePrice(response.data);
        } catch (err) {
          if (err && typeof err === "object" && "isAxiosError" in err) {
            const axiosError = err as AxiosError;
            console.error("Error al obtener promedio de m2 de todas las casas:", axiosError.message);

            if (axiosError.response?.status === 401) {
              setError("No autorizado - verifica tu sesión");
            } else {
              setError("No se pudo obtener el promedio");
            }
          } else {
            console.error("Error desconocido:", err);
            setError("Ocurrió un error inesperado");
          }
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return { averageM2Price, loading, error };
}
