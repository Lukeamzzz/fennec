"use client";
import { User } from "firebase/auth";
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
interface MockUser {
  uid: string;
  email: string;
  displayName?: string;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && '__FIREBASE_AUTH_MOCK__' in window) {
      console.log('🧪 Cypress: Using Firebase Auth Mock');

      const mockAuth = (window as typeof window & {
        __FIREBASE_AUTH_MOCK__: {
          onAuthStateChanged: (cb: (user: MockUser | null) => void) => void;
        };
      }).__FIREBASE_AUTH_MOCK__;

      mockAuth.onAuthStateChanged((mockUser) => {
        setUser(mockUser);
        if (mockUser) {
          setIdToken('fake-token-cypress');
          setRole('usuario');
          api.defaults.headers.common["Authorization"] = `Bearer fake-token-cypress`;
        } else {
          setIdToken(null);
          setRole(null);
          delete api.defaults.headers.common["Authorization"];
        }
        setLoading(false);
      });

      return;
    }
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