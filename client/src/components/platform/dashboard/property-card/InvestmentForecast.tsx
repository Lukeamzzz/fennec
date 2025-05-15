import {AlarmClock, Calendar, CirclePercent, DollarSign, TrendingUp} from 'lucide-react';

function InvestmentForecast({
                                               valuation3Years, valuation5Years, growthRate,
                                               roiMonthly, breakevenYears, occupancyRate
                                           }) {
    return (
        <div className="px-6 py-4 border-t grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h4 className="font-medium text-gray-700 mb-2">Valoración Futura</h4>
                <ul className="space-y-1 text-gray-600">
                    <div className="flex">
                        <Calendar className="pr-1"/>  <li >En 3 años: <span className="font-semibold">${valuation3Years.toLocaleString()}</span></li>
                    </div>

                    <div className="flex">
                        <Calendar
                            className="pr-1"/> <li>En 5 años: <span className="font-semibold"> ${valuation5Years.toLocaleString()}</span></li>
                    </div>

                    <div className="flex">
                        <TrendingUp
                            className="pr-1"/>
                        <li>Crecimiento del área: <span className="font-semibold"> {growthRate}% anual</span></li>
                    </div>


                </ul>
            </div>
            <div>
                <h4 className="font-medium text-gray-700 mb-2">Retorno de Inversión</h4>
                <ul className="space-y-1 text-gray-600">
                    <div className="flex">
                        <DollarSign
                            className="pr-1"/>
                        <li>Ingreso por renta: <span className="font-semibold"> ${roiMonthly.toLocaleString()} mensuales</span></li>
                    </div>

                    <div className="flex">
                        <AlarmClock className="pr-1"/>
                        <li>Punto de equilibrio: <span className="font-semibold">{breakevenYears} años</span></li>
                    </div>

                    <div className="flex">
                        <CirclePercent/>
                        <li>Tasa de ocupación: <span className="font-semibold">{occupancyRate}%</span></li>
                    </div>


                </ul>
            </div>
        </div>
    );
}

export default InvestmentForecast;