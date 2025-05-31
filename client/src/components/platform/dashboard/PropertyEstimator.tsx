

import { useEffect, useState } from "react";
import AlcaldiaDropdown from "@/components/platform/dashboard/dropdowns/AlcaldiaDropdown";
import GroupDropdowns from "@/components/platform/dashboard/dropdowns/GroupDropdowns";
import SizeSlider from "@/components/platform/dashboard/SizeSlider";
import ButtonPropertyEstimator from "@/components/platform/dashboard/ButtonPropertyEstimator";
import { Quantum } from 'ldrs/react';
import 'ldrs/react/Quantum.css';
import { PredictionInput, usePropertyEstimator } from "@/app/platform/dashboard/hooks/usePropertyEstimator";
import { useReporteGenerator } from "@/app/platform/dashboard/hooks/useReporteGenerator";
import ReporteModal from "@/components/platform/dashboard/ReporteModal";

interface PropertyEstimatorProps {
  onAlcaldiaChange?: (alcaldia: string) => void;
}

interface ValuacionPayload {
  direccion: string;
  colonia: string;
  alcaldia: string;
  codigoPostal: string;
  tipoPropiedad: string;
  recamaras: number;
  banos: number;
  estacionamientos: number;
  dimensionesM2: number;
  antiguedadAnos: number;
  condicionesPropiedad: string;
  anotacionesExtra: string;
  valorEstimado: number;
  anotacionesValuacion: string;
}


const PropertyEstimator: React.FC<PropertyEstimatorProps> = ({ onAlcaldiaChange }) => {
  const [input, setInput] = useState<PredictionInput>({
    tipo: "Casa",
    alcaldia: "Álvaro Obregón",
    metro_cuadrados: 150,
    recamaras: 1,
    banos: 1,
    estacionamientos: 1,
  });

   useEffect(() => {
    if (onAlcaldiaChange && input.alcaldia) {
      onAlcaldiaChange(input.alcaldia);
    }
  }, []);

  const { submitPrediction, prediction, loading, error } = usePropertyEstimator();
  const { generarReporte } = useReporteGenerator();

  const [modalOpen, setModalOpen] = useState(false);
  const [tempPayload, setTempPayload] = useState<ValuacionPayload | null>(null);

  const handleChange = (key: keyof PredictionInput, value: string | number) => {
    const newInput = { ...input, [key]: value } as PredictionInput;
    setInput(newInput);

    if (key === "alcaldia" && typeof value === "string" && onAlcaldiaChange) {
      onAlcaldiaChange(value);
    }
  };

  const handleEstimate = () => {
    submitPrediction(input);

    const direccion = (document.getElementById("street") as HTMLInputElement)?.value || "";
    const codigoPostal = (document.getElementById("zip") as HTMLInputElement)?.value || "";
    const condicion = (document.getElementById("condicion") as HTMLSelectElement)?.value || "";
    const anotacionesExtra = (document.getElementById("anotacionesExtras") as HTMLTextAreaElement)?.value || "";

    const payload: ValuacionPayload = {
      direccion,
      colonia: input.alcaldia,
      alcaldia: input.alcaldia,
      codigoPostal,
      tipoPropiedad: input.tipo,
      recamaras: input.recamaras,
      banos: input.banos,
      estacionamientos: input.estacionamientos,
      dimensionesM2: input.metro_cuadrados,
      antiguedadAnos: 5,
      condicionesPropiedad: condicion,
      anotacionesExtra,
      valorEstimado: 0, // se actualiza en el siguiente paso
      anotacionesValuacion: "Estimación generada automáticamente..."
    };

    setTempPayload(payload);
    setModalOpen(true);
  };

  const handleGenerarReporte = () => {
    if (tempPayload && prediction) {
      const finalPayload: ValuacionPayload = {
        ...tempPayload,
        valorEstimado: prediction.precio_estimado
      };
      generarReporte(finalPayload);
      setModalOpen(false);
    }
  };


  return (
      <div className="w-full max-w-xl p-4 shadow-xl rounded-xl">
        <div className="space-y-4">
          <div className="text-center justify-center">
            <h3 className="font-medium">Property Value Estimator</h3>
            <p className="text-sm text-muted-foreground">
              Enter property details to get an estimated market value
            </p>
          </div>

          <AlcaldiaDropdown
              value={input.alcaldia}
              onChange={(val) => handleChange("alcaldia", val)}
          />

          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label htmlFor="street" className="block text-sm font-medium text-gray-700">Dirección</label>
              <input id="street" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div className="flex-1">
              <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Código Postal</label>
              <input id="zip" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>

          <GroupDropdowns input={input} onChange={handleChange as never} />

          <SizeSlider value={input.metro_cuadrados} onChange={(val) => handleChange("metro_cuadrados", val)} />

          <div>
            <label htmlFor="condicion" className="block text-sm font-medium text-gray-700">Condición</label>
            <select id="condicion" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" defaultValue="">
              <option value="">Selecciona una condición</option>
              <option value="Excelente">Excelente</option>
              <option value="Muy Buena">Muy Buena</option>
              <option value="Buena">Buena</option>
              <option value="Regular">Regular</option>
              <option value="Mala">Mala</option>
            </select>
          </div>

          <div>
            <label htmlFor="anotacionesExtras" className="block text-sm font-medium text-gray-700">Anotaciones Adicionales</label>
            <textarea
                id="anotacionesExtras"
                rows={3}
                placeholder="Ej: Acabados de lujo, buena iluminación..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
            />
          </div>

          <ButtonPropertyEstimator onClick={handleEstimate} loading={loading} />

          {loading && (
              <div className="my-4 flex justify-center items-center">
                <Quantum size="100" speed="1.75" color="#F56C12" />
              </div>
          )}

          <ReporteModal
              open={modalOpen}
              onClose={() => setModalOpen(true)}
              prediction={prediction}
              onSubmit={handleGenerarReporte}
          />

          {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-400 rounded-md text-red-700 text-sm">
                {error}
              </div>
          )}
        </div>
      </div>
  );
};

export default PropertyEstimator;
