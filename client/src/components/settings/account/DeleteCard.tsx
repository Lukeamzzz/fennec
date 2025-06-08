import React, { useState } from "react";
import { showCustomToast } from "@/lib/showCustomToast";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import api from "@/services/api";
import { deleteUser } from "@firebase/auth";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// ... existing code ...

function DeleteCard({ onClose }) {
    const [inputValue, setInputValue] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (inputValue !== "eliminar") {
            showCustomToast({
                message: "Por favor, escribe 'eliminar' para confirmar",
                type: "error",
            });
            return;
        }

        try {
            setIsLoading(true);
            const currentUser = auth.currentUser;

            if (!currentUser) {
                throw new Error("Usuario no autenticado");
            }

            // Delete from backend first
            console.log("Deleting user from backend...");
            await api.post('/auth/delete/user');
            console.log("Backend deletion successful");

            // Only delete from Firebase if backend deletion succeeded
            console.log("Deleting user from Firebase...");
            await deleteUser(currentUser);
            console.log("Firebase deletion successful");

            // Redirect and show toast
            router.push('/');
            showCustomToast({
                message: "Cuenta eliminada exitosamente",
                type: "success",
            });

        } catch (error) {
            console.error("Error al eliminar cuenta:", error);
            
            // More specific error handling
            let errorMessage = "Error al eliminar la cuenta. Por favor, intenta de nuevo.";
            
            if ((error as { code?: string }).code === 'auth/requires-recent-login') {
                errorMessage = "Por seguridad, necesitas volver a iniciar sesión antes de eliminar tu cuenta.";
            } else if ((error as { message?: string }).message?.includes('network')) {
                errorMessage = "Error de conexión. Verifica tu internet e intenta de nuevo.";
            }
            
            showCustomToast({
                message: errorMessage,
                type: "error",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-[350px] bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold">¿Estás seguro?</h2>
                    <p className="mt-2 text-gray-500 text-sm">
                        Esta acción no se puede deshacer. Se eliminará permanentemente tu cuenta y todos los datos asociados.
                    </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <p className="text-gray-500 mb-2">
                            Para confirmar, escribe <strong>eliminar</strong> en el campo a continuación:
                        </p>
                        <input
                            type="text"
                            placeholder="eliminar"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="flex justify-between p-6 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                            disabled={isLoading}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            disabled={isLoading}
                        >
                            {isLoading && (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            )}
                            {isLoading ? "Eliminando..." : "Eliminar Cuenta"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default DeleteCard;