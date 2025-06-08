import React, { useState } from 'react';
import { Heart, Bed, Bath, Car, Square } from 'lucide-react';
import PropertyModal from '../property-modal/PropertyModal';

export interface Property {
  id: number;
  title: string;
  price: number;
  address: string;
  description: string;
  recamaras: number;
  banos: number;
  estacionamiento: number;
  metros: number;
  type: string;
  image: string;
}

interface PropertyCardProps {
  property: Property;
}

// Componente de botón de Like
const LikeButton: React.FC = () => {
  const [liked, setLiked] = useState<boolean>(false);
  
  return (
    <button 
      className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
      onClick={(e) => {
        e.stopPropagation();
        setLiked(!liked);
      }}
    >
      <Heart 
        size={20} 
        fill={liked ? "#ff6b35" : "none"} 
        color={liked ? "#ff6b35" : "#666"}
      />
    </button>
  );
};

// Componente de características de la propiedad
interface PropertyFeaturesProps {
  recamaras: number;
  banos: number;
  estacionamiento: number;
  metros: number;
}

const PropertyFeatures: React.FC<PropertyFeaturesProps> = ({ recamaras, banos, estacionamiento, metros }) => {
  return (
    <div className="flex items-center justify-start gap-4 text-gray-600 mt-2 flex-wrap">
      {recamaras > 0 && (
        <div className="flex items-center gap-1">
          <Bed size={16} />
          <span className="font-semibold">{recamaras}</span>
          <span className="text-sm">Recámaras</span>
        </div>
      )}
      {banos > 0 && (
        <div className="flex items-center gap-1">
          <Bath size={16} />
          <span className="font-semibold">{banos}</span>
          <span className="text-sm">Baños</span>
        </div>
      )}
      {estacionamiento > 0 && (
        <div className="flex items-center gap-1">
          <Car size={16} />
          <span className="font-semibold">{estacionamiento}</span>
          <span className="text-sm">Est.</span>
        </div>
      )}
      <div className="flex items-center gap-1">
        <Square size={16} />
        <span className="font-semibold">{metros}</span>
        <span className="text-sm">m²</span>
      </div>
    </div>
  );
};

// Componente de botón de Ver Detalles
interface DetailsButtonProps {
  onClick: () => void;
}

const DetailsButton: React.FC<DetailsButtonProps> = ({ onClick }) => {
  return (
    <button 
      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded mt-4 transition-colors duration-300"
      onClick={onClick}
    >
      Ver Detalles
    </button>
  );
};

// Componente de tipo de propiedad
interface PropertyTypeProps {
  type: string;
}

const PropertyType: React.FC<PropertyTypeProps> = ({ type }) => {
  return (
    <div className="absolute top-2 left-2 bg-gray-800/70 text-white px-3 py-1 rounded-md text-sm">
      {type}
    </div>
  );
};

// Componente de tarjeta de propiedad
const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl">
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={property.image} 
            alt={property.title} 
            className="w-full h-48 object-cover"
          />
          <PropertyType type={property.type} />
          <LikeButton />
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg truncate">{property.title}</h3>
            <span className="font-bold text-orange-500">${property.price.toLocaleString()}</span>
          </div>
          
          <p className="text-gray-500 text-sm mt-1">{property.address}</p>
          
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
            {property.description}
          </p>
          
          <PropertyFeatures 
            recamaras={property.recamaras} 
            banos={property.banos} 
            estacionamiento={property.estacionamiento} 
            metros={property.metros}
          />
          
          <DetailsButton onClick={openModal} />
        </div>
      </div>

      {/* Modal de detalles de la propiedad */}
      <PropertyModal 
        property={property}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default PropertyCard;