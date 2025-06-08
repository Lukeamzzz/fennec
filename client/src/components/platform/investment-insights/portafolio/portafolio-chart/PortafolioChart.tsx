"use client";

import React, { useEffect, useRef, useState } from "react";
import { Chart, PieController, ArcElement, Tooltip, Legend } from "chart.js";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./PortafolioChart.module.css";
import PropertyForm, { PropertyFormData } from "./PropertyForm";
import { createInvestment } from "@/app/platform/investment-insight/hooks/createInvestment";
import { Investment } from "@/app/platform/investment-insight/hooks/getInvestments";
import { showCustomToast } from "@/lib/showCustomToast";
import EmptyPortfolioInvite from "./EmptyPortfolioInvite";
import { HousePlus, X, MapPin, Calendar } from "lucide-react";
import PortafolioChartSkeleton from "./PortafolioChartSkeleton";

interface Property {
  type: string;
  units: number;
  value: number;
  percentYield: number;
  montoInvertido: number;
  address?: string;
  colonia?: string;
  date?: string;
  squareMeters?: number;
  bedrooms?: number;
  bathrooms?: number;
}

interface PortafolioChartProps {
  title?: string;
  subtitle?: string;
  investments: Investment[];
  loading: boolean;
  refreshInvestments: () => Promise<void>;
}

