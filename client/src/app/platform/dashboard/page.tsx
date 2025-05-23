"use client";

import { useState, useEffect } from "react";
import Header_settings from "@/components/settings/shared/HeaderSettings";
import CardValuationData from "@/components/platform/dashboard/CardValuationData";
import CardProperties from "@/components/platform/dashboard/CardProperties";
import CardMarketGrowth from "@/components/platform/dashboard/CardMarketGrowth";
import PropertyEstimator from "@/components/platform/dashboard/PropertyEstimator";
import InvestmentOpportunities from "@/components/platform/dashboard/InvestmentOpportunities";
import CardInvestment from "@/components/platform/dashboard/CardInvestment";
import DashboardPropertyCard from "@/components/platform/dashboard/property-card/DashboardPropertyCard";
import api from "@/services/api";
import {useAuth} from "@/providers/AuthProvider";
import DashboardMarketTrendsChart from "@/components/platform/dashboard/DashboardMarketTrendsChart";

interface Property {
  name: string;
  location: string;
  description: string;
  type: string;
  price: number;
  size: number;
  bathrooms: number;
  bedrooms: number;
  parking: number;
  previousPrices: number[];
  valuation3Years: number;
  valuation5Years: number;
  growthRate: number;
  roiMonthly: number;
  breakevenYears: number;
  occupancyRate: number;

  levelRisk: string;
  investmentGrade: string;
}

function DashboardPage() {
  const [propertyData, setPropertyData] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);




  const { idToken } = useAuth();

  useEffect(() => {
    if (!idToken) return;

    const fetchPropertyData = async () => {
      const response = await api.get("/api/propiedades/property");
      setPropertyData(response.data);
    };

    fetchPropertyData().catch((error) => {
      console.error("Error fetching property data:", error);
    });
  }, [idToken]);


  return (
      <div className="flex min-h-screen p-2">
        <div className="flex-1 pt-5 pl-1">
          <Header_settings />
          <div className="flex items-center justify-center pb-10">
            <CardValuationData title="Average Property Value" amount={2456000} change={12.5} />
            <CardProperties title={"Listed Properties"} amount={1245} change={-3.2} />
            <CardMarketGrowth title={"Market Growth"} amount={-7.8} change={-0.5} />
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-sm flex items-center justify-center space-x-20 pb-10">
            <PropertyEstimator />
            <DashboardMarketTrendsChart />
          </div>

          <div>
            <InvestmentOpportunities />
            <div className="flex flex-wrap gap-6 items-center justify-center pb-2">
              {propertyData.map((property) => (
                  <CardInvestment
                      key={property.name}
                      title={property.name}
                      localization={property.location}
                      price={property.price}
                      roi={property.roiMonthly}
                      risk={property.levelRisk}
                      type={property.type}
                      onClick={() => setSelectedProperty(property)}
                  />
              ))}
            </div>
          </div>

          {selectedProperty && (
              <DashboardPropertyCard {...selectedProperty} onClose={() => setSelectedProperty(null)} />
          )}
        </div>
      </div>
  );
}

export default DashboardPage;
