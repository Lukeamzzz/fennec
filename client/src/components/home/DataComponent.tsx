'use client';

import React from 'react';

interface DataItemProps {
  percentage: string;
  description: string;
}

const DataItem: React.FC<DataItemProps> = ({ percentage, description }) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-4xl font-bold text-orange-500">{percentage}</span>
      <p className="text-sm text-gray-300 text-center mt-2 max-w-xs">
        {description}
      </p>
    </div>
  );
};

const DataComponent: React.FC = () => {
  const title = "Convierte datos inmobiliarios";
  const subtitle = "en oportunidades";
  const items = [
    {
      percentage: "100%",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    },
    {
      percentage: "100%",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    },
    {
      percentage: "100%",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    }
  ];

  return (
    <div className="flex flex-col">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg relative z-20 mx-8 -mt-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-xl">{subtitle}</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {items.map((item, index) => (
            <DataItem 
              key={index} 
              percentage={item.percentage} 
              description={item.description} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataComponent;