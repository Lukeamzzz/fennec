import React from "react";
import { HousePlus } from "lucide-react";

interface EmptyPortfolioInviteProps {
  onAddProperty: () => void;
}

const EmptyPortfolioInvite: React.FC<EmptyPortfolioInviteProps> = ({
  onAddProperty,
}) => (
  <div className="flex flex-1 flex-col items-center justify-center min-h-[350px] h-full w-full text-center">
    <HousePlus
      size={64}
      className="mb-4 text-orange-400 mx-auto"
      strokeWidth={1.5}
    />
    <h2 className="text-xl font-bold text-gray-800 mb-2">
      ¡Aún no tienes propiedades registradas!
    </h2>
    <p className="text-gray-500 mb-6 max-w-xs mx-auto">
      Empieza a construir tu portafolio de inversión añadiendo tu primera
      propiedad.
    </p>
    <button
      onClick={onAddProperty}
      className="flex items-center justify-center px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow transition-colors mx-auto"
    >
      <HousePlus size={20} className="mr-2" strokeWidth={2} />
      Añadir Propiedad
    </button>
  </div>
);

export default EmptyPortfolioInvite;
