import React, { useState, useEffect, useMemo } from "react";
import InvestmentInsight from "@/stories/InvestmentInsight";
import { getHouses, House } from "@/lib/getHouses";
import { getApartments, Apartment } from "@/lib/getApartments";
import OpportunitySkeleton from "./OpportunitySkeleton";

const categories = ["Todos", "Casas", "Departamentos"];

type OpportunityItem =
  | (House & { _type: "Casa" })
  | (Apartment & { _type: "Departamento" });

function getRandomItems<T>(arr: T[], n: number): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result.slice(0, n);
}

function mapToInvestmentInsight(item: OpportunityItem) {
  const maxDesc = 120;
  let desc = item.descripcion;
  if (desc.length > maxDesc) {
    desc = desc.slice(0, maxDesc);
    const lastSpace = desc.lastIndexOf(" ");
    if (lastSpace > 0) desc = desc.slice(0, lastSpace);
    desc += "...";
  }
  return {
    title: `${item._type} en ${item.colonia}`,
    badgeText: item._type,
    location: `${item.direccion}, ${item.alcaldia}`,
    description: desc,
    investmentRequired: `$${item.precio.toLocaleString()}`,
    projectedRoi: `${(Math.random() * 10 + 5).toFixed(1)}%`,
    estimatedTerm: `${Math.floor(Math.random() * 36 + 12)}-${Math.floor(
      Math.random() * 24 + 36
    )} meses`, // Simulado
    riskLevel: ["Bajo", "Medio", "Alto"][Math.floor(Math.random() * 3)],
    highlights: [
      `${item.recamaras} recámaras`,
      `${item.banos} baños`,
      `${item.estacionamientos} estacionamientos`,
      `${item.dimensionesM2} m²`,
    ].slice(0, 3),
    tags: [item.colonia, item.alcaldia].slice(0, 2),
    onDetailsClick: () => {},
  };
}

const MarketOpportunities: React.FC = () => {
  const [selected, setSelected] = useState<string>("Todos");
  const [casas, setCasas] = useState<House[]>([]);
  const [departamentos, setDepartamentos] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([getHouses(), getApartments()])
      .then(([casasData, deptosData]) => {
        setCasas(getRandomItems(casasData, 5));
        setDepartamentos(getRandomItems(deptosData, 5));
      })
      .finally(() => setLoading(false));
  }, []);

  const currentList = useMemo(() => {
    if (selected === "Todos") {
      return [
        ...casas.map((c) => ({ ...c, _type: "Casa" as const })),
        ...departamentos.map((d) => ({ ...d, _type: "Departamento" as const })),
      ];
    }
    if (selected === "Casas")
      return casas.map((c) => ({ ...c, _type: "Casa" as const }));
    if (selected === "Departamentos")
      return departamentos.map((d) => ({
        ...d,
        _type: "Departamento" as const,
      }));
    return [];
  }, [selected, casas, departamentos]);

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
        {loading ? (
          <div className="w-full max-w-5xl mx-auto">
            <div
              className="flex flex-row gap-4 overflow-x-auto overflow-y-hidden pb-4 scrollbar-thin scrollbar-thumb-gray-200"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {[...Array(3)].map((_, idx) => (
                <OpportunitySkeleton key={idx} />
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full max-w-5xl mx-auto">
            <div
              className="flex flex-row gap-4 overflow-x-auto overflow-y-hidden pb-4 scrollbar-thin scrollbar-thumb-gray-200"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {currentList.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#FFF9F6] rounded-xl flex flex-col h-[480px] w-[340px] flex-shrink-0"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <InvestmentInsight
                    {...mapToInvestmentInsight(item)}
                    className="h-full flex flex-col"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default MarketOpportunities;
