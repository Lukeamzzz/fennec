"use client";

import { useState } from "react";
import RegionalAnalysisSection from "@/components/platform/dashboard/RegionalAnalysisSection";
import StatCard from "@/components/platform/dashboard/StatCard";
import { BadgeDollarSign, LandPlot } from "lucide-react";
import MexicoCityMap from "@/components/platform/dashboard/mexico-city-map/MexicoCityMap";

// Placeholder data for stats cards - replace with actual data fetching
const statsData = [
  {
    title: "Precio Promedio",
    value: "$33,450 MXN/m²",
    change: "+5.2%",
    changeType: "positive",
    icon: BadgeDollarSign
  },
  {
    title: "Propiedades Listadas",
    value: "24,583",
    change: "+12.3%",
    changeType: "positive",
    icon: LandPlot
  },
  {
    title: "Días en Mercado",
    value: "86 días",
    change: "-8.6%",
    changeType: "negative",
    icon: BadgeDollarSign
  },
  {
    title: "Compradores Activos",
    value: "15,420",
    change: "+3.8%",
    changeType: "positive",
    icon: BadgeDollarSign
  },
];

const tabs = [
  { name: "Precios de Casas" },
  { name: "Precios de Departamentos" },
  { name: "Mercado Inmobiliario en Ciudad de México" },
];

export default function MarketTrends() {
  const [activeTab, setActiveTab] = useState("Precios de Casas");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    // fetch or filter data based on the new tab
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold text-gray-800">
            Tendencias del Mercado
          </h1>
          <div className="flex items-center gap-4"></div>
        </div>
        <p className="text-gray-600">
          Análisis del mercado inmobiliario mexicano actualizado al día de hoy
        </p>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType as "positive" | "negative"}
            Icon={stat.icon}
          />
        ))}
      </section>

      {/* Tabs */}
      <section className="mb-8">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => handleTabClick(tab.name)}
              className={`py-3 px-6 text-sm font-medium focus:outline-none
                ${
                  activeTab === tab.name
                    ? "border-b-2 border-orange-500 text-orange-500"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </section>

      {/* Regional Analysis Section */}
      { activeTab === "Precios de Casas" && <RegionalAnalysisSection />}
      { activeTab === "Mercado Inmobiliario en Ciudad de México" && 
        <div className="bg-white p-6 rounded-xl shadow-lg mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            Mapa Interactivo de Ciudad de México
          </h2>
          <p className="text-sm text-gray-500">
            Exploración detallada de precios y tendencias inmobiliarias segmentado por alcaldía.
          </p>
          <MexicoCityMap />
        </div>
      }
    </div>
  );
}
