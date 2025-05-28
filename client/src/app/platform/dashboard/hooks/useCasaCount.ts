import { useEffect, useState } from "react";
import api from "@/services/api";

export function useCasaCount(alcaldia: string) {
    const [cantidad, setCantidad] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!alcaldia) return;

        setLoading(true);
        setError(null);

        api
            .post("/api/casa/cantidad", { alcaldia })
            .then((res) => {
                setCantidad(res.data);
            })
            .catch((err) => {
                console.error("Error al obtener cantidad de casas", err);
                setError("Error al obtener cantidad");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [alcaldia]);

    return { cantidad, loading, error };
}
