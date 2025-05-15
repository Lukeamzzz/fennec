import React from 'react';
import ArrowButton from './ArrowButton';
import { BadgeCheck } from 'lucide-react';


interface SubscriptionPlan {
    /**
     * The name of the subscription plan (e.g., "Básico", "Profesional", "Empresarial").
     */
    name: string;
    /**
     * The monthly price of the subscription plan in MXN.
     */
    price: number;
    /**
     * An array of strings describing the features included in the plan.
     */
    features: string[];
    /**
     * Optional: Indicates if the plan is marked as popular. Defaults to false.
     */
    isPopular?: boolean;
    /**
     * Optional: A background color class (e.g., Tailwind CSS class) to customize the card's appearance.
     */
    bgColor?: string;
}

/**
 * A component that renders a card displaying the details of a subscription plan.
 */
const CardSubscription: React.FC<SubscriptionPlan> = ({
    name,
    price,
    features,
    isPopular = false, // Default value if isPopular prop is not provided
    bgColor = '',     // Default value if bgColor prop is not provided
}) => {
    return (
        <div className={`w-90 max-w-sm p-4 shadow-xl rounded-xl duration-300 hover:-translate-y-1 relative ${bgColor}`}>
            {/* Conditional rendering of the "Popular" badge */}
            {isPopular && (
                <span className='absolute -top-3 right-4 bg-orange-100 text-orange-600 text-xs font-semibold px-2.5 py-0.5 rounded-full'>
                    Popular
                </span>
            )}

            <h1 className='text-3xl mt-2 mb-4 font-semibold'>{name}</h1>

            <div className='flex flex-col items-center mb-5'>
                <h2 className='text-5xl font-semibold'>${price}</h2>
                <p className='text-sm text-muted-foreground mb-5'>MXN al mes</p>
                <ArrowButton text='Comenzar' className='w-full py-3 bg-gradient-to-r from-orange-400 to-orange-600' />
            </div>

            <h3 className='mb-2 text-muted-foreground'> Este plan incluye: </h3>
            <ul className='space-y-2 flex flex-col w-full'>
                {/* Map through the features array to render each feature as a list item */}
                {features.map((text, index) => (
                    <li key={index} className='flex items-start gap-2'>
                        <BadgeCheck className="text-orange-600 min-w-2 h-6 mt-0.5" />
                        <span className='flex-1 text-muted-foreground'>{text}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CardSubscription;