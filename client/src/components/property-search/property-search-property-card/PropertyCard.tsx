import React from 'react';
import { MapPin, Bed, Bath } from 'lucide-react';
import LikeButton from './LikeButton';
import PropertyTypeTag from './PropertyTypeTag';

interface PropertyCardProps {
  /**
   * Property image URL
   */
  imageUrl: string;
  /**
   * Property type (e.g., "Apartment", "House", "Land")
   */
  propertyType: string;
  /**
   * Property title
   */
  title: string;
  /**
   * Property price
   */
  price: number;
  /**
   * Property address
   */
  address: string;
  /**
   * Property description
   */
  description: string;
  /**
   * Number of bedrooms
   */
  beds: number;
  /**
   * Number of bathrooms
   */
  baths: number;
  /**
   * Property area in square meters
   */
  area: number;
  /**
   * Whether the property is favorited
   */
  isFavorited?: boolean;
  /**
   * Function to handle favorite toggle
   */
  onFavoriteToggle?: () => void;
  /**
   * Function to handle card click
   */
  onClick?: () => void;
  /**
   * Function to handle property type click
   */
  onPropertyTypeClick?: (type: string) => void;
}

/**
 * Property card component for search results
 */
const PropertyCard: React.FC<PropertyCardProps> = ({
  imageUrl,
  propertyType,
  title,
  price,
  address,
  description,
  beds,
  baths,
  area,
  isFavorited = false,
  onFavoriteToggle = () => {},
  onClick,
  onPropertyTypeClick = () => {}
}) => {
  return (
    <div className="w-full rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 relative">
      {/* Property image with type badge and favorite button */}
      <div className="relative aspect-[4/3] w-full">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        
        {/* Property type badge */}
        <PropertyTypeTag 
          type={propertyType}
          className="absolute bottom-4 left-4 z-10"
          onClick={() => onPropertyTypeClick(propertyType)}
        />
        
        {/* Favorite button */}
        <LikeButton 
          isLiked={isFavorited}
          onToggle={onFavoriteToggle}
          className="absolute top-4 right-4 z-10"
        />
      </div>
      
      {/* Property details */}
      <div className="p-6" onClick={onClick}>
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800 truncate flex-1 mr-4">{title || 'Sin título'}</h3>
          <p className="text-2xl font-bold text-gray-900 whitespace-nowrap">${(price || 0).toLocaleString()}</p>
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin size={16} className="mr-2 flex-shrink-0" />
          <p className="text-sm truncate">{address || 'Dirección no disponible'}</p>
        </div>
        
        <p className="text-gray-600 text-sm mb-6 line-clamp-2">
          {description || 'Descripción no disponible'}
        </p>
        
        {/* Property features */}
        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center">
            <Bed size={20} className="text-gray-500" />
            <span className="ml-2 text-gray-700">{beds || 0} {(beds || 0) === 1 ? 'Hab' : 'Habs'}</span>
          </div>
          
          <div className="flex items-center">
            <Bath size={20} className="text-gray-500" />
            <span className="ml-2 text-gray-700">{baths || 0} {(baths || 0) === 1 ? 'Baño' : 'Baños'}</span>
          </div>
          
          <div className="flex items-center">
            <div className="text-gray-500">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8L10 1M10 1L17 8M10 1V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="rotate(90 12 12)" />
              </svg>
            </div>
            <span className="ml-2 text-gray-700">{area || 0} m²</span>
          </div>
        </div>
      </div>
      
      {/* View details button */}
      <div className="px-6 pb-6">
        <button 
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          onClick={onClick}
        >
          Ver Detalles
        </button>
      </div>
    </div>
  );
};

export default PropertyCard; 