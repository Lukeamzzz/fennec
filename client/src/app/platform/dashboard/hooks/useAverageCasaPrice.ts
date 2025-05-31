import { useState, useEffect } from "react";
import api from "@/services/api";

export function useAverageCasaPrice(alcaldia: string, tipo: string) {
    const [averagePriceCasa, setAveragePrice] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorAvg, setErrorAvg] = useState<string | null>(null);

    useEffect(() => {
        if (!alcaldia) return;

        const fetchAverage = async () => {
            setLoading(true);
            setErrorAvg(null);
            try {
                const endpoint = tipo === "Casa" ? "/api/casa/promedio" : "/api/departamento/promedio";
                const response = await api.post(endpoint, { alcaldia });

                const promedio = response?.data?.promedio;
                const parsedPromedio = typeof promedio === "number"
                    ? promedio
                    : parseFloat(promedio ?? "0");

                const finalValue = isNaN(parsedPromedio) ? 0 : parsedPromedio;
                setAveragePrice(finalValue);
            } catch (err) {
                console.error("Error al obtener promedio:", err);
                setErrorAvg("No se pudo obtener el promedio");
            } finally {
                setLoading(false);
            }
        };

        fetchAverage();
    }, [alcaldia, tipo]);

    return { averagePriceCasa, loading, errorAvg };
}
