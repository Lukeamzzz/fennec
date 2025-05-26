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

          // Inyectar token en Axios
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          const providerId = firebaseUser.providerData[0]?.providerId;
          if (providerId === "google.com") {
            await api.post("/auth/google");
            setRole("premium");
          }
        } catch (err) {
          console.error(err);
          setIdToken(null);
          setRole(null);
          delete api.defaults.headers.common["Authorization"];
        }
      } else {
        setIdToken(null);
        setRole(null);
        delete api.defaults.headers.common["Authorization"];
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
      delete api.defaults.headers.common["Authorization"];
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

export const useAuth = () => {
  return useContext(AuthContext);
};