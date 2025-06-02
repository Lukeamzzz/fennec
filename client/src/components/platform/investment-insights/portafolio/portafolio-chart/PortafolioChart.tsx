import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Chart, PieController, ArcElement, Tooltip, Legend } from "chart.js";
import { 
  Plus, 
  TrendingUp, 
  Building2, 
  MapPin, 
  X,
  Eye,
  DollarSign,
  Calendar,
  Home
} from "lucide-react";

interface Investment {
  monto_invertido: number;
  precio_propiedad: number;
  tipo_propiedad: string;
  direccion: string;
  descripcion: string;
  alcaldia: string;
  colonia: string;
  dimensiones_m2: number;
  fecha_inversion: string;
  banos: number;
  recamaras: number;
  estacionamientos: number;
}

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
  const [showAllInvestments, setShowAllInvestments] = useState(false);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

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
      value: inv.precio_propiedad / 1_000_000,
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

  const properties = getPropertiesSummary()
    .sort((a, b) => b.montoInvertido - a.montoInvertido)
    .slice(0, 4);
  
  const allProperties = getPropertiesSummary().sort(
    (a:any, b) => b.montoInvertido - a.montoInvertido
  );

  const totalInvestment = investments.reduce((sum, inv) => sum + inv.monto_invertido, 0);
  const totalValue = investments.reduce((sum, inv) => sum + inv.precio_propiedad, 0);
  const averageYield = investments.length > 0 
    ? ((totalInvestment / totalValue) * 100).toFixed(1)
    : 0;

  // Chart effect
  useEffect(() => {
    if (chartRef.current && !isFlipped && !loading && investments.length > 0) {
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
                    return `${label}: ${value.toLocaleString("en-US")}`;
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

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.02 }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: { opacity: 0, scale: 0.95, y: 30 }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const PropertyCard = ({ property, index }: { property: Property; index: number }) => (
    <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex-1">
        <div className="font-medium text-gray-900 text-sm">{property.type}</div>
        <div className="text-gray-500 text-xs">
          {property.units === 1 ? "1 unidad" : `${property.units} unidades`}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-semibold text-gray-900">
          ${property.value.toFixed(1)}M
        </span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          Number(property.percentYield) >= 7
            ? "bg-green-100 text-green-700"
            : Number(property.percentYield) >= 5
            ? "bg-blue-100 text-blue-700"
            : "bg-gray-100 text-gray-600"
        }`}>
          {property.percentYield}%
        </span>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
          <div className="space-y-3">
            {[1,2,3].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="bg-white rounded-xl shadow-sm overflow-hidden"
      >
        {investments.length === 0 ? (
          // Empty state
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 size={32} className="text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Comienza tu portafolio
            </h3>
            <p className="text-gray-600 mb-6">
              Agrega tu primera propiedad para ver el análisis de tu portafolio
            </p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFlipped(true)}
              className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors"
            >
              <Plus size={20} className="mr-2" />
              Añadir Primera Propiedad
            </motion.button>
          </div>
        ) : (
          <div className="p-6">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              <p className="text-gray-600 text-sm">{subtitle}</p>
            </div>
            
            {/* Chart */}
            <div className="relative max-w-80 mx-auto mb-6">
              <canvas ref={chartRef} height="250" className="mb-6"></canvas>
            </div>

            {/* Properties list */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Resumen por Tipo de Propiedad
              </h3>
              <div className="space-y-1">
                {properties.map((property, index) => (
                  <PropertyCard key={`prop-${index}`} property={property} index={index} />
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsFlipped(true)}
                className="flex-1 flex items-center justify-center px-4 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors"
              >
                <Plus size={20} className="mr-2" />
                Añadir Propiedad
              </motion.button>
              
              {allProperties.length > 4 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowAllInvestments(true)}
                  className="flex items-center px-4 py-3 border border-orange-200 text-orange-600 rounded-xl font-medium hover:bg-orange-50 transition-colors"
                >
                  <Eye size={20} className="mr-2" />
                  Ver Todas ({allProperties.length})
                </motion.button>
              )}
            </div>
          </div>
        )}
      </motion.div>

      {/* All Investments Modal */}
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
                    <div className="text-blue-600 text-sm font-medium">Total Invertido</div>
                    <div className="text-2xl font-bold text-blue-700">
                      ${(totalInvestment / 1_000_000).toFixed(2)}M
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl">
                    <div className="text-green-600 text-sm font-medium">Valor Total</div>
                    <div className="text-2xl font-bold text-green-700">
                      ${(totalValue / 1_000_000).toFixed(2)}M
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl">
                    <div className="text-purple-600 text-sm font-medium">Propiedades</div>
                    <div className="text-2xl font-bold text-purple-700">{investments.length}</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-xl">
                    <div className="text-orange-600 text-sm font-medium">Rendimiento Prom.</div>
                    <div className="text-2xl font-bold text-orange-700">{averageYield}%</div>
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
                          <h4 className="font-semibold text-gray-900 mb-1">{property.type}</h4>
                          <div className="flex items-center text-gray-500 text-sm mb-2">
                            <MapPin size={14} className="mr-1" />
                            <span className="truncate">{property.address}</span>
                          </div>
                          {property.colonia && (
                            <div className="text-gray-400 text-xs">{property.colonia}</div>
                          )}
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-lg font-bold text-gray-900">
                            ${property.value.toFixed(1)}M
                          </div>
                          <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            Number(property.percentYield) >= 7
                              ? "bg-green-100 text-green-700"
                              : Number(property.percentYield) >= 5
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-600"
                          }`}>
                            {property.percentYield}%
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <span className="text-gray-500">Invertido:</span>
                          <div className="font-medium">${(property.montoInvertido / 1_000_000).toFixed(2)}M</div>
                        </div>
                        {property.squareMeters && (
                          <div>
                            <span className="text-gray-500">Área:</span>
                            <div className="font-medium">{property.squareMeters}m²</div>
                          </div>
                        )}
                      </div>
                      
                      {(property.bedrooms || property.bathrooms) && (
                        <div className="flex gap-4 text-xs text-gray-500">
                          {property.bedrooms && <div>🛏️ {property.bedrooms} rec.</div>}
                          {property.bathrooms && <div>🚿 {property.bathrooms} baños</div>}
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