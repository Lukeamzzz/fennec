"use client";

import React, { useState } from 'react';
import { Bell, User } from 'lucide-react';
import { Hourglass } from 'ldrs/react'
import 'ldrs/react/Hourglass.css'
import SearchFilters from '@/components/platform/investment-insights/search/search-filters/SearchFilters';
import LazyPropertyCard from '@/components/property-search/property-search-property-card/LazyPropertyCard';
import PropertyDetails from '@/components/property-search/property-card-details/PropertyDetails';
import PropertySearch from '@/components/property-search/popular-areas/PropertySearch';
import Pagination from '@/components/property-search/pagination/Pagination';
import PaginationInfo from '@/components/property-search/pagination/PaginationInfo';
import '@/components/property-search/start-property-search/animations.css';
import { motion, AnimatePresence } from 'framer-motion';
import { usePropertySearch} from './hooks/usePropertySearch';


export interface ApiPropertyData {
  id?: number;
  imageUrl?: string;
  imagen?: string;
  propertyType?: string;
  tipoPropiedad?: string;
  title?: string;
  titulo?: string;
  price?: number;
  precio?: number;
  address?: string;
  direccion?: string;
  description?: string;
  descripcion?: string;
  beds?: number;
  recamaras?: number;
  habitaciones?: number;
  baths?: number;
  banos?: number;
  area?: number;
  dimensiones?: number;
  dimensionesM2?: number;
  year?: number;
  año?: number;
  construccion?: number;
  amenities?: Array<{ name: string; icon: string }>;
  amenidades?: Array<{ name: string; icon: string }>;
  images?: string[];
  imagenes?: string[];
  latitude?: number;
  lat?: number;
  latitud?: number;
  longitude?: number;
  lng?: number;
  longitud?: number;
  alcaldia?: string;
  colonia?: string;
  estacionamientos?: number;
  precioPorM2?: number;
  banosPorHabitacion?: number;
  habitacionesTotales?: number;
}


// Datos de ejemplo para las propiedades (fallback)
const sampleProperties = [
  {
    id: 1,
    imageUrl: '/images/foto_dummy_propiedad.jpg',
    propertyType: 'Departamento',
    title: 'Departamento de Lujo',
    price: 500000,
    address: 'Av. Reforma 100',
    description: 'Hermosa propiedad con increíbles amenidades en una ubicación privilegiada. Perfecta para familias que buscan comodidad y estilo.',
    beds: 1,
    baths: 1,
    area: 80,
    year: 2020,
    amenities: [
      { name: 'Gimnasio', icon: '💪' },
      { name: 'Alberca', icon: '🏊‍♂️' },
      { name: 'Seguridad 24/7', icon: '👮‍♂️' }
    ],
    images: [
      '/images/foto_dummy_propiedad.jpg',
      '/images/foto_dummy_propiedad.jpg',
      '/images/foto_dummy_propiedad.jpg'
    ],
    latitude: 19.4326,
    longitude: -99.1332
  },
  {
    id: 2,
    imageUrl: '/images/foto_dummy_propiedad.jpg',
    propertyType: 'Casa',
    title: 'Casa Moderna',
    price: 650000,
    address: 'Av. Insurgentes 101',
    description: 'Hermosa propiedad con increíbles amenidades en una ubicación privilegiada. Perfecta para familias que buscan comodidad y estilo.',
    beds: 2,
    baths: 2,
    area: 100,
    year: 2021,
    amenities: [
      { name: 'Jardín', icon: '🌳' },
      { name: 'Garage', icon: '🚗' },
      { name: 'Terraza', icon: '🏡' }
    ],
    images: [
      '/images/foto_dummy_propiedad.jpg',
      '/images/foto_dummy_propiedad.jpg',
      '/images/foto_dummy_propiedad.jpg'
    ],
    latitude: 19.4275,
    longitude: -99.1667
  },
  {
    id: 3,
    imageUrl: '/images/foto_dummy_propiedad.jpg',
    propertyType: 'Departamento',
    title: 'Departamento con Encanto',
    price: 800000,
    address: 'Av. Polanco 102',
    description: 'Hermosa propiedad con increíbles amenidades en una ubicación privilegiada. Perfecta para familias que buscan comodidad y estilo.',
    beds: 3,
    baths: 3,
    area: 120,
    year: 2019,
    amenities: [
      { name: 'Área común', icon: '👥' },
      { name: 'Roof Garden', icon: '🌿' },
      { name: 'Pet Friendly', icon: '🐕' }
    ],
    images: [
      '/images/foto_dummy_propiedad.jpg',
      '/images/foto_dummy_propiedad.jpg',
      '/images/foto_dummy_propiedad.jpg'
    ],
    latitude: 19.4320,
    longitude: -99.1937
  },
];


