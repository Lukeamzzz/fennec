import { useState } from 'react';

const ToggleButton = () => {
    const [enabled, setEnabled] = useState(false);

    const toggleSwitch = () => {
        setEnabled(!enabled);
    };

    return (
        <button
            type="button"
            role="switch"
            aria-checked={enabled}
            className={`relative inline-flex h-6 w-12 items-center rounded-full ${
                enabled ? 'bg-orange-500' : 'bg-gray-200'
            }`}
            onClick={toggleSwitch}
        >
      <span
          className={`${
              enabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out`}
      />
        </button>
    );
};

export default ToggleButton;