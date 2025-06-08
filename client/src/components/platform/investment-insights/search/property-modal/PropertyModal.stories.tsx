import React from 'react';
import PropertyModal from './PropertyModal';
import { Title, Primary, Controls, Stories, ArgTypes } from '@storybook/blocks';
import { useArgs } from '@storybook/client-api';

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

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Propiedades/PropertyModal',
  component: PropertyModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => (
        <>
          <Title />
          <h1>Modal de Detalles de Propiedad</h1>
          <p>Julián C</p>
          <p>Este componente implementa un modal interactivo que muestra información detallada de una propiedad inmobiliaria con las siguientes características:</p>
          <ul>
            <li>Animaciones suaves de entrada y salida usando Framer Motion</li>
            <li>Imagen principal ampliada con precio destacado</li>
            <li>Información completa organizada en secciones</li>
            <li>Características detalladas con iconos</li>
            <li>Descripción extendida de la propiedad</li>
            <li>Información de contacto</li>
            <li>Características adicionales específicas según el tipo de propiedad</li>
            <li>Múltiples formas de cerrar el modal (botón X, tecla ESC, clic en overlay)</li>
            <li>Bloqueo de scroll del documento cuando el modal está abierto</li>
          </ul>
          <h2>Tecnologías utilizadas</h2>
          <ul>
            <li><strong>Framer Motion:</strong> Biblioteca de animaciones para React</li>
            <li><strong>Lucide React:</strong> Iconos vectoriales de alta calidad</li>
            <li><strong>Tailwind CSS:</strong> Para el diseño responsivo y estilizado</li>
          </ul>
          <h2>Props</h2>
          <ArgTypes of={PropertyModal} />
          <h2>Uso</h2>
          <p>El componente se utiliza típicamente junto con PropertyCard para mostrar detalles adicionales al hacer clic en &#34;Ver detalles&#34;.</p>
          <pre style={{ backgroundColor: '#000', color: "#00ff00", padding: '20px', borderRadius: '5px' }}>
            <code>
              {`import React, { useState } from 'react';
import PropertyModal from './PropertyModal';
import PropertyCard from './PropertyCard';

const PropertyView = ({ property }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  return (
    <>
      <button 
        onClick={openModal}
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
      >
        Ver detalles
      </button>
      
      <PropertyModal 
        property={property}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};`}
            </code>
          </pre>
          <h2>Accesibilidad</h2>
          <p>El modal implementa las siguientes características de accesibilidad:</p>
          <ul>
            <li>Cierre mediante tecla ESC</li>
            <li>Enfoque del contenido para lectores de pantalla</li>
            <li>Evita interacción con el contenido subyacente cuando está abierto</li>
          </ul>
          <h2>Comportamiento responsivo</h2>
          <p>El modal se adapta a diferentes tamaños de pantalla:</p>
          <ul>
            <li><strong>Móvil:</strong> Ocupa casi toda la pantalla con padding reducido</li>
            <li><strong>Tablet:</strong> Padding medio con diseño de características en 2 columnas</li>
            <li><strong>Escritorio:</strong> Tamaño máximo limitado con diseño optimizado</li>
          </ul>
          <Primary />
          <Controls />
          <Stories />
        </>
      ),
      description: {
        component: 'Modal interactivo y animado que muestra información detallada de una propiedad inmobiliaria.'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    property: {
      description: 'Objeto con datos completos de la propiedad',
      control: 'object',
    },
    isOpen: {
      description: 'Estado que controla si el modal está abierto o cerrado',
      control: 'boolean',
    },
    onClose: {
      description: 'Función callback que se ejecuta al cerrar el modal',
      action: 'closed',
    }
  },

};

// Historia principal con el modal abierto mostrando una casa
export const Casa = {
  render: function Render() {
    const [args, updateArgs] = useArgs();
    
    const handleClose = () => {
      updateArgs({ isOpen: false });
    };
    
    return (
      <PropertyModal
        property={sampleProperty}
        isOpen={args.isOpen}
        onClose={handleClose}
      />
    );
  },
  args: {
    property: sampleProperty,
    isOpen: true,
  },
};

// Historia con el modal mostrando un departamento
export const Departamento = {
  render: function Render() {
    const [args, updateArgs] = useArgs();
    
    const handleClose = () => {
      updateArgs({ isOpen: false });
    };
    
    return (
      <PropertyModal
        property={{
          ...sampleProperty,
          title: "Departamento de Lujo en Condesa",
          type: "Departamento",
          recamaras: 2,
          banos: 2,
          estacionamiento: 1,
          metros: 95,
          price: 3200000,
          address: "Av. Ámsterdam 45, Condesa, CDMX",
        }}
        isOpen={args.isOpen}
        onClose={handleClose}
      />
    );
  },
  args: {
    isOpen: true,
  },
};

// Historia con el modal mostrando un terreno
export const Terreno = {
  render: function Render() {
    const [args, updateArgs] = useArgs();
    
    const handleClose = () => {
      updateArgs({ isOpen: false });
    };
    
    return (
      <PropertyModal
        property={{
          ...sampleProperty,
          title: "Terreno en Valle de Bravo",
          type: "Terreno",
          recamaras: 0,
          banos: 0,
          estacionamiento: 0,
          metros: 1500,
          price: 2800000,
          address: "Camino al Lago s/n, Valle de Bravo, Estado de México",
        }}
        isOpen={args.isOpen}
        onClose={handleClose}
      />
    );
  },
  args: {
    isOpen: true,
  },
};

