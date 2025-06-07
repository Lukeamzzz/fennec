// app/not-found.tsx
"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    const goToDashboard = () => {
        router.push("/dashboard"); // Ajusta si tu ruta de dashboard es diferente
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center px-4">
            <h1 className="text-4xl font-bold mb-4">404 - Página no encontrada</h1>
            <p className="mb-6">La ruta que intentaste visitar no existe.</p>
            <button
                onClick={goToDashboard}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
                Ir al Dashboard
            </button>
        </div>
    );
}
