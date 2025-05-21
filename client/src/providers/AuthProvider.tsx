"use client";

import { User, getIdToken, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import api from "../services/api";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  idToken: string | null;
  role: string | null;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  idToken: null,
  role: null,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          const token = await getIdToken(firebaseUser);
          setIdToken(token);

          await api.post("/auth/google");
          setRole("premium"); // Temporal
        } catch (err) {
          console.error(err);
          setIdToken(null);
          setRole(null);
        }
      } else {
        // Limpiar el token y el rol si el usuario no está autenticado
        setIdToken(null);
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setIdToken(null);
      setRole(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, idToken, role, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Crear el hook para cualquier lado de la app consumir el context
export const useAuth = () => {
  return useContext(AuthContext);
};
