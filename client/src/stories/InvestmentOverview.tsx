import React, { useState, useEffect } from "react";
import {
  getREIT,
  REITData,
} from "@/app/platform/investment-insight/hooks/getREIT";
import { showCustomToast } from "@/lib/showCustomToast";

const portfolioStats = [
  {
    label: "Valor Total",
    value: "$2,450,000",
    change: "+12.3%",
    changeType: "up",
    subLabel: "Últimos 12 meses",
  },
  {
    label: "Rendimiento Anual",
    value: "9.1%",
    change: "+1.2%",
    changeType: "up",
    subLabel: "Superando el mercado",
  },
  {
    label: "Propiedades",
    value: "8",
    change: "+2",
    changeType: "up",
    subLabel: "Nuevas adquisiciones",
  },
  {
    label: "Ocupación",
    value: "95%",
    change: "+5%",
    changeType: "up",
    subLabel: "Promedio anual",
  },
];

const InvestmentOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"portafolio" | "mercado">(
    "portafolio"
  ); // Sets portafolio as default tab
  const [reitData, setReitData] = useState<{
    funo: REITData | null;
    dabhos: REITData | null;
    fmty: REITData | null;
  }>({
    funo: null,
    dabhos: null,
    fmty: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchREITData = async () => {
      try {
        setLoading(true);
        const [funoData, dabhosData, fmtyData] = await Promise.all([
          getREIT({ reit: "funo" }),
          getREIT({ reit: "danhos" }),
          getREIT({ reit: "fmty" }),
        ]);

        setReitData({
          funo: funoData,
          dabhos: dabhosData,
          fmty: fmtyData,
        });
      } catch (error) {
        showCustomToast({
          message: `Error al obtener datos de los REITs`,
          type: "error",
          duration: 3000,
        });
        console.error("Error fetching REIT data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchREITData();
  }, []);

  const marketStats = [
    {
      label: "FUNO",
      value: loading
        ? "Cargando..."
        : reitData.funo
        ? `$${reitData.funo.precio.toFixed(2)}`
        : "N/A",
      change: null,
      changeType: null,
      subLabel: reitData.funo?.fecha
        ? new Date(reitData.funo.fecha).toLocaleDateString("es-MX")
        : "Fecha no disponible",
    },
    {
      label: "DANHOS",
      value: loading
        ? "Cargando..."
        : reitData.dabhos
        ? `$${reitData.dabhos.precio.toFixed(2)}`
        : "N/A",
      change: null,
      changeType: null,
      subLabel: reitData.dabhos?.fecha
        ? new Date(reitData.dabhos.fecha).toLocaleDateString("es-MX")
        : "Fecha no disponible",
    },
    {
      label: "FMTY",
      value: loading
        ? "Cargando..."
        : reitData.fmty
        ? `$${reitData.fmty.precio.toFixed(2)}`
        : "N/A",
      change: null,
      changeType: null,
      subLabel: reitData.fmty?.fecha
        ? new Date(reitData.fmty.fecha).toLocaleDateString("es-MX")
        : "Fecha no disponible",
    },
    {
      label: "Índice de Riesgo",
      value: "Moderado",
      change: null,
      changeType: null,
      subLabel: "Estable por 3 trimestres",
    },
  ];

  const currentStats =
    activeTab === "portafolio" ? portfolioStats : marketStats;
  const currentTitle = activeTab === "portafolio" ? "Portafolio" : "Mercado";
  const currentDescription =
    activeTab === "portafolio"
      ? "Tu portafolio de inversión inmobiliaria muestra un crecimiento sólido y consistente. Las propiedades en zonas premium han generado rendimientos superiores al promedio del mercado, con una ocupación estable y flujo de efectivo positivo."
      : "El mercado inmobiliario mexicano muestra signos de estabilización después de la volatilidad post-pandemia. Las zonas premium de CDMX, Monterrey y Guadalajara siguen siendo los polos de mayor rentabilidad, con un crecimiento sostenido en el segmento de propiedades de lujo. Se anticipa un incremento moderado pero constante en los precios durante los próximos 18 meses.";

  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Panorama de Inversión</h2>
        <p className="text-gray-500 text-lg">
          Resumen de indicadores clave para el mercado inmobiliario mexicano
        </p>
      </div>
      <div className="flex justify-center mb-6">
        <div className="inline-flex bg-[#F3F0E8] rounded-xl p-1">
          <button
            className={`px-6 py-2 rounded-xl font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === "portafolio"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("portafolio")}
          >
            Portafolio
          </button>
          <button
            className={`px-6 py-2 rounded-xl font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === "mercado"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("mercado")}
          >
            Mercado
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {currentStats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl shadow p-6 flex flex-col items-start"
          >
            <span className="text-gray-600 text-sm font-medium mb-1 flex items-center">
              {stat.label}
              {stat.label === "Índice de Riesgo" && (
                <span
                  className="ml-1 text-gray-400 cursor-pointer"
                  title="Más información"
                >
                  &#9432;
                </span>
              )}
            </span>
            <div className="flex items-end mb-1">
              <span className="text-3xl font-bold mr-2">{stat.value}</span>
              {stat.change && (
                <span
                  className={`text-sm font-semibold ${
                    stat.changeType === "up" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {stat.change}
                </span>
              )}
            </div>
            <span className="text-gray-400 text-xs">{stat.subLabel}</span>
          </div>
        ))}
      </div>
      {/*remove the border from the component*/}
      <div className="bg-white rounded-xl p-8 text-left flex items-start gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-semibold text-xl text-primary">
              Perspectiva de{" "}
              <span className="text-orange-500">{currentTitle}</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-base leading-relaxed">
            {currentDescription}
          </p>
        </div>
      </div>
    </>
  );
};

export default InvestmentOverview;
