"use client";

import React, { useState, useMemo } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { BarChart3, Home, Building2, MapPin, Info, Check, X } from "lucide-react";
import { useAlcaldiasData, AlcaldiaData } from "@/app/platform/dashboard/hooks/useAlcaldiasData";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const MarketTrendsChart = () => {
  const [tipoComparacion, setTipoComparacion] = useState<'precio' | 'm2'>('precio');
  const [tipoPropiedad, setTipoPropiedad] = useState<'casa' | 'departamento'>('departamento');
  const [alcaldiasSeleccionadas, setAlcaldiasSeleccionadas] = useState<string[]>([
    "Benito Juárez", 
    "Miguel Hidalgo", 
    "Álvaro Obregón"
  ]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // Lista de alcaldías disponibles
  const alcaldiasDisponibles = [
    "Benito Juárez",
    "Miguel Hidalgo", 
    "Álvaro Obregón",
    "Coyoacán",
    "Tlalpan",
    "Cuajimalpa",
    "Iztapalapa",
    "Gustavo A. Madero",
    "Xochimilco",
    "Cuauhtémoc",
    "Venustiano Carranza",
    "Azcapotzalco"
  ];

  // Obtener datos reales de las alcaldías seleccionadas
  const { data: alcaldiasData, loading, error } = useAlcaldiasData(alcaldiasSeleccionadas);

  // Generar datos para el gráfico
  const chartData = useMemo(() => {
    if (loading || Object.keys(alcaldiasData).length === 0) {
      return {
        labels: alcaldiasSeleccionadas,
        datasets: [{
          label: 'Cargando...',
          data: [],
          backgroundColor: ['rgba(245, 108, 18, 0.8)'],
          borderColor: ['#F56C12'],
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        }]
      };
    }

    return {
      labels: alcaldiasSeleccionadas,
      datasets: [
        {
          label: tipoComparacion === 'precio' 
            ? `Precio Promedio ${tipoPropiedad === 'casa' ? 'Casa' : 'Departamento'}` 
            : `Precio por m² ${tipoPropiedad === 'casa' ? 'Casa' : 'Departamento'}`,
          data: alcaldiasSeleccionadas.map(alcaldia => {
            const data = alcaldiasData[alcaldia];
            if (!data) return 0;
            
            if (tipoComparacion === 'precio') {
              return tipoPropiedad === 'casa' ? data.precioCasa : data.precioDepto;
            } else {
              return tipoPropiedad === 'casa' ? data.precioM2Casa : data.precioM2Depto;
            }
          }),
          backgroundColor: [
            'rgba(245, 108, 18, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(16, 185, 129, 0.8)',
          ],
          borderColor: [
            '#F56C12',
            '#3B82F6',
            '#10B981',
          ],
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    };
  }, [alcaldiasSeleccionadas, alcaldiasData, tipoComparacion, tipoPropiedad, loading]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#F56C12',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function(context: any) {
            const value = context.parsed.y;
            if (tipoComparacion === 'precio') {
              return `$${(value / 1000000).toFixed(1)}M MXN`;
            } else {
              return `$${value.toLocaleString('es-MX')} MXN/m²`;
            }
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: function(value: any) {
            if (tipoComparacion === 'precio') {
              return `$${(value / 1000000).toFixed(1)}M`;
            } else {
              return `$${(value / 1000).toFixed(0)}k`;
            }
          },
          color: '#6B7280',
          font: {
            size: 11,
          }
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#374151',
          font: {
            size: 11,
            weight: 'bold' as const,
          }
        }
      }
    }
  };

  const toggleAlcaldia = (alcaldia: string) => {
    if (alcaldiasSeleccionadas.includes(alcaldia)) {
      // Si está seleccionada, la removemos (solo si no es la única o si hay más de 2)
      if (alcaldiasSeleccionadas.length > 2) {
        setAlcaldiasSeleccionadas(alcaldiasSeleccionadas.filter(a => a !== alcaldia));
      }
    } else {
      // Si no está seleccionada, la agregamos (solo si hay espacio)
      if (alcaldiasSeleccionadas.length < 3) {
        setAlcaldiasSeleccionadas([...alcaldiasSeleccionadas, alcaldia]);
      }
    }
  };

  const removeAlcaldia = (alcaldia: string) => {
    if (alcaldiasSeleccionadas.length > 2) {
      setAlcaldiasSeleccionadas(alcaldiasSeleccionadas.filter(a => a !== alcaldia));
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    // Forzar re-fetch cambiando las alcaldías y volviéndolas a poner
    const current = [...alcaldiasSeleccionadas];
    setAlcaldiasSeleccionadas([]);
    setTimeout(() => {
      setAlcaldiasSeleccionadas(current);
    }, 100);
  };

  if (error) {
    return (
      <div className="w-full max-w-xl p-4 shadow-xl rounded-xl">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <BarChart3 className="h-5 w-5 text-red-500" />
            <h3 className="font-medium text-red-700">Error en Comparativa de Alcaldías</h3>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 text-sm mb-3">{error}</p>
            
            <div className="space-y-2 text-xs text-red-600">
              <p><strong>Posibles soluciones:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-left">
                <li>Verifica que el servidor backend esté corriendo en puerto 8080</li>
                <li>Revisa tu conexión a internet</li>
                <li>Intenta refrescar la página</li>
                <li>Si el problema persiste, contacta al administrador</li>
              </ul>
            </div>
          </div>
          
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
          >
            🔄 Reintentar {retryCount > 0 && `(${retryCount})`}
          </button>
          
          <p className="text-xs text-gray-500">
            Alcaldías seleccionadas: {alcaldiasSeleccionadas.join(", ")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl p-4 shadow-xl rounded-xl">
      {/* Header */}
      <div className="text-center justify-center mb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <BarChart3 className="h-5 w-5 text-orange-500" />
          <h3 className="font-medium">Comparativa de Alcaldías</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          {loading ? "Cargando datos..." : "Precios promedio CDMX"}
        </p>
      </div>

      {/* Controls */}
      <div className="space-y-4 mb-4">
        {/* Selector de tipo de propiedad */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Propiedad
          </label>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setTipoPropiedad('casa')}
              className={`flex items-center gap-1 px-3 py-2 text-sm rounded-md transition-colors flex-1 justify-center ${
                tipoPropiedad === 'casa' 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Home className="h-4 w-4" />
              Casas
            </button>
            <button
              onClick={() => setTipoPropiedad('departamento')}
              className={`flex items-center gap-1 px-3 py-2 text-sm rounded-md transition-colors flex-1 justify-center ${
                tipoPropiedad === 'departamento' 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Building2 className="h-4 w-4" />
              Departamentos
            </button>
          </div>
        </div>

        {/* Selector de comparación */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Comparación
          </label>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setTipoComparacion('precio')}
              className={`px-3 py-2 text-sm rounded-md transition-colors flex-1 ${
                tipoComparacion === 'precio' 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Precio Total
            </button>
            <button
              onClick={() => setTipoComparacion('m2')}
              className={`px-3 py-2 text-sm rounded-md transition-colors flex-1 ${
                tipoComparacion === 'm2' 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Precio por m²
            </button>
          </div>
        </div>

        {/* Selector de alcaldías mejorado */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Alcaldías a Comparar
            </label>
            <div className="relative">
              <button
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Info className="h-4 w-4" />
              </button>
              {showTooltip && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg shadow-lg z-30 w-64">
                  <div className="text-center">
                    <p className="font-medium mb-1">💡 Tip de Comparación</p>
                    <p>La primera alcaldía seleccionada será la <span className="font-semibold text-orange-300">base de comparación</span>. Las demás mostrarán su diferencia porcentual respecto a esta.</p>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                </div>
              )}
            </div>
          </div>

          {/* Alcaldías seleccionadas */}
          <div className="mb-2">
            <div className="flex flex-wrap gap-2">
              {alcaldiasSeleccionadas.map((alcaldia, index) => (
                <div
                  key={alcaldia}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs ${
                    index === 0 
                      ? 'bg-orange-100 text-orange-700 border border-orange-200' 
                      : 'bg-blue-100 text-blue-700 border border-blue-200'
                  }`}
                >
                  {index === 0 && <span className="text-xs">📍</span>}
                  <span className="font-medium">{alcaldia}</span>
                  {index === 0 ? (
                    <span className="text-xs opacity-75">(Base)</span>
                  ) : (
                    <button
                      onClick={() => removeAlcaldia(alcaldia)}
                      className="ml-1 hover:bg-red-200 rounded-full p-0.5"
                      disabled={alcaldiasSeleccionadas.length <= 2}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Dropdown de selección */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 bg-white text-gray-600 flex items-center justify-between"
            >
              <span>
                {alcaldiasSeleccionadas.length < 3 
                  ? `Seleccionar alcaldía (${alcaldiasSeleccionadas.length}/3)`
                  : 'Máximo 3 alcaldías seleccionadas'
                }
              </span>
              <ChevronDownIcon className="h-4 w-4" />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 py-1 bg-white rounded-lg shadow-lg border z-20 max-h-48 overflow-y-auto">
                {alcaldiasDisponibles.map((alcaldia) => {
                  const isSelected = alcaldiasSeleccionadas.includes(alcaldia);
                  const canSelect = !isSelected && alcaldiasSeleccionadas.length < 3;
                  const canDeselect = isSelected && alcaldiasSeleccionadas.length > 2;
                  const isBase = alcaldiasSeleccionadas[0] === alcaldia;
                  const isClickable = canSelect || canDeselect;
                  
                  return (
                    <div
                      key={alcaldia}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors flex items-center justify-between ${
                        isSelected
                          ? isBase 
                            ? 'bg-orange-50 text-orange-600'
                            : 'bg-blue-50 text-blue-600'
                          : isClickable
                            ? 'hover:bg-gray-50 text-gray-700 cursor-pointer'
                            : 'text-gray-400 cursor-not-allowed'
                      }`}
                      onClick={() => isClickable && toggleAlcaldia(alcaldia)}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          isSelected 
                            ? isBase ? 'bg-orange-500' : 'bg-blue-500'
                            : 'bg-gray-300'
                        }`} />
                        <span>{alcaldia}</span>
                        {isBase && <span className="text-xs opacity-75">(Base)</span>}
                        {isSelected && !canDeselect && <span className="text-xs opacity-75">(Mín. 2)</span>}
                      </div>
                      <div className="flex items-center gap-1">
                        {isSelected && <Check className="h-3 w-3" />}
                        {canDeselect && (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              removeAlcaldia(alcaldia);
                            }}
                            className="ml-1 hover:bg-red-200 rounded-full p-0.5 cursor-pointer"
                          >
                            <X className="h-2 w-2" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Gráfico */}
      <div className="h-48 mb-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
              <p className="text-sm text-gray-500 mt-2">Cargando datos...</p>
            </div>
          </div>
        ) : (
          <Bar data={chartData} options={chartOptions} />
        )}
      </div>

      {/* Tabla comparativa */}
      <div className="border-t border-gray-100 pt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Comparación Detallada</h4>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="font-medium text-gray-700">Alcaldía</div>
          <div className="font-medium text-gray-700 text-center">Precio Total</div>
          <div className="font-medium text-gray-700 text-center">Precio/m²</div>
          <div className="font-medium text-gray-700 text-center">Diferencia</div>
          
          {loading ? (
            <div className="col-span-4 text-center py-4 text-gray-500">
              Cargando datos de comparación...
            </div>
          ) : (
            alcaldiasSeleccionadas.map((alcaldia, index) => {
              const data = alcaldiasData[alcaldia];
              if (!data) return null;
              
              const precioTotal = tipoPropiedad === 'casa' ? data.precioCasa : data.precioDepto;
              const precioM2 = tipoPropiedad === 'casa' ? data.precioM2Casa : data.precioM2Depto;
              
              // Calcular diferencia con respecto al primero
              const primerAlcaldia = alcaldiasSeleccionadas[0];
              const dataPrimera = alcaldiasData[primerAlcaldia];
              if (!dataPrimera) return null;
              
              const precioBase = tipoComparacion === 'precio' 
                ? (tipoPropiedad === 'casa' ? dataPrimera.precioCasa : dataPrimera.precioDepto)
                : (tipoPropiedad === 'casa' ? dataPrimera.precioM2Casa : dataPrimera.precioM2Depto);
              const precioActual = tipoComparacion === 'precio' ? precioTotal : precioM2;
              const diferencia = index === 0 ? 0 : ((precioActual - precioBase) / precioBase) * 100;
              
              return (
                <React.Fragment key={alcaldia}>
                  <div className="py-2 flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-900 font-medium">{alcaldia}</span>
                  </div>
                  <div className="py-2 text-center text-gray-700">
                    ${precioTotal > 0 ? (precioTotal / 1000000).toFixed(1) : '0.0'}M
                  </div>
                  <div className="py-2 text-center text-gray-700">
                    ${precioM2 > 0 ? (precioM2 / 1000).toFixed(0) : '0'}k
                  </div>
                  <div className="py-2 text-center">
                    {index === 0 ? (
                      <span className="text-gray-500">Base</span>
                    ) : (
                      <span className={`font-medium ${diferencia > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {diferencia > 0 ? '+' : ''}{diferencia.toFixed(1)}%
                      </span>
                    )}
                  </div>
                </React.Fragment>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketTrendsChart;
