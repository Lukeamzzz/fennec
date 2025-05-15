import React from 'react';
import { LandPlot, Home, Building, Compass, MapPin } from 'lucide-react';

interface PropertyTypeCardProps {
  /**
   * Specifies the type of property
   * Accepted values: 'Departamentos', 'Casas', 'Terreno'
   */
  type: string;
  /**
   * Optional custom icon to override the default
   */
  customIcon?: React.ReactNode;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Card component for property types in the property search section
 */
const PropertyTypeCard: React.FC<PropertyTypeCardProps> = ({ 
  type, 
  customIcon,
  onClick
}) => {
  const getIcon = () => {
    switch(type.toLowerCase()) {
      case 'departamentos':
        return Building;
      case 'casas':
        return Home;
      case 'terreno':
        return LandPlot;
      default:
        return Compass;
    }
  };

  const Icon = getIcon();

  return (
    <div 
      className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={onClick}
    >
      {customIcon || <Icon className="text-orange-500 mb-3" size={24} />}
      <span className="text-center font-medium">{type}</span>
    </div>
  );
};

export default PropertyTypeCard; 