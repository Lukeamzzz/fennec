import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface PropertyMapboxProps {
  latitude: number;
  longitude: number;
  address: string;
}

const PropertyMapbox: React.FC<PropertyMapboxProps> = ({
  latitude,
  longitude,
  address
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize the map
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [longitude, latitude],
      zoom: 15
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add marker
    marker.current = new mapboxgl.Marker({
      color: '#f97316' // Orange color to match the theme
    })
      .setLngLat([longitude, latitude])
      .setPopup(new mapboxgl.Popup().setHTML(`<p>${address}</p>`))
      .addTo(map.current);

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [latitude, longitude, address]);

  return (
    <div 
      ref={mapContainer} 
      className="w-full h-64 rounded-lg overflow-hidden"
      style={{ border: '1px solid #e2e8f0' }}
    />
  );
};

export default PropertyMapbox; 