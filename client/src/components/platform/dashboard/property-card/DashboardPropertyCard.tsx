import React from 'react';
import Header from './Header';
import DetailsGrid from './DetailsGrid';
import PriceChart from './PriceChart';
import InvestmentForecast from './InvestmentForecast';
import Amenities from './Amenities';
import { X } from 'lucide-react';

interface DashboardPropertyCardProps {
    name: string;
    location: string;
    description: string;
    price: number;
    size: number;
    bathrooms: number;
    bedrooms: number;
    parking: number;
    previousPrices: number[];
    valuation3Years: number;
    valuation5Years: number;
    growthRate: number;
    roiMonthly: number;
    breakevenYears: number;
    occupancyRate: number;
    investmentGrade: string;
    onClose: () => void;
}


export default function DashboardPropertyCard(props: DashboardPropertyCardProps) {
    const {
        name, location, description, price, size, bathrooms, bedrooms, parking,
        previousPrices, valuation3Years, valuation5Years, growthRate,
        roiMonthly, investmentGrade, onClose
    } = props;

    return (
        <div className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50">
            <div className="relative m-2 bg-white shadow-lg rounded-lg overflow-y-auto max-h-[95vh] w-full max-w-3xl">

                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl font-bold"
                >
                    <X/>
                </button>

                <div className="p-4">
                    <Header name={name} location={location}/>
                    <span>{description}</span>
                    <DetailsGrid price={price} size={size} bedrooms={bedrooms} bathrooms={bathrooms} parking={parking}/>
                    <PriceChart previousPrices={previousPrices}/>
                    <InvestmentForecast
                        valuation3Years={valuation3Years}
                        valuation5Years={valuation5Years}
                        growthRate={growthRate}
                        roiMonthly={roiMonthly}
                    />
                    <Amenities investmentGrade={investmentGrade}/>
                </div>

            </div>
        </div>

    );
}
