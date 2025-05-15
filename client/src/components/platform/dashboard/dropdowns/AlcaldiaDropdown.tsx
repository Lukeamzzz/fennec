import React, { useState } from "react";

const alcaldias = [
    "Álvaro Obregón",
    "Azcapotzalco",
    "Benito Juárez",
    "Coyoacán",
    "Cuajimalpa de Morelos",
    "Cuauhtémoc",
    "Gustavo A. Madero",
    "Iztacalco",
    "Iztapalapa",
    "La Magdalena Contreras",
    "Miguel Hidalgo",
    "Milpa Alta",
    "Tláhuac",
    "Tlalpan",
    "Venustiano Carranza",
    "Xochimilco",
];

function AlcaldiaDropdown() {
    const [selectedAlcaldia, setSelectedAlcaldia] = useState(alcaldias[0]);

    return (
        <div>
            <h3>Alcaldía</h3>
            <select
                value={selectedAlcaldia}
                onChange={(e) => setSelectedAlcaldia(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
            >
                {alcaldias.map((alc) => (
                    <option key={alc} value={alc}>
                        {alc}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default AlcaldiaDropdown;