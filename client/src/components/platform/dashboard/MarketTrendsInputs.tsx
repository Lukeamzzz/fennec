function MarketTrendsInputs() {
    const alcaldiasCDMX = [
        "Álvaro Obregón", "Azcapotzalco", "Benito Juárez", "Coyoacán", "Cuajimalpa de Morelos",
        "Cuauhtémoc", "Gustavo A. Madero", "Iztacalco", "Iztapalapa", "La Magdalena Contreras",
        "Miguel Hidalgo", "Milpa Alta", "Tláhuac", "Tlalpan", "Venustiano Carranza", "Xochimilco"
    ];

    return (
        <div className="space-y-4 p-4 bg-white rounded-2xl max-w-md">
            <div className="flex flex-col">
                <label htmlFor="alcaldia_1" className="mb-1 text-sm font-medium text-gray-700">Alcaldía 1</label>
                <select
                    id="alcaldia_1"
                    name="alcaldia_1"
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {alcaldiasCDMX.map((alcaldia) => (
                        <option key={alcaldia} value={alcaldia}>{alcaldia}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col">
                <label htmlFor="alcaldia_2" className="mb-1 text-sm font-medium text-gray-700">Alcaldía 2</label>
                <select
                    id="alcaldia_2"
                    name="alcaldia_2"
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {alcaldiasCDMX.map((alcaldia) => (
                        <option key={alcaldia} value={alcaldia}>{alcaldia}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default MarketTrendsInputs;
