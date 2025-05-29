import { useCallback } from "react";
import { getAuth } from "firebase/auth";
import api from "@/services/api";


export function useReporteGenerator() {
    const generarReporte = useCallback(async (input: any) => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) throw new Error("Usuario no autenticado");

            const idToken = await user.getIdToken();
            const idUsuario = user.uid;

            const payload = {
                ...input,
                idUsuario
            };

            await api.post("/api/create-new-report", payload, {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            });
        } catch (error) {
            console.error("Error al generar reporte:", error);
        }
    }, []);

    return { generarReporte };
}
