import React, { useState } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

function SizeSlider(){
    const [value, setValue] = useState<number[]>([270]);

    return (
        <div className="w-full max-w-md p-4">
            <label className="block mb-2 text-sm font-medium">
                Property Size (m²): {value[0]}
            </label>


            <SliderPrimitive.Root
                className="relative flex items-center select-none touch-none w-full h-4"
                value={value}
                onValueChange={setValue}
                max={5000}
                step={1}
            >

                <SliderPrimitive.Track className="bg-gray-200 relative grow rounded-full h-1">

                    <SliderPrimitive.Range className="absolute bg-orange-500 h-full rounded-full"/>
                </SliderPrimitive.Track>

                <SliderPrimitive.Thumb
                    className="block w-5 h-5 bg-white border-2 border-orange-500 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"/>
            </SliderPrimitive.Root>
        </div>
    )
}

export default SizeSlider;