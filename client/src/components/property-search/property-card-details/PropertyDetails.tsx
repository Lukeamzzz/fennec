import React, { useState } from 'react';
import { MapPin, Bed, Bath, Calendar, Maximize } from 'lucide-react';
import PropertyLocation from '@/components/property-search/property-card-details/PropertyLocation';
import ImageGallery from '@/components/property-search/property-card-details/ImageGallery';
import PriceCard from '@/components/property-search/property-card-details/PriceCard';

interface PropertyFeature {
  icon: React.ReactNode;
  label: string;
}

interface PropertyAmenity {
  name: string;
}

interface PropertyDetailsProps {
  /**
   * Property title
   */
  title: string;
  /**
   * Property address
   */
  address: string;
  /**
   * Detailed description of the property
   */
  description: string;
  /**
   * Property price
   */
  price: number;
  /**
   * Number of bedrooms
   */
  beds: number;
  /**
   * Number of bathrooms
   */
  baths: number;
  /**
   * Property size in square meters
   */
  area: number;
  /**
   * Year the property was built
   */
  year?: number;
  /**
   * Additional amenities
   */
  amenities?: PropertyAmenity[];
  /**
   * Contact agent via phone
   */
  onCallAgent?: () => void;
  /**
   * Contact agent via email
   */
  onEmailAgent?: () => void;
  /**
   * Save property to favorites
   */
  onSave?: () => void;
  /**
   * Share property
   */
  onShare?: () => void;
  /**
   * Is property saved to favorites
   */
  isSaved?: boolean;
  /**
   * Contact agent directly
   */
  onContactAgent?: () => void;
  /**
   * Image URLs for the property
   */
  images?: string[];
  /**
   * Initial image index when browsing gallery
   */
  initialImageIndex?: number;
  /**
   * Close the property details
   */
  onClose?: () => void;
  /**
   * Optional map URL for the location
   */
  mapUrl?: string;
}

/**
 * Detailed property information component
 */
const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  title,
  address,
  description,
  price,
  beds,
  baths,
  area,
  year,
  amenities = [],
  onCallAgent,
  onEmailAgent,
  onSave,
  onShare,
  isSaved = false,
  onContactAgent,
  images = [],
  initialImageIndex = 0,
  onClose,
  mapUrl
}) => {
  // Estado local para el índice de imagen actual
  const [currentImageIndex, setCurrentImageIndex] = useState(initialImageIndex);
  const totalImages = images.length;

  // Funciones para cambiar imágenes
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? totalImages - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === totalImages - 1 ? 0 : prevIndex + 1
    );
  };

  // Ir directamente a una imagen específica
  const goToImage = (index: number) => {
    if (index >= 0 && index < totalImages) {
      setCurrentImageIndex(index);
    }
  };

  const features: PropertyFeature[] = [
    {
      icon: <Bed className="text-gray-500" size={20} />,
      label: `${beds} ${beds === 1 ? 'Habitación' : 'Habitaciones'}`
    },
    {
      icon: <Bath className="text-gray-500" size={20} />,
      label: `${baths} ${baths === 1 ? 'Baño' : 'Baños'}`
    },
    {
      icon: <Maximize className="text-gray-500" size={20} />,
      label: `${area} m²`
    }
  ];

  if (year) {
    features.push({
      icon: <Calendar className="text-gray-500" size={20} />,
      label: `Año ${year}`
    });
  }

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <ImageGallery 
        images={images}
        currentImageIndex={currentImageIndex}
        totalImages={totalImages}
        onPrevImage={handlePrevImage}
        onNextImage={handleNextImage}
        goToImage={goToImage}
        title={title}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
          
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin size={16} className="mr-1" />
            <p>{address}</p>
          </div>
          
          <h2 className="text-xl font-semibold mb-3">Descripción</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
          
          <h2 className="text-xl font-semibold mb-4">Características</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center p-3 border rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors">
                {feature.icon}
                <span className="mt-2 text-gray-700">{feature.label}</span>
              </div>
            ))}
          </div>
          
          {amenities.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mb-3">Amenidades</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {amenities.map((amenity, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-orange-100 hover:text-orange-700 transition-colors">
                    {amenity.name}
                  </span>
                ))}
              </div>
            </>
          )}
          
          <PropertyLocation 
            address={address}
            mapUrl={mapUrl}
            className="mt-6"
          />
        </div>
        
        <PriceCard 
          price={price}
          onCallAgent={onCallAgent}
          onEmailAgent={onEmailAgent}
          onSave={onSave}
          onShare={onShare}
          isSaved={isSaved}
        />
      </div>
      
      <div className="border-t p-4 flex justify-between">
        <button 
          className="px-4 py-2 border border-gray-300 rounded hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 transition-colors"
          onClick={onClose}
        >
          Cerrar
        </button>
        
        <button 
          className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded transition-colors"
          onClick={onContactAgent}
        >
          Contactar Agente
        </button>
      </div>
    </div>
  );
};

export default PropertyDetails; 