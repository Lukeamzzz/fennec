"use client";

import { toast } from "sonner";
import React from "react";

// Tipos para la función de toast personalizado
type ToastType = "success" | "error";

interface ShowToastProps {
    message: string;
    type: ToastType;
    duration?: number;
}

export const showCustomToast = ({
                                    message,
                                    type,
                                    duration = 1000,
                                }: ShowToastProps) => {
    const isSuccess = type === "success";

    // Clases según el tipo
    const bgColor = isSuccess ? "bg-green-100" : "bg-red-100";
    const textColor = isSuccess ? "text-green-800" : "text-red-400";
    const icon = isSuccess ? (
            <svg
                xmlns="http://www.w3.org/2000/svg"
        fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
    >
    <path
        strokeLinecap="round"
    strokeLinejoin="round"
    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
        </svg>
) : (
        <svg
            xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
    >
    <path
        strokeLinecap="round"
    strokeLinejoin="round"
    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        />
        </svg>
);

    toast.custom(
        (t) => (
            <div
                className={`${bgColor} ${textColor} px-4 py-3 rounded shadow-lg flex items-center space-x-2 cursor-pointer`}
    onClick={() => toast.dismiss(t)}
>
    {icon}
    <span className="font-semibold">{message}</span>
        </div>
),
    {
        position: "bottom-right",
            duration,
    }
);
};
