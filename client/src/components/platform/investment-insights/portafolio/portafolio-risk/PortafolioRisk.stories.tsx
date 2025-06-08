import React from 'react';
import PortafolioRisk from './PortafolioRisk';
import { Title, Primary, Controls, Stories, ArgTypes } from '@storybook/blocks';

export default {
  title: 'Gráficos/PortafolioRisk',
  component: PortafolioRisk,
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <>
          <Title />
          <h1>Evaluación de Riesgo de Portafolio</h1>
          <p>Julián C</p>
          <p>Este componente muestra una visualización completa de los factores de riesgo de inversiones inmobiliarias con las siguientes características:</p>
          <ul>
            <li>Gráfico de barras interactivo mostrando el nivel de cada factor de riesgo</li>
            <li>Lista detallada de los principales factores de riesgo con su nivel e información</li>
            <li>Codificación por colores según el nivel de riesgo (Alto, Medio-Alto, Medio, Bajo)</li>
            <li>Componente modular dividido en subcomponentes reutilizables</li>
            <li>Personalizable a través de props para diferentes escenarios de riesgo</li>
          </ul>
          <h2>Estructura del componente</h2>
          <p>El componente está dividido en tres partes principales:</p>
          <ul>
            <li><strong>PortafolioRisk:</strong> Componente principal que integra todo</li>
            <li><strong>RiskChart:</strong> Subcomponente que muestra el gráfico de barras</li>
            <li><strong>RiskList:</strong> Subcomponente que muestra la lista de factores de riesgo</li>
            <li><strong>RiskItem:</strong> Subcomponente para cada elemento individual de riesgo</li>
          </ul>
          <h2>Tecnologías utilizadas</h2>
          <ul>
            <li><strong>Chart.js:</strong> Biblioteca para la creación del gráfico de barras</li>
            <li><strong>Tailwind CSS:</strong> Para los estilos y codificación por colores</li>
            <li><strong>React Hooks:</strong> useRef y useEffect para la gestión del ciclo de vida del gráfico</li>
          </ul>
          <h2>Props</h2>
          <ArgTypes of={PortafolioRisk} />
          <h2>Tipos de datos</h2>
          <p>El componente utiliza las siguientes estructuras de datos:</p>
          <pre style={{ backgroundColor: '#000', color: "#00ff00", padding: '20px', borderRadius: '5px' }}>
            <code>
              {`// Factor de riesgo (para el gráfico)
interface RiskFactor {
  name: string;   // Nombre del factor de riesgo
  value: number;  // Valor de 0 a 100 que indica el nivel de riesgo
}

// Nivel de riesgo (para los detalles)
type RiskLevel = 'Alto' | 'Medio' | 'Bajo' | 'Medio-Alto';

// Detalle de riesgo (para la lista)
interface RiskDetail {
  factor: string;       // Descripción del factor de riesgo
  level: RiskLevel;     // Nivel de riesgo (determina el color)
  description: string;  // Descripción o estrategia de mitigación
}`}
            </code>
          </pre>
          <h2>Uso</h2>
          <p>El componente se puede usar en dashboards de inversiones inmobiliarias para análisis de riesgo.</p>
          <pre style={{ backgroundColor: '#000', color: "#00ff00", padding: '20px', borderRadius: '5px' }}>
            <code>
              {`import PortafolioRisk from './PortafolioRisk';

const RiskAnalysisDashboard = () => {
  // Datos personalizados para el análisis de riesgo
  const marketRisks = [
    { name: "Inflación", value: 78 },
    { name: "Demanda", value: 45 },
    { name: "Competencia", value: 62 },
    { name: "Legislación", value: 53 },
    { name: "Tasas de interés", value: 70 }
  ];
  
  const riskDetails = [
    { 
      factor: "Incremento acelerado en tasas de interés", 
      level: "Alto", 
      description: "Refinanciamiento anticipado y coberturas de tasa" 
    },
    { 
      factor: "Nuevos competidores en la zona", 
      level: "Medio", 
      description: "Diferenciación en servicios y amenidades" 
    },
    { 
      factor: "Inflación sostenida por encima del 6%", 
      level: "Alto", 
      description: "Ajuste de rentas indexado a inflación" 
    }
  ];
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <PortafolioRisk 
        title="Análisis de Riesgo de Mercado" 
        subtitle="Factores macroeconómicos y competitivos"
        riskFactors={marketRisks}
        riskDetails={riskDetails}
      />
    </div>
  );
};`}
            </code>
          </pre>
          <h2>Codificación de colores</h2>
          <p>Los niveles de riesgo se muestran con la siguiente codificación de colores:</p>
          <ul>
            <li><span style={{ backgroundColor: '#FEE2E2', color: '#B91C1C', padding: '2px 8px', borderRadius: '4px' }}>Alto</span>: Rojo - Requiere atención inmediata</li>
            <li><span style={{ backgroundColor: '#FEF3C7', color: '#D97706', padding: '2px 8px', borderRadius: '4px' }}>Medio-Alto</span>: Naranja - Requiere monitoreo constante</li>
            <li><span style={{ backgroundColor: '#FEF9C3', color: '#A16207', padding: '2px 8px', borderRadius: '4px' }}>Medio</span>: Amarillo - Monitoreo regular</li>
            <li><span style={{ backgroundColor: '#DCFCE7', color: '#166534', padding: '2px 8px', borderRadius: '4px' }}>Bajo</span>: Verde - Nivel de riesgo aceptable</li>
          </ul>
          <Primary />
          <Controls />
          <Stories />
        </>
      ),
      description: {
        component: 'Componente de visualización y análisis de riesgos para portafolios de inversión inmobiliaria.'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Título principal del componente',
    },
    subtitle: {
      control: 'text',
      description: 'Subtítulo o descripción breve',
    },
    riskFactors: {
      control: 'object',
      description: 'Array de factores de riesgo para el gráfico de barras',
    },
    riskDetails: {
      control: 'object',
      description: 'Array de detalles de riesgo para la lista de factores principales',
    }
  },
};

