import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
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
                    <span className="text-orange-500"><svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                           viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                                           className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round"
        d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"/>
</svg>
</span>
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