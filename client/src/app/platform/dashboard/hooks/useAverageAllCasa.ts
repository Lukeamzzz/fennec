import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import api from "@/services/api";

export function useAverageAllCasa() {
  const [averagePrice, setAveragePrice] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is authenticated, make the API call
        setLoading(true);
        setError(null);

        try {
          const response = await api.post("/api/casa/promedio_todas");
          setAveragePrice(response.data);
          console.log("Promedio calculado:", response.data);
        } catch (err) {
          if (err instanceof Error) {
            console.error("Error al obtener promedio todas:", err.message);
          } else {
            console.error("Error desconocido al obtener promedio todas:", err);
          }



          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          if (err.response?.status === 401) {
            setError("No autorizado - verifica tu sesión");
          } else {
            setError("No se pudo obtener el promedio");
          }
        } finally {
          setLoading(false);
        }
      } else {
        // User is not authenticated
        setError("Usuario no autenticado");
        setLoading(false);
      }
    });


    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return { averagePrice, loading, error };
}