"use client";

import { User, getIdToken, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";

// Tipar lo que queremos compartir en el context
interface AuthContextProps {
    user: User | null;
    loading: boolean;
    idToken: string | null;
    role: string | null;
    logout: () => Promise<void>;
};

// Crear el context
const AuthContext = createContext<AuthContextProps>({
    user: null,
    loading: true,
    idToken: null,
    role: null,
    logout: async () => {}
});

// Crear el provider para envolver la app
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [idToken, setIdToken] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);
            if (firebaseUser) {
                try{
                    const token = await getIdToken(firebaseUser);
                    setIdToken(token);

                    // TODO: Llamar al back para obtener el role del usuario
                    setRole("premium"); // Temporal para probar

                    // Mejora: si existe una sesión, obtener el rol del session storage
                }
                catch (err){
                    console.error(err); // TODO: Mostrar al usuario que algo salió mal

                    // Limpiar el idToken y el role
                    setIdToken(null);
                    setRole(null);                    
                }
                setLoading(false);
            }
            else {
                setLoading(false);
            }
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
}