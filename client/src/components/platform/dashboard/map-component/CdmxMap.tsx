'use client';

/// <reference types="vite/client" />

import React, { useEffect, useRef, useState } from 'react';
import './CdmxMap.css';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface AlcaldiaData {
  id: string;
  nombre: string;
  datos: {
    poblacion?: number;
    superficie?: number;
    precio_promedio?: number;
    propiedades_disponibles?: number;
    [key: string]: any;
  };
}

interface CdmxMapProps {
  className?: string;
  initialZoom?: number;
  initialCenter?: [number, number];
  dataEndpoint?: string;
}

const CdmxMap: React.FC<CdmxMapProps> = ({
  className = '',
  initialZoom = 10,
  initialCenter = [-99.133209, 19.432608],
  dataEndpoint = '/api/alcaldias-data',
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const popup = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const [alcaldiasData, setAlcaldiasData] = useState<Record<string, AlcaldiaData>>({});

  const fetchAlcaldiasData = async () => {
    try {
      const response = await fetch(dataEndpoint);
      const data = await response.json();
      setAlcaldiasData(data);
    } catch (error) {
      console.error('Error fetching alcaldías data:', error);
    }
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize the map
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: initialCenter,
      zoom: initialZoom,
    });

    // Add navigation controls
    mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    // Save map instance
    map.current = mapInstance;

    mapInstance.on('load', () => {
      setLoading(false);
    });

    // Cleanup
    return () => {
      mapInstance.remove();
    };
  }, [initialCenter, initialZoom]);

  return (
    <div className={`map-container ${className}`} ref={mapContainer}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <div className="text-gray-600">Cargando mapa...</div>
        </div>
      )}
    </div>
  );
};

export default CdmxMap; 