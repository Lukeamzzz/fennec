import { useState } from 'react';

interface SearchFilters {
  location: string;
  propertyType: string;
  priceRange: [number, number];
  bedrooms: string;
  bathrooms: string;
  minSize: number;
  maxSize: number;
}

interface ApiFilters {
  tipoPropiedad: string;
  pagina: number;
  limite: number;
  precioMin: number;
  precioMax: number;
  dimensionesMin: number;
  dimensionesMax: number;
  alcaldia?: string;
  habitaciones?: number;
  banos?: number;
}

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
  year?: number;
  amenities?: Array<{ name: string; icon: string }>;
  images?: string[];
  latitude?: number;
  longitude?: number;
  alcaldia?: string;
  colonia?: string;
  estacionamientos?: number;
  precioPorM2?: number;
  banosPorHabitacion?: number;
  habitacionesTotales?: number;
}

interface UsePropertySearchReturn {
  searchResults: Property[];
  isLoading: boolean;
  hasSearched: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalResults: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  handleSearch: (filters: SearchFilters) => Promise<void>;
  handleSearchByArea: (alcaldia: string) => Promise<void>;
  loadNextPage: () => Promise<void>;
  loadPreviousPage: () => Promise<void>;
  goToPage: (page: number) => Promise<void>;
  resetSearch: () => void;
}

// Datos de ejemplo para fallback
const generateMockProperties = (alcaldia: string, page: number, itemsPerPage: number): Property[] => {
  const baseProperties = [
    {
      id: (page - 1) * itemsPerPage + 1,
      imageUrl: '/images/foto_dummy_propiedad.jpg',
      propertyType: 'Departamento',
      title: `Departamento Moderno en ${alcaldia}`,
      price: 450000 + Math.floor(Math.random() * 300000),
      address: `Calle Principal 123, ${alcaldia}`,
      description: `Hermoso departamento ubicado en ${alcaldia} con excelentes amenidades y ubicación privilegiada.`,
      beds: Math.floor(Math.random() * 3) + 1,
      baths: Math.floor(Math.random() * 2) + 1,
      area: 80 + Math.floor(Math.random() * 120),
      year: 2018 + Math.floor(Math.random() * 6),
      amenities: [
        { name: 'Gimnasio', icon: '💪' },
        { name: 'Seguridad 24/7', icon: '👮‍♂️' },
        { name: 'Estacionamiento', icon: '🚗' }
      ],
      images: ['/images/foto_dummy_propiedad.jpg'],
      latitude: 19.4326 + (Math.random() - 0.5) * 0.1,
      longitude: -99.1332 + (Math.random() - 0.5) * 0.1,
      alcaldia: alcaldia
    },
    {
      id: (page - 1) * itemsPerPage + 2,
      imageUrl: '/images/foto_dummy_propiedad.jpg',
      propertyType: 'Casa',
      title: `Casa Familiar en ${alcaldia}`,
      price: 650000 + Math.floor(Math.random() * 400000),
      address: `Avenida Central 456, ${alcaldia}`,
      description: `Espaciosa casa familiar en ${alcaldia}, perfecta para familias que buscan comodidad y tranquilidad.`,
      beds: Math.floor(Math.random() * 3) + 2,
      baths: Math.floor(Math.random() * 2) + 2,
      area: 120 + Math.floor(Math.random() * 180),
      year: 2015 + Math.floor(Math.random() * 9),
      amenities: [
        { name: 'Jardín', icon: '��' },
        { name: 'Garage', icon: '🚗' },
        { name: 'Terraza', icon: '🏡' }
      ],
      images: ['/images/foto_dummy_propiedad.jpg'],
      latitude: 19.4326 + (Math.random() - 0.5) * 0.1,
      longitude: -99.1332 + (Math.random() - 0.5) * 0.1,
      alcaldia: alcaldia
    }
  ];

  // Generar más propiedades para llenar la página
  const properties = [];
  for (let i = 0; i < itemsPerPage; i++) {
    const baseIndex = i % baseProperties.length;
    const property = { ...baseProperties[baseIndex] };
    property.id = (page - 1) * itemsPerPage + i + 1;
    property.title = `${property.propertyType} ${i + 1} en ${alcaldia}`;
    property.price = property.price + (i * 10000);
    properties.push(property);
  }

  return properties;
};

