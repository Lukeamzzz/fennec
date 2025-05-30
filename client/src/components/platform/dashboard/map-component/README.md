# Componente de Mapa CDMX

Este componente proporciona un mapa interactivo de la Ciudad de México con visualización de datos por alcaldía.

## Instalación

1. Instala las dependencias necesarias:
```bash
npm install mapbox-gl @types/mapbox-gl
```

2. Copia los archivos del componente a tu proyecto:
   - `CdmxMap.tsx`
   - `CdmxMap.css`

3. Asegúrate de tener el archivo GeoJSON en la carpeta correcta:
   - Crea una carpeta `public/geojson/`
   - Coloca el archivo `cdmx.geojson` en esa carpeta

4. Configura las variables de entorno:
   - Crea un archivo `.env.local` en la raíz de tu proyecto
   - Añade tu token de Mapbox:
     ```
     NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=tu_token_de_mapbox
     ```

## Uso

```tsx
import CdmxMap from './path/to/CdmxMap';

// Uso básico
<CdmxMap />

// Con props personalizadas
<CdmxMap 
  initialZoom={11}
  initialCenter={[-99.133209, 19.432608]}
  className="custom-class"
  dataEndpoint="/api/tu-endpoint"
/>
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| className | string | '' | Clases CSS adicionales |
| initialZoom | number | 10 | Nivel de zoom inicial |
| initialCenter | [number, number] | [-99.133209, 19.432608] | Coordenadas iniciales |
| dataEndpoint | string | '/api/alcaldias-data' | Endpoint para datos de alcaldías |

## Formato de Datos

El endpoint debe devolver datos en este formato:

```typescript
{
  "alcaldia-id": {
    "id": "alcaldia-id",
    "nombre": "Nombre de la Alcaldía",
    "datos": {
      "poblacion": 1234567,
      "precio_promedio": 2500000,
      "propiedades_disponibles": 150
    }
  }
}
```

## Estructura del GeoJSON

El archivo GeoJSON debe incluir:
- Propiedad `id` que coincida con los IDs del endpoint
- Propiedad `nombre` para mostrar en el mapa
- Geometría de los límites de cada alcaldía

## Personalización

Puedes personalizar los estilos editando:
- `CdmxMap.css` para estilos generales
- Los colores y estilos del mapa en el componente
- El contenido y diseño del popup 