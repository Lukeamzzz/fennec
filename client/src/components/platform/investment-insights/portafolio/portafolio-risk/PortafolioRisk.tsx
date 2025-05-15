'use client';

import React, { useEffect, useRef } from 'react';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js';

// Tipos compartidos
interface RiskFactor {
  name: string;
  value: number;
}

type RiskLevel = 'Alto' | 'Medio' | 'Bajo' | 'Medio-Alto';

interface RiskDetail {
  factor: string;
  level: RiskLevel;
  description: string;
}

// Componente de Gráfica de Riesgo
interface RiskChartProps {
  riskFactors: RiskFactor[];
}

const RiskChart: React.FC<RiskChartProps> = ({ riskFactors }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
    
      Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip);

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: riskFactors.map(factor => factor.name),
            datasets: [{
              data: riskFactors.map(factor => factor.value),
              backgroundColor: '#FF7043',
              borderRadius: 4,
              maxBarThickness: 40
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                grid: {
                  display: true,
                  color: 'rgba(0, 0, 0, 0.05)',
                  drawTicks: false
                },
                ticks: {
                  display: true,
                  padding: 10
                }
              },
              x: {
                grid: {
                  display: false
                }
              }
            },
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return `Nivel: ${context.raw}/100`;
                  }
                }
              }
            }
          }
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [riskFactors]);

  return (
    <div className="mb-8">
      <canvas ref={chartRef} height="200"></canvas>
    </div>
  );
};

// Componente de Item de Riesgo
interface RiskItemProps {
  detail: RiskDetail;
}

const RiskItem: React.FC<RiskItemProps> = ({ detail }) => {
  const getRiskLevelBg = (level: RiskLevel) => {
    switch (level) {
      case 'Alto':
        return 'bg-red-100 text-red-800';
      case 'Medio-Alto':
        return 'bg-orange-100 text-orange-800';
      case 'Medio':
        return 'bg-yellow-100 text-yellow-800';
      case 'Bajo':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="border-l-4 border-amber-500 pl-4 py-1">
      <div className="flex justify-between items-center mb-1">
        <h4 className="font-medium text-gray-800">{detail.factor}</h4>
        <span className={`px-2 py-1 rounded text-xs ${getRiskLevelBg(detail.level)}`}>
          {detail.level}
        </span>
      </div>
      <div className="flex items-center text-gray-600 text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {detail.description}
      </div>
    </div>
  );
};

// Componente de Lista de Riesgos
interface RiskListProps {
  riskDetails: RiskDetail[];
}

const RiskList: React.FC<RiskListProps> = ({ riskDetails }) => {
  return (
    <div>
      <div className="flex items-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <h3 className="text-lg font-semibold text-gray-800">Factores de Riesgo Principales</h3>
      </div>
      
      <div className="space-y-4">
        {riskDetails.map((detail, index) => (
          <RiskItem key={index} detail={detail} />
        ))}
      </div>
    </div>
  );
};

// Componente Principal de Portafolio Risk
interface PortafolioRiskProps {
  title?: string;
  subtitle?: string;
  riskFactors?: RiskFactor[];
  riskDetails?: RiskDetail[];
}

const PortafolioRisk: React.FC<PortafolioRiskProps> = ({
  title = "Evaluación de Riesgo",
  subtitle = "Análisis de factores de riesgo para inversiones inmobiliarias",
  riskFactors = [
    { name: "Político", value: 35 },
    { name: "Regulatorio", value: 45 },
    { name: "Mercado", value: 60 },
    { name: "Liquidez", value: 45 },
    { name: "Tipo de Cambio", value: 65 }
  ],
  riskDetails = [
    { 
      factor: "Nuevas regulaciones fiscales para propiedades de inversión", 
      level: "Alto" as RiskLevel, 
      description: "Diversificación de portafolio y asesoría legal especializada" 
    },
    { 
      factor: "Volatilidad del tipo de cambio USD-MXN", 
      level: "Medio" as RiskLevel, 
      description: "Instrumentos de cobertura cambiaria" 
    },
    { 
      factor: "Saturación en mercados premium", 
      level: "Medio-Alto" as RiskLevel, 
      description: "Exploración de mercados secundarios emergentes" 
    }
  ]
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600 text-sm">{subtitle}</p>
      </div>
      
      <RiskChart riskFactors={riskFactors} />
      
      <RiskList riskDetails={riskDetails} />
    </div>
  );
};

export default PortafolioRisk;