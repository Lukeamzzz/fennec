import React from 'react';

interface PaginationInfoProps {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  itemsPerPage: number;
  isLoading?: boolean;
}

const PaginationInfo: React.FC<PaginationInfoProps> = ({
  currentPage,
  totalPages,
  totalResults,
  itemsPerPage,
  isLoading = false
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalResults);

  if (totalResults === 0) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-4 px-6 bg-white rounded-lg shadow-sm border">
      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-600">
          {isLoading ? (
            <span className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500 mr-2"></div>
              Cargando resultados...
            </span>
          ) : (
            <>
              Mostrando <span className="font-medium text-gray-900">{startItem}</span> a{' '}
              <span className="font-medium text-gray-900">{endItem}</span> de{' '}
              <span className="font-medium text-gray-900">{totalResults}</span> propiedades
            </>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-500">
          Página {currentPage} de {totalPages}
        </div>
        
        {totalPages > 1 && (
          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }
              
              return (
                <div
                  key={pageNumber}
                  className={`w-2 h-2 rounded-full ${
                    pageNumber === currentPage
                      ? 'bg-orange-500'
                      : 'bg-gray-300'
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaginationInfo; 