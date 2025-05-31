import api from "@/services/api";

export interface Investment {
  monto_invertido: number;
  precio_propiedad: number;
  tipo_propiedad: string;
  direccion: string;
  descripcion: string;
  alcaldia: string;
  colonia: string;
  dimensiones_m2: number;
  fecha_inversion: string;
  banos: number;
  recamaras: number;
  estacionamientos: number;
  id_usuario: string;
}

export async function getInvestments(): Promise<Investment[]> {
  const response = await api.get("/api/investment/list-investments");
  if (response.status >= 400) {
    throw new Error(`Error al obtener inversiones: ${response.data}`);
  }
  return response.data;
}
