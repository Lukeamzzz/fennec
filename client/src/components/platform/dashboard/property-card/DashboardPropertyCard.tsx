import React from 'react';
import Header from './Header';
import DetailsGrid from './DetailsGrid';
import PriceChart from './PriceChart';
import InvestmentForecast from './InvestmentForecast';
import RiskFactors from './RiskFactors';
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
    previousPrices: number[];
    valuation3Years: number;
    valuation5Years: number;
    growthRate: number;
    roiMonthly: number;
    breakevenYears: number;
    occupancyRate: number;
    riskFactors: string[];
    amenities: string[];
    investmentGrade: string;
    phone: string;
    onClose: () => void;
}

export default function DashboardPropertyCard(props: DashboardPropertyCardProps) {
    const {
        name, location, description, price, size, bathrooms, bedrooms,
        previousPrices, valuation3Years, valuation5Years, growthRate,
        roiMonthly, breakevenYears, occupancyRate,
        riskFactors, amenities, investmentGrade, phone, onClose
    } = props;

    return (
        <div className={"fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50"}>
            <div className="relative m-2 p-5 bg-white shadow-lg rounded-lg overflow-hidden max-w-7xl">

                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl font-bold"
                >
                    <X/>
                </button>

                <Header name={name} location={location} />
                <span>{description}</span>
                <DetailsGrid price={price} size={size} bedrooms={bedrooms} bathrooms={bathrooms} />
                <PriceChart previousPrices={previousPrices} />
                <InvestmentForecast
                    valuation3Years={valuation3Years}
                    valuation5Years={valuation5Years}
                    growthRate={growthRate}
                    roiMonthly={roiMonthly}
                    breakevenYears={breakevenYears}
                    occupancyRate={occupancyRate}
                />
                <RiskFactors riskFactors={riskFactors} />
                <Amenities amenities={amenities} investmentGrade={investmentGrade} phone={phone} />
            </div>
        </div>
    );
}
