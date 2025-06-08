import api from "@/services/fastAPI/api";

export interface REITData {
  nombre: string;
  precio: number;
  fecha: string;
  variacion: number;
  ticker?: string;
  volumen?: number;
  nombre_completo?: string;
}

export interface ApiError {
  detail: string;
}

interface GetREITParams {
  reit: string;
}

interface AxiosError {
  response?: { 
    status: number; 
    data?: ApiError | string | Record<string, unknown>;
  };
  message: string;
}

export async function getREIT({ reit }: GetREITParams): Promise<REITData> {
  try {
    console.log(`Obteniendo datos para REIT: ${reit}`);

    const response = await api.get<REITData>(`/fibras/${reit.toUpperCase()}`);

    if (response.status >= 400) {
      const errorData = response.data as unknown as ApiError;
      throw new Error(`Error al obtener datos de ${reit}: ${errorData.detail || 'Error desconocido'}`);
    }

    console.log(`Datos obtenidos para ${reit}:`, response.data);
    return response.data;

  } catch (error: unknown) {
    console.error(`Error al obtener REIT ${reit}:`, error);

    if (isAxiosError(error)) {
      const status = error.response?.status;
      const errorData = error.response?.data as ApiError;

      if (status === 404) {
        throw new Error(`FIBRA ${reit} no encontrada. Verifica que el nombre sea correcto.`);
      } else if (status === 500) {
        throw new Error(`Error del servidor al obtener ${reit}: ${errorData?.detail || 'Error interno'}`);
      } else {
        throw new Error(`Error ${status} al obtener ${reit}: ${errorData?.detail || 'Error desconocido'}`);
      }
    } else {
      throw new Error(`Error inesperado al obtener ${reit}: ${(error as Error).message}`);
    }
  }
}

export async function getAllREITs(): Promise<REITData[]> {
  try {
    console.log("Obteniendo datos de todas las FIBRAs");

    const response = await api.get<REITData[]>("/fibras/");

    if (response.status >= 400) {
      const errorData = response.data as unknown as ApiError;
      throw new Error(`Error al obtener todas las FIBRAs: ${errorData.detail || 'Error desconocido'}`);
    }

    console.log(`Datos obtenidos para ${response.data.length} FIBRAs`);
    return response.data;

  } catch (error: unknown) {
    console.error("Error al obtener todas las FIBRAs:", error);

    if (isAxiosError(error)) {
      const errorData = error.response?.data as ApiError;
      throw new Error(`Error del servidor: ${errorData?.detail || 'Error interno'}`);
    } else {
      throw new Error(`Error inesperado: ${(error as Error).message}`);
    }
  }
}

export async function getAvailableREITs(): Promise<string[]> {
  try {
    console.log("Obteniendo FIBRAs disponibles");

    const response = await api.get<string[]>("/fibras/disponibles");

    if (response.status >= 400) {
      const errorData = response.data as unknown as ApiError;
      throw new Error(`Error al obtener FIBRAs disponibles: ${errorData.detail || 'Error desconocido'}`);
    }

    console.log("FIBRAs disponibles:", response.data);
    return response.data;

  } catch (error: unknown) {
    console.error("Error al obtener FIBRAs disponibles:", error);

    if (isAxiosError(error)) {
      const errorData = error.response?.data as ApiError;
      throw new Error(`Error del servidor: ${errorData?.detail || 'Error interno'}`);
    } else {
      throw new Error(`Error inesperado: ${(error as Error).message}`);
    }
  }
}

function isAxiosError(error: unknown): error is AxiosError {
  return typeof error === "object" && error !== null && "response" in error;
}
