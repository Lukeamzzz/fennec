import { useState } from "react";
import AlcaldiaDropdown from "@/components/platform/dashboard/dropdowns/AlcaldiaDropdown";
import GroupDropdowns from "@/components/platform/dashboard/dropdowns/GroupDropdowns";
import SizeSlider from "@/components/platform/dashboard/SizeSlider";
import ButtonPropertyEstimator from "@/components/platform/dashboard/ButtonPropertyEstimator";
import { usePropertyEstimator, PredictionInput } from "@/components/platform/dashboard/hooks/usePropertyEstimator";

const PropertyEstimator = () => {
  const [input, setInput] = useState<PredictionInput>({
    tipo: "Departamento",
    alcaldia: "",
    metro_cuadrados: 50,
    recamaras: 1,
    banos: 1,
    estacionamientos: 1,
  });

  const { submitPrediction, prediction, loading, error } = usePropertyEstimator();

  const handleChange = (key: keyof PredictionInput, value: any) => {
    setInput((prev) => ({ ...prev, [key]: value }));
  };

  const handleEstimate = () => {
    submitPrediction(input);
  };

  return (
      <div className="w-full max-w-md p-4 shadow-xl rounded-xl">
        <div className="space-y-4">
          <div className="text-center justify-center">
            <h3 className="font-medium">Property Value Estimator</h3>
            <p className="text-sm text-muted-foreground">
              Enter property details to get an estimated market value
            </p>
          </div>

          <AlcaldiaDropdown value={input.alcaldia} onChange={(val) => handleChange("alcaldia", val)} />

          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label htmlFor="street" className="block mb-1">Dirección</label>
              <input id="street" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" disabled placeholder="(No requerido)" />
            </div>
            <div className="flex-1">
              <label htmlFor="zip" className="block mb-1">Código Postal</label>
              <input id="zip" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" disabled placeholder="(No requerido)" />
            </div>
          </div>

          <GroupDropdowns input={input} onChange={handleChange} />

          <SizeSlider value={input.metro_cuadrados} onChange={(val) => handleChange("metro_cuadrados", val)} />

          <ButtonPropertyEstimator onClick={handleEstimate} loading={loading} />

          {prediction && (
              <div className="mt-4 p-4 bg-green-50 border border-green-300 rounded-md text-sm">
                <p><strong>Estimado:</strong> ${prediction.precio_estimado.toFixed(2)}</p>
                <p><strong>Tipo:</strong> {prediction.tipo_propiedad}</p>
                <p><strong>Alcaldía:</strong> {prediction.alcaldia}</p>
                <p><strong>Fecha:</strong> {new Date(prediction.fecha_prediccion).toLocaleString()}</p>
              </div>
          )}

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
