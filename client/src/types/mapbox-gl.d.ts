declare module 'mapbox-gl' {
  export interface MapboxOptions {
    container: HTMLElement | string;
    style: string;
    center: [number, number];
    zoom: number;
    pitch?: number;
    bearing?: number;
  }

  export class Map {
    constructor(options: MapboxOptions);
    addControl(control: any, position?: string): this;
    on(type: string, listener: Function): this;
    addSource(id: string, source: any): this;
    addLayer(layer: any): this;
    getCanvas(): { style: any };
    remove(): void;
  }

  export class NavigationControl {
    constructor();
  }

  export class ScaleControl {
    constructor();
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
      [key: string]: any;
    };
  }
} 