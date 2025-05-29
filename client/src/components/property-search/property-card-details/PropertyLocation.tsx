import React from 'react';
import { MapPin } from 'lucide-react';
import PropertyMapbox from './PropertyMapbox';

interface PropertyLocationProps {
  /**
   * Property address
   */
  address: string;
  /**
   * Latitude of the property
   */
  latitude?: number;
  /**
   * Longitude of the property
   */
  longitude?: number;
  /**
   * Optional class name for additional styling
   */
  className?: string;
}

/**
 * Component to display property location with a map
 */
const PropertyLocation: React.FC<PropertyLocationProps> = ({
  address,
  latitude = 19.4326,  // Default to Mexico City coordinates
  longitude = -99.1332,
  className = ''
}) => {
  return (
    <div className={`border rounded-lg overflow-hidden ${className}`}>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-3">Ubicación</h2>
        <div className="flex items-center mb-3">
          <MapPin size={18} className="mr-2 text-gray-600" />
          <p className="text-gray-700">{address}</p>
        </div>
      </div>

      <div className="w-full h-64 bg-gray-200 relative">
        {latitude && longitude ? (
          <PropertyMapbox
            latitude={latitude}
            longitude={longitude}
            address={address}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin size={32} className="mx-auto mb-2" />
              <p>Vista previa del mapa no disponible</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyLocation; 