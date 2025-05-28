"use client";

import React from 'react';
import { Bell, User } from 'lucide-react';
import SearchFilters from '@/components/platform/investment-insights/search/search-filters/SearchFilters';
import PropertyTypeCard from '@/components/property-search/popular-areas/PropertyTypeCard';
import AreaCard from '@/components/property-search/popular-areas/AreaCard';
import '@/components/property-search/start-property-search/animations.css';

export default function PropertySearchPage() {
  const propertyTypes = [
    { type: 'Apartments', icon: '🏢' },
    { type: 'Houses', icon: '🏠' },
    { type: 'Condos', icon: '🏘️' },
    { type: 'Land', icon: '🏞️' },
  ];

  const popularAreas = [
    { areaName: 'Polanco' },
    { areaName: 'Condesa' },
    { areaName: 'Roma Norte' },
  ];

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
            <SearchFilters />
          </div>

          {/* Contenido principal */}
          <div className="flex-1">
            {/* Sección de inicio de búsqueda */}
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

            {/* Sección de Áreas Populares */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Popular Areas
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {popularAreas.map((area, index) => (
                  <AreaCard
                    key={index}
                    areaName={area.areaName}
                    onClick={() => console.log(`Clicked ${area.areaName}`)}
                  />
                ))}
              </div>
            </div>

            {/* Sección de Tipos de Propiedad */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Property Types
              </h2>
              <div className="grid grid-cols-4 gap-4">
                {propertyTypes.map((type, index) => (
                  <PropertyTypeCard
                    key={index}
                    type={type.type}
                    onClick={() => console.log(`Clicked ${type.type}`)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
