"use client";

import React from "react";
import Link from "next/link";
import {
  Grid,
  Search,
  TrendingUp,
  DollarSign,
  FileText,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { id: "platform/dashboard", label: "Dashboard", icon: Grid },
    { id: "platform/reports", label: "Reportes", icon: FileText },
    {
      id: "platform/investment-insight",
      label: "Perspectiva de inversión",
      icon: DollarSign,
    },
    { id: "platform/market-trends", label: "Tendencias del mercado", icon: TrendingUp },
    { id: "platform/property-search", label: "Búsqueda de propiedades", icon: Search },
    {
      id: "platform/settings",
      label: "Ajustes",
      icon: Settings,
    },
  ];

  return (
    <div className="border-r border-gray-200 bg-gray-50 w-60 sticky top-0 h-screen">
      <div className="p-2 border-b border-gray-200">
        <Link href={"/"}>
          <p className="text-3xl font-semibold text-orange-500 px-2 py-3">Fennec</p>
        </Link>
      </div>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                href={`/${item.id}`}
                className={`flex items-center px-5 py-6 text-md ${
                  pathname === `/${item.id}`
                    ? "bg-orange-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="inline-block w-5 mr-3">
                  {React.createElement(item.icon, { size: 18 })}
                </span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
