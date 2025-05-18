'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, RotateCcw, Home, Building, Map } from 'lucide-react';

interface SearchFiltersProps {
  onFiltersChange?: (filters: {
    location: string;
    propertyType: string;
    priceRange: [number, number];
    bedrooms: string;
    bathrooms: string;
    minSize: number;
  }) => void;
}

interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onFiltersChange }) => {
  const [location, setLocation] = useState('La Condesa');
  const [propertyType, setPropertyType] = useState('Apartment');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [sliderValue, setSliderValue] = useState(0); // Start at 0 for full range
  const [bedrooms, setBedrooms] = useState('Any');
  const [bathrooms, setBathrooms] = useState('Any');
  const [minSize, setMinSize] = useState(0);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isPropertyTypeOpen, setIsPropertyTypeOpen] = useState(false);
  const [isBedroomsOpen, setIsBedroomsOpen] = useState(false);
  const [isBathroomsOpen, setIsBathroomsOpen] = useState(false);

  const locations: Option[] = [
    { value: 'La Condesa', label: 'La Condesa' },
    { value: 'Polanco', label: 'Polanco' },
    { value: 'Roma Norte', label: 'Roma Norte' },
    { value: 'Santa Fe', label: 'Santa Fe' }
  ];

  const propertyTypes: Option[] = [
    { value: 'Apartment', label: 'Apartment', icon: <Building className="w-4 h-4" /> },
    { value: 'House', label: 'House', icon: <Home className="w-4 h-4" /> },
    { value: 'Land', label: 'Land', icon: <Map className="w-4 h-4" /> }
  ];

  const roomOptions: Option[] = [
    { value: 'Any', label: 'Any' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4+', label: '4+' }
  ];

  useEffect(() => {
    // Calculate price range based on slider value (percentage)
    // Now 0 means full range (0-5M) and 100 means specific range (5M-5M)
    const maxPrice = 5000000;
    const minPrice = Math.floor((maxPrice * sliderValue) / 100);
    const maxPriceAdjusted = maxPrice;
    setPriceRange([minPrice, maxPriceAdjusted]);
    
    onFiltersChange?.({
      location,
      propertyType,
      priceRange: [minPrice, maxPriceAdjusted],
      bedrooms,
      bathrooms,
      minSize
    });
  }, [sliderValue]);

  const handlePriceRangeChange = (value: number) => {
    setSliderValue(value);
  };

  const handleMinSizeChange = (value: number) => {
    setMinSize(value);
    onFiltersChange?.({
      location,
      propertyType,
      priceRange,
      bedrooms,
      bathrooms,
      minSize: value
    });
  };

  const resetFilters = () => {
    setLocation('La Condesa');
    setPropertyType('Apartment');
    setSliderValue(0);
    setPriceRange([0, 5000000]);
    setBedrooms('Any');
    setBathrooms('Any');
    setMinSize(0);
    onFiltersChange?.({
      location: 'La Condesa',
      propertyType: 'Apartment',
      priceRange: [0, 5000000],
      bedrooms: 'Any',
      bathrooms: 'Any',
      minSize: 0
    });
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
  }) => (
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
                  onChange(option.value);
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

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-6">Search Filters</h2>
      
      {/* Location Dropdown */}
      <CustomDropdown
        options={locations}
        value={location}
        onChange={(value) => {
          setLocation(value);
          onFiltersChange?.({
            location: value,
            propertyType,
            priceRange,
            bedrooms,
            bathrooms,
            minSize
          });
        }}
        label="Location"
        isOpen={isLocationOpen}
        setIsOpen={setIsLocationOpen}
      />

      {/* Property Type Dropdown */}
      <CustomDropdown
        options={propertyTypes}
        value={propertyType}
        onChange={(value) => {
          setPropertyType(value);
          onFiltersChange?.({
            location,
            propertyType: value,
            priceRange,
            bedrooms,
            bathrooms,
            minSize
          });
        }}
        label="Property Type"
        isOpen={isPropertyTypeOpen}
        setIsOpen={setIsPropertyTypeOpen}
      />

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range
        </label>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
          <div className="relative h-2">
            <div 
              className="absolute inset-0 bg-gray-200 rounded-full"
            />
            <div 
              className="absolute inset-y-0 right-0 bg-orange-500 rounded-full" 
              style={{ 
                width: `${100 - sliderValue}%`
              }}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={(e) => handlePriceRangeChange(Number(e.target.value))}
              className="absolute inset-0 w-full appearance-none bg-transparent cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-5
                [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:border-2
                [&::-webkit-slider-thumb]:border-orange-500
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:translate-y-[1px]
                [&::-moz-range-thumb]:appearance-none
                [&::-moz-range-thumb]:w-5
                [&::-moz-range-thumb]:h-5
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-white
                [&::-moz-range-thumb]:border-2
                [&::-moz-range-thumb]:border-orange-500
                [&::-moz-range-thumb]:cursor-pointer
                [&::-moz-range-thumb]:translate-y-[1px]"
            />
          </div>
        </div>
      </div>

      {/* Bedrooms Dropdown */}
      <CustomDropdown
        options={roomOptions}
        value={bedrooms}
        onChange={(value) => {
          setBedrooms(value);
          onFiltersChange?.({
            location,
            propertyType,
            priceRange,
            bedrooms: value,
            bathrooms,
            minSize
          });
        }}
        label="Bedrooms"
        isOpen={isBedroomsOpen}
        setIsOpen={setIsBedroomsOpen}
      />

      {/* Bathrooms Dropdown */}
      <CustomDropdown
        options={roomOptions}
        value={bathrooms}
        onChange={(value) => {
          setBathrooms(value);
          onFiltersChange?.({
            location,
            propertyType,
            priceRange,
            bedrooms,
            bathrooms: value,
            minSize
          });
        }}
        label="Bathrooms"
        isOpen={isBathroomsOpen}
        setIsOpen={setIsBathroomsOpen}
      />

      {/* Min Size */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Min Size (m²)
        </label>
        <div className="space-y-8">
          <div className="relative h-2">
            <div 
              className="absolute inset-0 bg-gray-200 rounded-full"
            />
            <div 
              className="absolute inset-y-0 left-0 bg-orange-500 rounded-full" 
              style={{ 
                width: `${(minSize / 500) * 100}%`
              }}
            />
            <input
              type="range"
              min="0"
              max="500"
              value={minSize}
              onChange={(e) => handleMinSizeChange(Number(e.target.value))}
              className="absolute inset-0 w-full appearance-none bg-transparent cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-5
                [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:border-2
                [&::-webkit-slider-thumb]:border-orange-500
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:translate-y-[1px]
                [&::-moz-range-thumb]:appearance-none
                [&::-moz-range-thumb]:w-5
                [&::-moz-range-thumb]:h-5
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-white
                [&::-moz-range-thumb]:border-2
                [&::-moz-range-thumb]:border-orange-500
                [&::-moz-range-thumb]:cursor-pointer
                [&::-moz-range-thumb]:translate-y-[1px]"
            />
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">0 m²</span>
            <span className="text-sm text-gray-600">{minSize} m²</span>
          </div>
        </div>
      </div>

      {/* Reset Filters Button */}
      <button
        onClick={resetFilters}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <RotateCcw size={18} />
        <span>Reset Filters</span>
      </button>
    </div>
  );
};

export default SearchFilters; 