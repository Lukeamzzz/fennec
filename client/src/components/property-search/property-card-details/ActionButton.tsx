import React from 'react';

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  onClick
}) => {
  return (
    <button
      className="flex-1 flex items-center justify-center border border-gray-300 py-2 px-3 rounded hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 transition-colors"
      onClick={onClick}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </button>
  );
};

export default ActionButton; 