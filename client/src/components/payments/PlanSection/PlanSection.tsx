'use client';

import React, { useState } from 'react';
import ProPlan from '../ProPlan/ProPlan';
import EnterPlan from '../EnterPlan/EnterPlan';

const PlanSection: React.FC = () => {
  const [isMonthly, setIsMonthly] = useState<boolean>(true);

  const toggleBillingCycle = () => {
    setIsMonthly(!isMonthly);
  };

  const handleProPlanSelect = () => {
    console.log(`Plan Profesional seleccionado (${isMonthly ? 'Mensual' : 'Anual'})`);

  };

  const handleEnterPlanSelect = () => {
    console.log(`Plan Empresarial seleccionado (${isMonthly ? 'Mensual' : 'Anual'})`);
    
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Toggle de ciclo de facturación */}
      <div className="flex justify-center items-center mb-12">
        <span className={`mr-3 text-lg font-medium ${isMonthly ? 'text-gray-900' : 'text-gray-500'}`}>
          Mensual
        </span>
        
        <button 
          onClick={toggleBillingCycle}
          className="relative inline-flex h-8 w-16 items-center rounded-full bg-gray-200"
          aria-pressed={!isMonthly}
          aria-label="Cambiar ciclo de facturación"
        >
          <span className="sr-only">Toggle billing cycle</span>
          <span 
            className={`inline-block h-6 w-6 transform rounded-full bg-orange-500 transition-transform ${
              isMonthly ? 'translate-x-2' : 'translate-x-8'
            }`}
          />
          <div className="absolute inset-0 rounded-full border-2 border-transparent transition-colors"></div>
        </button>
        
        <span className={`ml-3 text-lg font-medium ${!isMonthly ? 'text-gray-900' : 'text-gray-500'}`}>
          Anual
        </span>
      </div>

      {/* Tarjetas de planes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProPlan 
          isMonthly={isMonthly} 
          onSelectPlan={handleProPlanSelect}
        />
        <EnterPlan 
          isMonthly={isMonthly} 
          onSelectPlan={handleEnterPlanSelect}
        />
      </div>
    </div>
  );
};

export default PlanSection;