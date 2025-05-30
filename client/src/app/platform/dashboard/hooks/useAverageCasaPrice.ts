import { useState, useEffect } from "react";
import api from "@/services/api";

export function useAverageCasaPrice(alcaldia: string) {
    const [averagePriceCasa, setAveragePrice] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorAvg, setErrorAvg] = useState<string | null>(null);

    useEffect(() => {
        if (!alcaldia) return;

        const fetchAverage = async () => {
            setLoading(true);
            setErrorAvg(null);
            try {
                const response = await api.post("/api/casa/promedio", { alcaldia });

                const promedio = response?.data?.promedio;

                const parsedPromedio = typeof promedio === "number"
                    ? promedio
                    : parseFloat(promedio ?? "0");

                const finalValue = isNaN(parsedPromedio) ? 0 : parsedPromedio;

                setAveragePrice(finalValue);

                console.log("Promedio calculado:", finalValue);

            } catch (err) {
                console.error("Error al obtener promedio:", err);
                setErrorAvg("No se pudo obtener el promedio");
            } finally {
                setLoading(false);
            }
        };

        fetchAverage();
    }, [alcaldia]);

    return { averagePriceCasa, loading, errorAvg };
}
