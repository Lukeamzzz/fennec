import React, { useEffect, useState } from "react";
import MarketOpportunities from "@/stories/MarketOpportunities";
import PortafolioChart from "@/components/platform/investment-insights/portafolio/portafolio-chart/PortafolioChart";
import PortafolioRisk from "@/components/platform/investment-insights/portafolio/portafolio-risk/PortafolioRisk";
import InvestmentOverview from "@/stories/InvestmentOverview";
import {
  getInvestments,
  Investment,
} from "@/app/platform/investment-insight/hooks/getInvestments";
import { showCustomToast } from "@/lib/showCustomToast";

const OportunidadMercado = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loadingInvestments, setLoadingInvestments] = useState(true);

  const refreshInvestments = async () => {
    setLoadingInvestments(true);
    try {
      const data = await getInvestments();
      setInvestments(data);
    } catch (error) {
      console.error(error);
      showCustomToast({
        message: "Error al obtener inversiones",
        type: "error",
        duration: 3000,
      });
    } finally {
      setLoadingInvestments(false);
    }
  };

  useEffect(() => {
    refreshInvestments();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-4 p-10 drop-shadow-xl">
        <div className="bg-white rounded-2xl shadow p-6">
          <InvestmentOverview
            investments={investments}
            loadingInvestments={loadingInvestments}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-10 drop-shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PortafolioChart
            investments={investments}
            loading={loadingInvestments}
            refreshInvestments={refreshInvestments}
          />
          <PortafolioRisk />
        </div>
      </div>
      <MarketOpportunities />
    </div>
  );
};

export default OportunidadMercado;
