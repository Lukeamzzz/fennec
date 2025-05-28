import { useState, useEffect } from "react";
import api from "@/services/api";

export function useAverageCasaPrice(alcaldia: string) {
    const [averagePrice, setAveragePrice] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!alcaldia) return;

        const fetchAverage = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.post("/api/casa/promedio", { alcaldia });
                setAveragePrice(response.data.promedio);
            } catch (err) {
                console.error("Error al obtener promedio:", err);
                setError("No se pudo obtener el promedio");
            } finally {
                setLoading(false);
            }
        };

        fetchAverage();
    }, [alcaldia]);

    return { averagePrice, loading, error };
}
