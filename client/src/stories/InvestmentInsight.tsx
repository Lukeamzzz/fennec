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
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-6 max-w-2xl mx-auto font-sans">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <span className="px-4 py-1 bg-orange-50 text-orange-600 rounded-full text-sm font-medium">
          {badgeText}
        </span>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-gray-500 mb-4">
        <MapPin size={20} className="text-gray-400" />
        <span className="text-lg">{location}</span>
      </div>

      {/* Description */}
      <p className="text-lg text-gray-600 text-center mb-8 leading-relaxed">
        {description}
      </p>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-8">
        {/* Investment Required */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <Building2 size={20} className="text-gray-400" />
            <span className="text-base">Inversión Requerida</span>
          </div>
          <span className="text-xl font-bold text-gray-900">
            {investmentRequired}
          </span>
        </div>

        {/* ROI */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <TrendingUp size={20} className="text-gray-400" />
            <span className="text-base">ROI Proyectado</span>
          </div>
          <span className="text-xl font-bold text-green-600">
            {projectedRoi}
          </span>
        </div>

        {/* Estimated Term */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <Clock size={20} className="text-gray-400" />
            <span className="text-base">Plazo Estimado</span>
          </div>
          <span className="text-xl font-bold text-gray-900">
            {estimatedTerm}
          </span>
        </div>

        {/* Risk Level */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <BarChart2 size={20} className="text-gray-400" />
            <span className="text-base">Nivel de Riesgo</span>
          </div>
          <span className="text-xl font-bold text-gray-900">{riskLevel}</span>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="mb-8">
        <h3 className="text-gray-500 font-medium mb-4">Destacados</h3>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          {highlights.map((highlight, index) => (
            <div key={index} className="flex items-center gap-2">
              <Circle size={8} className="text-orange-500 fill-current" />
              <span className="text-gray-700">{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="flex gap-3 mb-6">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Action Button */}
      <button
        onClick={onDetailsClick}
        className="w-full py-3.5 bg-white border border-gray-200 rounded-2xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
      >
        Ver Detalles
      </button>
    </div>
  );
};

export default InvestmentInsight;
