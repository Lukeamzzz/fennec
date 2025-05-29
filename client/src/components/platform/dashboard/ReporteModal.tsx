// ReporteModal.tsx

import React from "react";

interface ReporteModalProps {
    open: boolean;
    onClose: () => void;
    prediction: {
        tipo_propiedad: string;
        precio_estimado: number;
        alcaldia: string;
        fecha_prediccion: string;
    } | null;
    onSubmit: () => void;
}

const ReporteModal: React.FC<ReporteModalProps> = ({ open, onClose, prediction, onSubmit }) => {
    if (!open || !prediction) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">Resumen de la Predicción</h2>
                <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Tipo de propiedad:</strong> {prediction.tipo_propiedad}</p>
                    <p><strong>Estimado:</strong> ${prediction.precio_estimado.toLocaleString()} MXN</p>
                    <p><strong>Alcaldía:</strong> {prediction.alcaldia}</p>
                    <p><strong>Fecha de predicción:</strong> {new Date(prediction.fecha_prediccion).toLocaleString()}</p>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onSubmit}
                        className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                    >
                        Generar Reporte
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReporteModal;
