"use client";

import React, { useEffect, useRef, useState } from "react";
import { Chart, PieController, ArcElement, Tooltip, Legend } from "chart.js";
import styles from "./PortafolioChart.module.css";

interface Property {
  type: string;
  units: number;
  value: number;
  percentYield: number;
}

interface PortafolioChartProps {
  title?: string;
  subtitle?: string;
  distributionData?: {
    name: string;
    value: number;
    color: string;
  }[];
  properties?: Property[];
}

const PortafolioChart: React.FC<PortafolioChartProps> = ({
  title = "Portafolio de Inversión",
  subtitle = "Distribución actual de inversiones inmobiliarias",
  distributionData = [
    { name: "Residencial CDMX", value: 40, color: "#FF7043" },
    { name: "Comercial CDMX", value: 25, color: "#0D47A1" },
    { name: "Residencial Guadalajara", value: 15, color: "#FFC107" },
    { name: "Comercial Monterrey", value: 12, color: "#E53935" },
    { name: "Desarrollos Mixtos", value: 8, color: "#26A69A" },
  ],
  properties = [
    { type: "Apartamentos", units: 12, value: 24.5, percentYield: 7.8 },
    { type: "Casas", units: 4, value: 18.2, percentYield: 6.5 },
    { type: "Locales Comerciales", units: 8, value: 12.7, percentYield: 9.2 },
    { type: "Terrenos", units: 2, value: 5.3, percentYield: 4.8 },
  ],
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [formData, setFormData] = useState({
    type: "Departamento",
    name: "",
    investmentAmount: "",
    date: new Date().toISOString().split("T")[0],
  });
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !isFlipped) {
      Chart.register(PieController, ArcElement, Tooltip, Legend);

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "pie",
          data: {
            labels: distributionData.map((item) => item.name),
            datasets: [
              {
                data: distributionData.map((item) => item.value),
                backgroundColor: distributionData.map((item) => item.color),
                borderColor: "white",
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const label = context.label || "";
                    const value = context.raw || 0;
                    return `${label}: ${value}%`;
                  },
                },
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                titleColor: "#1F2937",
                bodyColor: "#1F2937",
                borderColor: "#E5E7EB",
                borderWidth: 1,
                padding: 12,
                displayColors: true,
                boxPadding: 6,
              },
            },
          },
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [distributionData, isFlipped]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const investmentAmount = parseFloat(formData.investmentAmount) || 0;
    const dataToSave = { ...formData, investmentAmount };
    console.log("New property data:", dataToSave);
    setIsFlipped(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className={styles.flipContainer}>
        <div
          className={`${styles.flipInner} ${
            isFlipped ? styles.flipInnerFlipped : ""
          }`}
        >
          {/* Front side - Chart */}
          <div
            className={`${styles.flipSide} ${
              isFlipped ? styles.flipSideHidden : styles.flipSideVisible
            }`}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
              <p className="text-gray-600 text-sm">{subtitle}</p>
            </div>
            <div className="relative max-w-80 mx-auto">
              <canvas ref={chartRef} height="250" className="mb-6"></canvas>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Resumen por Tipo de Propiedad
              </h3>
              {properties.map((property, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center mb-3"
                >
                  <div>
                    <span className="font-medium">{property.type}</span>
                    <span className="text-gray-500 ml-2 text-sm">
                      {property.units} unidades
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-4">
                      ${(property.value * 1_000_000).toLocaleString("en-US")}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        property.percentYield >= 7
                          ? "bg-green-100 text-green-800"
                          : property.percentYield >= 6
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {property.percentYield}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setIsFlipped(true)}
              className="mt-6 w-full flex items-center justify-center text-gray-600 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Añadir Propiedad
            </button>
          </div>

          {/* Back side - Form */}
          <div
            className={`${styles.flipSide} ${styles.flipBack} ${
              isFlipped ? styles.flipSideVisible : styles.flipSideHidden
            }`}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Añadir Nueva Propiedad
              </h2>
              <p className="text-gray-600 text-sm">
                Complete los datos de la nueva propiedad
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Propiedad
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="Departamento">Departamento</option>
                  <option value="Terreno">Terreno</option>
                  <option value="Casa">Casa</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de la Propiedad
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Ej: Casa en Polanco"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monto de Inversión (MXN)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    step="any"
                    value={formData.investmentAmount}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "" || /^\d*\.?\d*$/.test(val)) {
                        setFormData({ ...formData, investmentAmount: val });
                      }
                    }}
                    className="w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="1,500,000"
                    min="0"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Inversión
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsFlipped(false)}
                  className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortafolioChart;
