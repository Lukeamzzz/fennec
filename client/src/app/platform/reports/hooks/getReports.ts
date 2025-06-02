import api from "@/services/api";

export const getReports = async () => {
  const response = await api.get("api/list-reportes");

  if (response.status >= 400) {
    throw new Error(`Error al obtener reportes: ${response.data}`);
  }
  console.log("Reports", response.data);

  return response.data;
};
