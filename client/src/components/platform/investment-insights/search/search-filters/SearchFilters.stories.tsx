
import React from 'react';
import SearchFilters from './SearchFilters';
import { Title, Primary, Controls, Stories } from '@storybook/blocks';

export default {
  title: 'Búsqueda/SearchFilters',
  component: SearchFilters,
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <>
          <Title />
          <h1>Filtros de Búsqueda de Propiedades</h1>
          <p>Julián C</p>
          <p>Este componente implementa un panel de filtros para la búsqueda de propiedades inmobiliarias con las siguientes características:</p>
          <ul>
            <li>Búsqueda por ubicación con autocompletado</li>
            <li>Selección de tipo de propiedad (Casa, Departamento, Terreno)</li>
            <li>Control deslizante para rango de precios</li>
            <li>Filtros avanzados expandibles/contraíbles</li>
            <li>Controles para número de baños, habitaciones y estacionamientos</li>
            <li>Entrada para metros cuadrados mínimos</li>
            <li>Botones para buscar y limpiar filtros</li>
            <li>Diseño responsivo con Tailwind CSS</li>
          </ul>
          <h2>Uso</h2>
          <p>El componente se puede usar directamente en cualquier página de búsqueda de propiedades.</p>
          <pre style={{ backgroundColor: '#000', color: "#00ff00", padding: '20px', borderRadius: '5px' }}>
            <code>
              {`import SearchFilters from './SearchFilters';
              
const PropertySearchPage = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <SearchFilters />
        </div>
        <div className="md:col-span-2">
          {/* Resultados de búsqueda */}
        </div>
      </div>
    </div>
  );
};`}
            </code>
          </pre>
          <h2>Funcionalidades</h2>
          <p>El componente permite:</p>
          <ul>
            <li><strong>Búsqueda inteligente:</strong> Filtrado de ubicaciones mientras el usuario escribe</li>
            <li><strong>Selección visual:</strong> Botones con iconos para elegir el tipo de propiedad</li>
            <li><strong>Control de precios:</strong> Slider para seleccionar el precio máximo</li>
            <li><strong>Controles intuitivos:</strong> Botones +/- para ajustar cantidades</li>
            <li><strong>Mostrar/ocultar:</strong> Opción para expandir filtros adicionales</li>
          </ul>
          <h2>Estados</h2>
          <p>El componente maneja internamente todos los estados de los filtros y los consolida al momento de realizar la búsqueda.</p>
          <Primary />
          <Controls />
          <Stories />
        </>
      ),
      description: {
        component: 'Panel de filtros para búsqueda de propiedades inmobiliarias con múltiples opciones de filtrado.'
      },
    },
  },
  tags: ['autodocs']
};

// Historia básica
export const Default = {};

// Historia con filtros avanzados abiertos
export const ExpandedFilters = {
  render: () => {
    // Para esta historia modificamos el componente para que inicie con los filtros avanzados visibles
    const SearchFiltersExpanded = () => {
      const SearchFiltersComponent = SearchFilters;
      React.useEffect(() => {
        // Esperamos a que el componente esté montado
        setTimeout(() => {
          const buttons = document.querySelectorAll('button');
          buttons.forEach((btn) => {
            if (btn.textContent?.includes('Mostrar filtros')) {
              (btn as HTMLButtonElement).click();
            }
          });
        }, 100);
      }, []);
    
      return <SearchFiltersComponent />;
    };
    
    return <SearchFiltersExpanded />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Muestra el componente con la sección de filtros avanzados expandida.',
      },
    },
  }
};
