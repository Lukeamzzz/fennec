import { useEffect, useState, useCallback } from "react";
import AlcaldiaDropdown from "@/components/platform/dashboard/dropdowns/AlcaldiaDropdown";
import GroupDropdowns from "@/components/platform/dashboard/dropdowns/GroupDropdowns";
import SizeSlider from "@/components/platform/dashboard/SizeSlider";
import ButtonPropertyEstimator from "@/components/platform/dashboard/ButtonPropertyEstimator";
import { Quantum } from "ldrs/react";
import "ldrs/react/Quantum.css";
import {
  PredictionInput,
  usePropertyEstimator,
} from "@/app/platform/dashboard/hooks/usePropertyEstimator";
import { useReporteGenerator } from "@/app/platform/dashboard/hooks/useReporteGenerator";
import ReporteModal from "@/components/platform/dashboard/ReporteModal";

interface PropertyEstimatorProps {
  onAlcaldiaChange?: (alcaldia: string) => void;
  onTipoChange?: (tipo: string) => void;
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
  [key: string]: string | number | boolean | null;
}

const PropertyEstimator: React.FC<PropertyEstimatorProps> = ({
  onAlcaldiaChange,
  onTipoChange,
}) => {
  const [input, setInput] = useState<PredictionInput>({
    tipo: "Casa",
    alcaldia: "Álvaro Obregón",
    metro_cuadrados: 150,
    recamaras: 1,
    banos: 1,
    estacionamientos: 1,
  });

  const handleAlcaldiaChange = useCallback((alcaldia: string) => {
    setInput(prev => ({ ...prev, alcaldia }));
    if (onAlcaldiaChange) {
      onAlcaldiaChange(alcaldia);
    }
  }, [onAlcaldiaChange]);

  useEffect(() => {
    if (input.alcaldia && onAlcaldiaChange) {
      onAlcaldiaChange(input.alcaldia);
    }
  }, [input.alcaldia, onAlcaldiaChange]);

  const { submitPrediction, prediction, loading, error } =
    usePropertyEstimator();
  const { generarReporte } = useReporteGenerator();

  const [modalOpen, setModalOpen] = useState(false);
  const [tempPayload, setTempPayload] = useState<ValuacionPayload | null>(null);

  const handleChange = (key: keyof PredictionInput, value: string | number) => {
    const newInput = { ...input, [key]: value } as PredictionInput;
    setInput(newInput);

    if (key === "alcaldia" && typeof value === "string" && onAlcaldiaChange) {
      onAlcaldiaChange(value);
    }
    if (key === "tipo" && typeof value === "string" && onTipoChange) {
      onTipoChange(value);
      // Trigger API call when tipo changes
      handleTipoChange(value);
    }
  };

  // New function to handle tipo change and make API call
  const handleTipoChange = async (newTipo: string) => {
    try {
      const endpoint = newTipo === "Casa" 
        ? "/api/casa/data" 
        : "/api/departamento/data";
      
      
      console.log(`Making API call to ${endpoint} for tipo: ${newTipo}`);
    } catch (error) {
      console.error("Error making API call for tipo change:", error);
    }
  };

  const handleEstimate = () => {
    submitPrediction(input);

    const direccion =
      (document.getElementById("street") as HTMLInputElement)?.value || "";
    const codigoPostal =
      (document.getElementById("zip") as HTMLInputElement)?.value || "";
    const condicion =
      (document.getElementById("condicion") as HTMLSelectElement)?.value || "";
    const anotacionesExtra =
      (document.getElementById("anotacionesExtras") as HTMLTextAreaElement)
        ?.value || "";

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
      anotacionesValuacion: "Estimación generada automáticamente...",
    };

    setTempPayload(payload);
    setModalOpen(true);
  };

  const handleGenerarReporte = () => {
    if (tempPayload && prediction) {
      const finalPayload: ValuacionPayload = {
        ...tempPayload,
        valorEstimado: prediction.precio_estimado,
      };
      generarReporte(finalPayload);
      setModalOpen(false);
    }
  };

  return (
    <div className="w-full max-w-3xl p-4 shadow-xl rounded-xl mx-auto" data-testid="property-estimator">
      <div className="space-y-4">
        <div className="text-center justify-center" data-testid="estimator-header">
          <h3 className="font-medium pb-1" data-testid="estimator-title">Estimador de valor de propiedades</h3>
          <p className="text-sm text-muted-foreground" data-testid="estimator-description">
            Ingresa las características de tu propiedad para obtener una estimación de su valor en el mercado actual.
          </p>
        </div>
         
        <div data-testid="alcaldia-dropdown-container">
          <AlcaldiaDropdown
            value={input.alcaldia}
            onChange={handleAlcaldiaChange}
          />
        </div>

        <div className="flex items-center space-x-4" data-testid="address-fields">
          <div className="flex-1">
            <label
              htmlFor="street"
              className="block text-sm font-medium text-gray-700"
            >
              Dirección
            </label>
            <input
              id="street"
              data-testid="input-street"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          
          </div>
          <div className="flex-1">
            <label
              htmlFor="zip"
              className="block text-sm font-medium text-gray-700"
            >
              Código Postal
            </label>
            <input
              id="zip"
              data-testid="input-zip"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>

        <div data-testid="group-dropdowns-container">
          <GroupDropdowns input={input} onChange={handleChange as never} />
        </div>

        <div data-testid="size-slider-container">
          <SizeSlider
            value={input.metro_cuadrados}
            onChange={(val) => handleChange("metro_cuadrados", val)}
          />
        </div>

        <div data-testid="condicion-field">
          <label
            htmlFor="condicion"
            className="block text-sm font-medium text-gray-700"
          >
            Condición
          </label>
          <select
              id="condicion"
              data-testid="select-condicion"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              defaultValue=""
          >
            <option value="">Selecciona una condición</option>
            <option value="Excelente" title="La propiedad está como nueva, sin necesidad de mejoras.">
              Excelente
            </option>
            <option value="Muy Buena" title="Muy bien conservada, mínimas reparaciones necesarias.">
              Muy Buena
            </option>
            <option value="Buena" title="Buen estado general, pero podría beneficiarse de mejoras menores.">
              Buena
            </option>
            <option value="Regular" title="Requiere algunas reparaciones visibles.">
              Regular
            </option>
            <option value="Mala" title="Estado deteriorado, requiere reparaciones importantes.">
              Mala
            </option>
          </select>
        </div>

        <div data-testid="anotaciones-field">
          <label
              htmlFor="anotacionesExtras"
              className="block text-sm font-medium text-gray-700"
          >
            Anotaciones Adicionales
          </label>
          <textarea
              id="anotacionesExtras"
              data-testid="textarea-anotaciones"
              rows={3}
              placeholder="Ej: Acabados de lujo, buena iluminación..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
          />
        </div>

        <div data-testid="estimate-button-container">
          <ButtonPropertyEstimator onClick={handleEstimate} loading={loading}/>
        </div>

        {loading && (
            <div className="my-4 flex justify-center items-center" data-testid="loading-spinner">
            <Quantum size="100" speed="1.75" color="#F56C12" />
          </div>
        )}

        { !loading && !error &&
          <div data-testid="reporte-modal-container">
            <ReporteModal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              prediction={prediction}
              onSubmit={handleGenerarReporte}
            />
          </div>
        }

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-400 rounded-md text-red-700 text-sm" data-testid="error-message">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyEstimator;