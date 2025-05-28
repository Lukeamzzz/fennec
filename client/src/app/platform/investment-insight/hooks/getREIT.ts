import api from "@/services/fastAPI/api";

export interface REITData {
  ticker: string;
  precio: number;
  fecha: string;
}

export async function getREIT({ reit }: { reit: string }): Promise<REITData> {
  const response = await api.get(`/fibras/${reit}`);
  if (response.status >= 400) {
    throw new Error(`Error al obtener datos de ${reit}: ${response.data}`);
  }
  console.log(response.data);
  return response.data;
}
