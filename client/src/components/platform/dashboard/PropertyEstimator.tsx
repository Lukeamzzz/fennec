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
      <div className="w-full max-w-xl p-6 shadow-xl rounded-xl bg-white">
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-medium text-gray-800">Estimador de Valor de Propiedad</h3>
            <p className="text-sm text-gray-600 mt-1">
              Ingresa los detalles de la propiedad para obtener una estimación del valor de mercado
            </p>
          </div>

          <AlcaldiaDropdown value={input.alcaldia} onChange={(val) => handleChange("alcaldia", val)} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="street" className="block mb-1">Dirección</label>
              <input id="street" type="text" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label htmlFor="zip" className="block mb-1">Código Postal</label>
              <input id="zip" type="text" className="w-full px-3 py-2 border rounded-md"   />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="colonia" className="block mb-1">Colonia</label>
              <input id="colonia" type="text" className="w-full px-3 py-2 border rounded-md" placeholder="Ej: Del Valle Norte" />
            </div>

            <div>
              <label htmlFor="antiguedad" className="block mb-1">Antigüedad (años)</label>
              <input id="antiguedad" type="number" min={0} className="w-full px-3 py-2 border rounded-md" placeholder="Ej: 5" />
            </div>
          </div>

          <div className="">
            <div>
              <label htmlFor="condicion" className="block mb-1">Condición</label>
              <select id="condicion" className="w-full px-3 py-2 border rounded-md bg-white" defaultValue="">
                <option value="">Selecciona una condición</option>
                <option value="Excelente">Excelente</option>
                <option value="Muy Buena">Muy Buena</option>
                <option value="Buena">Buena</option>
                <option value="Regular">Regular</option>
                <option value="Mala">Mala</option>
              </select>
            </div>
          </div>

          <GroupDropdowns input={input} onChange={handleChange} />
          <SizeSlider value={input.metro_cuadrados} onChange={(val) => handleChange("metro_cuadrados", val)} />

          {/* Anotaciones al final */}
          <div>
            <label htmlFor="anotacionesExtras" className="block mb-1">Anotaciones Adicionales</label>
            <textarea
                id="anotacionesExtras"
                rows={3}
                placeholder="Ej: Acabados de lujo, buena iluminación..."
                className="w-full px-3 py-2 border rounded-md resize-none"
            />
          </div>

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


