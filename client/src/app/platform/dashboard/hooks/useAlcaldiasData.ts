import { useState, useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import api from "@/services/api";

// Interface para los datos de alcaldías
export interface AlcaldiaData {
  precioCasa: number;
  precioDepto: number;
  precioM2Casa: number;
  precioM2Depto: number;
}

// Hook personalizado para obtener datos de múltiples alcaldías
export const useAlcaldiasData = (alcaldias: string[]) => {
  const [data, setData] = useState<Record<string, AlcaldiaData>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    const fetchAlcaldiasData = async () => {
      // No hacer peticiones si no hay alcaldías seleccionadas
      if (alcaldias.length === 0) return;
      
      // No hacer peticiones si el usuario no está autenticado o aún está cargando
      if (authLoading || !user) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        const promises = alcaldias.map(async (alcaldia) => {
          // Crear un timeout específico para cada petición (8 segundos)
          const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Timeout')), 8000);
          });

          const fetchPromise = Promise.all([
            api.post("/api/casa/promedio", { alcaldia }),
            api.post("/api/departamento/promedio", { alcaldia }),
            api.post("/api/casa/m2_promedio", { alcaldia }),
            api.post("/api/departamento/m2_promedio", { alcaldia })
          ]);

          // Usar Promise.race para aplicar el timeout
          const [
            casaPromedioRes,
            deptoPromedioRes,
            casaM2Res,
            deptoM2Res
          ] = await Promise.race([fetchPromise, timeoutPromise]) as any[];

          return {
            alcaldia,
            data: {
              precioCasa: casaPromedioRes?.data?.promedio || casaPromedioRes?.data || 0,
              precioDepto: deptoPromedioRes?.data?.promedio || deptoPromedioRes?.data || 0,
              precioM2Casa: casaM2Res?.data || 0,
              precioM2Depto: deptoM2Res?.data || 0,
            }
          };
        });

        const results = await Promise.all(promises);
        const newData: Record<string, AlcaldiaData> = {};
        
        results.forEach(({ alcaldia, data }) => {
          newData[alcaldia] = data;
        });
        
        setData(newData);
      } catch (err: any) {
        console.error("Error fetching alcaldías data:", err);
        
        // Manejo específico de diferentes tipos de errores
        if (err.message === 'Timeout' || err.code === 'ECONNABORTED' || err.message.includes('timeout')) {
          setError("⏱️ Las peticiones están tardando mucho. Verifica que el servidor esté funcionando.");
        } else if (err.response?.status === 401) {
          setError("🔒 No tienes permisos para acceder a estos datos. Por favor, inicia sesión.");
        } else if (err.response?.status === 500) {
          setError("🔧 Error del servidor. Por favor, intenta más tarde.");
        } else if (err.code === 'NETWORK_ERROR' || !err.response) {
          setError("🌐 Error de conexión. Verifica tu conexión a internet y que el servidor esté corriendo.");
        } else {
          setError("❌ Error al obtener datos de las alcaldías. Por favor, intenta más tarde.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAlcaldiasData();
  }, [alcaldias.join(','), user, authLoading]);

  return { data, loading: loading || authLoading, error };
}; 