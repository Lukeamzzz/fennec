"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import api from "@/services/api";
import { useAuth } from "@/providers/AuthProvider";

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const { user } = useAuth();

    useEffect(() => {
        const validatePaymentAndSendEmail = async () => {
            try {
                if (!sessionId || !user) {
                    setStatus("error");
                    return;
                }

                const token = await user.getIdToken();
                const uid = user.uid;

                // Validar el pago
                const response = await api.post("/payments/payment-success", {
                    sessionId: sessionId,
                });

                if (response.status === 200) {
                    // Enviar correo
                    await api.post("/api/email", {
                        firebaseUID: uid,
                        subject: "Gracias por suscribirte",
                        message: `
                                        <h1>¡Gracias por tu compra!</h1>
                                        <p>Tu pago fue exitoso y tu cuenta ya está activa.</p>
                                        <p>Accede a tu panel en <a href="https://fennec.mx/platform/dashboard">Fennec Dashboard</a></p>
                                        `,
                    });


                    setStatus("success");
                } else {
                    setStatus("error");
                }
            } catch (error) {
                console.error("Error en validación o envío de correo:", error);
                setStatus("error");
            }
        };

        validatePaymentAndSendEmail();
    }, [sessionId, user]);

    return (
        <main className="min-h-screen flex items-center justify-center bg-white px-6">
            <div className="max-w-md w-full text-center">
                {status === "loading" && (
                    <p className="text-gray-700 text-lg">Validando pago...</p>
                )}

                {status === "success" && (
                    <>
                        <h1 className="text-4xl font-bold text-green-600 mb-4">Pago exitoso</h1>
                        <p className="text-gray-700 text-lg mb-6">
                            Tu transacción fue procesada correctamente.
                        </p>
                        <Link
                            href="/platform/dashboard"
                            className="bg-green-600 text-white px-6 py-3 rounded-2xl shadow hover:bg-green-700 transition"
                        >
                            Ir al dashboard
                        </Link>
                    </>
                )}

                {status === "error" && (
                    <>
                        <h1 className="text-4xl font-bold text-red-600 mb-4">Error en el pago</h1>
                        <p className="text-gray-700 text-lg mb-6">
                            No pudimos validar tu transacción. Por favor contacta soporte.
                        </p>
                        <Link href="/" className="text-red-600 hover:underline">
                            Volver al inicio
                        </Link>
                    </>
                )}
            </div>
        </main>
    );
}
