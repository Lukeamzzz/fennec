import { useState } from "react";
import api from "@/services/api";

export interface PredictionInput {
    tipo: "Casa" | "Departamento";
    alcaldia: string;
    metro_cuadrados: number;
    recamaras: number;
    banos: number;
    estacionamientos: number;
}

export interface PredictionResponse {
    tipo_propiedad: string;
    precio_estimado: number;
    alcaldia: string;
    caracteristicas: {
        metros_cuadrados: number;
        recamaras: number;
        banos: number;
        estacionamientos: number;
    };
    fecha_prediccion: string;
}

export function usePropertyEstimator() {
    const [loading, setLoading] = useState(false);
    const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const submitPrediction = async (input: PredictionInput) => {
        setLoading(true);
        setError(null);

        const endpoint =
            input.tipo === "Casa" ? "/api/estimar/casa" : "/api/estimar/departamento";

        const body = {
            alcaldia: input.alcaldia,
            metros_cuadrados: input.metro_cuadrados,
            recamaras: input.recamaras,
            banos: input.banos,
            estacionamientos: input.estacionamientos,
        };
        console.log("Enviando request a", endpoint, "con datos:", body);


        try {
            const response = await api.post<PredictionResponse>(endpoint, body);
            setPrediction(response.data);
        } catch (err: any) {
            const status = err?.response?.status || 500;
            const message = err?.response?.data?.message || err.message || "Error inesperado";
            setError(`Error ${status}: ${message}`);
        } finally {
            setLoading(false);
        }
    };

    return { submitPrediction, prediction, loading, error };
}
