"use client";

import React, { useState } from 'react';
import { Bell, User } from 'lucide-react';
import SearchFilters from '@/components/platform/investment-insights/search/search-filters/SearchFilters';
import PropertyCard from '@/components/property-search/property-search-property-card/PropertyCard';
import '@/components/property-search/start-property-search/animations.css';

// Datos de ejemplo para las propiedades
const sampleProperties = [
  {
    imageUrl: '/images/foto_dummy_propiedad.jpg',
    propertyType: 'Departamento',
    title: 'Luxury Apartment',
    price: 500000,
    address: '100 Reforma St.',
    description: 'Beautiful property with amazing amenities in a desirable location. Perfect for families looking for comfort and style.',
    beds: 1,
    baths: 1,
    area: 80,
  },
  {
    imageUrl: '/images/foto_dummy_propiedad.jpg',
    propertyType: 'Casa',
    title: 'Modern House',
    price: 650000,
    address: '101 Insurgentes St.',
    description: 'Beautiful property with amazing amenities in a desirable location. Perfect for families looking for comfort and style.',
    beds: 2,
    baths: 2,
    area: 100,
  },
  {
    imageUrl: '/images/foto_dummy_propiedad.jpg',
    propertyType: 'Departamento',
    title: 'Charming Condo',
    price: 800000,
    address: '102 Polanco St.',
    description: 'Beautiful property with amazing amenities in a desirable location. Perfect for families looking for comfort and style.',
    beds: 3,
    baths: 3,
    area: 120,
  },
];

export default function PropertySearchPage() {
  const [searchResults, setSearchResults] = useState<typeof sampleProperties>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (filters: any) => {
    console.log('Searching with filters:', filters);
    // Aquí implementarías la lógica real de búsqueda
    // Por ahora, usamos los datos de ejemplo
    setSearchResults(sampleProperties);
    setHasSearched(true);
  };

  const handlePropertyClick = (property: any) => {
    console.log('Property clicked:', property);
    // Aquí implementarías la navegación al detalle de la propiedad
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Property Search</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Bell className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <User className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar con filtros */}
          <div className="w-80 flex-shrink-0">
            <SearchFilters onSearch={handleSearch} />
          </div>

          {/* Contenido principal */}
          <div className="flex-1">
            {!hasSearched ? (
              // Mostrar mensaje inicial cuando no se ha buscado
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Find Your Dream Property
                </h2>
                <p className="text-gray-600 mb-8">
                  Use our advanced search to find the perfect investment opportunity
                </p>
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center wiggle-animation">
                      <svg
                        className="w-12 h-12 text-orange-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-orange-100 glow-pulse-animation -z-10"></div>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-center mt-6 mb-4">
                  Start Your Property Search
                </h3>
                <p className="text-gray-600 text-center">
                  Use the filters on the left to start browsing our extensive property catalog.
                </p>
              </div>
            ) : (
              // Mostrar resultados de búsqueda
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {searchResults.length} Properties Found
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((property, index) => (
                    <PropertyCard
                      key={index}
                      imageUrl={property.imageUrl}
                      propertyType={property.propertyType}
                      title={property.title}
                      price={property.price}
                      address={property.address}
                      description={property.description}
                      beds={property.beds}
                      baths={property.baths}
                      area={property.area}
                      onClick={() => handlePropertyClick(property)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
