import { useState, useEffect } from "react";
import api from "@/services/api";

export function useAverageM2AllCasa() {
    const [averageM2Price, setAveragePrice] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAverage = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.post("/api/casa/m2_todas");
                // Si el backend retorna un número directamente
                setAveragePrice(response.data/10);
            } catch (err) {
                console.error("Error al obtener promedio:", err);
                setError("No se pudo obtener el promedio");
            } finally {
                setLoading(false);
            }
        };

        fetchAverage();
    }, []);

    return { averageM2Price, loading, error };
}
