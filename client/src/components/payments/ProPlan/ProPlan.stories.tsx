import React from 'react';
import ProPlan from './ProPlan';
import { Title, Primary, Controls, Stories, ArgTypes } from '@storybook/blocks';

export default {
  title: 'Planes/ProPlan',
  component: ProPlan,
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <>
          <Title />
          <h1>Plan Profesional</h1>
          <p>Julián C</p>
          <p>Este componente muestra la tarjeta del plan profesional con las siguientes características:</p>
          <ul>
            <li>Diseño claro con fondo blanco y detalles en naranja</li>
            <li>Soporte para precios mensuales y anuales</li>
            <li>Lista de características incluidas en el plan</li>
            <li>Botón para seleccionar el plan</li>
            <li>Diseño responsivo con Tailwind CSS</li>
            <li>Totalmente personalizable a través de props</li>
          </ul>
          <h2>Props</h2>
          <ArgTypes of={ProPlan} />
          <h2>Uso</h2>
          <p>El componente se utiliza típicamente en una página de precios junto con otros planes.</p>
          <pre style={{ backgroundColor: '#000', color: "#00ff00", padding: '20px', borderRadius: '5px' }}>
            <code>
              {`import React, { useState } from 'react';
import ProPlan from './ProPlan';

const PricingPage = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  
  const handlePlanSelection = () => {
    console.log('Plan profesional seleccionado');
    // Redirigir a la página de checkout o mostrar formulario
  };
  
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Nuestros Planes</h1>
      
      {/* Toggle para cambiar entre precios mensuales y anuales */}
      <div className="flex justify-center mb-12">
        <button 
          className={\`px-4 py-2 \${isMonthly ? 'bg-orange-500 text-white' : 'bg-gray-200'}\`}
          onClick={() => setIsMonthly(true)}
        >
          Mensual
        </button>
        <button 
          className={\`px-4 py-2 \${!isMonthly ? 'bg-orange-500 text-white' : 'bg-gray-200'}\`}
          onClick={() => setIsMonthly(false)}
        >
          Anual
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ProPlan 
          isMonthly={isMonthly}
          monthlyPrice={150}
          annualPrice={1299}
          features={[
            'Acceso a todas las propiedades',
            'Búsquedas avanzadas',
            'Notificaciones de nuevas propiedades',
            'Visualización de datos de mercado',
            'Soporte por email'
          ]}
          onSelectPlan={handlePlanSelection}
        />
        
      </div>
    </div>
  );
};`}
            </code>
          </pre>
          <h2>Personalización</h2>
          <p>El componente es altamente personalizable a través de sus props:</p>
          <ul>
            <li><strong>isMonthly:</strong> Controla si se muestra el precio mensual o anual</li>
            <li><strong>monthlyPrice:</strong> Establece el precio mensual</li>
            <li><strong>annualPrice:</strong> Establece el precio anual</li>
            <li><strong>features:</strong> Array de características incluidas en el plan</li>
            <li><strong>onSelectPlan:</strong> Función que se ejecuta al hacer clic en el botón</li>
          </ul>
          <h2>Diseño</h2>
          <p>El diseño utiliza un esquema de colores claro con acentos en naranja para resaltar elementos importantes. Este estilo contrasta con el plan Empresarial para diferenciar claramente las opciones disponibles.</p>
          <Primary />
          <Controls />
          <Stories />
        </>
      ),
      description: {
        component: 'Componente de tarjeta para mostrar el plan profesional con precios y características.'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isMonthly: {
      control: 'boolean',
      description: 'Controla si se muestra el precio mensual o anual',
    },
    monthlyPrice: {
      control: 'number',
      description: 'Precio mensual del plan en pesos mexicanos',
    },
    annualPrice: {
      control: 'number',
      description: 'Precio anual del plan en pesos mexicanos',
    },
    features: {
      control: 'array',
      description: 'Lista de características incluidas en el plan',
    },
    onSelectPlan: {
      action: 'planSelected',
      description: 'Función que se ejecuta al hacer clic en el botón de selección',
    },
  },
};

// Historia básica con valores por defecto
export const Default = {};

// Historia con precio mensual
export const Monthly = {
  args: {
    isMonthly: true,
    features: [
      'Acceso a todas las propiedades',
      'Búsquedas avanzadas',
      'Notificaciones de nuevas propiedades',
      'Visualización de datos de mercado',
      'Soporte por email'
    ]
  }
};

// Historia con precio anual
export const Annual = {
  args: {
    isMonthly: false,
    features: [
      'Acceso a todas las propiedades',
      'Búsquedas avanzadas',
      'Notificaciones de nuevas propiedades',
      'Visualización de datos de mercado',
      'Soporte por email'
    ]
  }
};

// Historia con precios personalizados
export const CustomPricing = {
  args: {
    isMonthly: true,
    monthlyPrice: 199,
    annualPrice: 1999,
    features: [
      'Acceso a todas las propiedades',
      'Búsquedas avanzadas',
      'Notificaciones de nuevas propiedades',
      'Visualización de datos de mercado',
      'Soporte por email',
      'Exportación de datos en CSV'
    ]
  }
};