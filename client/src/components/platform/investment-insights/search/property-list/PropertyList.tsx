'use client';

import React, { useState } from 'react';
import PropertyCard, { Property } from '../property-card/PropertyCard';

const PropertyList: React.FC = () => {
  const [properties] = useState<Property[]>([
    {
      id: 1,
      title: "Casa de Lujo",
      price: 500000,
      address: "Calle Reforma 100",
      description: "Hermosa propiedad con increíbles comodidades en una gran ubicación con vistas escénicas.",
      recamaras: 3,
      banos: 2,
      estacionamiento: 2,
      metros: 120,
      type: "Casa",
      image: "/images/placeholder-img.webp"
    },
    {
      id: 2,
      title: "Departamento Moderno",
      price: 950000,
      address: "Av. Insurgentes 105",
      description: "Elegante departamento con acabados de lujo, excelente iluminación y espacios amplios.",
      recamaras: 2,
      banos: 2,
      estacionamiento: 1,
      metros: 85,
      type: "Departamento",
      image: "/images/placeholder-img.webp"
    },
    {
      id: 3,
      title: "Terreno Residencial",
      price: 890000,
      address: "Calle Polanco 102",
      description: "Excelente terreno en zona de alta plusvalía, ideal para construir la casa de tus sueños.",
      recamaras: 0,
      banos: 0,
      estacionamiento: 0,
      metros: 500,
      type: "Terreno",
      image: "/images/placeholder-img.webp"
    },
    {
      id: 4,
      title: "Casa Familiar",
      price: 950000,
      address: "Calle Condesa 103",
      description: "Amplia casa con jardín, perfecta para familias que buscan comodidad y tranquilidad.",
      recamaras: 4,
      banos: 3,
      estacionamiento: 2,
      metros: 210,
      type: "Casa",
      image: "/images/placeholder-img.webp"
    },
    {
      id: 5,
      title: "Departamento de Lujo",
      price: 1100000,
      address: "Av. Reforma 104",
      description: "Lujoso departamento con vista panorámica, acabados de primera y amenidades exclusivas.",
      recamaras: 3,
      banos: 2,
      estacionamiento: 2,
      metros: 150,
      type: "Departamento",
      image: "/images/placeholder-img.webp"
    },
    {
      id: 6,
      title: "Terreno Comercial",
      price: 1250000,
      address: "Av. Insurgentes Sur 105",
      description: "Terreno con ubicación estratégica, ideal para desarrollo comercial o mixto.",
      recamaras: 0,
      banos: 0,
      estacionamiento: 0,
      metros: 800,
      type: "Terreno",
      image: "/images/placeholder-img.webp"
    }
  ]);

  return (
    <div className="max-w-7xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">12 Propiedades Encontradas</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyList;