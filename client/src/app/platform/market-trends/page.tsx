"use client";

import { useState } from "react";
// import MarketTrendsChart from "@/components/platform/dashboard/MarketTrendsChart";
import RegionalAnalysisSection from "@/components/platform/dashboard/RegionalAnalysisSection";
import StatCard from "@/components/platform/dashboard/StatCard";

// Placeholder data for stats cards - replace with actual data fetching
const statsData = [
  {
    title: "Precio Promedio",
    value: "$33,450 MXN/m²",
    change: "+5.2%",
    changeType: "positive",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8 text-orange-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Propiedades Listadas",
    value: "24,583",
    change: "+12.3%",
    changeType: "positive",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8 text-orange-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21M3 3h18M3 9h18M3 15h18"
        />
      </svg>
    ),
  },
  {
    title: "Días en Mercado",
    value: "86 días",
    change: "-8.6%",
    changeType: "negative",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8 text-orange-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
        />
      </svg>
    ),
  },
  {
    title: "Compradores Activos",
    value: "15,420",
    change: "+3.8%",
    changeType: "positive",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8 text-orange-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m8.007 0a3 3 0 00-4.682 2.72M12 12a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
        />
      </svg>
    ),
  },
];

const tabs = [
  { name: "Precios de Casas" },
  { name: "Precios de Departamentos" },
  { name: "Precios de Terrenos" },
];

export default function MarketTrends() {
  // TODO: Add state for active tab and period filter
  const [activeTab, setActiveTab] = useState("Precios de Casas");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    // Here you would typically also fetch or filter data based on the new tab
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
            icon={stat.icon}
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
      <RegionalAnalysisSection />
    </div>
  );
}
