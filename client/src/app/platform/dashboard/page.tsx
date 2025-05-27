"use client";

import { useState, useEffect } from "react";
import Header_settings from "@/components/settings/shared/HeaderSettings";
import CardValuationData from "@/components/platform/dashboard/CardValuationData";
import CardProperties from "@/components/platform/dashboard/CardProperties";
import CardMarketGrowth from "@/components/platform/dashboard/CardMarketGrowth";
import PropertyEstimator from "@/components/platform/dashboard/PropertyEstimator";

import api from "@/services/api";
import { useAuth } from "@/providers/AuthProvider";
import DashboardMarketTrendsChart from "@/components/platform/dashboard/DashboardMarketTrendsChart";


function DashboardPage() {
  const { idToken } = useAuth();

  useEffect(() => {
    if (!idToken) return;

    const fetchPropertyData = async () => {
      const response = await api.get("/");
    };

    fetchPropertyData().catch((error) => {
      console.error("Error fetching property data:", error);
    });
  }, [idToken]);

  return (
    <div className="flex min-h-screen p-2">
      <div className="flex-1 pt-5 ">
        <div className="flex items-center justify-center pb-10">
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
          <DashboardMarketTrendsChart />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
