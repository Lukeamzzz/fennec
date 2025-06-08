import { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "@/providers/AuthProvider";
import api from "@/services/api";

// Interface para los datos de alcaldías
export interface AlcaldiaData {
  precioCasa: number;
  precioDepto: number;
  precioM2Casa: number;
  precioM2Depto: number;
}

// Interface para la respuesta de la API
interface ApiResponse {
  data?: {
    promedio?: number;
  } | number;
}

// Función helper para extraer el valor numérico de la respuesta
const extractNumericValue = (response: ApiResponse): number => {
  if (typeof response.data === 'number') {
    return response.data;
  }
  if (typeof response.data === 'object' && response.data?.promedio) {
    return response.data.promedio;
  }
  return 0;
};

// Hook personalizado para obtener datos de múltiples alcaldías
export const useAlcaldiasData = (alcaldias: string[]) => {
  const [data, setData] = useState<Record<string, AlcaldiaData>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, loading: authLoading } = useAuth();

  const [alcaldiasData, setAlcaldiasData] = useState<AlcaldiaData[]>([]);

  // Función para procesar los datos de alcaldías
  const processAlcaldiasData = useCallback((data: Record<string, unknown>[]): AlcaldiaData[] => {
    return data.map((item: Record<string, unknown>) => ({
      precioCasa: Number(item.precioCasa || 0),
      precioDepto: Number(item.precioDepto || 0),
      precioM2Casa: Number(item.precioM2Casa || 0),
      precioM2Depto: Number(item.precioM2Depto || 0),
    }));
  }, []);

  // Memoizar la cadena de alcaldías para evitar re-renders innecesarios
  const alcaldiasKey = useMemo(() => alcaldias.join(','), [alcaldias]);

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
          const timeoutPromise = new Promise<never>((_, reject) => {
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
          ] = await Promise.race([fetchPromise, timeoutPromise]) as ApiResponse[];

          return {
            alcaldia,
            data: {
              precioCasa: extractNumericValue(casaPromedioRes),
              precioDepto: extractNumericValue(deptoPromedioRes),
              precioM2Casa: extractNumericValue(casaM2Res),
              precioM2Depto: extractNumericValue(deptoM2Res),
            }
          };
        });

        const results = await Promise.all(promises);
        const newData: Record<string, AlcaldiaData> = {};
        
        results.forEach(({ alcaldia, data }) => {
          newData[alcaldia] = data;
        });
        
        setData(newData);
        setAlcaldiasData(processAlcaldiasData(results));
      } catch (err: unknown) {
        console.error("Error fetching alcaldías data:", err);
        
        const error = err as Error & { response?: { status: number }; code?: string };
        
        // Manejo específico de diferentes tipos de errores
        if (error.message === 'Timeout' || error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
          setError("⏱️ Las peticiones están tardando mucho. Verifica que el servidor esté funcionando.");
        } else if (error.response?.status === 401) {
          setError("🔒 No tienes permisos para acceder a estos datos. Por favor, inicia sesión.");
        } else if (error.response?.status === 500) {
          setError("🔧 Error del servidor. Por favor, intenta más tarde.");
        } else if (error.code === 'NETWORK_ERROR' || !error.response) {
          setError("🌐 Error de conexión. Verifica tu conexión a internet y que el servidor esté corriendo.");
        } else {
          setError("❌ Error al obtener datos de las alcaldías. Por favor, intenta más tarde.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAlcaldiasData();
  }, [alcaldias, alcaldiasKey, user, authLoading, processAlcaldiasData]);


  return { data, loading: loading || authLoading, error, alcaldiasData };
}; 