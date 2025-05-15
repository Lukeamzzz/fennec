import React, { useState } from "react";
import { FileSpreadsheet, X, CalendarDays, ChevronDown } from "lucide-react";

interface CreateReportProps {
  /**
   * The report types of the create report.
   */
  reportTypes: string[];
  /**
   * The on submit of the create report.
   */
  onSubmit: (formData: {
    title: string;
    type: string;
    date: string;
    description: string;
  }) => void;
  /**
   * The on close of the create report.
   */
  onClose: () => void;
}

/**
 * Create a new report.
 */
const CreateReport: React.FC<CreateReportProps> = ({
  reportTypes,
  onSubmit,
  onClose,
}) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, type, date, description });
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full font-sans">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <FileSpreadsheet size={24} className="text-gray-600" />
          <h2 className="text-xl font-semibold text-gray-800">
            Generar Nuevo Informe
          </h2>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Cerrar"
        >
          <X size={24} />
        </button>
      </div>

      <p className="text-gray-600 mb-8">
        Complete los detalles para generar un nuevo informe. Los informes
        generados estarán disponibles en la sección correspondiente.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="reportTitle"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Título del Informe
          </label>
          <input
            type="text"
            id="reportTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Análisis de Mercado Q2 2024"
            className="w-full px-4 py-2 border rounded-md focus:ring-orange-500 focus:border-orange-500 shadow-sm placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-offset-1 border-orange-500 ring-orange-500 ring-1"
            required
          />
        </div>

        {/* Type */}
        <div className="relative">
          <label
            htmlFor="reportType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tipo de Informe
          </label>
          <select
            id="reportType"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full appearance-none px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-base text-gray-500 focus:outline-none focus:ring-1 bg-white pr-8"
            required
          >
            <option value="" disabled>
              Seleccione el tipo de informe
            </option>
            {reportTypes.map((reportType) => (
              <option
                key={reportType}
                value={reportType}
                className="text-gray-900"
              >
                {reportType}
              </option>
            ))}
          </select>
          <ChevronDown
            size={20}
            className="absolute right-3 top-10 text-gray-400 pointer-events-none"
          />
        </div>

        {/* Date - Placeholder for actual date picker */}
        <div>
          <label
            htmlFor="reportDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Fecha del Informe
          </label>
          <div className="relative">
            <input
              type="text"
              id="reportDate"
              value={date}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => {
                if (!e.target.value) e.target.type = "text";
              }}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Seleccione una fecha"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm placeholder-gray-400 text-base focus:outline-none focus:ring-1 pr-10"
              required
            />
            <CalendarDays
              size={20}
              className="absolute right-3 top-2.5 text-gray-400 pointer-events-none"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="reportDescription"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Descripción
          </label>
          <textarea
            id="reportDescription"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción detallada del informe..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm placeholder-gray-400 text-base focus:outline-none focus:ring-1"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
          >
            Generar Informe
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateReport;
