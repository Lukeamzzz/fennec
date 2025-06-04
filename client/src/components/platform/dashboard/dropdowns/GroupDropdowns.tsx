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
                    <input
                        type="number"
                        min="1"
                        value={input.recamaras}
                        onChange={(e) => onChange("recamaras", parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Baños</label>
                    <input
                        type="number"
                        min="1"
                        value={input.banos}
                        onChange={(e) => onChange("banos", parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estacionamientos</label>
                    <input
                        type="number"
                        min="1"
                        value={input.estacionamientos}
                        onChange={(e) => onChange("estacionamientos", parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
                    />
                </div>
            </div>
        </div>
    );
};

export default GroupDropdowns;
