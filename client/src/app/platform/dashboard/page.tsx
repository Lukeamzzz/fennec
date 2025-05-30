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
import {useUserProfile} from "@/app/platform/dashboard/hooks/useUserProfile";
import { Info } from "lucide-react";

export default function DashboardPage() {
  const [selectedAlcaldia, setSelectedAlcaldia] = useState("Álvaro Obregón");
  const [selectedTipo, setSelectedTipo] = useState("Casa");

  const { averagePriceCasa, loading, errorAvg } =
    useAverageCasaPrice(selectedAlcaldia, selectedTipo);
  const {
    cantidad,
    loading: loadingCasas,
    error: errorCasas,
  } = useCasaCount(selectedAlcaldia, selectedTipo);
  const {
    cantidad_m2,
    loading: loadingM2,
    error: errorM2,
  } = useAverageM2Price(selectedAlcaldia, selectedTipo);
  const {
    averagePrice,
    loading: loadingAllAvg,
    error: errorAllAvg,
  } = useAverageAllCasa();
  const {
    averageM2Price,
    loading: loadingM2AllAvg,
    error: errorM2AllAvg,
  } = useAverageM2AllCasa();

  const handleAlcaldiaChange = (newAlcaldia: string) => {
    setSelectedAlcaldia(newAlcaldia);
  };

  const { profile } = useUserProfile();

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 pt-5">
        <header className="mb-8 ml-15">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-3xl font-bold text-gray-800 capitalize">
              Bienvenido{profile?.fullName ? `, ${profile.fullName}` : ""}
            </h1>
          </div>
          <p className="text-gray-600">
            Accede al análisis y estimación del mercado inmobiliario de la Ciudad de México
          </p>
        </header>

        <div className="flex items-center justify-center space-x-4 border-gray-300">
          <CardValuationData
            title={"Precio Promedio"}
            amount={
              averagePriceCasa !== undefined && averagePriceCasa !== null
                ? averagePriceCasa
                : NaN
            }
            change={
              averagePrice && averagePriceCasa
                ? ((averagePriceCasa - averagePrice) / averagePrice) * 100
                : 0
            }
          />

          <CardProperties
            title={"Propiedades Listadas"}
            amount={cantidad}
            error={errorCasas}
          />

          <CardMarketGrowth
              title={"Precio promedio por m2"}
              amount={cantidad_m2}
              error={errorM2}
              change={((cantidad_m2 - averageM2Price!) / averageM2Price!) * 100}
          />
        </div>

        <div className="flex border-orange-500 p-4 space-x-3 mx-auto w-5/7">
          <Info className="w-6 h-6 text-orange-500" />
            <p className="text-sm">
              Los datos presentados en esta sección se basan en tus selecciones dentro del <strong className="font-bold">Property Value Predictor</strong>.
              Para obtener información de tu interés, asegúrate de elegir una <strong className="font-bold">alcaldía</strong> y un <strong className="font-bold">tipo de propiedad</strong>.
            </p>
        </div>

        <div className="flex flex-col gap-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-300 w-full">
            <div className="bg-white rounded-2xl p-6 flex flex-col items-center text-center">
              <div className="w-full">
                <PropertyEstimator onAlcaldiaChange={handleAlcaldiaChange} />
              </div>
            </div>

            {/* Tendencias del Mercado */}
            <div className="bg-white rounded-2xlp-6 flex flex-col items-center text-center">
              <div className="w-full max-w-md">
                <DashboardMarketTrendsChart />
              </div>
            </div>
          </div>

          {/* Mapa de la CDMX */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
              Mapa de la Ciudad de México
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              Visualiza información geográfica de mercado por alcaldía
            </p>
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
