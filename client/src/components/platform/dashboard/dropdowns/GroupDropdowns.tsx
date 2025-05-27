import React, { useState } from "react";

const tiposPropiedad = ["Casa", "Departamento", "Terreno"];
const habitaciones = ["1", "2", "3", "4+"];
const bathrooms = ["1", "2", "3", "4+"];
const parking = ["1", "2", "3", "4+"];
function GroupDropdowns() {
    const [selectedTipo, setSelectedTipo] = useState(tiposPropiedad[0]);
    const [selectedHabitacion, setSelectedHabitacion] = useState(habitaciones[0]);
    const [selectedBathrooms, setSelectedBathrooms] = useState(bathrooms[0]);
    const [selectedParking, setSelectedParking] = useState(parking[0]);

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de propiedad</label>
                <select
                    value={selectedTipo}
                    onChange={(e) => setSelectedTipo(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                    {tiposPropiedad.map((tipo) => (
                        <option key={tipo} value={tipo}>{tipo}</option>
                    ))}
                </select>
            </div>

            {selectedTipo !== "Terreno" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Habitaciones</label>
                        <select
                            value={selectedHabitacion}
                            onChange={(e) => setSelectedHabitacion(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            {habitaciones.map((h) => (
                                <option key={h} value={h}>{h}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Estacionamientos</label>
                        <select
                            value={selectedParking}
                            onChange={(e) => setSelectedParking(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            {parking.map((p) => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Baños</label>
                        <select
                            value={selectedBathrooms}
                            onChange={(e) => setSelectedBathrooms(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            {bathrooms.map((b) => (
                                <option key={b} value={b}>{b}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
}
 export default GroupDropdowns;