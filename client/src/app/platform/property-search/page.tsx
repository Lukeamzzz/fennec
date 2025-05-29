"use client";

import React, { useState } from 'react';
import { Bell, User } from 'lucide-react';
import { Hourglass } from 'ldrs/react'
import 'ldrs/react/Hourglass.css'
import SearchFilters from '@/components/platform/investment-insights/search/search-filters/SearchFilters';
import PropertyCard from '@/components/property-search/property-search-property-card/PropertyCard';
import PropertyDetails from '@/components/property-search/property-card-details/PropertyDetails';
import PropertySearch from '@/components/property-search/popular-areas/PropertySearch';
import '@/components/property-search/start-property-search/animations.css';
import { motion, AnimatePresence } from 'framer-motion';

// Datos de ejemplo para las propiedades
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

// Más propiedades de ejemplo
const moreProperties = [
  {
    id: 4,
    imageUrl: '/images/foto_dummy_propiedad.jpg',
    propertyType: 'Casa',
    title: 'Modern Villa',
    price: 750000,
    address: '103 Condesa St.',
    description: 'Stunning modern villa with spacious rooms and high-end finishes. Features a beautiful garden and private pool.',
    beds: 4,
    baths: 3,
    area: 200,
    year: 2022,
    amenities: [
      { name: 'Piscina', icon: '🏊‍♂️' },
      { name: 'Jardín', icon: '🌳' },
      { name: 'Garage', icon: '🚗' }
    ],
    images: [
      '/images/foto_dummy_propiedad.jpg',
      '/images/foto_dummy_propiedad.jpg',
      '/images/foto_dummy_propiedad.jpg'
    ],
    latitude: 19.4111,
    longitude: -99.1711
  },
  {
    id: 5,
    imageUrl: '/images/foto_dummy_propiedad.jpg',
    propertyType: 'Departamento',
    title: 'Penthouse Suite',
    price: 900000,
    address: '104 Roma Norte St.',
    description: 'Luxurious penthouse with panoramic city views. Features high ceilings, premium appliances, and a private terrace.',
    beds: 3,
    baths: 2,
    area: 150,
    year: 2021,
    amenities: [
      { name: 'Terraza', icon: '🏡' },
      { name: 'Gimnasio', icon: '💪' },
      { name: 'Seguridad 24/7', icon: '👮‍♂️' }
    ],
    images: [
      '/images/foto_dummy_propiedad.jpg',
      '/images/foto_dummy_propiedad.jpg',
      '/images/foto_dummy_propiedad.jpg'
    ],
    latitude: 19.4203,
    longitude: -99.1547
  },
  {
    id: 6,
    imageUrl: '/images/foto_dummy_propiedad.jpg',
    propertyType: 'Casa',
    title: 'Family Home',
    price: 650000,
    address: '105 Del Valle St.',
    description: 'Perfect family home in a quiet neighborhood. Features a spacious backyard, modern kitchen, and plenty of natural light.',
    beds: 3,
    baths: 2,
    area: 180,
    year: 2019,
    amenities: [
      { name: 'Jardín', icon: '🌳' },
      { name: 'Cocina Moderna', icon: '🍳' },
      { name: 'Pet Friendly', icon: '🐕' }
    ],
    images: [
      '/images/foto_dummy_propiedad.jpg',
      '/images/foto_dummy_propiedad.jpg',
      '/images/foto_dummy_propiedad.jpg'
    ],
    latitude: 19.3899,
    longitude: -99.1843
  }
];

export default function PropertySearchPage() {
  const [searchResults, setSearchResults] = useState<typeof sampleProperties>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<typeof sampleProperties[0] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (filters: any) => {
    console.log('Searching with filters:', filters);
    setIsLoading(true);
    
    // Simulamos una búsqueda que tarda 1 segundo
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Primero mostramos las propiedades iniciales
    setSearchResults(sampleProperties);
    setHasSearched(true);
    setIsLoading(false);

    // Después de 0.5 segundos, agregamos más propiedades
    setTimeout(() => {
      setSearchResults(prev => [...prev, ...moreProperties]);
    }, 500);
  };

  const handleReset = () => {
    setSearchResults([]);
    setHasSearched(false);
    setSelectedProperty(null);
    setIsLoading(false);
  };

  const handlePropertyClick = (property: any) => {
    setSelectedProperty(property);
  };

  const handleCloseDetails = () => {
    setSelectedProperty(null);
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
                    Utiliza nuestra búsqueda avanzada para encontrar la oportunidad de inversión perfecta
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
                  <PropertySearch />
                </div>
              </div>
            ) : (
              // Mostrar resultados de búsqueda o loader
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {isLoading ? 'Buscando propiedades...' : `${searchResults.length} Propiedades Encontradas`}
                </h2>
                
                {isLoading ? (
                  <div className="flex justify-center items-center min-h-[400px]">
                    <Hourglass
                      size={40}
                      bgOpacity={0.1}
                      speed={2.5}
                      color="#f97316"
                    />
                  </div>
                ) : (
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {searchResults.map((property, index) => (
                      <motion.div
                        key={property.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.5,
                          delay: index * 0.1,
                          ease: "easeOut"
                        }}
                      >
                        <PropertyCard
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
                      </motion.div>
                    ))}
                  </motion.div>
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
