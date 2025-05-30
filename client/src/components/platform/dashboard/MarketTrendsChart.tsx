"use client";

import React, { useState } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const chartDataSets = {
  "Last 3 months": {
    labels: ["Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "CDMX",
        data: [3400, 3600, 4000],
        borderColor: "#FB923C",
        backgroundColor: "#FB923C",
      },
      {
        label: "Monterrey",
        data: [4100, 4300, 4600],
        borderColor: "#F97316",
        backgroundColor: "#F97316",
      },
      {
        label: "Guadalajara",
        data: [2900, 3000, 3100],
        borderColor: "#FDBA74",
        backgroundColor: "#FDBA74",
      },
    ],
  },
  "Last 6 months": {
    labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "CDMX",
        data: [3100, 3200, 3400, 3600, 3800, 4000],
        borderColor: "#FB923C",
        backgroundColor: "#FB923C",
      },
      {
        label: "Monterrey",
        data: [3400, 3600, 3900, 4100, 4300, 4600],
        borderColor: "#F97316",
        backgroundColor: "#F97316",
      },
      {
        label: "Guadalajara",
        data: [2600, 2700, 2800, 2900, 3000, 3100],
        borderColor: "#FDBA74",
        backgroundColor: "#FDBA74",
      },
    ],
  },
  "Last 12 months": {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "CDMX",
        data: [
          1800, 2000, 2200, 2600, 2800, 3000, 3100, 3200, 3400, 3600, 3800,
          4000,
        ],
        borderColor: "#FB923C",
        backgroundColor: "#FB923C",
      },
      {
        label: "Monterrey",
        data: [
          1900, 2300, 2500, 2700, 3000, 3200, 3400, 3600, 3900, 4100, 4300,
          4600,
        ],
        borderColor: "#F97316",
        backgroundColor: "#F97316",
      },
      {
        label: "Guadalajara",
        data: [
          1700, 1900, 2000, 2100, 2300, 2500, 2600, 2700, 2800, 2900, 3000,
          3100,
        ],
        borderColor: "#FDBA74",
        backgroundColor: "#FDBA74",
      },
    ],
  },
  "Last 2 years": {
    labels: ["2023 Jan", "Apr", "Jul", "Oct", "2024 Jan", "Apr"],
    datasets: [
      {
        label: "CDMX",
        data: [1600, 2200, 3000, 3600, 4000, 4200],
        borderColor: "#FB923C",
        backgroundColor: "#FB923C",
      },
      {
        label: "Monterrey",
        data: [1800, 2500, 3200, 4100, 4600, 4900],
        borderColor: "#F97316",
        backgroundColor: "#F97316",
      },
      {
        label: "Guadalajara",
        data: [1500, 2000, 2600, 2900, 3100, 3300],
        borderColor: "#FDBA74",
        backgroundColor: "#FDBA74",
      },
    ],
  },
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
};

const MarketTrendsChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<
    "Last 3 months" | "Last 6 months" | "Last 12 months" | "Last 2 years"
  >("Last 12 months");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-end mb-4">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs border rounded-lg hover:bg-gray-50 bg-white text-gray-600"
          >
            {selectedPeriod}
            <ChevronDownIcon className="size-3" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 py-1 bg-white rounded-lg shadow-lg border z-10">
              {Object.keys(chartDataSets).map((period) => (
                <button
                  key={period}
                  className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50"
                  onClick={() => {
                    setSelectedPeriod(period as never);
                    setIsDropdownOpen(false);
                  }}
                >
                  {period}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex-grow">
        <Line data={chartDataSets[selectedPeriod]} options={options} />
      </div>
    </div>
  );
};

export default MarketTrendsChart;
