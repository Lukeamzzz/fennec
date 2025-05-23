import React, { useState } from "react";
import { showCustomToast } from "@/lib/showCustomToast";
import { useRouter } from "next/router";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
function DeleteCard({ onClose }) {
    const [inputValue, setInputValue] = useState("");
    const router = useRouter();

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (inputValue === "eliminar") {
            showCustomToast({
                message: "Cuenta eliminada exitosamente",
                type: "success",
            })
            router.push("/")
        } else {
            alert("Por favor escribe 'eliminar' exactamente para confirmar.");
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
                        />
                    </div>
                    <div className="flex justify-between p-6 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Eliminar Cuenta
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default DeleteCard;
