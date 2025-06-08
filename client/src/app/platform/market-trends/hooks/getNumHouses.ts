import api from "@/services/api";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

export interface NumHouses {
  num_houses: number;
}

// Helper function to get current user's authentication state as a Promise
function getCurrentUser(): Promise<User | null> {
  const auth = getAuth();
  
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

export async function getNumHouses(): Promise<NumHouses> {
  try{
    const user = await getCurrentUser();

    if(user){
      // User is authenticated, make the API call
      const response = await api.get("/api/casa/num-casas");
      return response.data;
    }
    else{
      // User is not authenticated
      console.warn("User is not authenticated. Cannot fetch num-casas.");
      throw new Error("User not authenticated.");
    }
  }
  catch(err){
    console.error("Error al obtener num-casas:", err);
    throw err;
  }
}
