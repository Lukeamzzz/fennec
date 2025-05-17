import React from "react";

const stats = [
  {
    label: "Rendimiento Promedio",
    value: "8.2%",
    change: "+0.5%",
    changeType: "up",
    subLabel: "Últimos 12 meses",
  },
  {
    label: "Cap Rate Promedio",
    value: "6.7%",
    change: "-0.3%",
    changeType: "down",
    subLabel: "Cambio desde Q1",
  },
  {
    label: "Precio / m²",
    value: "$28,450",
    change: "+4.2%",
    changeType: "up",
    subLabel: "Incremento anual",
  },
  {
    label: "Índice de Riesgo",
    value: "Moderado",
    change: null,
    changeType: null,
    subLabel: "Estable por 3 trimestres",
  },
];

const InvestmentOverview: React.FC = () => {
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
          <button className="px-6 py-2 rounded-xl bg-white font-semibold text-gray-900 shadow-sm">
            General
          </button>
          <button className="px-6 py-2 rounded-xl text-gray-500">
            Residencial
          </button>
          <button className="px-6 py-2 rounded-xl text-gray-500">
            Comercial
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
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
              Perspectiva de <span className="text-orange-500">Mercado</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-base leading-relaxed">
            El mercado inmobiliario mexicano muestra signos de{" "}
            <span className="font-semibold text-primary">estabilización</span>{" "}
            después de la volatilidad post-pandemia. Las zonas premium de{" "}
            <span className="font-semibold">CDMX, Monterrey y Guadalajara</span>{" "}
            siguen siendo los polos de mayor rentabilidad, con un crecimiento
            sostenido en el segmento de propiedades de lujo. Se anticipa un
            incremento{" "}
            <span className="font-semibold text-primary">
              moderado pero constante
            </span>{" "}
            en los precios durante los próximos 18 meses.
          </p>
        </div>
      </div>
    </>
  );
};

export default InvestmentOverview;
