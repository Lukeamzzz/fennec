'use client';

import React from 'react';

interface EnterPlanProps {
  isMonthly: boolean;
  monthlyPrice?: number;
  annualPrice?: number;
  features?: string[];
  onSelectPlan?: () => void;
}

const EnterPlan: React.FC<EnterPlanProps> = ({
  isMonthly,
  monthlyPrice = 300,
  annualPrice = 2599,
  features = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  ],
  onSelectPlan
}) => {
  const handleClick = () => {
    if (onSelectPlan) {
      onSelectPlan();
    }
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-gray-900 text-white h-full">
      <div className="p-8">
        {/* Título y descripción */}
        <h3 className="text-2xl font-bold mb-4">Empresarial</h3>
        <p className="text-sm mb-8 opacity-80">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </p>
        
        {/* Precio */}
        <div className="mb-8">
          <p className="text-5xl font-bold">
            {isMonthly ? monthlyPrice : annualPrice}
            <span className="text-xl font-normal ml-1">MX</span>
          </p>
        </div>
        
        {/* Botón */}
        <button 
          onClick={handleClick}
          className="w-full py-3 rounded-lg font-medium mb-8 border border-orange-500 text-orange-500 hover:bg-gray-800 transition-colors"
        >
          Elegir Plan
        </button>
        
        {/* Separador */}
        <div className="border-t border-gray-700 mb-8"></div>
        
        {/* Características */}
        <ul className="space-y-4">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <span className="flex-shrink-0 h-2 w-2 rounded-full mt-2 mr-3 bg-orange-500"></span>
              <span className="text-sm opacity-80">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EnterPlan;