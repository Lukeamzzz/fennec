import React from "react";

function Account({ onDeleteClick }: { onDeleteClick: () => void }) {
  return (
    <div>
      <h2 className="text-xl font-medium text-center mt-10 mb-5">
      Eliminar tu cuenta es una acción permanente y no puede deshacerse.
      </h2>
      <p className="text-gray-500 text-center text-sm mb-5">
        Se eliminarán todos tus datos, incluyendo perfil, configuraciones y
        actividades.
      </p>
      <div className="flex justify-center">
        <button
          onClick={onDeleteClick}
          className="px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          Eliminar Cuenta
        </button>
      </div>
    </div>
  );
}

export default Account;
