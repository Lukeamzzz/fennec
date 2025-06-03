import React, { useState } from "react";
import { showCustomToast } from "@/lib/showCustomToast";

export interface PropertyFormData {
  type: "Departamento" | "Casa";
  name: string;
  propertyPrice: string;
  investmentAmount: string;
  alcaldia: string;
  colonia: string;
  address: string;
  squareMeters: string;
  date: string;
  bathrooms: string;
  parkingSpots: string;
  bedrooms: string;
}

interface PropertyFormProps {
  onSubmit: (data: PropertyFormData) => void;
  onCancel: () => void;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<PropertyFormData>({
    type: "Departamento",
    name: "",
    propertyPrice: "",
    investmentAmount: "",
    alcaldia: "",
    colonia: "",
    address: "",
    squareMeters: "",
    date: new Date().toISOString().split("T")[0],
    bathrooms: "",
    parkingSpots: "",
    bedrooms: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof PropertyFormData, string>>
  >({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof PropertyFormData, string>> = {};
    let isValid = true;

    // Validar campos requeridos
    Object.entries(formData).forEach(([key, value]) => {
      if (!value || value.trim() === "") {
        newErrors[key as keyof PropertyFormData] = "Este campo es requerido";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      showCustomToast({
        message: "Propiedad agregada correctamente",
        type: "success",
        duration: 3000,
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error cuando el usuario comienza a escribir
    if (errors[name as keyof PropertyFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Propiedad
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-50 border ${
                errors.type ? "border-red-500" : "border-gray-200"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
              required
            >
              <option value="Departamento">Departamento</option>
              <option value="Casa">Casa</option>
            </select>
            {errors.type && (
              <p className="mt-1 text-sm text-red-500">{errors.type}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-50 border ${
                errors.name ? "border-red-500" : "border-gray-200"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
              placeholder="Ej: Casa en Polanco"
              required
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Precio (MXN)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                name="propertyPrice"
                step="any"
                value={formData.propertyPrice}
                onChange={handleInputChange}
                className={`w-full pl-8 pr-4 py-3 bg-gray-50 border ${
                  errors.propertyPrice ? "border-red-500" : "border-gray-200"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
                placeholder="2,500,000"
                min="0"
                required
              />
            </div>
            {errors.propertyPrice && (
              <p className="mt-1 text-sm text-red-500">
                {errors.propertyPrice}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Inversión (MXN)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                name="investmentAmount"
                step="any"
                value={formData.investmentAmount}
                onChange={handleInputChange}
                className={`w-full pl-8 pr-4 py-3 bg-gray-50 border ${
                  errors.investmentAmount ? "border-red-500" : "border-gray-200"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
                placeholder="1,500,000"
                min="0"
                required
              />
            </div>
            {errors.investmentAmount && (
              <p className="mt-1 text-sm text-red-500">
                {errors.investmentAmount}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alcaldía
            </label>
            <input
              type="text"
              name="alcaldia"
              value={formData.alcaldia}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-50 border ${
                errors.alcaldia ? "border-red-500" : "border-gray-200"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
              placeholder="Ej: Miguel Hidalgo"
              required
            />
            {errors.alcaldia && (
              <p className="mt-1 text-sm text-red-500">{errors.alcaldia}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Colonia
            </label>
            <input
              type="text"
              name="colonia"
              value={formData.colonia}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-50 border ${
                errors.colonia ? "border-red-500" : "border-gray-200"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
              placeholder="Ej: Polanco"
              required
            />
            {errors.colonia && (
              <p className="mt-1 text-sm text-red-500">{errors.colonia}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dirección
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-gray-50 border ${
              errors.address ? "border-red-500" : "border-gray-200"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
            placeholder="Ej: Av. Presidente Masaryk 123"
            required
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-500">{errors.address}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              m²
            </label>
            <input
              type="number"
              name="squareMeters"
              value={formData.squareMeters}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-50 border ${
                errors.squareMeters ? "border-red-500" : "border-gray-200"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
              placeholder="150"
              min="0"
              required
            />
            {errors.squareMeters && (
              <p className="mt-1 text-sm text-red-500">{errors.squareMeters}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-50 border ${
                errors.date ? "border-red-500" : "border-gray-200"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
              required
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-500">{errors.date}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Baños
            </label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-50 border ${
                errors.bathrooms ? "border-red-500" : "border-gray-200"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
              placeholder="2"
              min="0"
              required
            />
            {errors.bathrooms && (
              <p className="mt-1 text-sm text-red-500">{errors.bathrooms}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estacionamientos
            </label>
            <input
              type="number"
              name="parkingSpots"
              value={formData.parkingSpots}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-50 border ${
                errors.parkingSpots ? "border-red-500" : "border-gray-200"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
              placeholder="1"
              min="0"
              required
            />
            {errors.parkingSpots && (
              <p className="mt-1 text-sm text-red-500">{errors.parkingSpots}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recámaras
            </label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-50 border ${
                errors.bedrooms ? "border-red-500" : "border-gray-200"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
              placeholder="3"
              min="0"
              required
            />
            {errors.bedrooms && (
              <p className="mt-1 text-sm text-red-500">{errors.bedrooms}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Guardar
          </button>
        </div>
      </form>
    </>
  );
};

export default PropertyForm;
