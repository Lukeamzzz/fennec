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
  fecha_inversion: string; // ISO format
  banos: number;
  recamaras: number;
  estacionamientos: number;
  id_usuario: string;
}

export async function createInvestment(
  investment: Investment
): Promise<Investment> {
  const response = await api.post("api/investment", investment);

  if (response.status >= 400) {
    throw new Error(`Error al crear inversión: ${response.data}`);
  }

  return response.data;
}
