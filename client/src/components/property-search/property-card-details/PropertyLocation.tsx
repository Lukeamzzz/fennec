import React from 'react';
import { MapPin } from 'lucide-react';

interface PropertyLocationProps {
  /**
   * Property address
   */
  address: string;
  /**
   * Optional map URL to display
   */
  mapUrl?: string;
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
  mapUrl = "https://maps.googleapis.com/maps/api/staticmap?center=Polanco,Mexico+City&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7CPolanco,Mexico+City&key=YOUR_API_KEY",
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
        {/* Ideally, you would integrate with an actual map service here */}
        {mapUrl ? (
          <img 
            src={mapUrl} 
            alt={`Mapa mostrando la ubicación de ${address}`} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin size={32} className="mx-auto mb-2" />
              <p>Vista previa del mapa no disponible</p>
            </div>
          </div>
        )}
        
        {/* Map marker for the property */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center animate-pulse">
              <MapPin size={16} className="text-white" />
            </div>
            {/* Shadow/reflection effect */}
            <div className="w-6 h-1.5 bg-black opacity-20 rounded-full mx-auto mt-1"></div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t">
        <p className="text-sm text-gray-600">
          El inmueble está cerca de restaurantes, escuelas y transporte público.
        </p>
      </div>
    </div>
  );
};

export default PropertyLocation; 