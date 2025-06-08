import api from "@/services/api";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

export interface NumApartments {
  num_apartments: number;
}

// Helper function to get the current user's authentication state as a Promise
function getCurrentUser(): Promise<User | null> {
  const auth = getAuth();
  
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

export async function getNumApartments(): Promise<NumApartments> {
  try{
    const user = await getCurrentUser();

    if(user){
      const response = await api.get("/api/departamento/num-departamentos");
      return response.data;
    }
    else{
      console.warn("User is not authenticated. Cannot fetch num-departamentos.");
      throw new Error("User not authenticated.");
    }
  }
  catch(err){
    console.error("Error al obtener num-departamentos:", err);
    throw err;
  }
}
