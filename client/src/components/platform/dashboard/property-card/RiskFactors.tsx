export default function RiskFactors({ riskFactors }) {
    return (
        <div className="px-6 py-4 border-t">
            <h4 className="font-medium text-gray-700 mb-2">Factores de Riesgo</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
                {riskFactors.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
        </div>
    );
}
