import React from 'react';
import { Search } from 'lucide-react';
import './animations.css';

interface StartPropertySearchCardProps {
  /**
   * Main title text
   */
  title?: string;
  /**
   * Subtitle text
   */
  subtitle?: string;
  /**
   * Description text
   */
  description?: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Card component for starting a property search with animated magnifying glass
 */
const StartPropertySearchCard: React.FC<StartPropertySearchCardProps> = ({
  title = "Encuentra Tu Propiedad Soñada",
  subtitle = "Inicia Tu Búsqueda de Propiedades",
  description = "Utiliza los filtros en la izquierda para comenzar a explorar nuestro extenso catálogo de propiedades.",
  onClick
}) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-center">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-gray-600 text-xl mb-16">
        Utiliza nuestra búsqueda avanzada para encontrar la oportunidad de inversión perfecta
      </p>

      <div className="flex justify-center mb-8">
        <div className="cursor-pointer" onClick={onClick}>
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Orange glow effect behind the icon */}
            <div className="absolute w-16 h-16 bg-orange-300 rounded-full glow-pulse-animation"></div>
            {/* Main search icon with continuous animation */}
            <Search 
              size={64} 
              className="text-orange-500 relative z-10 wiggle-animation" 
            />
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-4">{subtitle}</h2>
      <p className="text-gray-600 text-lg">{description}</p>
    </div>
  );
};

export default StartPropertySearchCard; 