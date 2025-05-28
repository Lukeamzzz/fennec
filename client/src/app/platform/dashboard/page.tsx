"use client";

import { useState } from "react";

import CardValuationData from "@/components/platform/dashboard/CardValuationData";
import CardProperties from "@/components/platform/dashboard/CardProperties";
import CardMarketGrowth from "@/components/platform/dashboard/CardMarketGrowth";
import PropertyEstimator from "@/components/platform/dashboard/PropertyEstimator";
import DashboardMarketTrendsChart from "@/components/platform/dashboard/DashboardMarketTrendsChart";

import { useAuth } from "@/providers/AuthProvider";
import { useAverageCasaPrice } from "@/components/platform/dashboard/hooks/useAverageCasaPrice"; // Asegúrate que esté implementado

function DashboardPage() {
  const { idToken } = useAuth();

  const [selectedAlcaldia, setSelectedAlcaldia] = useState<string>("");
  const { promedio, loading, error } = useAverageCasaPrice(selectedAlcaldia);

  const handleAlcaldiaChange = (newAlcaldia: string) => {
    setSelectedAlcaldia(newAlcaldia);
  };

  return (
    <div className="flex min-h-screen p-2">
      <div className="flex-1 pt-5 ">
        <div className="flex items-center justify-center pb-10 space-x-4">
          <CardValuationData
            title={"Precio Promedio"}
            amount={promedio ?? 0}
            change={-1.2}
          />

          <CardProperties
            title={"Listed Properties"}
            amount={1245}
            change={-3.2}
          />
          <CardMarketGrowth
            title={"Market Growth"}
            amount={-7.8}
            change={-0.5}
          />
        </div>

        <div className="bg-white rounded-lg overflow-hidden shadow-sm flex items-center justify-center space-x-20 pb-10">
          <PropertyEstimator onAlcaldiaChange={handleAlcaldiaChange} />
          <DashboardMarketTrendsChart />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
