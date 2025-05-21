
import * as React from "react";
import { MapPin, TrendingUp } from "lucide-react";
import PropertyType from "@/stories/PropertyType";
import ArrowButton from "@/stories/ArrowButton";

interface InvestmentData{
    title: string,
    localization: string,
    price: number,
    roi: number,
    risk: string,
    type: string,
    onClick?: () => void
}


const CardInvestment = ({title,localization, price, roi, risk, type, onClick}: InvestmentData) => {

    return(
        <div className="shadow-xl p-4 rounded-lg cursor-pointer max-w-sm" onClick={onClick}>
            <div className="text-center mb-2">
                <h3>{title}</h3>
            </div>
            <div className="text-small text-muted-foreground flex pb-5">
                <MapPin size={20} />
                <p className="ml-1">{localization}</p>
            </div>

            <div className="flex justify-between items-start w-full pl-5 pr-5">

                <div className="flex flex-col items-start pr-1">
                    <p className="text-neutral-500 ">Price</p>
                    <p className="font-semibold text-black">${price}</p>
                </div>


                <div className="flex flex-col items-start pr-2">
                    <p className="text-neutral-500">ROI</p>
                    <p className="flex items-center text-green-600 ">
                        {roi}%
                        <TrendingUp size={15} />
                    </p>
                </div>

                <div className="flex flex-col items-start pr-1">
                    <p className="text-neutral-500">Risk</p>
                    <p className="font-semibold text-black">{risk}</p>
                </div>
            </div>

            <div className="flex justify-center mt-2">
                <PropertyType iconType={type} size={20}></PropertyType>
            </div>

            <div className="flex justify-center mt-5">
                <ArrowButton text="Ver Detalles" className="w-full py-2"></ArrowButton>
            </div>
        </div>
    )
}

export default CardInvestment;