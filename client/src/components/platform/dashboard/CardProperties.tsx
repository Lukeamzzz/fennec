import { LandPlot } from 'lucide-react';

interface CardPropertiesProps {
    title: string;
    amount: number;
    error?: string | null;
}

const CardProperties = ({ title, amount , error = null,}: CardPropertiesProps) => {

    return(
        <div  className="rounded-md border-none text-center shadow-md m-5 p-2">
            <div className="p-4 space-y-2">
                <div className="text-sm font-medium text-neutral-700 flex justify-center items-center gap-1">
                    {title}
                    <LandPlot className="size-4 text-orange-500"/>
                </div>
                <div className="text-3xl font-bold text-neutral-900">
                    {error ? (
                        <span className="text-red-600 text-sm">Error</span>
                    ) : (
                        amount.toLocaleString("en-US")
                    )}
                </div>
            </div>
        </div>
    )
}
export default CardProperties;