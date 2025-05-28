import {Calendar, TrendingUp} from 'lucide-react';
import * as React from "react";

function InvestmentForecast({
                                               valuation3Years, valuation5Years, growthRate,
                                               roiMonthly
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
            <div className="flex items-center space-x-1">
                <p className="font-semibold">ROI</p>
                <p className="text-green-600 flex items-center">
                    {roiMonthly}%
                    <TrendingUp size={15} className="ml-1"/>
                </p>
            </div>

        </div>
    );
}

export default InvestmentForecast;