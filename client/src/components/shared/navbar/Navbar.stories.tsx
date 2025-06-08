import React from 'react';
import Navbar from './Navbar';
import { Title, Primary, Controls, Stories } from '@storybook/blocks';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Layout/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => (
        <>
          <Title />
          <h1>Barra de Navegación Principal</h1>
          <p>Julián C</p>
          <p>Este componente implementa la barra de navegación principal de la aplicación con las siguientes características:</p>
          <ul>
            <li>Logo de la empresa con enlace a la página principal</li>
            <li>Enlaces de navegación principales a secciones clave (Planes, Soluciones, Nosotros)</li>
            <li>Botones de acción para iniciar sesión y comenzar a usar la aplicación</li>
            <li>Diseño fijo (fixed) en la parte superior de la página</li>
            <li>Fondo con sombra para destacar visualmente</li>
            <li>Integración con componentes reutilizables de UI (OrangeButton, WhiteButton, BasicLink)</li>
          </ul>
          <h2>Estructura de la barra de navegación</h2>
          <p>La barra está organizada en tres secciones principales de igual ancho:</p>
          <ol>
            <li><strong>Izquierda (1/3):</strong> Logo de Fennec con enlace a la página de inicio</li>
            <li><strong>Centro (1/3):</strong> Enlaces principales de navegación</li>
            <li><strong>Derecha (1/3):</strong> Botones de acción (Iniciar Sesión y Comenzar)</li>
          </ol>
          <h2>Componentes utilizados</h2>
          <p>Este componente utiliza los siguientes componentes reutilizables:</p>
          <ul>
            <li><strong>BasicLink:</strong> Componente para enlaces de navegación con estilo consistente</li>
            <li><strong>WhiteButton:</strong> Botón con estilo blanco para acciones secundarias</li>
            <li><strong>OrangeButton:</strong> Botón con estilo naranja para la acción principal</li>
          </ul>
          <h2>Uso</h2>
          <p>La barra de navegación está diseñada para ser utilizada en todas las páginas de la aplicación como parte del layout principal.</p>
          <pre style={{ backgroundColor: '#000', color: "#00ff00", padding: '20px', borderRadius: '5px' }}>
            <code>
              {`import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Añadir un espaciador para compensar la barra de navegación fija */}
      <div className="h-24"></div>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};`}
            </code>
          </pre>
          <h2>Comportamiento</h2>
          <p>La barra de navegación:</p>
          <ul>
            <li>Permanece fija en la parte superior durante el desplazamiento (posición fixed)</li>
            <li>Tiene un índice z-50 para asegurar que permanezca por encima de otros elementos</li>
            <li>Incluye sombra para proporcionar elevación visual</li>
            <li>Utiliza un fondo neutral para integrarse con diferentes diseños de página</li>
          </ul>
          <h2>Nota sobre la implementación</h2>
          <p>Es importante considerar el espacio que ocupa la barra de navegación fija (altura) al diseñar el contenido de la página para evitar que este quede oculto debajo de la barra.</p>
          <Primary />
          <Controls />
          <Stories />
        </>
      ),
      description: {
        component: 'Barra de navegación principal con logo, enlaces y botones de acción.'
      },
    },
  },
  tags: ['autodocs'],
};
