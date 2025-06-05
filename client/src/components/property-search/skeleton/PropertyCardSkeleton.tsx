import React from 'react';

const PropertyCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Imagen skeleton */}
      <div className="h-48 bg-gray-300"></div>
      
      {/* Contenido skeleton */}
      <div className="p-4">
        {/* Tipo de propiedad */}
        <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
        
        {/* Título */}
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        
        {/* Precio */}
        <div className="h-8 bg-gray-300 rounded w-1/2 mb-3"></div>
        
        {/* Dirección */}
        <div className="h-4 bg-gray-300 rounded w-full mb-3"></div>
        
        {/* Descripción */}
        <div className="space-y-2 mb-4">
          <div className="h-3 bg-gray-300 rounded w-full"></div>
          <div className="h-3 bg-gray-300 rounded w-4/5"></div>
        </div>
        
        {/* Características (beds, baths, area) */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <div className="flex items-center space-x-1">
              <div className="h-4 w-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-6"></div>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-4 w-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-6"></div>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-4 w-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-8"></div>
            </div>
          </div>
        </div>
        
        {/* Botón */}
        <div className="h-10 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  );
};

export default PropertyCardSkeleton; 