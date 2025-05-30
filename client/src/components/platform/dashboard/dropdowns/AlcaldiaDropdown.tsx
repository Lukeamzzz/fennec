import React from "react";

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

interface Props {
  value: string;
  onChange: (value: string) => void;
}

function AlcaldiaDropdown({ value, onChange }: Props) {
  return (
    <div>
      <h3 className="block text-sm font-medium text-gray-700">Alcaldía</h3>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
