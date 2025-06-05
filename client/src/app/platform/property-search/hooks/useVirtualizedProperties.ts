import { useState, useMemo } from 'react';

interface Property {
  id: number;
  imageUrl: string;
  propertyType: string;
  title: string;
  price: number;
  address: string;
  description: string;
  beds: number;
  baths: number;
  area: number;
  [key: string]: any;
}

interface UseVirtualizedPropertiesProps {
  properties: Property[];
  itemsPerPage?: number;
}

interface UseVirtualizedPropertiesReturn {
  currentProperties: Property[];
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  loadNextPage: () => void;
  loadPreviousPage: () => void;
  goToPage: (page: number) => void;
  isLoading: boolean;
}

export const useVirtualizedProperties = ({
  properties,
  itemsPerPage = 12
}: UseVirtualizedPropertiesProps): UseVirtualizedPropertiesReturn => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const totalPages = Math.ceil(properties.length / itemsPerPage);

  const currentProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return properties.slice(startIndex, endIndex);
  }, [properties, currentPage, itemsPerPage]);

  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  const loadNextPage = async () => {
    if (hasNextPage && !isLoading) {
      setIsLoading(true);
      // Simular un pequeño delay para UX suave
      await new Promise(resolve => setTimeout(resolve, 300));
      setCurrentPage(prev => prev + 1);
      setIsLoading(false);
      
      // Scroll suave al inicio de la nueva página
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const loadPreviousPage = async () => {
    if (hasPreviousPage && !isLoading) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      setCurrentPage(prev => prev - 1);
      setIsLoading(false);
      
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const goToPage = async (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage && !isLoading) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      setCurrentPage(page);
      setIsLoading(false);
      
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return {
    currentProperties,
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    loadNextPage,
    loadPreviousPage,
    goToPage,
    isLoading
  };
}; 