export default function PropertySearchPage() {
  const [selectedProperty, setSelectedProperty] = useState<typeof sampleProperties[0] | null>(null);
  
  // Usar el hook personalizado con paginación del servidor
  const { 
    searchResults, 
    isLoading, 
    hasSearched, 
    error,
    currentPage,
    totalPages,
    totalResults,
    hasNextPage,
    hasPreviousPage,
    handleSearch, 
    handleSearchByArea,
    loadNextPage,
    loadPreviousPage,
    goToPage,
    resetSearch 
  } = usePropertySearch();

  // Mostrar datos de ejemplo si no hay resultados del API o hay error
  const displayResults = searchResults.length > 0 ? searchResults : (hasSearched && !isLoading ? sampleProperties : []);

  const handleReset = () => {
    resetSearch();
    setSelectedProperty(null);
  };

  const handlePropertyClick = (property: ApiPropertyData) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    setSelectedProperty(ApiProperty(property, 0));
  };


  const handleCloseDetails = () => {
    setSelectedProperty(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="ml-15 pt-10">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold text-gray-800 capitalize">
            Búsqueda de propiedades
          </h1>
        </div>
        <p className="text-gray-600">
          Encuentra todas las oportunidades que hay en el mercado
        </p>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar con filtros */}
          <div className="w-80 flex-shrink-0">
            <SearchFilters
                onSearch={handleSearch}
                onReset={handleReset}
            />
          </div>

          {/* Contenido principal */}
          <div className="flex-1">
            {!hasSearched ? (
                // Mostrar mensaje inicial cuando no se ha buscado
              <div className="space-y-8">
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Encuentra tu Propiedad Ideal
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Utiliza nuestra búsqueda avanzada para encontrar la oportunidad de inversión perfecta.
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
                    Inicia tu Búsqueda de Propiedades
                  </h3>
                  <p className="text-gray-600 text-center">
                    Utiliza los filtros en la izquierda para comenzar a explorar nuestro extenso catálogo de propiedades.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-8">
                  <PropertySearch onSearch={handleSearch} onSearchByArea={handleSearchByArea} />
                </div>
              </div>
            ) : (
              // Mostrar resultados de búsqueda o loader
              <div className="space-y-6">
                {error && (
                  <div className={`p-4 rounded-lg border ${
                    error.includes('No se puede conectar') || error.includes('Tiempo de espera')
                      ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
                      : 'bg-red-50 border-red-200 text-red-800'
                  }`}>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        {error.includes('No se puede conectar') || error.includes('Tiempo de espera') ? (
                          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium">
                          {error.includes('No se puede conectar') || error.includes('Tiempo de espera')
                            ? 'Servidor no disponible'
                            : 'Error en la búsqueda'
                          }
                        </h3>
                        <div className="mt-2 text-sm">
                          <p>{error}</p>
                          {(error.includes('No se puede conectar') || error.includes('Tiempo de espera')) && (
                            <p className="mt-1">
                              Mostrando propiedades de ejemplo mientras tanto. 
                              <button 
                                onClick={() => window.location.reload()} 
                                className="ml-1 underline hover:no-underline"
                              >
                                Intentar de nuevo
                              </button>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Información de paginación superior */}
                <PaginationInfo
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalResults={totalResults || displayResults.length}
                  itemsPerPage={12}
                  isLoading={isLoading}
                />
                
                {isLoading ? (
                  <div className="flex justify-center items-center min-h-[400px]">
                    <div className="text-center">
                      <Hourglass
                        size={40}
                        bgOpacity={0.1}
                        speed={2.5}
                        color="#f97316"
                      />
                      <p className="mt-4 text-gray-600">
                        Cargando página {currentPage}...
                      </p>
                      {error && error.includes('No se puede conectar') && (
                        <p className="mt-2 text-sm text-gray-500">
                          Intentando conectar con el servidor...
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Grid de propiedades con lazy loading */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {displayResults.map((property, index) => (
                        <LazyPropertyCard
                          key={`property-${property.id}-${currentPage}-${index}`}
                          property={property}
                          index={index}
                          onClick={() => handlePropertyClick(property)}
                        />
                      ))}
                    </div>

                    {/* Componente de paginación del servidor */}
                    {totalPages > 1 && (
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={goToPage}
                        onPreviousPage={loadPreviousPage}
                        onNextPage={loadNextPage}
                        hasNextPage={hasNextPage}
                        hasPreviousPage={hasPreviousPage}
                        isLoading={isLoading}
                      />
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de detalles de la propiedad */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={handleCloseDetails}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30 
              }}
              className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <PropertyDetails
                title={selectedProperty.title}
                address={selectedProperty.address}
                description={selectedProperty.description}
                price={selectedProperty.price}
                beds={selectedProperty.beds}
                baths={selectedProperty.baths}
                area={selectedProperty.area}
                year={selectedProperty.year}
                amenities={selectedProperty.amenities}
                images={selectedProperty.images}
                latitude={selectedProperty.latitude}
                longitude={selectedProperty.longitude}
                onClose={handleCloseDetails}
                onCallAgent={() => console.log('Llamar al agente')}
                onEmailAgent={() => console.log('Enviar email al agente')}
                onSave={() => console.log('Guardar propiedad')}
                onShare={() => console.log('Compartir propiedad')}
                onContactAgent={() => console.log('Contactar agente')}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