const PortafolioChart: React.FC<PortafolioChartProps> = ({
  title = "Portafolio de Inversión",
  subtitle = "Distribución actual de inversiones inmobiliarias",
  investments,
  loading,
  refreshInvestments,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [showAllInvestments, setShowAllInvestments] = useState(false);

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

    const sorted = [...investments].sort(
      (a, b) => b.monto_invertido - a.monto_invertido
    );
    const top7 = sorted.slice(0, 7);
    const rest = sorted.slice(7);
    const chartData = top7.map((inv, index) => ({
      name: inv.descripcion || `Propiedad ${index + 1}`,
      value: inv.monto_invertido,
      color: colors[index % colors.length],
      address: inv.direccion,
      colonia: inv.colonia,
    }));
    if (rest.length > 0) {
      chartData.push({
        name: "Otros",
        value: rest.reduce((sum, inv) => sum + inv.monto_invertido, 0),
        color: colors[7 % colors.length],
        address: "",
        colonia: "",
      });
    }
    return chartData;
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
      montoInvertido: inv.monto_invertido,
      address: inv.direccion,
      colonia: inv.colonia,
      date: inv.fecha_inversion,
      squareMeters: inv.dimensiones_m2,
      bedrooms: inv.recamaras,
      bathrooms: inv.banos,
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
      const isSingle = chartData.length === 1;

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
                borderWidth: isSingle ? 0 : 2,
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
      await refreshInvestments();

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

  const properties = getPropertiesSummary()
    .sort((a, b) => b.montoInvertido - a.montoInvertido)
    .slice(0, 4);
  const allProperties = getPropertiesSummary().sort(
    (a, b) => b.montoInvertido - a.montoInvertido
  );

  // Calculate summary stats for modal
  const totalInvestment = investments.reduce(
    (sum, inv) => sum + inv.monto_invertido,
    0
  );
  const totalValue = investments.reduce(
    (sum, inv) => sum + inv.precio_propiedad,
    0
  );
  const averageYield =
    investments.length > 0
      ? ((totalInvestment / totalValue) * 100).toFixed(1)
      : 0;

  // Animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: { opacity: 0, scale: 0.95, y: 30 },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  if (loading) {
    return <PortafolioChartSkeleton />;
  }

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className={styles.flipContainer}>
          <div
            className={`${styles.flipInner} ${
              isFlipped ? styles.flipInnerFlipped : ""
            }`}
          >
            {/* Front side - Chart o Invitación */}
            <div
              className={`${styles.flipSide} ${
                isFlipped ? styles.flipSideHidden : styles.flipSideVisible
              }`}
            >
              {investments.length === 0 ? (
                <EmptyPortfolioInvite
                  onAddProperty={() => setIsFlipped(true)}
                />
              ) : (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {title}
                    </h2>
                    <p className="text-gray-600 text-sm">{subtitle}</p>
                  </div>
                  <div className="relative max-w-80 mx-auto">
                    <canvas
                      ref={chartRef}
                      height="250"
                      className="mb-6"
                    ></canvas>
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
                    <button
                      onClick={() => setIsFlipped(true)}
                      className="mt-6 w-full flex items-center justify-center text-orange-600 border border-orange-300 rounded-lg py-2 hover:bg-orange-50 transition-colors"
                    >
                      <HousePlus size={20} className="mr-2" strokeWidth={2} />
                      Añadir Propiedad
                    </button>
                    {allProperties.length > 0 && (
                      <button
                        onClick={() => setShowAllInvestments(true)}
                        className="mt-2 w-full flex items-center justify-center text-orange-600 border border-orange-200 rounded-lg py-2 hover:bg-orange-50 transition-colors"
                      >
                        Ver todas las inversiones
                      </button>
                    )}
                  </div>
                </>
              )}
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

      {/* Modal de todas las inversiones */}
      <AnimatePresence>
        {showAllInvestments && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/25 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAllInvestments(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Todas las Inversiones
                  </h2>
                  <p className="text-gray-600">
                    {allProperties.length} propiedades en tu portafolio
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowAllInvestments(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-gray-500" />
                </motion.button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <div className="text-blue-600 text-sm font-medium">
                      Total Invertido
                    </div>
                    <div className="text-2xl font-bold text-blue-700">
                      ${(totalInvestment / 1_000_000).toFixed(2)}M
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl">
                    <div className="text-green-600 text-sm font-medium">
                      Valor Total
                    </div>
                    <div className="text-2xl font-bold text-green-700">
                      ${(totalValue / 1_000_000).toFixed(2)}M
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl">
                    <div className="text-purple-600 text-sm font-medium">
                      Propiedades
                    </div>
                    <div className="text-2xl font-bold text-purple-700">
                      {investments.length}
                    </div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-xl">
                    <div className="text-orange-600 text-sm font-medium">
                      Rendimiento Prom.
                    </div>
                    <div className="text-2xl font-bold text-orange-700">
                      {averageYield}%
                    </div>
                  </div>
                </div>

                {/* Properties Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {allProperties.map((property, index) => (
                    <motion.div
                      key={`property-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {property.type}
                          </h4>
                          <div className="flex items-center text-gray-500 text-sm mb-2">
                            <MapPin size={14} className="mr-1" />
                            <span className="truncate">{property.address}</span>
                          </div>
                          {property.colonia && (
                            <div className="text-gray-400 text-xs">
                              {property.colonia}
                            </div>
                          )}
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-lg font-bold text-gray-900">
                            ${property.value.toFixed(1)}M
                          </div>
                          <div
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              Number(property.percentYield) >= 7
                                ? "bg-green-100 text-green-700"
                                : Number(property.percentYield) >= 5
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {property.percentYield}%
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <span className="text-gray-500">Invertido:</span>
                          <div className="font-medium">
                            ${(property.montoInvertido / 1_000_000).toFixed(2)}M
                          </div>
                        </div>
                        {property.squareMeters && (
                          <div>
                            <span className="text-gray-500">Área:</span>
                            <div className="font-medium">
                              {property.squareMeters}m²
                            </div>
                          </div>
                        )}
                      </div>

                      {(property.bedrooms || property.bathrooms) && (
                        <div className="flex gap-4 text-xs text-gray-500">
                          {property.bedrooms && (
                            <div>🛏️ {property.bedrooms} rec.</div>
                          )}
                          {property.bathrooms && (
                            <div>🚿 {property.bathrooms} baños</div>
                          )}
                        </div>
                      )}

                      {property.date && (
                        <div className="mt-2 flex items-center text-xs text-gray-400">
                          <Calendar size={12} className="mr-1" />
                          {new Date(property.date).toLocaleDateString()}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PortafolioChart;
