import React from "react";

interface Investment {
  type: string;
  units: number;
  value: number;
  percentYield: number;
}

interface AllInvestmentsSheetProps {
  open: boolean;
  onClose: () => void;
  investments: Investment[];
}

const AllInvestmentsSheet: React.FC<AllInvestmentsSheetProps> = ({
  open,
  onClose,
  investments,
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white rounded-t-2xl shadow-2xl pb-4 pt-2 px-4 animate-slideUp relative max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between py-2 border-b mb-2">
          <h3 className="text-lg font-semibold text-gray-800">
            Todas las Inversiones
          </h3>
          <button
            className="text-gray-400 hover:text-gray-700 p-1 rounded-full"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {/* Lista de inversiones */}
        <div className="divide-y divide-gray-100">
          {investments.length === 0 && (
            <div className="py-8 text-center text-gray-400">
              No hay inversiones registradas.
            </div>
          )}
          {investments.map((property, index) => (
            <div key={index} className="flex justify-between items-center py-4">
              <div>
                <span className="font-medium text-gray-800">
                  {property.type}
                </span>
                <span className="text-gray-500 ml-2 text-sm">
                  {property.units === 1
                    ? `${property.units} unidad`
                    : `${property.units} unidades`}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-4 text-blue-700">
                  ${property.value.toLocaleString("en-US")}M
                </span>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    Number(property.percentYield) >= 7
                      ? "bg-green-100 text-green-800"
                      : Number(property.percentYield) >= 6
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {property.percentYield}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .animate-slideUp {
          animation: slideUpSheet 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes slideUpSheet {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AllInvestmentsSheet;
