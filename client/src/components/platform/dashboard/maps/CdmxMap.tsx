'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './CdmxMap.css';

// Use environment variable for Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

interface AlcaldiaData {
  id: string;
  nombre: string;
  datos: {
    poblacion?: number;
    superficie?: number;
    precio_promedio?: number;
    propiedades_disponibles?: number;
    [key: string]: any; // Para otros datos que pueda retornar el endpoint
  };
}

interface CdmxMapProps {
  className?: string;
  initialZoom?: number;
  initialCenter?: [number, number];
  dataEndpoint?: string; // URL del endpoint para obtener datos de alcaldías
}

const CdmxMap: React.FC<CdmxMapProps> = ({
  className = '',
  initialZoom = 10,
  initialCenter = [-99.133209, 19.432608],
  dataEndpoint = '/api/alcaldias-data', // Endpoint por defecto
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const popup = useRef<mapboxgl.Popup | null>(null);
  const [loading, setLoading] = useState(true);
  const [alcaldiasData, setAlcaldiasData] = useState<Record<string, AlcaldiaData>>({});

  // Función para obtener los datos de las alcaldías
  const fetchAlcaldiasData = async () => {
    try {
      const response = await fetch(dataEndpoint);
      const data = await response.json();
      setAlcaldiasData(data);
    } catch (error) {
      console.error('Error fetching alcaldías data:', error);
    }
  };

  // Función para mostrar el popup con la información de la alcaldía
  const showAlcaldiaInfo = (e: mapboxgl.MapMouseEvent & { features?: mapboxgl.MapboxGeoJSONFeature[] }) => {
    if (e.features && e.features[0] && map.current) {
      const feature = e.features[0];
      const alcaldiaId = feature.properties?.id;
      const alcaldiaData = alcaldiasData[alcaldiaId];

      if (!alcaldiaData) return;

      const coordinates = e.lngLat;

      // HTML del popup
      const popupContent = `
        <div class="alcaldia-popup">
          <h3>${alcaldiaData.nombre}</h3>
          <div class="alcaldia-stats">
            ${alcaldiaData.datos.poblacion ? 
              `<div class="stat-item">
                <span class="stat-label">Población:</span>
                <span class="stat-value">${alcaldiaData.datos.poblacion.toLocaleString()}</span>
              </div>` : ''
            }
            ${alcaldiaData.datos.precio_promedio ? 
              `<div class="stat-item">
                <span class="stat-label">Precio Promedio:</span>
                <span class="stat-value">$${alcaldiaData.datos.precio_promedio.toLocaleString()}</span>
              </div>` : ''
            }
            ${alcaldiaData.datos.propiedades_disponibles ? 
              `<div class="stat-item">
                <span class="stat-label">Propiedades:</span>
                <span class="stat-value">${alcaldiaData.datos.propiedades_disponibles}</span>
              </div>` : ''
            }
          </div>
        </div>
      `;

      // Crear y mostrar el popup
      if (popup.current) popup.current.remove();
      popup.current = new mapboxgl.Popup({ closeButton: true, maxWidth: '300px' })
        .setLngLat(coordinates)
        .setHTML(popupContent)
        .addTo(map.current);
    }
  };

  useEffect(() => {
    // Cargar datos de las alcaldías
    fetchAlcaldiasData();

    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: initialCenter,
      zoom: initialZoom,
      pitch: 45,
      bearing: -17.6,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-left');

    map.current.on('load', async () => {
      try {
        const response = await fetch('/maps/cdmx.geojson');
        const geojsonData = await response.json();

        map.current?.addSource('alcaldias', {
          type: 'geojson',
          data: geojsonData,
        });

        // Capa de relleno para las alcaldías
        map.current?.addLayer({
          id: 'alcaldias-fill',
          type: 'fill',
          source: 'alcaldias',
          paint: {
            'fill-color': '#F56C12',
            'fill-opacity': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              0.3,
              0.1
            ],
          },
        });

        // Capa de borde para las alcaldías
        map.current?.addLayer({
          id: 'alcaldias-line',
          type: 'line',
          source: 'alcaldias',
          paint: {
            'line-color': '#F56C12',
            'line-width': 2,
          },
        });

        // Capa para los nombres de las alcaldías
        map.current?.addLayer({
          id: 'alcaldias-label',
          type: 'symbol',
          source: 'alcaldias',
          layout: {
            'text-field': ['get', 'nombre'],
            'text-variable-anchor': ['center'],
            'text-radial-offset': 0,
            'text-justify': 'auto',
            'text-size': 12,
          },
          paint: {
            'text-color': '#374151',
            'text-halo-color': '#ffffff',
            'text-halo-width': 2,
          },
        });

        // Eventos de interacción
        map.current.on('mouseenter', 'alcaldias-fill', () => {
          if (map.current) map.current.getCanvas().style.cursor = 'pointer';
        });

        map.current.on('mouseleave', 'alcaldias-fill', () => {
          if (map.current) map.current.getCanvas().style.cursor = '';
        });

        map.current.on('click', 'alcaldias-fill', showAlcaldiaInfo);

        setLoading(false);
      } catch (error) {
        console.error('Error loading map data:', error);
        setLoading(false);
      }
    });

    return () => {
      if (popup.current) popup.current.remove();
      if (map.current) map.current.remove();
    };
  }, [initialCenter, initialZoom, dataEndpoint]);

  return (
    <div className={`cdmx-map-wrapper ${className}`}>
      <div ref={mapContainer} className="cdmx-map-container" />
      {loading && (
        <div className="map-loading">
          <div className="loading-spinner" />
          <p>Cargando mapa...</p>
        </div>
      )}
    </div>
  );
};

export default CdmxMap; 