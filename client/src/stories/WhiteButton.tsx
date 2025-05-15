import React from 'react';

interface WhiteButtonProps {
    /** Specifies the text to display inside the button. */
    text: string
}

/** A white button component with a subtle shadow that transitions to a dark background and white text on hover. */
const WhiteButton: React.FC<WhiteButtonProps> = ({text}) => {
    return (
        <button className='px-6 py-3 border bg-white overflow-hidden shadow-sm text-gray-900 rounded-lg duration-300 cursor-pointer hover:bg-gray-900 hover:text-white'>
            {text}
        </button>
    );
};

export default WhiteButton;