export const usePropertySearch = (): UsePropertySearchReturn => {
  const [searchResults, setSearchResults] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentFilters, setCurrentFilters] = useState<SearchFilters | null>(null);
  const [currentAlcaldia, setCurrentAlcaldia] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [itemsPerPage] = useState(12);

  // Función para mapear datos del API a la estructura esperada
  const mapApiDataToProperty = (apiData: any, index: number): Property => {
    // Crear un título más descriptivo
    const title = apiData.title || apiData.titulo || 
      `${apiData.propertyType || apiData.tipoPropiedad || 'Casa'} en ${apiData.colonia || apiData.alcaldia || 'Ubicación Privilegiada'}`;
    
    // Crear una dirección más completa - manejar valores undefined
    let fullAddress = apiData.address || apiData.direccion || '';
    if (apiData.colonia) {
      fullAddress += fullAddress ? `, ${apiData.colonia}` : apiData.colonia;
    }
    if (apiData.alcaldia) {
      fullAddress += fullAddress ? `, ${apiData.alcaldia}` : apiData.alcaldia;
    }
    if (!fullAddress) {
      fullAddress = 'Dirección no disponible';
    }

    return {
      id: apiData.id || index + 1,
      imageUrl: apiData.imageUrl || apiData.imagen || '/images/foto_dummy_propiedad.jpg',
      propertyType: apiData.propertyType || apiData.tipoPropiedad || 'Casa',
      title: title,
      price: apiData.price || apiData.precio || 0,
      address: fullAddress,
      description: apiData.description || apiData.descripcion || 'Descripción no disponible',
      beds: apiData.beds || apiData.recamaras || apiData.habitaciones || 0,
      baths: apiData.baths || apiData.banos || 0,
      area: apiData.area || apiData.dimensionesM2 || apiData.dimensiones || 0,
      year: apiData.year || apiData.año || apiData.construccion,
      amenities: apiData.amenities || apiData.amenidades || [
        ...(apiData.estacionamientos ? [{ name: `${apiData.estacionamientos} Estacionamientos`, icon: '🚗' }] : []),
        ...(apiData.habitacionesTotales ? [{ name: `${apiData.habitacionesTotales} Habitaciones Totales`, icon: '🏠' }] : []),
        ...(apiData.precioPorM2 ? [{ name: `$${Math.round(apiData.precioPorM2).toLocaleString()}/m²`, icon: '💰' }] : [])
      ],
      images: apiData.images || apiData.imagenes || ['/images/foto_dummy_propiedad.jpg'],
      latitude: apiData.latitude || apiData.lat || apiData.latitud,
      longitude: apiData.longitude || apiData.lng || apiData.longitud,
      // Campos adicionales específicos del API
      alcaldia: apiData.alcaldia,
      colonia: apiData.colonia,
      estacionamientos: apiData.estacionamientos,
      precioPorM2: apiData.precioPorM2,
      banosPorHabitacion: apiData.banosPorHabitacion,
      habitacionesTotales: apiData.habitacionesTotales
    };
  };

  const mapFiltersToApi = (filters: SearchFilters, page: number = 1): ApiFilters => {
    const apiFilters: ApiFilters = {
      tipoPropiedad: filters.propertyType.toLowerCase() || 'casa',
      pagina: page,
      limite: itemsPerPage,
      precioMin: filters.priceRange[0],
      precioMax: filters.priceRange[1],
      dimensionesMin: filters.minSize,
      dimensionesMax: filters.maxSize
    };

    // Solo incluir alcaldía si está especificada
    if (filters.location && filters.location.trim() !== '') {
      apiFilters.alcaldia = filters.location;
    }

    // Solo incluir habitaciones si no es "Cualquier"
    if (filters.bedrooms !== 'Cualquier') {
      if (filters.bedrooms === '8+') {
        apiFilters.habitaciones = 8;
      } else {
        apiFilters.habitaciones = parseInt(filters.bedrooms);
      }
    }

    // Solo incluir baños si no es "Cualquier"
    if (filters.bathrooms !== 'Cualquier') {
      if (filters.bathrooms === '8+') {
        apiFilters.banos = 8;
      } else {
        apiFilters.banos = parseInt(filters.bathrooms);
      }
    }

    return apiFilters;
  };

  const performSearch = async (filters: SearchFilters, page: number = 1) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Enviando filtros a la API:', filters);
      console.log('Página solicitada:', page);
      
      const apiFilters = mapFiltersToApi(filters, page);
      console.log('Filtros mapeados para API:', apiFilters);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos timeout
      
      const response = await fetch('http://localhost:8080/propiedades/filtrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiFilters),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Respuesta del API:', data);

      // Mapear los datos recibidos usando la estructura real del API
      const mappedProperties = Array.isArray(data.propiedades) 
        ? data.propiedades.map((item: any, index: number) => mapApiDataToProperty(item, (page - 1) * itemsPerPage + index))
        : [];

      console.log('Propiedades mapeadas:', mappedProperties);

      setSearchResults(mappedProperties);
      setCurrentPage(data.paginaActual || page);
      
      // Usar los datos de paginación del servidor
      setTotalResults(data.totalResultados || mappedProperties.length);
      setTotalPages(data.totalPaginas || Math.ceil((data.totalResultados || mappedProperties.length) / itemsPerPage));
      
      setHasSearched(true);
    } catch (err) {
      console.error('Error en la búsqueda:', err);
      
      // Determinar el tipo de error
      let errorMessage = 'Error desconocido';
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          errorMessage = 'Tiempo de espera agotado. El servidor no responde.';
        } else if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
          errorMessage = 'No se puede conectar al servidor. Usando datos de ejemplo.';
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
      
      // Generar datos de ejemplo como fallback
      const mockProperties = generateMockProperties(filters.location || 'Ciudad de México', page, itemsPerPage);
      setSearchResults(mockProperties);
      setCurrentPage(page);
      setTotalResults(60); // Simular 60 propiedades totales (5 páginas)
      setTotalPages(Math.ceil(60 / itemsPerPage));
      setHasSearched(true);
    } finally {
      setIsLoading(false);
    }
  };

  const performSearchByArea = async (alcaldia: string, page: number = 1) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Buscando por alcaldía:', alcaldia);
      console.log('Página solicitada:', page);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos timeout
      
      // Buscar casas
      const casasRequestBody = { 
        tipoPropiedad: 'casa',
        alcaldia: alcaldia,
        pagina: page,
        limite: Math.ceil(itemsPerPage / 2) // Dividir el límite entre casas y departamentos
      };
      
      // Buscar departamentos
      const departamentosRequestBody = { 
        tipoPropiedad: 'departamento',
        alcaldia: alcaldia,
        pagina: page,
        limite: Math.ceil(itemsPerPage / 2)
      };
      
      console.log('Enviando búsqueda de casas:', casasRequestBody);
      console.log('Enviando búsqueda de departamentos:', departamentosRequestBody);
      
      // Hacer ambas búsquedas en paralelo
      const [casasResponse, departamentosResponse] = await Promise.all([
        fetch('http://localhost:8080/propiedades/filtrar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(casasRequestBody),
          signal: controller.signal
        }),
        fetch('http://localhost:8080/propiedades/filtrar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(departamentosRequestBody),
          signal: controller.signal
        })
      ]);

      clearTimeout(timeoutId);

      if (!casasResponse.ok || !departamentosResponse.ok) {
        throw new Error(`Error en la búsqueda: ${casasResponse.status} / ${departamentosResponse.status}`);
      }

      const [casasData, departamentosData] = await Promise.all([
        casasResponse.json(),
        departamentosResponse.json()
      ]);
      
      console.log('Respuesta de casas:', casasData);
      console.log('Respuesta de departamentos:', departamentosData);

      // Combinar las propiedades de ambas búsquedas
      const casasPropiedades = Array.isArray(casasData.propiedades) ? casasData.propiedades : [];
      const departamentosPropiedades = Array.isArray(departamentosData.propiedades) ? departamentosData.propiedades : [];
      
      const todasLasPropiedades = [...casasPropiedades, ...departamentosPropiedades];
      
      // Limitar al número de elementos por página
      const propiedadesLimitadas = todasLasPropiedades.slice(0, itemsPerPage);

      const mappedProperties = propiedadesLimitadas.map((item: any, index: number) => 
        mapApiDataToProperty(item, (page - 1) * itemsPerPage + index)
      );

      console.log('Propiedades combinadas y mapeadas:', mappedProperties);

      // Calcular totales combinados
      const totalCasas = casasData.totalResultados || 0;
      const totalDepartamentos = departamentosData.totalResultados || 0;
      const totalCombinado = totalCasas + totalDepartamentos;

      setSearchResults(mappedProperties);
      setCurrentPage(page);
      setTotalResults(totalCombinado);
      setTotalPages(Math.ceil(totalCombinado / itemsPerPage));
      setHasSearched(true);
    } catch (err) {
      console.error('Error en la búsqueda por alcaldía:', err);
      
      // Determinar el tipo de error
      let errorMessage = 'Error desconocido';
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          errorMessage = 'Tiempo de espera agotado. El servidor no responde.';
        } else if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
          errorMessage = 'No se puede conectar al servidor. Mostrando propiedades de ejemplo.';
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
      
      // Generar datos de ejemplo como fallback
      const mockProperties = generateMockProperties(alcaldia, page, itemsPerPage);
      setSearchResults(mockProperties);
      setCurrentPage(page);
      setTotalResults(48); // Simular 48 propiedades totales (4 páginas)
      setTotalPages(Math.ceil(48 / itemsPerPage));
      setHasSearched(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (filters: SearchFilters) => {
    setCurrentFilters(filters);
    setCurrentAlcaldia(null);
    await performSearch(filters, 1);
  };

  const handleSearchByArea = async (alcaldia: string) => {
    setCurrentAlcaldia(alcaldia);
    setCurrentFilters(null);
    await performSearchByArea(alcaldia, 1);
  };

  const loadNextPage = async () => {
    if (currentPage < totalPages && !isLoading) {
      const nextPage = currentPage + 1;
      if (currentFilters) {
        await performSearch(currentFilters, nextPage);
      } else if (currentAlcaldia) {
        await performSearchByArea(currentAlcaldia, nextPage);
      }
      
      // Scroll suave al inicio
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const loadPreviousPage = async () => {
    if (currentPage > 1 && !isLoading) {
      const prevPage = currentPage - 1;
      if (currentFilters) {
        await performSearch(currentFilters, prevPage);
      } else if (currentAlcaldia) {
        await performSearchByArea(currentAlcaldia, prevPage);
      }
      
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const goToPage = async (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage && !isLoading) {
      if (currentFilters) {
        await performSearch(currentFilters, page);
      } else if (currentAlcaldia) {
        await performSearchByArea(currentAlcaldia, page);
      }
      
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const resetSearch = () => {
    setSearchResults([]);
    setIsLoading(false);
    setHasSearched(false);
    setError(null);
    setCurrentFilters(null);
    setCurrentAlcaldia(null);
    setCurrentPage(1);
    setTotalPages(0);
    setTotalResults(0);
  };

  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  return {
    searchResults,
    isLoading,
    hasSearched,
    error,
    currentPage,
    totalPages,
    totalResults,
    hasNextPage,
    hasPreviousPage,
    handleSearch,
    handleSearchByArea,
    loadNextPage,
    loadPreviousPage,
    goToPage,
    resetSearch
  };
}; 