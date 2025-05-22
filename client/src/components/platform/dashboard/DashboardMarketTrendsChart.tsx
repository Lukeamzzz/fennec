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

const DashboardMarketTrendsChart = () => {
    const [selectedPeriod, setSelectedPeriod] = useState<
        "Last 3 months" | "Last 6 months" | "Last 12 months" | "Last 2 years"
    >("Last 12 months");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <div className="w-full max-w-md p-4 shadow-xl rounded-xl bg-white">
            <div className="flex flex-row justify-between items-center pb-6">
                <div>
                    <h2 className="text-2xl font-semibold">Market Trends</h2>
                    <p className="text-sm text-gray-500">
                        Average property prices per square meter (MXN)
                    </p>
                </div>
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
                    >
                        {selectedPeriod}
                        <ChevronDownIcon className="h-4 w-4"/>
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 py-1 bg-white rounded-lg shadow-lg border">
                            {Object.keys(chartDataSets).map((period) => (
                                <button
                                    key={period}
                                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
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
            <div className="h-64">
                <Line data={chartDataSets[selectedPeriod]} options={options}/>
            </div>
        </div>
    );
};

export default DashboardMarketTrendsChart;
