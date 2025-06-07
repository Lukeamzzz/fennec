'use client';

import React, { useState } from 'react';
import { ChevronDown, RotateCcw, Home, Building } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';

interface SearchFiltersProps {
  onFiltersChange?: (filters: {
    location: string;
    propertyType: string;
    priceRange: [number, number];
    bedrooms: string;
    bathrooms: string;
    minSize: number;
    maxSize: number;
  }) => void;
  onSearch?: (filters: {
    location: string;
    propertyType: string;
    priceRange: [number, number];
    bedrooms: string;
    bathrooms: string;
    minSize: number;
    maxSize: number;
  }) => void;
  onReset?: () => void;
}

interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onFiltersChange, onSearch, onReset }) => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150000000]);
  const [sliderValues, setSliderValues] = useState<[number, number]>([0, 100]);
  const [bedrooms, setBedrooms] = useState('Cualquier');
  const [bathrooms, setBathrooms] = useState('Cualquier');
  const [] = useState(0);
  const [sizeRange, setSizeRange] = useState<[number, number]>([0, 5000]);
  const [sizeSliderValues, setSizeSliderValues] = useState<[number, number]>([0, 100]);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isPropertyTypeOpen, setIsPropertyTypeOpen] = useState(false);
  const [isBedroomsOpen, setIsBedroomsOpen] = useState(false);
  const [isBathroomsOpen, setIsBathroomsOpen] = useState(false);

  const locations: Option[] = [
    { value: '', label: 'Todas las ubicaciones' },
    { value: 'Álvaro Obregón', label: 'Álvaro Obregón' },
    { value: 'Azcapotzalco', label: 'Azcapotzalco' },
    { value: 'Benito Juárez', label: 'Benito Juárez' },
    { value: 'Coyoacán', label: 'Coyoacán' },
    { value: 'Cuajimalpa', label: 'Cuajimalpa de Morelos' },
    { value: 'Cuauhtémoc', label: 'Cuauhtémoc' },
    { value: 'Gustavo A. Madero', label: 'Gustavo A. Madero' },
    { value: 'Iztacalco', label: 'Iztacalco' },
    { value: 'Iztapalapa', label: 'Iztapalapa' },
    { value: 'La Magdalena Contreras', label: 'La Magdalena Contreras' },
    { value: 'Miguel Hidalgo', label: 'Miguel Hidalgo' },
    { value: 'Milpa Alta', label: 'Milpa Alta' },
    { value: 'Tláhuac', label: 'Tláhuac' },
    { value: 'Tlalpan', label: 'Tlalpan' },
    { value: 'Venustiano Carranza', label: 'Venustiano Carranza' },
    { value: 'Xochimilco', label: 'Xochimilco' }
  ];

  const propertyTypes: Option[] = [
    { value: 'Departamento', label: 'Departamento', icon: <Building className="w-4 h-4" /> },
    { value: 'Casa', label: 'Casa', icon: <Home className="w-4 h-4" /> }
  ];

  const roomOptions: Option[] = [
    { value: 'Cualquier', label: 'Cualquier' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8+', label: '8+' }
  ];

  const handlePriceRangeChange = (values: number[]) => {
    const newPriceRange: [number, number] = [
      Math.round(values[0] * 100000), // Convertir de 0-100 a 0-10M
      Math.round(values[1] * 100000)
    ];
    setPriceRange(newPriceRange);
    setSliderValues(values as [number, number]);
    
    const updatedFilters = {
      location,
      propertyType,
      priceRange: newPriceRange,
      bedrooms,
      bathrooms,
      minSize: sizeRange[0],
      maxSize: sizeRange[1]
    };
    onFiltersChange?.(updatedFilters);
  };

  const handleSizeRangeChange = (values: number[]) => {
    const newSizeRange: [number, number] = [
      Math.round(values[0] * 5), // Convertir de 0-100 a 0-500m²
      Math.round(values[1] * 5)
    ];
    setSizeRange(newSizeRange);
    setSizeSliderValues(values as [number, number]);
    
    const updatedFilters = {
      location,
      propertyType,
      priceRange,
      bedrooms,
      bathrooms,
      minSize: newSizeRange[0],
      maxSize: newSizeRange[1]
    };
    onFiltersChange?.(updatedFilters);
  };

  const resetFilters = () => {
    setLocation('');
    setPropertyType('');
    setPriceRange([0, 150000000]);
    setSliderValues([0, 100]);
    setBedrooms('Cualquier');
    setBathrooms('Cualquier');
    setSizeRange([0, 5000]);
    setSizeSliderValues([0, 100]);
    
    // Cerrar todos los dropdowns
    setIsLocationOpen(false);
    setIsPropertyTypeOpen(false);
    setIsBedroomsOpen(false);
    setIsBathroomsOpen(false);
    
    // Llamar al callback de reset para mostrar el estado inicial
    onReset?.();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const CustomDropdown = ({ 
    options, 
    value, 
    onChange, 
    label, 
    isOpen, 
    setIsOpen 
  }: { 
    options: Option[], 
    value: string, 
    onChange: (value: string) => void, 
    label: string,
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void
  }) => {
    const handleOptionChange = (optionValue: string) => {
      onChange(optionValue);
      // Solo actualizar filtros, no ejecutar búsqueda automática
    };

    return (
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full p-3 bg-white border border-gray-200 rounded-lg text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-orange-500 hover:bg-gray-50"
          >
            <div className="flex items-center gap-2">
              {options.find(opt => opt.value === value)?.icon}
              <span>{options.find(opt => opt.value === value)?.label}</span>
            </div>
            <ChevronDown
              className={`text-gray-400 transition-transform duration-200 ${
                isOpen ? 'transform rotate-180' : ''
              }`}
              size={20}
            />
          </button>
          
          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-orange-50 ${
                    value === option.value ? 'bg-orange-50 text-orange-600' : ''
                  }`}
                  onClick={() => {
                    handleOptionChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  {option.icon}
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const areAllFieldsFilled = () => {
    return (
      propertyType !== ''
    );
  };

  // Actualizar todas las llamadas a onFiltersChange (sin búsqueda automática)
  const handleLocationChange = (value: string) => {
    setLocation(value);
    const updatedFilters = {
      location: value,
      propertyType,
      priceRange,
      bedrooms,
      bathrooms,
      minSize: sizeRange[0],
      maxSize: sizeRange[1]
    };
    onFiltersChange?.(updatedFilters);
  };

  const handlePropertyTypeChange = (value: string) => {
    setPropertyType(value);
    const updatedFilters = {
      location,
      propertyType: value,
      priceRange,
      bedrooms,
      bathrooms,
      minSize: sizeRange[0],
      maxSize: sizeRange[1]
    };
    onFiltersChange?.(updatedFilters);
  };

  const handleBedroomsChange = (value: string) => {
    setBedrooms(value);
    const updatedFilters = {
      location,
      propertyType,
      priceRange,
      bedrooms: value,
      bathrooms,
      minSize: sizeRange[0],
      maxSize: sizeRange[1]
    };
    onFiltersChange?.(updatedFilters);
  };

  const handleBathroomsChange = (value: string) => {
    setBathrooms(value);
    const updatedFilters = {
      location,
      propertyType,
      priceRange,
      bedrooms,
      bathrooms: value,
      minSize: sizeRange[0],
      maxSize: sizeRange[1]
    };
    onFiltersChange?.(updatedFilters);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-6">Filtros de Búsqueda</h2>
      
      {/* Location Dropdown */}
      <CustomDropdown
        options={locations}
        value={location}
        onChange={handleLocationChange}
        label="Ubicación"
        isOpen={isLocationOpen}
        setIsOpen={setIsLocationOpen}
      />

      {/* Property Type Dropdown */}
      <CustomDropdown
        options={propertyTypes}
        value={propertyType}
        onChange={handlePropertyTypeChange}
        label="Tipo de Propiedad"
        isOpen={isPropertyTypeOpen}
        setIsOpen={setIsPropertyTypeOpen}
      />

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rango de Precio
        </label>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            value={sliderValues}
            min={0}
            max={100}
            step={1}
            minStepsBetweenThumbs={1}
            onValueChange={handlePriceRangeChange}
          >
            <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
              <Slider.Range className="absolute bg-orange-500 rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb
              className="block w-5 h-5 bg-white border-2 border-orange-500 rounded-full hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              aria-label="Precio mínimo"
            />
            <Slider.Thumb
              className="block w-5 h-5 bg-white border-2 border-orange-500 rounded-full hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              aria-label="Precio máximo"
            />
          </Slider.Root>
        </div>
      </div>

      {/* Bedrooms Dropdown */}
      <CustomDropdown
        options={roomOptions}
        value={bedrooms}
        onChange={handleBedroomsChange}
        label="Habitaciones"
        isOpen={isBedroomsOpen}
        setIsOpen={setIsBedroomsOpen}
      />

      {/* Bathrooms Dropdown */}
      <CustomDropdown
        options={roomOptions}
        value={bathrooms}
        onChange={handleBathroomsChange}
        label="Baños"
        isOpen={isBathroomsOpen}
        setIsOpen={setIsBathroomsOpen}
      />

      {/* Size Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dimensiones (m²)
        </label>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{sizeRange[0]} m²</span>
            <span>{sizeRange[1]} m²</span>
          </div>
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            value={sizeSliderValues}
            min={0}
            max={100}
            step={1}
            minStepsBetweenThumbs={1}
            onValueChange={handleSizeRangeChange}
          >
            <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
              <Slider.Range className="absolute bg-orange-500 rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb
              className="block w-5 h-5 bg-white border-2 border-orange-500 rounded-full hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              aria-label="Tamaño mínimo"
            />
            <Slider.Thumb
              className="block w-5 h-5 bg-white border-2 border-orange-500 rounded-full hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              aria-label="Tamaño máximo"
            />
          </Slider.Root>
        </div>
      </div>

      <div className="space-y-4">
        {/* Reset Filters Button */}
        <button
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          onClick={resetFilters}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reestablecer Filtros
        </button>

        {/* Search Button */}
        {areAllFieldsFilled() && (
          <button
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
            onClick={() => onSearch?.({
              location,
              propertyType,
              priceRange,
              bedrooms,
              bathrooms,
              minSize: sizeRange[0],
              maxSize: sizeRange[1]
            })}
          >
            🔍 Buscar Propiedades
          </button>
        )}
        
        {/* Mensaje informativo */}
        {!areAllFieldsFilled() && (
          <div className="text-center text-sm text-gray-500 p-3 bg-gray-50 rounded-md">
            🏠 Selecciona un tipo de propiedad para continuar
          </div>
        )}
        
        {/* Mensaje cuando los filtros están listos */}
        {areAllFieldsFilled() && (
          <div className="text-center text-xs text-gray-400 mt-2">
            Ajusta los filtros adicionales y haz clic en &#34;Buscar&#34; para ver todas las {propertyType.toLowerCase()}s
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilters; 