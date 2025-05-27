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

const AlcaldiaDropdown = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border rounded-md bg-white"
    >
      <option value="">Selecciona una alcaldía</option>
      {alcaldias.map((a) => (
        <option key={a} value={a}>{a}</option>
      ))}
    </select>
  );
};

export default AlcaldiaDropdown;
