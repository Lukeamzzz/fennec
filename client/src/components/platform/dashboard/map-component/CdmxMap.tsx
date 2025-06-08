'use client';

/// <reference types="vite/client" />

import React, {useEffect, useRef, useState} from 'react';
import './CdmxMap.css';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {Layers, Eye, EyeOff} from 'lucide-react';

interface CdmxMapProps {
    className?: string,
    initialZoom?: number,
    initialCenter?: [number, number],
    dataEndpoint?: string
}

// Configura el token de Mapbox
const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const CdmxMap: React.FC<CdmxMapProps> = ({className = '', initialZoom, initialCenter, dataEndpoint}) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const [mapError, setMapError] = useState<string | null>(null);
    const [showSeismicLayer, setShowSeismicLayer] = useState(false);
    const [showColoniasLayer, setShowColoniasLayer] = useState(false);
    const [isLayerLoaded, setIsLayerLoaded] = useState(false);
    const [showPropertiesLayer, setShowPropertiesLayer] = useState(true);

    const toggleSeismicLayer = () => {
        setShowSeismicLayer(!showSeismicLayer);
    };

    const toggleColoniasLayer = () => {
        setShowColoniasLayer(!showColoniasLayer);
    };

    const togglePropertiesLayer = () => {
        setShowPropertiesLayer(!showPropertiesLayer);
    };

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
                zoom: 9.5
            });

            mapRef.current = map;

            // Restringir navegación al área metropolitana de CDMX
            const bounds = [
                [-99.4, 19.1], // Southwest coordinates (límite suroeste)
                [-98.8, 19.8]  // Northeast coordinates (límite noreste)
            ] as [[number, number], [number, number]];

            (map as any).setMaxBounds(bounds);
            (map as any).setMinZoom(9);    // Zoom mínimo para mantener vista del área metropolitana
            (map as any).setMaxZoom(18);   // Zoom máximo para detalles de calles

            // Add navigation controls
            map.addControl(new mapboxgl.NavigationControl(), 'top-right');

            // Handle map load
            map.on('load', async () => {
                console.log('Map loaded successfully');

                try {
                    // Fetch the main CDMX boundary data (colonias/postal codes)
                    const cdmxResponse = await fetch('/maps/Ciudad de México.json');
                    const cdmxBoundaryData = await cdmxResponse.json();

                    // Fetch colonias data
                    const coloniasResponse = await fetch('/maps/cdmx.geojson');
                    const coloniasData = await coloniasResponse.json();

                    // Fetch seismic intensity data
                    const seismicResponse = await fetch('/maps/Intensidad+Sismíca.geojson');
                    const seismicData = await seismicResponse.json();

                    const map = mapRef.current;
                    if (!map) return;

                    // Add CDMX boundary source (colonias/postal codes)
                    map.addSource('cdmx-boundary', {
                        type: 'geojson',
                        data: cdmxBoundaryData
                    });

                    // Add CDMX boundary fill layer (base layer)
                    map.addLayer({
                        id: 'cdmx-boundary-fill',
                        type: 'fill',
                        source: 'cdmx-boundary',
                        paint: {
                            'fill-color': '#FFF3E0',
                            'fill-opacity': 0.3
                        }
                    });

                    // Add CDMX boundary line layer
                    map.addLayer({
                        id: 'cdmx-boundary-line',
                        type: 'line',
                        source: 'cdmx-boundary',
                        paint: {
                            'line-color': '#F56C12',
                            'line-width': 2,
                            'line-opacity': 0.8
                        }
                    });

                    // Add colonias source
                    map.addSource('colonias', {
                        type: 'geojson',
                        data: coloniasData
                    });

                    // Add colonias fill layer
                    map.addLayer({
                        id: 'colonias-fill',
                        type: 'fill',
                        source: 'colonias',
                        paint: {
                            'fill-color': '#E8F5E8',
                            'fill-opacity': showColoniasLayer ? 0.5 : 0
                        }
                    });

                    // Add colonias line layer
                    map.addLayer({
                        id: 'colonias-line',
                        type: 'line',
                        source: 'colonias',
                        paint: {
                            'line-color': '#2E7D32',
                            'line-width': 1.5,
                            'line-opacity': showColoniasLayer ? 0.8 : 0
                        }
                    });

                    // Add seismic intensity source
                    map.addSource('seismic-intensity', {
                        type: 'geojson',
                        data: seismicData
                    });

                    // Add seismic intensity layer
                    map.addLayer({
                        id: 'seismic-intensity',
                        type: 'fill',
                        source: 'seismic-intensity',
                        paint: {
                            'fill-color': [
                                'case',
                                ['==', ['get', 'intensity'], 'Alta'], '#F44336',
                                ['==', ['get', 'intensity'], 'Media'], '#FF9800',
                                ['==', ['get', 'intensity'], 'Baja'], '#4CAF50',
                                // Fallback: usar el color definido en el archivo o gris por defecto
                                ['has', 'color'], ['get', 'color'],
                                '#CCCCCC'
                            ],
                            'fill-opacity': showSeismicLayer ? 0.7 : 0
                        }
                    });

                    // Load and add properties data
                    console.log('Loading properties data...');
                    const propertiesResponse = await fetch('/maps/propiedades.geojson');
                    const propertiesData = await propertiesResponse.json();
                    console.log('Properties data loaded:', propertiesData.features?.length, 'features');

                    // Count houses and apartments
                    const houses = propertiesData.features?.filter((f: any) => f.properties?.type === 'casa') || [];
                    const apartments = propertiesData.features?.filter((f: any) => f.properties?.type === 'departamento') || [];
                    console.log('Houses:', houses.length, 'Apartments:', apartments.length);

                    // Add properties source
                    map.addSource('properties', {
                        type: 'geojson',
                        data: propertiesData
                    });
                    console.log('Properties source added');

                    // Add houses layer
                    map.addLayer({
                        id: 'properties-casas',
                        type: 'circle',
                        source: 'properties',
                        filter: ['==', ['get', 'type'], 'casa'],
                        paint: {
                            'circle-radius': 6,
                            'circle-color': '#3B82F6',
                            'circle-stroke-width': 2,
                            'circle-stroke-color': '#1E40AF',
                            'circle-opacity': showPropertiesLayer ? 0.8 : 0,
                            'circle-stroke-opacity': showPropertiesLayer ? 1 : 0
                        }
                    });
                    console.log('Houses layer added');

                    // Add apartments layer
                    map.addLayer({
                        id: 'properties-departamentos',
                        type: 'circle',
                        source: 'properties',
                        filter: ['==', ['get', 'type'], 'departamento'],
                        paint: {
                            'circle-radius': 6,
                            'circle-color': '#10B981',
                            'circle-stroke-width': 2,
                            'circle-stroke-color': '#047857',
                            'circle-opacity': showPropertiesLayer ? 0.8 : 0,
                            'circle-stroke-opacity': showPropertiesLayer ? 1 : 0
                        }
                    });
                    console.log('Apartments layer added');

                    // Add hover events
                    (map as any).on('mouseenter', 'cdmx-boundary-fill', () => {
                        map.getCanvas().style.cursor = 'pointer';
                    });

                    (map as any).on('mouseleave', 'cdmx-boundary-fill', () => {
                        map.getCanvas().style.cursor = '';
                    });

                    (map as any).on('mouseenter', 'colonias-fill', () => {
                        map.getCanvas().style.cursor = 'pointer';
                    });

                    (map as any).on('mouseleave', 'colonias-fill', () => {
                        map.getCanvas().style.cursor = '';
                    });

                    (map as any).on('mouseenter', 'seismic-intensity', () => {
                        map.getCanvas().style.cursor = 'pointer';
                    });

                    (map as any).on('mouseleave', 'seismic-intensity', () => {
                        map.getCanvas().style.cursor = '';
                    });

                    (map as any).on('mouseleave', 'cdmx-boundary-line', () => {
                        map.getCanvas().style.cursor = '';
                    });

                    // Add hover events for properties
                    (map as any).on('mouseenter', 'properties-casas', () => {
                        map.getCanvas().style.cursor = 'pointer';
                    });

                    (map as any).on('mouseleave', 'properties-casas', () => {
                        map.getCanvas().style.cursor = '';
                    });

                    (map as any).on('mouseenter', 'properties-departamentos', () => {
                        map.getCanvas().style.cursor = 'pointer';
                    });

                    (map as any).on('mouseleave', 'properties-departamentos', () => {
                        map.getCanvas().style.cursor = '';
                    });

                    setIsLayerLoaded(true);
                } catch (error) {
                    console.error('Error loading map data:', error);
                }
            });

            // Handle map errors
            map.on('error', (e: any) => {
                console.error('Mapbox error:', e);
                setMapError('Error loading map. Please check your connection.');
            });

            // Cleanup
            return () => {
                if (mapRef.current) {
                    mapRef.current.remove();
                    mapRef.current = null;
                }
            };
        } catch (error) {
            console.error('Error initializing map:', error);
            setMapError('Error initializing map. Please try again later.');
        }
    }, []);

    // Update layer visibility when toggles change
    useEffect(() => {
        if (!mapRef.current || !isLayerLoaded) return;

        const map = mapRef.current;
        if (!map) return;

        // Update colonias layer visibility
        if ((map as any).getLayer('colonias-fill')) {
            (map as any).setPaintProperty('colonias-fill', 'fill-opacity', showColoniasLayer ? 0.5 : 0);
        }
        if ((map as any).getLayer('colonias-line')) {
            (map as any).setPaintProperty('colonias-line', 'line-opacity', showColoniasLayer ? 0.8 : 0);
        }

        // Update seismic layer visibility
        if ((map as any).getLayer('seismic-intensity')) {
            (map as any).setPaintProperty('seismic-intensity', 'fill-opacity', showSeismicLayer ? 0.7 : 0);
        }

        // Update properties layer visibility
        if ((map as any).getLayer('properties-casas')) {
            (map as any).setPaintProperty('properties-casas', 'circle-opacity', showPropertiesLayer ? 0.8 : 0);
            (map as any).setPaintProperty('properties-casas', 'circle-stroke-opacity', showPropertiesLayer ? 1 : 0);
        }
        if ((map as any).getLayer('properties-departamentos')) {
            (map as any).setPaintProperty('properties-departamentos', 'circle-opacity', showPropertiesLayer ? 0.8 : 0);
            (map as any).setPaintProperty('properties-departamentos', 'circle-stroke-opacity', showPropertiesLayer ? 1 : 0);
        }
    }, [showColoniasLayer, showSeismicLayer, showPropertiesLayer, isLayerLoaded]);

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

            {/* Layer Controls */}
            {isLayerLoaded && (
                <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-3 z-10">
                    <div className="flex items-center space-x-2 mb-3">
                        <Layers className="h-5 w-5 text-gray-600"/>
                        <span className="text-sm font-medium text-gray-700">Capas</span>
                    </div>
                    <div className="space-y-2">
                        <div className="px-3 py-2 bg-orange-50 rounded-md border border-orange-200">
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded border-2 border-orange-500 bg-orange-100"></div>
                                <span className="text-sm font-medium text-orange-700">Contorno CDMX</span>
                                <span className="text-xs text-orange-600">(Base)</span>
                            </div>
                        </div>
                        <button
                            onClick={toggleSeismicLayer}
                            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors w-full ${
                                showSeismicLayer
                                    ? 'bg-orange-100 text-orange-700'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {showSeismicLayer ? (
                                <Eye className="h-4 w-4"/>
                            ) : (
                                <EyeOff className="h-4 w-4"/>
                            )}
                            <span>Intensidad Sísmica</span>
                        </button>
                        <button
                            onClick={toggleColoniasLayer}
                            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors w-full ${
                                showColoniasLayer
                                    ? 'bg-orange-100 text-orange-700'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {showColoniasLayer ? (
                                <Eye className="h-4 w-4"/>
                            ) : (
                                <EyeOff className="h-4 w-4"/>
                            )}
                            <span>Colonias</span>
                        </button>
                        <button
                            onClick={togglePropertiesLayer}
                            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors w-full ${
                                showPropertiesLayer
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {showPropertiesLayer ? (
                                <Eye className="h-4 w-4"/>
                            ) : (
                                <EyeOff className="h-4 w-4"/>
                            )}
                            <span>Propiedades</span>
                        </button>
                    </div>
                </div>
            )}

      {/* Leyenda */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 max-w-xs">

        {/* Capa Base - Colonias CDMX */}
        <div className="mb-2 border-gray-200">
          <div className='flex items-center gap-1 mb-2'>
            <p className='w-4 h-4 bg-orange-500 rounded-sm'></p>
            <h4 className="font-semibold text-xs text-gray-700">Capa base</h4>
          </div>

          <div className="text-xs text-gray-600 space-y-1">
            <p>• Límites por alcaldías</p>
            <p>• Siempre visible como referencia</p>
          </div>
        </div>

        {/* Colonias Layer */}
        {showColoniasLayer && (
          <div className="mb-3">
            <div className="flex items-center mb-2 gap-1">
              <p className="w-4 h-4 rounded-sm bg-green-800"></p>
              <h4 className="font-semibold text-xs text-gray-700">Colonias de CDMX</h4>
            </div>
            
            <div className="text-xs text-gray-600 space-y-1">
              <p>• Límites precisos por colonia</p>
              <p>• Información detallada por zona</p>
            </div>
          </div>
        )}

        {/* Seismic Intensity Layer */}
        {showSeismicLayer && (
          <div className="mb-3">
            <h4 className="font-semibold text-xs mb-2 text-gray-700">Capa de intensidad sísmica</h4>
            <div className="space-y-1">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded mr-2" style={{ backgroundColor: '#F44336' }}></div>
                <span className="text-xs text-gray-700">Alta</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded mr-2" style={{ backgroundColor: '#FF9800' }}></div>
                <span className="text-xs text-gray-700">Media</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded mr-2" style={{ backgroundColor: '#4CAF50' }}></div>
                <span className="text-xs text-gray-700">Baja</span>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-2">Datos oficiales de riesgo sísmico CDMX</p>
          </div>
        )}

        </div>
        {/* Properties Layer */}
        {showPropertiesLayer && (
          <div>
            <h4 className="font-semibold text-xs mb-2 text-gray-700">Propiedades listadas</h4>
            <div className="space-y-1">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full mr-2 border-2 bg-blue-600"></div>
                <span className="text-xs text-gray-700">Casas</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full mr-2 border-2 bg-green-600"></div>
                <span className="text-xs text-gray-700">Departamentos</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
};

export default CdmxMap;
