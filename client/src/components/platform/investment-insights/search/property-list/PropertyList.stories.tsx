import React from 'react';
import PropertyList from './PropertyList';
import { Title, Description, Primary, Controls, Stories } from '@storybook/blocks';

// Mock para DashboardPropertyCard en caso de que sea necesario
// Esto depende de cómo esté implementado DashboardPropertyCard.js en tu proyecto

export default {
  title: 'Propiedades/PropertyList',
  component: PropertyList,
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => (
        <>
          <Title />
          <h1>Lista de Propiedades</h1>
          <p>Julián C</p>
          <p>Este componente muestra una cuadrícula responsiva de tarjetas de propiedades inmobiliarias con las siguientes características:</p>
          <ul>
            <li>Visualización de múltiples propiedades en formato de grid</li>
            <li>Diseño adaptable que cambia según el tamaño de pantalla</li>
            <li>Integración con el componente PropertyCard para mostrar cada propiedad</li>
            <li>Datos de propiedades cargados desde un estado interno</li>
            <li>Indicador del número total de propiedades encontradas</li>
          </ul>
          <h2>Uso</h2>
          <p>El componente se puede usar directamente en cualquier página que necesite mostrar un listado de propiedades.</p>
          <pre style={{ backgroundColor: '#000', color: "#00ff00", padding: '20px', borderRadius: '5px' }}>
            <code>
              {`import PropertyList from './PropertyList';
              
const SearchResultsPage = () => {
  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-8">
        <PropertyList />
      </div>
    </main>
  );
};`}
            </code>
          </pre>
          <h2>Estructura de datos</h2>
          <p>El componente utiliza un arreglo de objetos con la siguiente estructura:</p>
          <pre style={{ backgroundColor: '#000', color: "#00ff00", padding: '20px', borderRadius: '5px' }}>
            <code>
              {`// Estructura de una propiedad
{
  id: number,           // Identificador único de la propiedad
  title: string,        // Título de la propiedad
  price: number,        // Precio en pesos mexicanos
  address: string,      // Dirección de la propiedad
  description: string,  // Descripción detallada
  recamaras: number,    // Número de recámaras/habitaciones
  banos: number,        // Número de baños
  estacionamiento: number, // Lugares de estacionamiento
  metros: number,       // Metros cuadrados
  type: string,         // Tipo de propiedad (Casa, Departamento, Terreno)
  image: string         // URL de la imagen principal
}`}
            </code>
          </pre>
          <h2>Responsividad</h2>
          <p>El componente implementa un diseño responsivo con las siguientes características:</p>
          <ul>
            <li><strong>Móvil:</strong> 1 tarjeta por fila</li>
            <li><strong>Tablet:</strong> 2 tarjetas por fila</li>
            <li><strong>Escritorio:</strong> 3 tarjetas por fila</li>
          </ul>
          <Primary />
          <Controls />
          <Stories />
        </>
      ),
      description: {
        component: 'Componente que muestra una cuadrícula de propiedades inmobiliarias con diseño responsivo.'
      },
    },
  },
  tags: ['autodocs'],
};

// Historia básica
export const Default = {};
