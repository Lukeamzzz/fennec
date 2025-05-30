import React from 'react';

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  onClick,
  isActive = false
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
        ${isActive ? 'text-orange-500 border-orange-500' : 'text-gray-600'}
      `}
      onClick={onClick}
    >
      <span className={`
        mr-2 transform transition-transform duration-300 ease-in-out
        ${isActive ? 'scale-110' : 'scale-100'}
      `}>
        {icon}
      </span>
      {label}
    </button>
  );
};

export default ActionButton; 