"use client";

import React, { useEffect, useRef, useState } from "react";
import { Chart, PieController, ArcElement, Tooltip, Legend } from "chart.js";
import styles from "./PortafolioChart.module.css";
import PropertyForm, { PropertyFormData } from "./PropertyForm";
import { createInvestment } from "@/app/platform/investment-insight/hooks/createInvestment";
import {
  getInvestments,
  Investment,
} from "@/app/platform/investment-insight/hooks/getInvestments";
import { showCustomToast } from "@/lib/showCustomToast";

interface Property {
  type: string;
  units: number;
  value: number;
  percentYield: number;
}

interface PortafolioChartProps {
  title?: string;
  subtitle?: string;
}

const PortafolioChart: React.FC<PortafolioChartProps> = ({
  title = "Portafolio de Inversión",
  subtitle = "Distribución actual de inversiones inmobiliarias",
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Fetch investments
  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const data = await getInvestments();
        setInvestments(data);
      } catch (err) {
        showCustomToast({
          message:
            err instanceof Error
              ? err.message
              : "Error al cargar las inversiones",
          type: "error",
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, []);

  // Process investments data for the chart
  const processInvestmentsData = () => {
    const colors = [
      "#FF7043",
      "#0D47A1",
      "#FFC107",
      "#E53935",
      "#26A69A",
      "#9C27B0",
      "#3F51B5",
      "#009688",
    ];
    return investments.map((inv, index) => ({
      name: inv.descripcion || `Propiedad ${index + 1}`,
      value: inv.monto_invertido,
      color: colors[index % colors.length],
      address: inv.direccion,
      colonia: inv.colonia,
    }));
  };

  // Calculate properties summary
  const getPropertiesSummary = (): Property[] => {
    return investments.map((inv) => ({
      type: inv.descripcion || "Sin nombre",
      units: 1,
      value: inv.precio_propiedad / 1_000_000, // Convert to millions
      percentYield: Number(
        ((inv.monto_invertido / inv.precio_propiedad) * 100).toFixed(1)
      ),
    }));
  };

  useEffect(() => {
    if (chartRef.current && !isFlipped && !loading) {
      Chart.register(PieController, ArcElement, Tooltip, Legend);

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      const chartData = processInvestmentsData();

      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "pie",
          data: {
            labels: chartData.map((item) => item.name),
            datasets: [
              {
                data: chartData.map((item) => item.value),
                backgroundColor: chartData.map((item) => item.color),
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
                    const value = context.raw as number;
                    return `${label}: $${value.toLocaleString("en-US")}`;
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
  }, [investments, isFlipped, loading]);

  const handleSubmit = async (formData: PropertyFormData) => {
    try {
      const investmentData = {
        monto_invertido: Number(formData.investmentAmount),
        precio_propiedad: Number(formData.propertyPrice),
        tipo_propiedad: formData.type,
        direccion: formData.address,
        descripcion: formData.name,
        alcaldia: formData.alcaldia,
        colonia: formData.colonia,
        dimensiones_m2: Number(formData.squareMeters),
        fecha_inversion: formData.date,
        banos: formData.bathrooms ? Number(formData.bathrooms) : 0,
        recamaras: formData.bedrooms ? Number(formData.bedrooms) : 0,
        estacionamientos: formData.parkingSpots
          ? Number(formData.parkingSpots)
          : 0,
      };

      await createInvestment(investmentData);
      // Refresh investments after creating a new one
      const newInvestments = await getInvestments();
      setInvestments(newInvestments);

      showCustomToast({
        message: "Inversión creada exitosamente",
        type: "success",
        duration: 3000,
      });
      setIsFlipped(false);
    } catch (error) {
      showCustomToast({
        message:
          error instanceof Error
            ? error.message
            : "Error al crear la inversión",
        type: "error",
        duration: 3000,
      });
    }
  };

  const properties = getPropertiesSummary();

  if (loading) {
    return <div>Cargando...</div>;
  }

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
                      {property.units === 1
                        ? `${property.units} unidad`
                        : `${property.units} unidades`}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-4">
                      ${property.value.toLocaleString("en-US")}M
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        Number(property.percentYield) >= 7
                          ? "bg-green-100 text-green-800"
                          : Number(property.percentYield) >= 6
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
            <PropertyForm
              onSubmit={handleSubmit}
              onCancel={() => setIsFlipped(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortafolioChart;
