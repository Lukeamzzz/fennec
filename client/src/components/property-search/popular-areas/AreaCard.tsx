import React from 'react';
import { MapPin } from 'lucide-react';

interface AreaCardProps {
  /**
   * The name of the area to display
   */
  areaName: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Card component for popular areas in the property search section
 */
const AreaCard: React.FC<AreaCardProps> = ({ 
  areaName,
  onClick
}) => {
  return (
    <div 
      className="flex items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={onClick}
    >
      <MapPin className="text-orange-500 mr-4" size={24} />
      <span className="font-medium">{areaName}</span>
    </div>
  );
};

export default AreaCard; 