// Historia básica con valores por defecto
export const Default = {};

// Historia con riesgos de mercado
export const MarketRisks = {
  args: {
    title: "Riesgos de Mercado",
    subtitle: "Análisis de factores externos que impactan la rentabilidad",
    riskFactors: [
      { name: "Inflación", value: 78 },
      { name: "Demanda", value: 45 },
      { name: "Competencia", value: 62 },
      { name: "Legislación", value: 53 },
      { name: "Tasas de interés", value: 70 }
    ],
    riskDetails: [
      { 
        factor: "Incremento acelerado en tasas de interés", 
        level: "Alto", 
        description: "Refinanciamiento anticipado y coberturas de tasa" 
      },
      { 
        factor: "Nuevos competidores en la zona", 
        level: "Medio", 
        description: "Diferenciación en servicios y amenidades" 
      },
      { 
        factor: "Inflación sostenida por encima del 6%", 
        level: "Alto", 
        description: "Ajuste de rentas indexado a inflación" 
      }
    ]
  }
};

// Historia con riesgos operativos
export const OperationalRisks = {
  args: {
    title: "Riesgos Operativos",
    subtitle: "Análisis de factores internos y de gestión de propiedades",
    riskFactors: [
      { name: "Vacancia", value: 42 },
      { name: "Morosidad", value: 38 },
      { name: "Mantenimiento", value: 65 },
      { name: "Seguridad", value: 30 },
      { name: "Gestión", value: 25 }
    ],
    riskDetails: [
      { 
        factor: "Costos de mantenimiento por encima del presupuesto", 
        level: "Medio-Alto", 
        description: "Implementación de mantenimiento preventivo y licitaciones" 
      },
      { 
        factor: "Vacancia prolongada en propiedades comerciales", 
        level: "Medio", 
        description: "Estrategias de marketing dirigido y flexibilidad en términos" 
      },
      { 
        factor: "Incidentes de seguridad en complejo residencial", 
        level: "Bajo", 
        description: "Sistema de vigilancia actualizado y protocolos de acceso" 
      }
    ]
  }
};