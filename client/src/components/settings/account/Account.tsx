import * as React from "react";

function Account({ onDeleteClick }: { onDeleteClick: () => void }) {
  return (
    <div>
      <h2 className="text-xl font-medium text-center mb-2 text-red-500">
        Eliminar Cuenta
      </h2>
      <p className="text-red-500 text-center text-sm mb-6">
        Eliminar tu cuenta es una acción permanente y no puede deshacerse.
      </p>
      <p className="text-gray-500 text-center text-sm mb-6">
        Se eliminarán todos tus datos, incluyendo perfil, configuraciones y
        actividades.
      </p>
      <div className="flex justify-center">
        <button
          onClick={onDeleteClick}
          className="px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          Eliminar Cuenta
        </button>
      </div>
    </div>
  );
}

export default Account;
