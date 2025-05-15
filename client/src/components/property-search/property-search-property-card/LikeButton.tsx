import React from 'react';
import { Heart } from 'lucide-react';

interface LikeButtonProps {
  /**
   * Whether the item is liked/favorited
   */
  isLiked: boolean;
  /**
   * Function to handle like/unlike action
   */
  onToggle: () => void;
  /**
   * Optional className for additional styling
   */
  className?: string;
}

/**
 * Like/favorite button component with hover animation
 */
const LikeButton: React.FC<LikeButtonProps> = ({
  isLiked,
  onToggle,
  className = ''
}) => {
  return (
    <button 
      className={`w-10 h-10 bg-white bg-opacity-85 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-sm transition-all duration-200 
        hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-300 ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      aria-label={isLiked ? "Quitar de favoritos" : "Añadir a favoritos"}
    >
      <Heart 
        className={`transition-colors duration-200 ${
          isLiked 
            ? 'fill-current text-red-500' 
            : 'text-gray-400 hover:text-orange-500'
        }`}
        size={20}
      />
    </button>
  );
};

export default LikeButton; 