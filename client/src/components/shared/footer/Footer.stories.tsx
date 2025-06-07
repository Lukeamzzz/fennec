import React from 'react';
import Footer from './Footer';
import { Title, Primary, Controls, Stories } from '@storybook/blocks';

export default {
  title: 'Layout/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => (
        <>
          <Title />
          <h1>Footer Corporativo</h1>
          <p>Julián C</p>
          <p>Este componente implementa el footer global de la aplicación con las siguientes características:</p>
          <ul>
            <li>Logo y marca de la empresa en la parte superior</li>
            <li>Enlaces a redes sociales con iconos interactivos</li>
            <li>Secciones organizadas de enlaces (Pages, Account, Support)</li>
            <li>Información de contacto con iconos descriptivos</li>
            <li>Formulario de suscripción al newsletter</li>
            <li>Sección de copyright con año dinámico y enlaces legales</li>
            <li>Diseño completamente responsivo para todos los tamaños de pantalla</li>
          </ul>
          <h2>Estructura del footer</h2>
          <p>El footer está organizado en varias secciones distintivas:</p>
          <ol>
            <li><strong>Cabecera:</strong> Logo e iconos de redes sociales</li>
            <li><strong>Enlaces principales:</strong> Cuatro columnas de enlaces organizados por categoría</li>
            <li><strong>Newsletter:</strong> Formulario de suscripción para captar leads</li>
            <li><strong>Copyright:</strong> Información legal y enlaces a políticas</li>
          </ol>
          <h2>Responsividad</h2>
          <p>El componente implementa un diseño completamente responsivo:</p>
          <ul>
            <li><strong>Móvil:</strong> Elementos centrados en una sola columna</li>
            <li><strong>Tablet:</strong> Enlaces en dos columnas</li>
            <li><strong>Escritorio:</strong> Disposición completa en cuatro columnas</li>
          </ul>
          <h2>Uso</h2>
          <p>El footer está diseñado para ser utilizado en todas las páginas de la aplicación.</p>
          <pre style={{ backgroundColor: '#000', color: "#00ff00", padding: '20px', borderRadius: '5px' }}>
            <code>
              {`import Footer from './components/Footer/Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        {/* Componente de header aquí */}
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};`}
            </code>
          </pre>
          <h2>Iconos</h2>
          <p>El componente utiliza iconos de Lucide React para mejorar la experiencia visual:</p>
          <ul>
            <li>Iconos de redes sociales (Facebook, Twitter, Instagram, LinkedIn)</li>
            <li>Iconos de contacto (Mail, Phone, MapPin)</li>
          </ul>
          <h2>Enlaces</h2>
          <p>Todos los enlaces utilizan el componente Link de Next.js para navegación del lado del cliente, mejorando el rendimiento y la experiencia de usuario.</p>
          <Primary />
          <Controls />
          <Stories />
        </>
      ),
      description: {
        component: 'Footer corporativo completo con enlaces, información de contacto, redes sociales y formulario de newsletter.'
      },
    },
  },
  tags: ['autodocs'],
};

// Historia básica
export const Default = {};


