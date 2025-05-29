import React from 'react';
import AreaCard from './AreaCard';
import PropertyTypeCard from './PropertyTypeCard';

/**
 * PropertySearch component that displays both alcaldías and property types
 */
const PropertySearch: React.FC = () => {
  // Alcaldías data
  const alcaldias = [
    'Miguel Hidalgo',
    'Benito Juárez',
    'Cuauhtémoc',
    'Álvaro Obregón',
    'Coyoacán',
    'Tlalpan'
  ];

  // Property types data
  const propertyTypes = [
    'Departamentos',
    'Casas',
    'Terrenos'
  ];

  // Click handlers
  const handleAreaClick = (area: string) => {
    console.log(`Alcaldía seleccionada: ${area}`);
  };

  const handlePropertyTypeClick = (type: string) => {
    console.log(`Tipo de propiedad seleccionado: ${type}`);
  };

  return (
    <div>
      {/* Alcaldías Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Alcaldías</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {alcaldias.map((alcaldia) => (
            <AreaCard 
              key={alcaldia}
              areaName={alcaldia}
              onClick={() => handleAreaClick(alcaldia)}
            />
          ))}
        </div>
      </div>

      {/* Property Types Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Tipos de Inmuebles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {propertyTypes.map((type) => (
            <PropertyTypeCard 
              key={type}
              type={type}
              onClick={() => handlePropertyTypeClick(type)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertySearch; 