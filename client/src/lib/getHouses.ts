import api from "@/services/api";
export interface House {
  direccion: string;
  precio: number;
  alcaldia: string;
  colonia: string;
  recamaras: number;
  banos: number;
  estacionamientos: number;
  descripcion: string;
  dimensionesM2: number;
  precioPorM2: number;
  banosPorHabitacion: number;
  habitacionesTotales: number;
}

export const getHouses = async (): Promise<House[]> => {
  const response = await api.get("api/casa/list-casas");
  return response.data;
};
