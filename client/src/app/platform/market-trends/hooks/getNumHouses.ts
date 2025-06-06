import api from "@/services/api";
export interface NumHouses {
  num_houses: number;
}

export async function getNumHouses(): Promise<NumHouses> {
  const response = await api.get("api/casa/num-casas");

  if (response.status >= 400) {
    throw new Error(`Error al crear inversión: ${response.data}`);
  }

  return response.data;
}
