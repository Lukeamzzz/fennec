"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import api from "@/services/api";
import { useAuth } from "@/providers/AuthProvider";

function SuccessContent() {
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
                                        <div style="max-width: 600px; margin: 0 auto; background: white; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; line-height: 1.6;">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); padding: 40px 30px; text-align: center;">
        <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 700;">¡Pago Exitoso!</h1>
        <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">Tu cuenta ya está activa y lista para usar</p>
    </div>

    <!-- Content -->
    <div style="padding: 40px 30px;">
        <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="margin: 0 0 10px 0; color: #212529; font-size: 24px; font-weight: 600;">¡Gracias por confiar en Fennec!</h2>
            <p style="margin: 0; color: #6c757d; font-size: 16px;">Tu pago ha sido procesado exitosamente y tu cuenta premium está activa.</p>
        </div>

        <!-- Status Card -->
        <div style="background: #d1f2eb; border: 1px solid #a3e6d1; border-radius: 12px; padding: 20px; margin-bottom: 30px; text-align: center;">
            <div style="display: inline-block; background: #27ae60; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; margin-bottom: 10px;">
               CUENTA ACTIVA
            </div>
            <p style="margin: 0; color: #0f5132; font-size: 16px; font-weight: 500;">Ya puedes acceder a todas las funcionalidades premium</p>
        </div>

        <!-- Action Button -->
        <div style="text-align: center; margin-bottom: 30px;">
            <a href="https://fennec.mx/platform/dashboard" style="display: inline-block; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);">
                Acceder a mi Dashboard
            </a>
        </div>

        <!-- Features List -->
        <div style="background: #f8f9fa; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
            <h3 style="margin: 0 0 20px 0; color: #212529; font-size: 18px; font-weight: 600; text-align: center;">¿Qué puedes hacer ahora?</h3>
            <div style="display: grid; gap: 15px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="color: #495057; font-size: 15px;">Generar reportes de valuación ilimitados</span>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="color: #495057; font-size: 15px;">Acceso a herramientas avanzadas de análisis</span>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="color: #495057; font-size: 15px;">Soporte prioritario de nuestro equipo</span>
                </div>
            </div>
        </div>
       
    </div>

    <!-- Footer -->
    <div style="background: #212529; padding: 25px 30px; text-align: center;">
        <p style="margin: 0 0 10px 0; color: #adb5bd; font-size: 14px;">Gracias por elegir Fennec para tus necesidades inmobiliarias</p>
        <p style="margin: 0; color: #6c757d; font-size: 12px;">© 2025 Fennec. Todos los derechos reservados.</p>
    </div>
</div>
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

export default function SuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white px-6"><p className="text-gray-700 text-lg">Cargando...</p></div>}>
            <SuccessContent />
        </Suspense>
    );
}
