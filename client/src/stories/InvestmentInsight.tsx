import React from "react";
import {
  MapPin,
  Building2,
  TrendingUp,
  Clock,
  BarChart2,
  Circle,
} from "lucide-react";

interface InvestmentInsightProps {
  /**
   * The title of the investment insight.
   */
  title: string;
  /**
   * The badge text of the investment insight.
   */
  badgeText: string;
  /**
   * The location of the investment insight.
   */
  location: string;
  /**
   * The description of the investment insight.
   */
  description: string;
  /**
   * The investment required of the investment insight.
   */
  investmentRequired: string;
  /**
   * The projected roi of the investment insight.
   */
  projectedRoi: string;
  /**
   * The estimated term of the investment insight.
   */
  estimatedTerm: string;
  /**
   * The risk level of the investment insight.
   */
  riskLevel: string;
  /**
   * The highlights of the investment insight.
   */
  highlights: string[];
  /**
   * The tags of the investment insight.
   */
  tags: string[];
  onDetailsClick?: () => void;
  className?: string;
}

const InvestmentInsight: React.FC<InvestmentInsightProps> = ({
  title,
  badgeText,
  location,
  description,
  investmentRequired,
  projectedRoi,
  estimatedTerm,
  riskLevel,
  highlights,
  tags,
  onDetailsClick,
  className,
}) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow p-3 font-sans ${className}`}
    >
      {/* Header Section */}
      <div className="flex justify-between items-start mb-1">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <span className="px-2 py-0.5 bg-orange-50 text-orange-600 rounded-full text-xs font-medium">
          {badgeText}
        </span>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1 text-gray-500 mb-2 ">
        <MapPin size={16} className="text-gray-400" />
        <span className="text-sm">{location}</span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 leading-snug py-3">
        {description}
      </p>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-4">
        {/* Investment Required */}
        <div className="flex flex-col">
          <div className="flex justify-center items-center gap-1 text-gray-500 mb-0.5">
            <Building2 size={16} className="text-gray-400" />
            <span className="text-xs">Inversión Requerida</span>
          </div>
          <span className="text-base font-bold text-gray-900 text-center">
            {investmentRequired}
          </span>
        </div>

        {/* ROI */}
        <div className="flex flex-col">
          <div className="flex justify-center items-center gap-1 text-gray-500 mb-0.5">
            <TrendingUp size={16} className="text-gray-400" />
            <span className="text-xs">ROI Proyectado</span>
          </div>
          <span className="text-base font-bold text-green-600 text-center">
            {projectedRoi}
          </span>
        </div>

        {/* Estimated Term */}
        <div className="flex flex-col">
          <div className="flex justify-center items-center gap-1 text-gray-500 mb-0.5">
            <Clock size={16} className="text-gray-400" />
            <span className="text-xs">Plazo Estimado</span>
          </div>
          <span className="text-base font-bold text-gray-900 text-center">
            {estimatedTerm}
          </span>
        </div>

        {/* Risk Level */}
        <div className="flex flex-col">
          <div className="flex justify-center items-center gap-1 text-gray-500 mb-0.5">
            <BarChart2 size={16} className="text-gray-400" />
            <span className="text-xs">Nivel de Riesgo</span>
          </div>
          <span className="text-base font-bold text-gray-900 text-center">
            {riskLevel}
          </span>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="mb-4">
        <h3 className="text-gray-500 font-medium mb-2 text-xs">Destacados</h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          {highlights.map((highlight, index) => (
            <div key={index} className="flex items-center gap-1">
              <Circle size={6} className="text-orange-500 fill-current" />
              <span className="text-gray-700 text-xs">{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="flex gap-2 mb-3">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Action Button */}
      <button
        onClick={onDetailsClick}
        className="w-full py-2 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm cursor-pointer"
      >
        Ver Detalles
      </button>
    </div>
  );
};

export default InvestmentInsight;
