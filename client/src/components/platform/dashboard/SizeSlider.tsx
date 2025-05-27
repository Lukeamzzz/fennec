import React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

interface Props {
    value: number;
    onChange: (value: number) => void;
}

function SizeSlider({ value, onChange }: Props) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = Number(e.target.value);
        if (!isNaN(newVal) && newVal >= 0 && newVal <= 5000) {
            onChange(newVal);
        }
    };

    return (
        <div className="w-full max-w-md p-4 space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                Tamaño de Propiedad (m²)
            </label>

            <div className="flex items-center space-x-4">
                <input
                    type="number"
                    value={value}
                    onChange={handleInputChange}
                    className="w-24 px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    min={0}
                    max={5000}
                />
                <span className="text-sm text-gray-500">m²</span>
            </div>

            <SliderPrimitive.Root
                className="relative flex items-center select-none touch-none w-full h-4"
                value={[value]}
                onValueChange={(val) => onChange(val[0])}
                max={5000}
                step={1}
            >
                <SliderPrimitive.Track className="bg-gray-200 relative grow rounded-full h-1">
                    <SliderPrimitive.Range className="absolute bg-orange-500 h-full rounded-full" />
                </SliderPrimitive.Track>
                <SliderPrimitive.Thumb className="block w-5 h-5 bg-white border-2 border-orange-500 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </SliderPrimitive.Root>
        </div>
    );
}

export default SizeSlider;
