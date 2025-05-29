'use client';

/// <reference types="vite/client" />

import React, { useEffect, useRef, useState } from 'react';
import './CdmxMap.css';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface CdmxMapProps {
  className?: string;
}

// Configura el token de Mapbox
const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const CdmxMap: React.FC<CdmxMapProps> = ({ className = '' }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    try {
      // Set the access token
      (mapboxgl as any).accessToken = accessToken;

      // Create the map
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-99.133209, 19.432608], // CDMX coordinates
        zoom: 11
      });

      // Add navigation controls
      map.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Handle map load
      map.on('load', () => {
        console.log('Map loaded successfully');
      });

      // Handle map errors
      map.on('error', (e: any) => {
        console.error('Mapbox error:', e);
        setMapError('Error loading map. Please check your connection.');
      });

      // Cleanup
      return () => map.remove();
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Error initializing map. Please try again later.');
    }
  }, []);

  return (
    <div className="relative w-full h-[600px] bg-white rounded-lg shadow-sm overflow-hidden">
      <div 
        ref={mapContainer} 
        className="absolute inset-0"
        style={{
          width: '100%',
          height: '100%'
        }}
      />
      {mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90">
          <p className="text-red-600">{mapError}</p>
        </div>
      )}
    </div>
  );
};

export default CdmxMap;
