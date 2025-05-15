import React from "react";
import { LucideIcon } from "lucide-react";

interface FactoresProps {
  /**
   * The title of the factors.
   */
  title: string;
  /**
   * The badge text of the factors.
   */
  badgeText: string;
  /**
   * The description of the factors.
   */
  description: string;
  /**
   * The icon of the factors.
   */
  icon: LucideIcon;
  /**
   * The background color of the badge.
   */
  badgeBgColor?: string;
  /**
   * The text color of the badge.
   */
  badgeTextColor?: string;
}

const Factores: React.FC<FactoresProps> = ({
  title,
  badgeText,
  description,
  icon: Icon, // Rename for component usage
  badgeBgColor = "bg-red-100",
  badgeTextColor = "text-red-700",
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-md font-sans">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${badgeBgColor} ${badgeTextColor}`}
        >
          {badgeText}
        </span>
      </div>
      <div className="flex items-center text-gray-600">
        <Icon className="mr-2 flex-shrink-0" size={18} />
        <p className="text-base">{description}</p>
      </div>
    </div>
  );
};

export default Factores;
