"use client";

import React from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons"; // Icons for change indicator

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: React.ReactNode; // The main icon for the card
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        {icon}
        <span
          className={`text-sm font-semibold ${
            changeType === "positive" ? "text-green-500" : "text-red-500"
          } flex items-center`}
        >
          {change}
          {changeType === "positive" ? (
            <ArrowUpIcon className="h-4 w-4 ml-1" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 ml-1" />
          )}
        </span>
      </div>
      <div>
        <p className="text-gray-500 text-sm mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
