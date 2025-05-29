import { ArrowUpRight, ArrowDownRight, LandPlot } from 'lucide-react';
import clsx from 'clsx';

interface CardPropertiesProps {
    title: string;
    amount: number;
    loading?: boolean;
    error?: string | null;
}

const CardProperties = ({ title, amount ,loading = false, error = null,}: CardPropertiesProps) => {

    return(
        <div  className="rounded-md border-none text-center shadow-md m-5 p-2">
            <div className="p-4 space-y-2">
                <div className="text-sm font-medium text-neutral-700 flex justify-center items-center gap-1">
                    {title}
                    <LandPlot className="size-4 text-orange-500"/>
                </div>
                <div className="text-3xl font-bold text-neutral-900">
                    {loading ? (
                        <p>loading</p>
                    ) : error ? (
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