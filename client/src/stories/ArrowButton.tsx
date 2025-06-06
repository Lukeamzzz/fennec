import React from 'react';

interface ArrowButtonProps {
    /** Specifies the text to display inside the button. */
    text: string;
    /** Optional className for additional styling */
    className?: string;

    onClick?: () => void;
};

/** An orange button component that displays an arrow icon when hovered over. */
const ArrowButton: React.FC<ArrowButtonProps> = ({ text, className = '', onClick }) => {
    return (
        <button onClick={onClick} className={`bg-orange-500 rounded-lg text-white relative group cursor-pointer ${className}`}>
            {text}
            <span className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
        </button>
    );
};

export default ArrowButton;