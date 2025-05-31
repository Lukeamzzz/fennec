import React, { useState, useEffect } from "react";
import {
  getREIT,
  REITData,
} from "@/app/platform/investment-insight/hooks/getREIT";
import { showCustomToast } from "@/lib/showCustomToast";
import {
  getInvestments,
  Investment,
} from "@/app/platform/investment-insight/hooks/getInvestments";

// Skeleton component for loading state
const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
);

const InvestmentOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"portafolio" | "mercado">(
    "portafolio"
  ); // Sets portafolio as default tab
  const [reitData, setReitData] = useState<{
    funo: REITData | null;
    fibrapl: REITData | null;
    fmty: REITData | null;
  }>({
    funo: null,
    fibrapl: null,
    fmty: null,
  });
  const [loading, setLoading] = useState(true);

  // NUEVO: Estado para inversiones
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loadingInvestments, setLoadingInvestments] = useState(true);

  useEffect(() => {
    const fetchREITData = async () => {
      try {
        setLoading(true);
        const [funoData, fibraplData, fmtyData] = await Promise.all([
          getREIT({ reit: "FUNO" }),
          getREIT({ reit: "FIBRAPL" }),
          getREIT({ reit: "FMTY" }),
        ]);

        setReitData({
          funo: funoData,
          fibrapl: fibraplData,
          fmty: fmtyData,
        });
      } catch {
        showCustomToast({
          message: `Error al obtener datos de los REITs`,
          type: "error",
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchREITData();
  }, []);

  // NUEVO: Obtener inversiones reales
  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        setLoadingInvestments(true);
        const data = await getInvestments();
        setInvestments(data);
      } catch (error) {
        showCustomToast({
          message: "Error al obtener inversiones",
          type: "error",
          duration: 3000,
        });
      } finally {
        setLoadingInvestments(false);
      }
    };
    fetchInvestments();
  }, []);

  // Calcula los valores reales
  const totalInvested = investments.reduce(
    (sum, inv) => sum + inv.monto_invertido,
    0
  );
  const totalProperties = investments.length;

  const portfolioStats = [
    {
      label: "Valor Total",
      value: loadingInvestments ? (
        <Skeleton className="h-8 w-20" />
      ) : (
        `$${totalInvested.toLocaleString("en-US")}`
      ),
      change: "+12.3%", // Puedes calcular cambios reales si tienes históricos
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
      value: loadingInvestments ? (
        <Skeleton className="h-8 w-8" />
      ) : (
        totalProperties
      ),
      change: "+2", // Puedes calcular cambios reales si tienes históricos
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

  const marketStats = [
    {
      label: "FUNO",
      value: loading ? (
        <Skeleton className="h-8 w-20" />
      ) : reitData.funo ? (
        `$${reitData.funo.precio.toFixed(2)}`
      ) : (
        "N/A"
      ),
      change: loading
        ? null
        : reitData.funo?.variacion
        ? `${
            reitData.funo.variacion > 0 ? "+" : ""
          }${reitData.funo.variacion.toFixed(2)}%`
        : null,
      changeType: loading
        ? null
        : reitData.funo?.variacion
        ? reitData.funo.variacion > 0
          ? "up"
          : "down"
        : null,
      subLabel: loading ? (
        <Skeleton className="h-3 w-24" />
      ) : reitData.funo?.fecha ? (
        `Actualizado ${new Date(reitData.funo.fecha).toLocaleDateString(
          "es-MX",
          {
            day: "numeric",
            month: "short",
          }
        )}`
      ) : (
        "Fecha no disponible"
      ),
    },
    {
      label: "FIBRAPL",
      value: loading ? (
        <Skeleton className="h-8 w-20" />
      ) : reitData.fibrapl ? (
        `$${reitData.fibrapl.precio.toFixed(2)}`
      ) : (
        "N/A"
      ),
      change: loading
        ? null
        : reitData.fibrapl?.variacion
        ? `${
            reitData.fibrapl.variacion > 0 ? "+" : ""
          }${reitData.fibrapl.variacion.toFixed(2)}%`
        : null,
      changeType: loading
        ? null
        : reitData.fibrapl?.variacion
        ? reitData.fibrapl.variacion > 0
          ? "up"
          : "down"
        : null,
      subLabel: loading ? (
        <Skeleton className="h-3 w-24" />
      ) : reitData.fibrapl?.fecha ? (
        `Actualizado ${new Date(reitData.fibrapl.fecha).toLocaleDateString(
          "es-MX",
          {
            day: "numeric",
            month: "short",
          }
        )}`
      ) : (
        "Fecha no disponible"
      ),
    },
    {
      label: "FMTY",
      value: loading ? (
        <Skeleton className="h-8 w-20" />
      ) : reitData.fmty ? (
        `$${reitData.fmty.precio.toFixed(2)}`
      ) : (
        "N/A"
      ),
      change: loading
        ? null
        : reitData.fmty?.variacion
        ? `${
            reitData.fmty.variacion > 0 ? "+" : ""
          }${reitData.fmty.variacion.toFixed(2)}%`
        : null,
      changeType: loading
        ? null
        : reitData.fmty?.variacion
        ? reitData.fmty.variacion > 0
          ? "up"
          : "down"
        : null,
      subLabel: loading ? (
        <Skeleton className="h-3 w-24" />
      ) : reitData.fmty?.fecha ? (
        `Actualizado ${new Date(reitData.fmty.fecha).toLocaleDateString(
          "es-MX",
          {
            day: "numeric",
            month: "short",
          }
        )}`
      ) : (
        "Fecha no disponible"
      ),
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
              <span className="text-3xl font-bold mr-2">
                {typeof stat.value === "string" ? stat.value : stat.value}
              </span>
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
            <span className="text-gray-400 text-xs">
              {typeof stat.subLabel === "string"
                ? stat.subLabel
                : stat.subLabel}
            </span>
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
