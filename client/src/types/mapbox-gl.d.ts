declare module 'mapbox-gl' {
  export interface MapboxOptions {
    container: HTMLElement | string;
    style: string;
    center: [number, number];
    zoom: number;
    pitch?: number;
    bearing?: number;
  }

  export interface ControlOptions {
    showCompass?: boolean;
    showZoom?: boolean;
    visualizePitch?: boolean;
  }

  export interface LayerSpecification {
    id: string;
    type: string;
    source: string;
    layout?: Record<string, unknown>;
    paint?: Record<string, unknown>;
  }

  export interface SourceSpecification {
    type: string;
    data?: unknown;
    url?: string;
    tiles?: string[];
  }

  export interface MarkerOptions {
    color?: string;
    draggable?: boolean;
  }

  export class Map {
    constructor(options: MapboxOptions);
    addControl(control: NavigationControl | ScaleControl, position?: string): this;
    on(type: string, listener: (event?: MapMouseEvent) => void): this;
    addSource(id: string, source: SourceSpecification): this;
    addLayer(layer: LayerSpecification): this;
    getCanvas(): { style: CSSStyleDeclaration };
    remove(): void;
  }

  export class NavigationControl {
    constructor(options?: ControlOptions);
  }

  export class ScaleControl {
    constructor();
  }

  export class Marker {
    constructor(options?: MarkerOptions);
    setLngLat(lnglat: [number, number]): this;
    setPopup(popup: Popup): this;
    addTo(map: Map): this;
    remove(): this;
  }

  export class Popup {
    constructor(options?: { closeButton?: boolean; maxWidth?: string });
    setLngLat(lnglat: { lng: number; lat: number }): this;
    setHTML(html: string): this;
    addTo(map: Map): this;
    remove(): void;
  }

  export interface MapMouseEvent {
    lngLat: { lng: number; lat: number };
  }

  export interface MapboxGeoJSONFeature {
    properties?: {
      id?: string;
      [key: string]: string | number | boolean | null | undefined;
    };
  }

  export let accessToken: string;
} 