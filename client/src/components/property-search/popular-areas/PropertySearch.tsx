import React from 'react';
import AreaCard from './AreaCard';
import PropertyTypeCard from './PropertyTypeCard';

interface PropertySearchProps {
  onSearch: (filters: {
    location: string;
    propertyType: string;
    priceRange: [number, number];
    bedrooms: string;
    bathrooms: string;
    minSize: number;
    maxSize: number;
  }) => void;
  onSearchByArea?: (alcaldia: string) => void;
}

/**
 * PropertySearch component that displays both alcaldías and property types
 */
const PropertySearch: React.FC<PropertySearchProps> = ({ onSearch, onSearchByArea }) => {
  // Alcaldías data
  const alcaldias = [
    'Miguel Hidalgo',
    'Benito Juárez',
    'Cuauhtémoc',
    'Álvaro Obregón',
    'Coyoacán',
    'Tlalpan'
  ];

  // Property types data - Eliminamos "Terrenos"
  const propertyTypes = [
    'Departamentos',
    'Casas'
  ];

  // Click handlers
  const handleAreaClick = (area: string) => {
    // Si existe onSearchByArea, usarla; si no, usar onSearch con filtros completos
    if (onSearchByArea) {
      onSearchByArea(area);
    } else {
      onSearch({
        location: area,
        propertyType: '',
        priceRange: [0, 150000000],
        bedrooms: 'Cualquier',
        bathrooms: 'Cualquier',
        minSize: 0,
        maxSize: 5000
      });
    }
  };

  const handlePropertyTypeClick = (type: string) => {
    // Convertir "Departamentos" -> "Departamento" y "Casas" -> "Casa"
    const propertyType = type === 'Departamentos' ? 'Departamento' : 'Casa';
    
    onSearch({
      location: '', // Ubicación vacía para buscar en todas las ubicaciones
      propertyType: propertyType,
      priceRange: [0, 150000000],
      bedrooms: 'Cualquier',
      bathrooms: 'Cualquier',
      minSize: 0,
      maxSize: 5000
    });
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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