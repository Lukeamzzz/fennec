import api from "@/services/api";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

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

// Helper function to get the current user's authentication state as a Promise.
function getCurrentUser(): Promise<User | null> {
  const auth = getAuth();
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // Unsubscribe immediately after the first state change
      resolve(user);
    });
  });
}

export async function getInvestments(): Promise<Investment[]> {
  try {
    const user = await getCurrentUser();

    if (user) {
      // User is authenticated, make the API call
      const response = await api.get("/api/investment/list-investments");
      return response.data;
    } else {
      // User is not authenticated
      console.warn("User is not authenticated. Cannot fetch investments.");
      throw new Error("User not authenticated.");
    }
  } catch (err: any) {
    console.error("Error al obtener inversiones:", err);
    throw new Error("No se pudo obtener las inversiones");
  }
}