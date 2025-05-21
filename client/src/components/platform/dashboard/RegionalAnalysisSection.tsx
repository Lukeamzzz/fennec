"use client";

import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";
import MarketTrendsChart from "@/components/platform/dashboard/MarketTrendsChart";

const findingsData = [
  {
    text: "Los precios en CDMX continúan creciendo a un ritmo del 8.5% anual.",
    type: "positive",
  },
  {
    text: "Monterrey muestra el mayor incremento en rentas comerciales (12.3%).",
    type: "positive",
  },
  {
    text: "Guadalajara presenta una desaceleración en el sector residencial.",
    type: "negative",
  },
  {
    text: "El promedio nacional sigue una tendencia alcista constante desde 2021.",
    type: "positive",
  },
];

export default function RegionalAnalysisSection() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">
        Análisis Regional
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Comparativa de precios y tendencias por región
      </p>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Chart Section */}
        <div className="w-full md:w-2/3">
          <div className="h-[480px]">
            <MarketTrendsChart />
          </div>
        </div>

        {/* Principales Hallazgos */}
        <div className="w-full md:w-1/3">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Principales Hallazgos
          </h3>
          <ul className="space-y-3 mb-6">
            {findingsData.map((finding, index) => (
              <li key={index} className="flex items-start">
                {finding.type === "positive" ? (
                  <ArrowUpIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                ) : (
                  <ArrowDownIcon className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                )}
                <span className="text-sm text-gray-700">{finding.text}</span>
              </li>
            ))}
          </ul>
          <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 text-sm font-medium">
            Ver Análisis Completo
          </button>
        </div>
      </div>
    </div>
  );
}
