import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Building2,
  TrendingUp,
  Clock,
  BarChart2,
  Circle,
  X,
} from "lucide-react";

interface InvestmentInsightProps {
  title: string;
  badgeText: string;
  location: string;
  description: string;
  investmentRequired: string;
  projectedRoi: string;
  estimatedTerm: string;
  riskLevel: string;
  highlights: string[];
  tags: string[];
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
  className,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const cardVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95,
      y: 30
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 30,
      transition: {
        duration: 0.2
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <>
      {/* Card Principal - Solo información relevante */}
      <motion.div
        variants={cardVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        className={`bg-white rounded-2xl drop-shadow-lg hover:drop-shadow-xl transition-shadow duration-300 p-8 font-sans flex flex-col h-full overflow-hidden cursor-pointer ${className}`}
        onClick={openModal}
      >
        {/* Header Section */}
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {title}
          </h2>
          <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-medium ml-2 flex-shrink-0">
            {badgeText}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-gray-500 mb-3">
          <MapPin size={16} className="text-gray-400" />
          <span className="text-sm">{location}</span>
        </div>

        {/* Descripción resumida */}
        <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Métricas principales (solo las más importantes) */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Investment Required */}
          <div className="text-center">
            <div className="flex justify-center items-center gap-1 text-gray-500 mb-1">
              <Building2 size={16} className="text-gray-400" />
              <span className="text-xs">Inversión</span>
            </div>
            <span className="text-lg font-bold text-gray-900">
              {investmentRequired}
            </span>
          </div>

          {/* ROI */}
          <div className="text-center">
            <div className="flex justify-center items-center gap-1 text-gray-500 mb-1">
              <TrendingUp size={16} className="text-gray-400" />
              <span className="text-xs">ROI</span>
            </div>
            <span className="text-lg font-bold text-green-600">
              {projectedRoi}
            </span>
          </div>
        </div>

        {/* Tags principales (solo algunos) */}
        <div className="flex gap-2 mb-4 overflow-hidden">
          {tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
          {tags.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">
              +{tags.length - 2}
            </span>
          )}
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.stopPropagation();
            openModal();
          }}
          className="w-full py-2 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors text-sm mt-auto"
        >
          Ver Detalles
        </motion.button>
      </motion.div>

      {/* Modal con información completa */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/25 w-full h-screen flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header del Modal */}
              <div className="sticky top-0 bg-white rounded-t-3xl p-6 border-b border-gray-100 flex justify-between items-start">
                <div className="flex-1 mr-4">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {title}
                    </h2>
                    <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-sm font-medium">
                      {badgeText}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <MapPin size={18} className="text-gray-400" />
                    <span className="text-base">{location}</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-gray-500" />
                </motion.button>
              </div>

              {/* Contenido del Modal */}
              <div className="p-6">
                {/* Descripción completa */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Descripción</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {description}
                  </p>
                </motion.div>

                {/* Métricas completas */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Métricas de Inversión</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="bg-gray-50 rounded-xl p-4"
                    >
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <Building2 size={20} className="text-gray-500" />
                        <span className="font-medium">Inversión Requerida</span>
                      </div>
                      <span className="text-2xl font-bold text-gray-900">
                        {investmentRequired}
                      </span>
                    </motion.div>

                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="bg-green-50 rounded-xl p-4"
                    >
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <TrendingUp size={20} className="text-green-600" />
                        <span className="font-medium">ROI Proyectado</span>
                      </div>
                      <span className="text-2xl font-bold text-green-600">
                        {projectedRoi}
                      </span>
                    </motion.div>

                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="bg-blue-50 rounded-xl p-4"
                    >
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <Clock size={20} className="text-blue-600" />
                        <span className="font-medium">Plazo Estimado</span>
                      </div>
                      <span className="text-2xl font-bold text-blue-600">
                        {estimatedTerm}
                      </span>
                    </motion.div>

                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="bg-purple-50 rounded-xl p-4"
                    >
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <BarChart2 size={20} className="text-purple-600" />
                        <span className="font-medium">Nivel de Riesgo</span>
                      </div>
                      <span className="text-2xl font-bold text-purple-600">
                        {riskLevel}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Highlights completos */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Puntos Destacados</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {highlights.map((highlight, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg"
                      >
                        <Circle size={8} className="text-orange-500 fill-current mt-2 flex-shrink-0" />
                        <span className="text-gray-700 leading-relaxed">{highlight}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Tags completos */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Categorías</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InvestmentInsight;