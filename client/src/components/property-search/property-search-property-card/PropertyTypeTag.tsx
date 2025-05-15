import React from 'react';

interface PropertyTypeTagProps {
  /**
   * Property type to display
   */
  type: string;
  /**
   * Optional className for additional styling
   */
  className?: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Property type tag component with translucent background and hover effect
 */
const PropertyTypeTag: React.FC<PropertyTypeTagProps> = ({
  type,
  className = '',
  onClick
}) => {
  return (
    <div 
      className={`px-4 py-2 bg-white bg-opacity-85 hover:bg-opacity-100 rounded-full font-medium text-gray-800 
        transition-all duration-200 cursor-pointer hover:text-orange-600 hover:shadow-sm ${className}`}
      onClick={onClick}
    >
      {type}
    </div>
  );
};

export default PropertyTypeTag; 