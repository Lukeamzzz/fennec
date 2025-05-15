'use client';

import React, { useState } from 'react';
import { MapPin, Home, Building, Map, DollarSign, Bath, BedDouble, Car, Maximize } from 'lucide-react';

function SearchFilters() {
  // Estados para almacenar los valores de los filtros
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [bathrooms, setBathrooms] = useState(1);
  const [bedrooms, setBedrooms] = useState(1);
  const [parkingSpots, setParkingSpots] = useState(0);
  const [minSquareMeters, setMinSquareMeters] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  // Lista de ubicaciones de ejemplo
  const locations = [
    'Ciudad de México', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana',
    'Cancún', 'Mérida', 'Querétaro', 'San Luis Potosí', 'León'
  ];

  // Lista de tipos de propiedades
  const propertyTypes = [
    { id: 'house', name: 'Casa', icon: <Home className="mr-2" size={18} /> },
    { id: 'apartment', name: 'Departamento', icon: <Building className="mr-2" size={18} /> },
    { id: 'land', name: 'Terreno', icon: <Map className="mr-2" size={18} /> }
  ];

  // Función para formatear el precio
  const formatPrice = (price:any) => {
    return new Intl.NumberFormat('es-MX', { 
      style: 'currency', 
      currency: 'MXN',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log({
      location,
      propertyType,
      priceRange,
      bathrooms,
      bedrooms,
      parkingSpots,
      minSquareMeters
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Filtrar propiedades</h2>
      
      {/* Barra de búsqueda principal */}
      <div className="mb-6">
        <div className="relative w-full mb-4">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Ubicación"
            className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {location && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {locations
                .filter(loc => loc.toLowerCase().includes(location.toLowerCase()))
                .map((loc, index) => (
                  <div 
                    key={index} 
                    className="px-4 py-2 hover:bg-orange-50 cursor-pointer"
                    onClick={() => setLocation(loc)}
                  >
                    {loc}
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Tipo de propiedad */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">Tipo de propiedad</label>
          <div className="flex flex-wrap gap-2">
            {propertyTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                  propertyType === type.id 
                    ? 'bg-orange-500 text-white border-orange-500' 
                    : 'border-gray-200 hover:bg-orange-50'
                }`}
                onClick={() => setPropertyType(type.id)}
              >
                {type.icon}
                {type.name}
              </button>
            ))}
          </div>
        </div>

        {/* Rango de precio */}
        <div className="mb-6">
          <label className="mb-2 font-medium text-gray-700 flex items-center">
            <DollarSign size={18} className="mr-1" />
            Rango de precio
          </label>
          <div className="flex flex-col">
            <input
              type="range"
              min="0"
              max="100000000"
              step="50000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-500">{formatPrice(0)}</span>
              <span className="text-sm font-medium">{formatPrice(priceRange[1])}</span>
            </div>
          </div>
        </div>

        <button 
          className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors mb-4"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'Ocultar filtros avanzados' : 'Mostrar filtros avanzados'}
        </button>
      </div>

      {/* Filtros adicionales */}
      {showFilters && (
        <div className="space-y-6">
          <form onSubmit={handleSubmit}>
            {/* Cantidad de baños */}
            <div className="mb-6">
              <label className="mb-2 font-medium text-gray-700 flex items-center">
                <Bath size={18} className="mr-1" />
                Baños
              </label>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-200 rounded-l-lg hover:bg-orange-50"
                  onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}
                >
                  -
                </button>
                <span className="flex items-center justify-center px-4 py-2 border-t border-b border-gray-200 min-w-[60px]">
                  {bathrooms}
                </span>
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-200 rounded-r-lg hover:bg-orange-50"
                  onClick={() => setBathrooms(bathrooms + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Cantidad de habitaciones */}
            <div className="mb-6">
              <label className="mb-2 font-medium text-gray-700 flex items-center">
                <BedDouble size={18} className="mr-1" />
                Habitaciones
              </label>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-200 rounded-l-lg hover:bg-orange-50"
                  onClick={() => setBedrooms(Math.max(1, bedrooms - 1))}
                >
                  -
                </button>
                <span className="flex items-center justify-center px-4 py-2 border-t border-b border-gray-200 min-w-[60px]">
                  {bedrooms}
                </span>
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-200 rounded-r-lg hover:bg-orange-50"
                  onClick={() => setBedrooms(bedrooms + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Lugares de estacionamiento */}
            <div className="mb-6">
              <label className="mb-2 font-medium text-gray-700 flex items-center">
                <Car size={18} className="mr-1" />
                Estacionamiento
              </label>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-200 rounded-l-lg hover:bg-orange-50"
                  onClick={() => setParkingSpots(Math.max(0, parkingSpots - 1))}
                >
                  -
                </button>
                <span className="flex items-center justify-center px-4 py-2 border-t border-b border-gray-200 min-w-[60px]">
                  {parkingSpots}
                </span>
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-200 rounded-r-lg hover:bg-orange-50"
                  onClick={() => setParkingSpots(parkingSpots + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Metros cuadrados mínimos */}
            <div className="mb-6">
              <label className="mb-2 font-medium text-gray-700 flex items-center">
                <Maximize size={18} className="mr-1" />
                Metros cuadrados mínimos
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  min="0"
                  value={minSquareMeters}
                  onChange={(e) => setMinSquareMeters(parseInt(e.target.value) || 0)}
                />
                <span className="ml-2 text-gray-500">m²</span>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <button 
                type="submit" 
                className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Buscar propiedades
              </button>
              <button 
                type="button" 
                className="w-full px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                onClick={() => {
                  setLocation('');
                  setPropertyType('');
                  setPriceRange([0, 1000000]);
                  setBathrooms(1);
                  setBedrooms(1);
                  setParkingSpots(0);
                  setMinSquareMeters(0);
                }}
              >
                Limpiar filtros
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default SearchFilters;