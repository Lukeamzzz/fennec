import { ArrowUpRight, ArrowDownRight, ChartNoAxesColumn } from 'lucide-react';
import clsx from 'clsx';

interface CardValuationData {
    title: string;
    amount: number;
    change: number
    loading?: boolean;
    error?: string | null;
}


const CardMarketGrowth = ({ title, amount, change, loading = false, error = null }: CardValuationData) => {
    const isPositive = change > 0

    return(
        <div  className="rounded-md border-none text-center shadow-md m-5">
            <div className="p-4 space-y-2">
                <div className="text-sm font-medium text-neutral-700 flex justify-center items-center gap-1">
                    {title}
                    <ChartNoAxesColumn className='size-4 text-orange-500'/>
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
                <div
                    className={clsx(
                        'text-sm flex justify-center items-center gap-1',
                        isPositive ? 'text-green-600' : 'text-red-500'
                    )}
                >
                    {isPositive ? <ArrowUpRight className="w-4 h-4"/> : <ArrowDownRight className="w-4 h-4"/>}
                    <span className="font-medium">{`${Math.abs(change).toFixed(1)}%`}</span>
                    <span className="text-muted-foreground">Respecto a toda CDMX</span>
                </div>
            </div>
        </div>
    )

}

export default CardMarketGrowth