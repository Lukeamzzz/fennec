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

export async function getREIT({ reit }: { reit: string }): Promise<REITData> {
  try {
    console.log(`Obteniendo datos para REIT: ${reit}`);
    
    const response = await api.get(`/fibras/${reit.toUpperCase()}`);
    
    if (response.status >= 400) {
      const errorData = response.data as ApiError;
      throw new Error(`Error al obtener datos de ${reit}: ${errorData.detail || 'Error desconocido'}`);
    }
    
    console.log(`Datos obtenidos para ${reit}:`, response.data);
    return response.data;
    
  } catch (error: any) {
    console.error(`Error al obtener REIT ${reit}:`, error);
    
    // Manejar diferentes tipos de errores
    if (error.response) {
      // Error de respuesta del servidor
      const status = error.response.status;
      const errorData = error.response.data as ApiError;
      
      if (status === 404) {
        throw new Error(`FIBRA ${reit} no encontrada. Verifica que el nombre sea correcto.`);
      } else if (status === 500) {
        throw new Error(`Error del servidor al obtener ${reit}: ${errorData.detail || 'Error interno'}`);
      } else {
        throw new Error(`Error ${status} al obtener ${reit}: ${errorData.detail || 'Error desconocido'}`);
      }
    } else if (error.request) {
      // Error de red
      throw new Error(`Error de conexión al obtener datos de ${reit}. Verifica tu conexión a internet.`);
    } else {
      // Otros errores
      throw new Error(`Error inesperado al obtener ${reit}: ${error.message}`);
    }
  }
}

export async function getAllREITs(): Promise<REITData[]> {
  try {
    console.log('Obteniendo datos de todas las FIBRAs');
    
    const response = await api.get('/fibras/');
    
    if (response.status >= 400) {
      const errorData = response.data as ApiError;
      throw new Error(`Error al obtener todas las FIBRAs: ${errorData.detail || 'Error desconocido'}`);
    }
    
    console.log(`Datos obtenidos para ${response.data.length} FIBRAs`);
    return response.data;
    
  } catch (error: any) {
    console.error('Error al obtener todas las FIBRAs:', error);
    
    if (error.response) {
      const errorData = error.response.data as ApiError;
      throw new Error(`Error del servidor: ${errorData.detail || 'Error interno'}`);
    } else if (error.request) {
      throw new Error('Error de conexión. Verifica tu conexión a internet.');
    } else {
      throw new Error(`Error inesperado: ${error.message}`);
    }
  }
}

export async function getAvailableREITs(): Promise<string[]> {
  try {
    console.log('Obteniendo FIBRAs disponibles');
    
    const response = await api.get('/fibras/disponibles');
    
    if (response.status >= 400) {
      const errorData = response.data as ApiError;
      throw new Error(`Error al obtener FIBRAs disponibles: ${errorData.detail || 'Error desconocido'}`);
    }
    
    console.log('FIBRAs disponibles:', response.data);
    return response.data;
    
  } catch (error: any) {
    console.error('Error al obtener FIBRAs disponibles:', error);
    
    if (error.response) {
      const errorData = error.response.data as ApiError;
      throw new Error(`Error del servidor: ${errorData.detail || 'Error interno'}`);
    } else if (error.request) {
      throw new Error('Error de conexión. Verifica tu conexión a internet.');
    } else {
      throw new Error(`Error inesperado: ${error.message}`);
    }
  }
}