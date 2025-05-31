import api from "@/services/api";

export interface Apartment {
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

export const getApartments = async (): Promise<Apartment[]> => {
  const response = await api.get("/departamento/list-departamentos");
  return response.data;
};
