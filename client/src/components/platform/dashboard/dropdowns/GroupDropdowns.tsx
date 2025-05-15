import React, { useState } from "react";

const tiposPropiedad = ["Casa", "Departamento", "Terreno"];
const habitaciones = ["1", "2", "3", "4+"];
const bathrooms = ["1", "2", "3", "4+"];

function GroupDropdowns() {
    const [selectedTipo, setSelectedTipo] = useState(tiposPropiedad[0]);
    const [selectedHabitacion, setSelectedHabitacion] = useState(habitaciones[0]);
    const [selectedBathrooms, setSelectedBathrooms] = useState(bathrooms[0]);

    return (
        <div className="flex justify-between mb-3 items-center">
            <div>
                <h3>Tipo de propiedad</h3>
                <select
                    value={selectedTipo}
                    onChange={(e) => setSelectedTipo(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
                >
                    {tiposPropiedad.map((tipo) => (
                        <option key={tipo} value={tipo}>
                            {tipo}
                        </option>
                    ))}
                </select>
            </div>

            {selectedTipo !== "Terreno" && (
                <div className="space-y-4">
                    <div>
                        <h3>Número de habitaciones</h3>
                        <select
                            value={selectedHabitacion}
                            onChange={(e) => setSelectedHabitacion(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
                        >
                            {habitaciones.map((h) => (
                                <option key={h} value={h}>
                                    {h}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <h3>Número de baños</h3>
                        <select
                            value={selectedBathrooms}
                            onChange={(e) => setSelectedBathrooms(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
                        >
                            {bathrooms.map((b) => (
                                <option key={b} value={b}>
                                    {b}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GroupDropdowns;