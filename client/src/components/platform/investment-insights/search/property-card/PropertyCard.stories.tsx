import React from 'react';
import PropertyCard from './PropertyCard';
import { Title, Primary, Controls, Stories, ArgTypes } from '@storybook/blocks';

// Creamos datos de ejemplo para nuestras historias
const sampleProperty = {
  id: 1,
  title: "Casa de Lujo en Polanco",
  price: 5800000,
  address: "Calle Masaryk 123, Polanco, CDMX",
  description: "Hermosa casa con acabados de lujo, amplios espacios, jardín privado y excelente ubicación en una de las zonas más exclusivas de la ciudad.",
  recamaras: 4,
  banos: 3,
  estacionamiento: 2,
  metros: 280,
  type: "Casa",
  image: "/images/placeholder-img.webp"
};

// Mock para PropertyModal si es necesario
// Esto depende de cómo esté implementado PropertyModal en tu proyecto

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Propiedades/DashboardPropertyCard',
  component: PropertyCard,
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <>
          <Title />
          <h1>Tarjeta de Propiedad</h1>
          <p>Julián C</p>
          <p>Este componente muestra la información principal de una propiedad inmobiliaria en formato de tarjeta con las siguientes características:</p>
          <ul>
            <li>Imagen principal de la propiedad con indicador de tipo (Casa, Departamento, Terreno)</li>
            <li>Botón de &#34;Me gusta&#34; para guardar propiedades favoritas</li>
            <li>Título, precio y dirección de la propiedad</li>
            <li>Descripción breve con límite de dos líneas</li>
            <li>Iconos con características principales: recámaras, baños, estacionamiento y metros cuadrados</li>
            <li>Botón para ver más detalles que abre un modal</li>
            <li>Efectos de hover para mejorar la experiencia de usuario</li>
          </ul>
          <h2>Componentes internos</h2>
          <p>La tarjeta está compuesta por varios subcomponentes:</p>
          <ul>
            <li><strong>LikeButton:</strong> Botón para marcar propiedades como favoritas</li>
            <li><strong>PropertyType:</strong> Etiqueta que muestra el tipo de propiedad</li>
            <li><strong>PropertyFeatures:</strong> Muestra iconos con las características principales</li>
            <li><strong>DetailsButton:</strong> Botón para abrir el modal con detalles completos</li>
            <li><strong>PropertyModal:</strong> Modal que muestra información detallada (componente externo)</li>
          </ul>
          <h2>Props</h2>
          <ArgTypes of={PropertyCard} />
          <h2>Estructura de datos</h2>
          <p>El componente espera recibir un objeto de propiedad con la siguiente estructura:</p>
          <pre style={{ backgroundColor: '#000', color: "#00ff00", padding: '20px', borderRadius: '5px' }}>
            <code>
              {`interface Property {
  id: number;         // Identificador único
  title: string;      // Título de la propiedad
  price: number;      // Precio en pesos mexicanos
  address: string;    // Dirección completa
  description: string; // Descripción detallada
  recamaras: number;  // Número de recámaras/habitaciones
  banos: number;      // Número de baños
  estacionamiento: number; // Lugares de estacionamiento
  metros: number;     // Metros cuadrados
  type: string;       // Tipo de propiedad (Casa, Departamento, Terreno)
  image: string;      // URL de la imagen principal
}`}
            </code>
          </pre>
          <h2>Uso</h2>
          <p>El componente se puede usar tanto individualmente como en listas de propiedades.</p>
          <pre style={{ backgroundColor: '#000', color: "#00ff00", padding: '20px', borderRadius: '5px' }}>
            <code>
              {`import PropertyCard from './PropertyCard';

  
  return (
    <div className="max-w-sm mx-auto">
      <PropertyCard property={property} />
    </div>
  );
}


`}
            </code>
          </pre>
          <Primary />
          <Controls />
          <Stories />
        </>
      ),
      description: {
        component: 'Tarjeta interactiva que muestra información principal de una propiedad inmobiliaria con opciones de marcado como favorito y visualización de detalles.'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    property: {
      description: 'Objeto con los datos de la propiedad a mostrar',
      control: 'object',
    }
  },
};

// Historia básica con una casa
export const Casa = {
  args: {
    property: sampleProperty
  }
};

// Historia con un departamento
export const Departamento = {
  args: {
    property: {
      ...sampleProperty,
      id: 2,
      title: "Departamento de Lujo en Condesa",
      type: "Departamento",
      recamaras: 2,
      banos: 2,
      estacionamiento: 1,
      metros: 95,
      price: 3200000,
      address: "Av. Ámsterdam 45, Condesa, CDMX",
      description: "Elegante departamento con acabados de primera, excelente iluminación natural y ubicación privilegiada cerca de restaurantes y parques.",
    }
  }
};

// Historia con un terreno
export const Terreno = {
  args: {
    property: {
      ...sampleProperty,
      id: 3,
      title: "Terreno en Valle de Bravo",
      type: "Terreno",
      recamaras: 0,
      banos: 0,
      estacionamiento: 0,
      metros: 1500,
      price: 2800000,
      address: "Camino al Lago s/n, Valle de Bravo, Estado de México",
      description: "Amplio terreno con vista al lago, ideal para construir casa de descanso o proyecto de inversión. Cuenta con todos los servicios y acceso pavimentado.",
    }
  }
};