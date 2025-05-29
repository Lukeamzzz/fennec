import React from 'react';

interface HeartButtonProps {
  isLiked: boolean;
  onClick?: () => void;
  label?: string;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  isLiked,
  onClick,
  label = "Guardar"
}) => {
  return (
    <button
      className={`
        flex-1 flex items-center justify-center 
        py-2 px-3 rounded 
        bg-white/80 backdrop-blur-sm
        border border-gray-200
        hover:bg-orange-50 hover:border-orange-300 
        transition-all duration-300 ease-in-out
        group
        ${isLiked ? 'text-orange-500 border-orange-500' : 'text-gray-600'}
      `}
      onClick={onClick}
    >
      <div className="relative mr-2">
        {/* Corazón base */}
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          className={`
            transform transition-all duration-300 ease-in-out
            ${isLiked ? 'scale-110' : 'scale-100 group-hover:scale-105'}
          `}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
            fill={isLiked ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`
              transition-all duration-300 ease-in-out
              ${isLiked ? 'opacity-100' : 'opacity-100'}
            `}
          />
        </svg>
        
        {/* Efecto de partículas al dar like */}
        {isLiked && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="absolute w-8 h-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`
                    absolute w-1 h-1 bg-orange-500 rounded-full
                    animate-particle-${i}
                  `}
                  style={{
                    '--particle-angle': `${i * 60}deg`,
                  } as React.CSSProperties}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      {label}
    </button>
  );
};

export default HeartButton; 