import React from 'react';
import AreaCard from './AreaCard';
import PropertyTypeCard from './PropertyTypeCard';

/**
 * PropertySearch component that displays both popular areas and property types
 */
const PropertySearch: React.FC = () => {
  // Popular areas data
  const popularAreas = [
    'Polanco',
    'Condesa',
    'Roma Norte'
  ];

  // Property types data
  const propertyTypes = [
    'Departamentos',
    'Casas',
    'Terreno',
  ];

  // Click handlers
  const handleAreaClick = (area: string) => {
    console.log(`Zona seleccionada: ${area}`);
  };

  const handlePropertyTypeClick = (type: string) => {
    console.log(`Tipo de propiedad seleccionado: ${type}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Popular Areas Section */}
      <h2 className="text-3xl font-bold text-center mb-8">Zonas Populares</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {popularAreas.map((area) => (
          <AreaCard 
            key={area}
            areaName={area}
            onClick={() => handleAreaClick(area)}
          />
        ))}
      </div>

      {/* Property Types Section */}
      <h2 className="text-3xl font-bold text-center mb-8">Tipos de Propiedades</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {propertyTypes.map((type) => (
          <PropertyTypeCard 
            key={type}
            type={type}
            onClick={() => handlePropertyTypeClick(type)}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertySearch; 