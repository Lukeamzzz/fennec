"use client";

import { useState } from "react";

import CardValuationData from "@/components/platform/dashboard/CardValuationData";
import CardProperties from "@/components/platform/dashboard/CardProperties";
import CardMarketGrowth from "@/components/platform/dashboard/CardMarketGrowth";
import PropertyEstimator from "@/components/platform/dashboard/PropertyEstimator";
import DashboardMarketTrendsChart from "@/components/platform/dashboard/DashboardMarketTrendsChart";
import CdmxMap from "@/components/platform/dashboard/map-component/CdmxMap";

import {useAverageCasaPrice} from "@/app/platform/dashboard/hooks/useAverageCasaPrice";
import {useCasaCount} from "@/app/platform/dashboard/hooks/useCasaCount";
import {useAverageM2Price} from "@/app/platform/dashboard/hooks/useAverageM2Price";
import {useAverageAllCasa} from "@/app/platform/dashboard/hooks/useAverageAllCasa";
import {useAverageM2AllCasa} from "@/app/platform/dashboard/hooks/useAverageM2PriceAllCasa";

function DashboardPage() {
  const [selectedAlcaldia, setSelectedAlcaldia] = useState<string>("");
  const { promedio, loading, error } = useAverageCasaPrice(selectedAlcaldia);
  const { cantidad, loading: loadingCasas, error: errorCasas } = useCasaCount(selectedAlcaldia);
  const { cantidad_m2, loading: loadingM2, error: errorM2 } = useAverageM2Price(selectedAlcaldia);
  const { averagePrice, loading: loadingAllAvg, error: errorAllAvg } = useAverageAllCasa();
  const { averageM2Price, loading: loadingM2AllAvg, error: errorM2AllAvg } = useAverageM2AllCasa();

  const handleAlcaldiaChange = (newAlcaldia: string) => {
    setSelectedAlcaldia(newAlcaldia);
  };

  return (
    <div className="flex min-h-screen p-2">
      <div className="flex-1 pt-5">
        <div className="flex items-center justify-center pb-10 space-x-4">
          <CardValuationData
            title={"Precio Promedio"}
            amount={promedio ?? 0}
            change={(cantidad_m2 / averagePrice!) * 100}
          />

          <CardProperties
            title={"Propiedades Listadas"}
            amount={cantidad}
            loading={loadingCasas}
            error={errorCasas}
          />
          
          <CardMarketGrowth
            title={"Precio por m2"}
            amount={cantidad_m2}
            loading={loadingCasas}
            error={errorCasas}
            change={(cantidad_m2 / averageM2Price!) * 100}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 space-y-6">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-semibold mb-4 text-center">Estimador de Valor</h2>
                <div className="w-full flex justify-center">
                  <PropertyEstimator onAlcaldiaChange={handleAlcaldiaChange} />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-semibold mb-4 text-center">Tendencias del Mercado</h2>
                <div className="w-full flex justify-center">
                  <DashboardMarketTrendsChart />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 text-center">Mapa de la Ciudad de México</h2>
            <div className="h-[600px] w-full">
              <CdmxMap 
                initialZoom={10}
                initialCenter={[-99.133209, 19.432608]}
                dataEndpoint="/api/alcaldias-data"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;