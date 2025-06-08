import api from "@/services/api";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

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

// Helper function to get the current user's authentication state as a Promise
function getCurrentUser(): Promise<User | null> {
  const auth = getAuth();
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // Unsubscribe immediately after the first state change
      resolve(user);
    });
  });
}

export async function getApartments(): Promise<Apartment[]> {
  try {
    const user = await getCurrentUser();

    if (user) {
      // User is authenticated, make the API call
      const response = await api.get("/api/departamento/list-departamentos");
      return response.data;
    } else {
      // User is not authenticated
      console.warn("User is not authenticated. Cannot fetch apartments.");
      throw new Error("User not authenticated.");
    }
  } catch (err) {
    console.error("Error al obtener inversiones:", err);
    throw new Error("No se pudo obtener las inversiones");
  }
}
