import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import clsx from 'clsx';

interface CardValuationData {
    title: string;
    amount: number;
    change: number;
}

const CardValuationData = ({ title, amount, change }: CardValuationData) => {
    const isPositive = change > 0;

    console.log('DEBUG - Valor recibido en amount:', amount, 'Tipo:', typeof amount);

    const isValidNumber = typeof amount === "number" && !isNaN(amount);

    const formattedAmount = isValidNumber
        ? amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'MXN',
            maximumFractionDigits: 0
        })
        : "Cargando...";

    return (
        <div className="border-none text-center shadow-md m-5 rounded-md">
            <div className="p-4 space-y-2">
                <div className="text-sm font-medium text-neutral-700 flex justify-center items-center gap-1">
                    {title}
                    <span className="text-orange-500">$</span>
                </div>
                <div className="text-3xl font-bold text-neutral-900">
                    {formattedAmount}
                </div>
                <div
                    className={clsx(
                        'text-sm flex justify-center items-center gap-1',
                        isPositive ? 'text-green-600' : 'text-red-500'
                    )}
                >
                    {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    <span className="font-medium">{`${Math.abs(change).toFixed(1)}%`}</span>
                    <span className="text-muted-foreground">Respecto a toda CDMX</span>
                </div>
            </div>
        </div>
    );
};

export default CardValuationData;
