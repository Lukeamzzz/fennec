interface Props {
    input: {
        tipo: string;
        recamaras: number;
        banos: number;
        estacionamientos: number;
    };
    onChange: (key: string, value: string | number) => void;
}

const GroupDropdowns = ({ input, onChange }: Props) => {
    const tiposPropiedad = ["Casa", "Departamento"];
    const habitaciones = ["1", "2", "3", "4"];
    const bathrooms = ["1", "2", "3", "4"];
    const parking = ["1", "2", "3", "4"];

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de propiedad
                </label>
                <select
                    value={input.tipo}
                    onChange={(e) => onChange("tipo", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
                >
                    {tiposPropiedad.map((tipo) => (
                        <option key={tipo} value={tipo}>
                            {tipo}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Habitaciones</label>
                    <select
                        value={input.recamaras}
                        onChange={(e) => onChange("recamaras", parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
                    >
                        {habitaciones.map((h) => (
                            <option key={h} value={h}>
                                {h}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Baños</label>
                    <select
                        value={input.banos}
                        onChange={(e) => onChange("banos", parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
                    >
                        {bathrooms.map((b) => (
                            <option key={b} value={b}>
                                {b}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estacionamientos</label>
                    <select
                        value={input.estacionamientos}
                        onChange={(e) => onChange("estacionamientos", parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
                    >
                        {parking.map((p) => (
                            <option key={p} value={p}>
                                {p}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default GroupDropdowns;
