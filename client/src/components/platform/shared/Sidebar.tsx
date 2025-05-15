"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Grid,
  Search,
  TrendingUp,
  DollarSign,
  FileText,
  Settings,
  X,
  PanelLeft,
} from "lucide-react";

const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: "platform/dashboard", label: "Dashboard", icon: Grid },
    { id: "platform/reports", label: "Reports", icon: FileText },
    {
      id: "platform/investment-insight",
      label: "Investment Insights",
      icon: DollarSign,
    },
    { id: "platform/market-trends", label: "Market Trends", icon: TrendingUp },
    { id: "platform/property-search", label: "Property Search", icon: Search },
    {
      id: "platform/settings",
      label: "Settings",
      icon: Settings,
      active: true,
    },
  ];

  return (
    <div
      className={`relative border-r border-gray-200 bg-gray-50 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-60"
      }`}
    >
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && (
          <span className="text-xl font-semibold text-orange-500">Fennec</span>
        )}
        <div className="flex items-center gap-2">
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-500 hover:text-gray-700"
          >
            <PanelLeft className="h-5 w-5" />
          </button>
        </div>
      </div>
      <nav className="pt-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                href={`/${item.id}`}
                className={`flex items-center px-4 py-3 text-sm ${
                  item.active
                    ? "bg-orange-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <span className="inline-block w-5 mr-3">
                  {React.createElement(item.icon, { size: 20 })}
                </span>
                {!isCollapsed && item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
