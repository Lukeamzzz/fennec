import MarketOpportunities from "@/stories/MarketOpportunities";
import PortafolioChart from "@/components/platform/investment-insights/portafolio/portafolio-chart/PortafolioChart";
import PortafolioRisk from "@/components/platform/investment-insights/portafolio/portafolio-risk/PortafolioRisk";
import InvestmentOverview from "@/stories/InvestmentOverview";

import React from "react";

const OportunidadMercado = () => {
  return (
    <div>
      <div className="flex flex-col gap-4 p-10 drop-shadow-xl">
        <div className="bg-white rounded-2xl shadow p-6">
          <InvestmentOverview />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-10 drop-shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PortafolioChart />
          <PortafolioRisk />
        </div>
      </div>
      <MarketOpportunities />
    </div>
  );
};

export default OportunidadMercado;
