import React, { useState } from "react";
import AlcaldiaDropdown from "@/components/platform/dashboard/dropdowns/AlcaldiaDropdown";
import api from "@/services/api"; // Add this import

interface FormData {
  direccion: string;
  alcaldia: string;
  colonia?: string;
  codigoPostal: string;
  tipoPropiedad: string;
  habitaciones?: number;
  bathrooms?: number;
  estacionamientos?: number;
  antiguedad?: number;
  tamanoPropiedad?: number;
  condicion: string;
  anotacionesExtras: string;
}

const PropertyEstimator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    direccion: "",
    alcaldia: "",
    colonia: "",
    codigoPostal: "",
    tipoPropiedad: "",
    habitaciones: undefined,
    bathrooms: undefined,
    estacionamientos: undefined,
    antiguedad: undefined,
    tamanoPropiedad: undefined,
    condicion: "",
    anotacionesExtras: ""
  });

  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  const tiposPropiedad = ["Casa", "Departamento", "Terreno"];
  const condiciones = ["Excelente", "Muy Buena", "Buena", "Regular", "Mala"];

  const handleInputChange = (field: keyof FormData, value: string | number | undefined) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);

    console.log("Datos del formulario:", formData);
    try {
      await api.post("/generate-valuation-report", formData);

      setMessage("Valuación generada correctamente. Revisa la sección de informes.");
      setMessageType("success");
    } catch (error) {
      console.error(error);
      setMessage("Hubo un error al generar la valuación. Intenta nuevamente.");
      setMessageType("error");
    }
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

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Dropdown de Alcaldía */}
          <div>
            <label htmlFor="alcaldia" className="block text-sm font-medium text-gray-700 mb-2">
              Alcaldía *
            </label>
            <AlcaldiaDropdown
              value={formData.alcaldia}
              onChange={(value) => handleInputChange("alcaldia", value)}
            />
          </div>

          {/* Dirección y Código Postal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-2">
                Dirección *
              </label>
              <input
                id="direccion"
                type="text"
                value={formData.direccion}
                onChange={(e) => handleInputChange("direccion", e.target.value)}
                placeholder="Ej: Calle Principal 123"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label htmlFor="codigoPostal" className="block text-sm font-medium text-gray-700 mb-2">
                Código Postal *
              </label>
              <input
                id="codigoPostal"
                type="text"
                value={formData.codigoPostal}
                onChange={(e) => handleInputChange("codigoPostal", e.target.value)}
                placeholder="Ej: 01000"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          {/* Colonia */}
          <div>
            <label htmlFor="colonia" className="block text-sm font-medium text-gray-700 mb-2">
              Colonia
            </label>
            <input
              id="colonia"
              type="text"
              value={formData.colonia ?? ""}
              onChange={(e) => handleInputChange("colonia", e.target.value)}
              placeholder="Ej: Del Valle Norte"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* Tipo de Propiedad */}
          <div>
            <label htmlFor="tipoPropiedad" className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Propiedad *
            </label>
            <select
              id="tipoPropiedad"
              value={formData.tipoPropiedad}
              onChange={(e) => handleInputChange("tipoPropiedad", e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-white"
            >
              <option value="">Selecciona un tipo de propiedad</option>
              {tiposPropiedad.map((tipo) => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
          </div>

          {/* Campos específicos para Casa/Departamento */}
          {formData.tipoPropiedad !== "Terreno" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="habitaciones" className="block text-sm font-medium text-gray-700 mb-2">
                  Habitaciones
                </label>
                <input
                  id="habitaciones"
                  type="number"
                  min={0}
                  max={20}
                  value={formData.habitaciones ?? ""}
                  onChange={(e) => handleInputChange("habitaciones", parseInt(e.target.value) || undefined)}
                  placeholder="Ej: 3"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-2">
                  Baños
                </label>
                <input
                  id="bathrooms"
                  type="number"
                  min={0}
                  max={20}
                  value={formData.bathrooms ?? ""}
                  onChange={(e) => handleInputChange("bathrooms", parseInt(e.target.value) || undefined)}
                  placeholder="Ej: 2"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label htmlFor="estacionamientos" className="block text-sm font-medium text-gray-700 mb-2">
                  Estacionamientos
                </label>
                <input
                  id="estacionamientos"
                  type="number"
                  min={0}
                  max={10}
                  value={formData.estacionamientos ?? ""}
                  onChange={(e) => handleInputChange("estacionamientos", parseInt(e.target.value) || undefined)}
                  placeholder="Ej: 1"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>
          )}

          {/* Antigüedad y Tamaño */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="antiguedad" className="block text-sm font-medium text-gray-700 mb-2">
                Antigüedad (años)
              </label>
              <input
                id="antiguedad"
                type="number"
                min={0}
                max={200}
                value={formData.antiguedad ?? ""}
                onChange={(e) => handleInputChange("antiguedad", parseInt(e.target.value) || undefined)}
                placeholder="Ej: 5"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label htmlFor="tamanoPropiedad" className="block text-sm font-medium text-gray-700 mb-2">
                Tamaño (m²) *
              </label>
              <input
                id="tamanoPropiedad"
                type="number"
                min={1}
                value={formData.tamanoPropiedad ?? ""}
                onChange={(e) => handleInputChange("tamanoPropiedad", parseInt(e.target.value) || undefined)}
                placeholder="Ej: 120"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          {/* Condición */}
          <div>
            <label htmlFor="condicion" className="block text-sm font-medium text-gray-700 mb-2">
              Condición de la Propiedad *
            </label>
            <select
              id="condicion"
              value={formData.condicion}
              onChange={(e) => handleInputChange("condicion", e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-white"
            >
              <option value="">Selecciona una condición</option>
              {condiciones.map((condicion) => (
                <option key={condicion} value={condicion}>{condicion}</option>
              ))}
            </select>
          </div>

          {/* Anotaciones Extras */}
          <div>
            <label htmlFor="anotacionesExtras" className="block text-sm font-medium text-gray-700 mb-2">
              Anotaciones Adicionales
            </label>
            <textarea
              id="anotacionesExtras"
              rows={4}
              value={formData.anotacionesExtras}
              onChange={(e) => handleInputChange("anotacionesExtras", e.target.value)}
              placeholder="Describe amenidades, acabados, etc. Cualquier detalle que pueda influir en la valuación"
              className="w-full h-60 p-4 border rounded-md resize-vertical"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-md"
          >
            Calcular Valor Estimado
          </button>

          {message && (
            <div className={`mt-2 text-center text-sm ${messageType === "success" ? "text-green-600" : "text-red-600"}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PropertyEstimator;