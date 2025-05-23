import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS, CategoryScale, LinearScale,
    PointElement, LineElement, Tooltip, Legend, Filler
} from 'chart.js';
import { ChartNoAxesCombined } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler); // Asegúrate de registrar Filler

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export default function PriceChart({ previousPrices }) {
    const months = ['Ene', 'Jul', 'Ene', 'Jul'];

    const data = {
        labels: months,
        datasets: [
            {
                data: previousPrices,
                tension: 0.4,
                borderWidth: 2,
                borderColor: 'orange',
                backgroundColor: 'rgba(255,117,56,.5)', // color naranja con transparencia
                fill: true, // aquí se activa el relleno
            }
        ]
    };

    const options = {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: false
            }
        },
        maintainAspectRatio: false
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
