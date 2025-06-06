import api from "@/services/api";
export interface NumApartments {
  num_apartments: number;
}

export async function getNumApartments(): Promise<NumApartments> {
  const response = await api.get("api/departamento/num-departamentos");

  if (response.status >= 400) {
    throw new Error(`Error al crear inversión: ${response.data}`);
  }

  return response.data;
}
