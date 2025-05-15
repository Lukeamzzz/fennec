"use client";

import { useState } from "react";

import Header_settings from "@/components/settings/shared/HeaderSettings";
import MarketTrendsChart from "@/components/platform/dashboard/MarketTrendsChart";
import CardValuationData from "@/components/platform/dashboard/CardValuationData";
import CardProperties from "@/components/platform/dashboard/CardProperties";
import CardMarketGrowth from "@/components/platform/dashboard/CardMarketGrowth";
import PropertyEstimator from "@/components/platform/dashboard/PropertyEstimator";
import InvestmentOpportunities from "@/components/platform/dashboard/InvestmentOpportunities";
import CardInvestment from "@/components/platform/dashboard/CardInvestment";
import DashboardPropertyCard from "@/components/platform/dashboard/property-card/DashboardPropertyCard";

function DashboardPage() {
  const propertyData = {
    name: "Casa de Playa",
    location: "Tulum, México",
    description: "Hermosa casa frente al mar con acceso privado a la playa.",
    price: 450000,
    size: 320,
    bathrooms: 3,
    bedrooms: 4,
    previousPrices: [400000, 420000, 440000],
    valuation3Years: 500000,
    valuation5Years: 550000,
    growthRate: 5.2,
    roiMonthly: 1800,
    breakevenYears: 7,
    occupancyRate: 85,
    riskFactors: ["Huracanes", "Regulación de alquileres"],
    amenities: ["Piscina", "Wi-Fi", "Aire acondicionado"],
    investmentGrade: "A",
    phone: "+52 998 123 4567",
  };

  return (
    <div className="flex min-h-screen  p-2">
      <div className="flex-1 pt-5 pl-1">
        <Header_settings />
        <div className="flex items-center justify-center">
          <CardValuationData
            title="Average Property Value"
            amount={2456000}
            change={12.5}
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
          <PropertyEstimator />
          <MarketTrendsChart />
        </div>
        <div>
          <InvestmentOpportunities />
          <div className="flex flex-wrap gap-6 items-center justify-center pb-2">
            <CardInvestment
              title="Polanco Luxury Apartment"
              localization="Polanco, CDMX"
              price={3450000}
              roi={8.2}
              risk="Low"
              type="Casa"
            />
            <CardInvestment
              title="Roma Norte Development"
              localization="Roma Norte, CDMX"
              price={4900000}
              roi={12.5}
              risk="Medium"
              type="Departamento"
            />
            <CardInvestment
              title="Condesa Commercial Space"
              localization="La Condesa, CDMX"
              price={5800000}
              roi={7.8}
              risk="Low"
              type="Terreno"
            />
          </div>
        </div>

        <div>
          <DashboardPropertyCard {...propertyData} />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
