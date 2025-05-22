import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS, CategoryScale, LinearScale,
    PointElement, LineElement, Tooltip, Legend
} from 'chart.js';
import { ChartNoAxesCombined } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function PriceChart({ previousPrices }) {
    const months = ['Ene', 'Jul', 'Ene', 'Jul'];
    const data = {
        labels: months,
        datasets: [
            {
                data: previousPrices,

                tension: 0.4,
                borderWidth: 2
            }
        ]
    };
    const options = {
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: false } },
        maintainAspectRatio: false,
        fill:true,
        backgroundColor: "orange",
        borderColor: "orange",
    };

    return (
        <div className="px-6 py-4 border-t">
            <div className="flex">
                <ChartNoAxesCombined className="pr-2" />
                <h3 className="font-medium text-gray-700 mb-2">Valor de la Propiedad a Través del Tiempo</h3>
            </div>

            <div className="w-full h-48">
                <Line data={data} options={options} />
            </div>
        </div>
    );
}
