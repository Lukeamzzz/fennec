import { useEffect, useState } from "react";
import api from "@/services/api";

export function useAverageM2Price(alcaldia: string) {
    const [cantidad_m2, setCantidad] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!alcaldia) return;

        setLoading(true);
        setError(null);

        api
            .post("/api/casa/m2_promedio", { alcaldia })
            .then((res) => {
                setCantidad(res.data/10);
            })
            .catch((err) => {
                console.error("Error al obtener cantidad de casas", err);
                setError("Error al obtener cantidad");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [alcaldia]);

    return { cantidad_m2, loading, error };
}
