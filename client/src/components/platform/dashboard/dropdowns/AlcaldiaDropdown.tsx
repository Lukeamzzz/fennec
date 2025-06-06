import React, { useState } from "react";

const getAlcaldias = (enableMilpaAlta: boolean = false) => [
  { name: "Álvaro Obregón", enabled: true },
  { name: "Azcapotzalco", enabled: true },
  { name: "Benito Juárez", enabled: true },
  { name: "Coyoacán", enabled: true },
  { name: "Cuajimalpa de Morelos", enabled: true },
  { name: "Cuauhtémoc", enabled: true },
  { name: "Gustavo A. Madero", enabled: true },
  { name: "Iztacalco", enabled: true },
  { name: "Iztapalapa", enabled: true },
  { name: "La Magdalena Contreras", enabled: true },
  { name: "Miguel Hidalgo", enabled: true },
  { name: "Milpa Alta", enabled: enableMilpaAlta },
  { name: "Tláhuac", enabled: true },
  { name: "Tlalpan", enabled: true },
  { name: "Venustiano Carranza", enabled: true },
  { name: "Xochimilco", enabled: true },
];

interface Props {
  value: string;
  onChange: (value: string) => void;
  showLabel?: boolean;
  className?: string;
  enableMilpaAlta?: boolean;
}

function AlcaldiaDropdown({
  value,
  onChange,
  showLabel = true,
  className,
  enableMilpaAlta = false,
}: Props) {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const alcaldias = getAlcaldias(enableMilpaAlta);
  const defaultClassName =
    "w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white";
  const selectClassName = className || defaultClassName;

  const handleMouseEnter = (e: React.MouseEvent, alcaldia: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({ x: rect.left + rect.width / 2, y: rect.top - 10 });
    setHoveredOption(alcaldia);
  };

  const handleMouseLeave = () => {
    setHoveredOption(null);
  };

  return (
    <div className="relative">
      {showLabel && (
        <h3 className="block text-sm font-medium text-gray-700">Alcaldía</h3>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={selectClassName}
      >
        {alcaldias.map((alc) => (
          <option
            key={alc.name}
            value={alc.name}
            disabled={!alc.enabled}
            style={{
              color: alc.enabled ? "inherit" : "#9CA3AF",
              cursor: alc.enabled ? "pointer" : "not-allowed",
            }}
            onMouseEnter={(e) => !alc.enabled && handleMouseEnter(e, alc.name)}
            onMouseLeave={handleMouseLeave}
          >
            {alc.name}
            {!alc.enabled ? " (No disponible)" : ""}
          </option>
        ))}
      </select>

      {/* Tooltip */}
      {hoveredOption === "Milpa Alta" && !enableMilpaAlta && (
        <div
          className="absolute z-50 px-3 py-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: "translateX(-50%)",
          }}
        >
          Hay muy pocos datos sobre esta alcaldía
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </div>
  );
}

export default AlcaldiaDropdown;
