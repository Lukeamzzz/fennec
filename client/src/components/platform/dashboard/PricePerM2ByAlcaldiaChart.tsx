"use client";

import { useEffect, useState, useCallback } from "react";
import { useAverageM2Price } from "@/app/platform/dashboard/hooks/useAverageM2Price";

// Lista de alcaldías de Ciudad de México
const alcaldias = [
  "Álvaro Obregón",
  "Azcapotzalco",
  "Benito Juárez",
  "Coyoacán",
  "Cuajimalpa de Morelos",
  "Cuauhtémoc",
  "Gustavo A. Madero",
  "Iztacalco",
  "Iztapalapa",
  "La Magdalena Contreras",
  "Miguel Hidalgo",
  "Milpa Alta",
  "Tláhuac",
  "Tlalpan",
  "Venustiano Carranza",
  "Xochimilco",
];

interface AlcaldiaData {
  nombre: string;
  precio_m2: number;
}

interface PricePerM2ByAlcaldiaChartProps {
  tipo: "Casa" | "Departamento";
}

const SkeletonLoader = () => (
  <div className="space-y-4">
    {[...Array(6)].map((_, index) => (
      <div
        key={index}
        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg animate-pulse"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="w-32 h-4 bg-gray-300 rounded"></div>
        </div>
        <div className="w-24 h-4 bg-gray-300 rounded"></div>
      </div>
    ))}
    <div className="text-center text-sm text-gray-500 mt-4">
      <div className="flex items-center justify-center space-x-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
        <span>Cargando datos de precios...</span>
      </div>
    </div>
  </div>
);

const NoDataAvailable = ({ tipo }: { tipo: "Casa" | "Departamento" }) => (
  <div className="flex flex-col items-center justify-center h-[400px] text-center">
    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <svg
        className="w-12 h-12 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">
      No hay datos disponibles
    </h3>
    <p className="text-sm text-gray-500 max-w-md">
      No se pudieron cargar los datos de precios por m² de{" "}
      {tipo === "Casa" ? "casas" : "departamentos"} en este momento.
    </p>
    <button
      onClick={() => window.location.reload()}
      className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm"
    >
      Intentar de nuevo
    </button>
  </div>
);

const AlcaldiaDataPoint = ({
  alcaldia,
  tipo,
  onDataReceived,
}: {
  alcaldia: string;
  tipo: "Casa" | "Departamento";
  onDataReceived: (alcaldia: string, precio: number) => void;
}) => {
  const { cantidad_m2, loading } = useAverageM2Price(alcaldia, tipo);

  useEffect(() => {
    if (!loading && cantidad_m2 > 0) {
      onDataReceived(alcaldia, cantidad_m2);
    }
  }, [cantidad_m2, loading, alcaldia, onDataReceived]);

  return null;
};

export default function PricePerM2ByAlcaldiaChart({
  tipo,
}: PricePerM2ByAlcaldiaChartProps) {
  const [alcaldiaData, setAlcaldiaData] = useState<AlcaldiaData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleDataReceived = useCallback((alcaldia: string, precio: number) => {
    setAlcaldiaData((prev) => {
      const exists = prev.find((item) => item.nombre === alcaldia);
      if (exists) {
        return prev.map((item) =>
          item.nombre === alcaldia ? { ...item, precio_m2: precio } : item
        );
      } else {
        return [...prev, { nombre: alcaldia, precio_m2: precio }];
      }
    });
  }, []);

  useEffect(() => {
    setAlcaldiaData([]);
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [tipo]);

  // Sort data by price per m² and filter out 0 values
  const sortedData = alcaldiaData
    .filter((item) => item.precio_m2 > 0)
    .sort((a, b) => b.precio_m2 - a.precio_m2);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mt-8">
      {/* Render invisible components to fetch data */}
      {alcaldias.map((alcaldia) => (
        <AlcaldiaDataPoint
          key={`${alcaldia}-${tipo}`}
          alcaldia={alcaldia}
          tipo={tipo}
          onDataReceived={handleDataReceived}
        />
      ))}

      <h2 className="text-xl font-semibold text-gray-800 mb-1">
        Precio por Metro Cuadrado -{" "}
        {tipo === "Casa" ? "Casas" : "Departamentos"}
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Comparativa de precios por m² de{" "}
        {tipo === "Casa" ? "casas" : "departamentos"} por alcaldía en Ciudad de
        México
      </p>

      {isLoading ? (
        <SkeletonLoader />
      ) : sortedData.length > 0 ? (
        <div className="space-y-4">
          {sortedData.map((item, index) => (
            <div
              key={item.nombre}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <span className="font-medium text-gray-800">{item.nombre}</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-gray-900">
                  ${item.precio_m2.toLocaleString()} MXN/m²
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoDataAvailable tipo={tipo} />
      )}

      {sortedData.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Resumen</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <p>
              <strong>Alcaldía más cara:</strong> {sortedData[0]?.nombre} - $
              {sortedData[0]?.precio_m2.toLocaleString()} MXN/m²
            </p>
            <p>
              <strong>Alcaldía más económica:</strong>{" "}
              {sortedData[sortedData.length - 1]?.nombre} - $
              {sortedData[sortedData.length - 1]?.precio_m2.toLocaleString()}{" "}
              MXN/m²
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
