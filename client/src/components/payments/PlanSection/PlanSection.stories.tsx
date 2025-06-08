import type { Meta, StoryObj } from '@storybook/react';
import PlanSection from './PlanSection';
import { Title, Primary, Controls, Stories } from '@storybook/blocks';

const meta: Meta<typeof PlanSection> = {
  title: 'Components/PlanSection',
  component: PlanSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => (
        <>
          <Title />
          <h1>Sección de Planes de Suscripción</h1>
          <p>Julián C</p>
          <p>Este componente muestra una sección completa de planes de suscripción con las siguientes características:</p>
          <ul>
            <li>Toggle interactivo para cambiar entre facturación mensual y anual</li>
            <li>Visualización de dos planes de suscripción lado a lado (Profesional y Empresarial)</li>
            <li>Actualización automática de precios según el ciclo de facturación seleccionado</li>
            <li>Diseño responsivo que se adapta a diferentes tamaños de pantalla</li>
            <li>Manejo interno del estado de selección de ciclo de facturación</li>
            <li>Funciones para manejar la selección de cada plan</li>
          </ul>
          <h2>Componentes incluidos</h2>
          <p>Este componente integra los siguientes subcomponentes:</p>
          <ul>
            <li><strong>ProPlan:</strong> Tarjeta para el plan Profesional</li>
            <li><strong>EnterPlan:</strong> Tarjeta para el plan Empresarial</li>
          </ul>
          <h2>Estructura de la sección</h2>
          <div style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '5px', marginBottom: '20px' }}>
            <h3 style={{ marginTop: 0 }}>Disposición en escritorio:</h3>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '20px' }}>
              <div style={{ width: '100%', textAlign: 'center' }}>Toggle de facturación (Mensual/Anual)</div>
              <div style={{ display: 'flex', width: '100%', gap: '20px' }}>
                <div style={{ flex: 1, backgroundColor: '#e5e7eb', padding: '20px', borderRadius: '5px', textAlign: 'center' }}>
                  Plan Profesional
                </div>
                <div style={{ flex: 1, backgroundColor: '#1f2937', color: 'white', padding: '20px', borderRadius: '5px', textAlign: 'center' }}>
                  Plan Empresarial
                </div>
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '5px' }}>
            <h3 style={{ marginTop: 0 }}>Disposición en móvil:</h3>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '20px' }}>
              <div style={{ width: '100%', textAlign: 'center' }}>Toggle de facturación (Mensual/Anual)</div>
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '20px' }}>
                <div style={{ backgroundColor: '#e5e7eb', padding: '20px', borderRadius: '5px', textAlign: 'center' }}>
                  Plan Profesional
                </div>
                <div style={{ backgroundColor: '#1f2937', color: 'white', padding: '20px', borderRadius: '5px', textAlign: 'center' }}>
                  Plan Empresarial
                </div>
              </div>
            </div>
          </div>
          <h2>Uso</h2>
          <p>El componente se implementa directamente en cualquier página donde se quieran mostrar los planes de suscripción disponibles.</p>
          <pre style={{ backgroundColor: '#000', color: "#00ff00", padding: '20px', borderRadius: '5px' }}>
            <code>
              {`import PlanSection from './components/PlanSection/PlanSection';

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">Nuestros Planes</h1>
          <p className="text-center text-gray-600 mt-2">
            Selecciona el plan que mejor se adapte a tus necesidades
          </p>
        </div>
      </header>
      
      <main>
        <PlanSection />
      </main>
      
      <footer className="bg-white py-8 mt-12">
        {/* Contenido del footer */}
      </footer>
    </div>
  );
};`}
            </code>
          </pre>
          <h2>Interacción</h2>
          <p>El componente maneja la lógica de interacción para:</p>
          <ul>
            <li>Cambiar entre ciclos de facturación (mensual/anual) con un toggle visual</li>
            <li>Propagar la selección de facturación a los componentes de plan hijo</li>
            <li>Capturar la selección de un plan específico para procesamiento posterior</li>
          </ul>
          <h2>Accesibilidad</h2>
          <p>El toggle de facturación implementa:</p>
          <ul>
            <li>Atributo aria-pressed para indicar el estado actual</li>
            <li>Atributo aria-label para describir la función del toggle</li>
            <li>Textos descriptivos que cambian de estilo según la opción seleccionada</li>
          </ul>
          <Primary />
          <Controls />
          <Stories />
        </>
      ),
      description: {
        component: 'Sección completa que muestra planes de suscripción con toggle para cambiar entre facturación mensual y anual.'
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof PlanSection>;

const defaultStory: Story = {
  args: {},
};

export { defaultStory as Default };