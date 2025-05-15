"use client";

import { showCustomToast } from "@/lib/showCustomToast";
import React, { useState } from "react";
import {Toaster} from "sonner";

function SecurityPasswordSection() {
    const [formData, setFormData] = useState({
        ActualPassword: "",
        NewPassword: "",
        ConfirmPassword: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { NewPassword, ConfirmPassword } = formData;

        if (NewPassword !== ConfirmPassword) {
            showCustomToast({
                message: "Las contraseñas no coinciden",
                type: "error",
            });
            return;
        }

        if (NewPassword.length < 8) {
            showCustomToast({
                message: "La nueva contraseña debe tener al menos 8 caracteres",
                type: "error",
            });
            return;
        }

        // Simula actualización exitosa
        showCustomToast({
            message: "Contraseña actualizada correctamente",
            type: "success",
        });

        // Reset form
        setFormData({
            ActualPassword: "",
            NewPassword: "",
            ConfirmPassword: "",
        });
    };

    return (
        <>
            <div className="bg-white rounded-lg p-6">
                <div className="flex items-center justify-center">
                    <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5 4.63601C5 3.76031 5.24219 3.1054 5.64323 2.67357C6.03934 2.24705 6.64582 1.9783 7.5014 1.9783C8.35745 1.9783 8.96306 2.24652 9.35823 2.67208C9.75838 3.10299 10 3.75708 10 4.63325V5.99999H5V4.63601ZM4 5.99999V4.63601C4 3.58148 4.29339 2.65754 4.91049 1.99307C5.53252 1.32329 6.42675 0.978302 7.5014 0.978302C8.57583 0.978302 9.46952 1.32233 10.091 1.99162C10.7076 2.65557 11 3.57896 11 4.63325V5.99999H12C12.5523 5.99999 13 6.44771 13 6.99999V13C13 13.5523 12.5523 14 12 14H3C2.44772 14 2 13.5523 2 13V6.99999C2 6.44771 2.44772 5.99999 3 5.99999H4ZM3 6.99999H12V13H3V6.99999Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                        />
                    </svg>
                    <h2 className="text-xl font-medium align-middle pl-2">
                        Cambiar contraseña
                    </h2>
                </div>

                <p className="text-gray-500 text-center text-sm mb-6">
                    Actualiza tu contraseña para mantener tu cuenta segura.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="ActualPassword"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Contraseña Actual
                        </label>
                        <input
                            type="password"
                            id="ActualPassword"
                            name="ActualPassword"
                            value={formData.ActualPassword}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="NewPassword"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Nueva Contraseña
                        </label>
                        <input
                            type="password"
                            id="NewPassword"
                            name="NewPassword"
                            value={formData.NewPassword}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <p className="text-gray-500 text-center text-sm mt-2">
                            Usa al menos 8 caracteres, incluyendo letras y números.
                        </p>
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="ConfirmPassword"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Confirma nueva contraseña
                        </label>
                        <input
                            type="password"
                            id="ConfirmPassword"
                            name="ConfirmPassword"
                            value={formData.ConfirmPassword}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                            Actualizar contraseña
                        </button>
                    </div>
                </form>
            </div>
            <Toaster position="bottom-right"/>
        </>

    );
}

export default SecurityPasswordSection;
