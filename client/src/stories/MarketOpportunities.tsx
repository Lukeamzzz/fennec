import React, { useState } from "react";
import InvestmentInsight from "@/stories/InvestmentInsight";

const categories = [
  "Todos",
  "Residencial",
  "Comercial",
  "Desarrollo",
  "Industrial",
];

const opportunities = [
  {
    title: "Desarrollo Vertical Cuauhtémoc",
    badgeText: "Desarrollo",
    location: "Cuauhtémoc, CDMX",
    description:
      "Proyecto de desarrollo de torre de uso mixto en una de las zonas con mayor potencial de crecimiento en la Ciudad de México.",
    investmentRequired: "$75-120M",
    projectedRoi: "14.2%",
    estimatedTerm: "36-48 meses",
    riskLevel: "Medio",
    highlights: [
      "50+ unidades residenciales",
      "Amenidades de lujo",
      "Planta baja comercial",
      "Certificación LEED",
    ],
    tags: ["Alta Demanda", "Zona Premium"],
    category: "Desarrollo",
  },
  {
    title: "Hub Tecnológico Valle de México",
    badgeText: "Comercial",
    location: "Interlomas, Estado de México",
    description:
      "Espacio comercial orientado a empresas tecnológicas en zona de rápido crecimiento, con infraestructura adaptada para necesidades tech.",
    investmentRequired: "$45-60M",
    projectedRoi: "12.8%",
    estimatedTerm: "24-30 meses",
    riskLevel: "Medio-Bajo",
    highlights: [
      "Coworking integrado",
      "Sistemas inteligentes",
      "Fibra óptica dedicada",
      "Áreas colaborativas",
    ],
    tags: ["Tech Hub", "Alta Plusvalía"],
    category: "Comercial",
  },
  {
    title: "Centro de Salud en Tlalpan",
    badgeText: "Desarrollo",
    location: "Tlalpan, CDMX",
    description:
      "Proyecto de desarrollo de centro de salud en zona de alta demanda, con servicios médicos y hospitalarios modernos.",
    investmentRequired: "$30-45M",
    projectedRoi: "11.5%",
    estimatedTerm: "24-30 meses",
    riskLevel: "Medio-Bajo",
    highlights: [
      "Servicios médicos modernos",
      "Áreas de atención especializada",
      "Infraestructura hospitalaria",
    ],
    tags: ["Salud", "Zona Premium"],
    category: "Residencial",
  },
];

const MarketOpportunities: React.FC = () => {
  const [selected, setSelected] = useState("Todos");

  const filtered =
    selected === "Todos"
      ? opportunities
      : opportunities.filter((o) => o.category === selected);

  return (
    <div className="flex flex-col gap-4 p-10 drop-shadow-xl">
      <section className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Oportunidades de Mercado
            </h2>
            <p className="text-gray-500 text-sm">
              Proyectos de inversión con alto potencial de retorno
            </p>
          </div>
        </div>
        <div className="flex gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-1 rounded-md font-medium text-sm transition-colors ${
                selected === cat
                  ? "bg-gray-100 text-gray-900"
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100"
              }`}
              onClick={() => setSelected(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filtered.map((op) => (
            <div
              key={op.title}
              className="bg-[#FFF9F6] rounded-xl  flex flex-col justify-between min-h-[420px]"
            >
              <InvestmentInsight
                title={op.title}
                badgeText={op.badgeText}
                location={op.location}
                description={op.description}
                investmentRequired={op.investmentRequired}
                projectedRoi={op.projectedRoi}
                estimatedTerm={op.estimatedTerm}
                riskLevel={op.riskLevel}
                highlights={op.highlights}
                tags={op.tags}
                onDetailsClick={() => {}}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MarketOpportunities;
