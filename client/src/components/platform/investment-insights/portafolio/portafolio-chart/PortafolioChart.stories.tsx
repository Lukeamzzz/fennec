import React from "react";
import PortafolioChart from "./PortafolioChart";
import { Title, Primary, Controls, Stories, ArgTypes } from "@storybook/blocks";

export default {
  title: "Gráficos/PortafolioChart",
  component: PortafolioChart,
  parameters: {
    layout: "centered",
    docs: {
      page: () => (
        <>
          <Title />
          <h1>Gráfico de Portafolio Inmobiliario</h1>
          <p>Julián C</p>
          <p>
            Este componente muestra un resumen visual del portafolio de
            inversiones inmobiliarias con las siguientes características:
          </p>
          <ul>
            <li>
              Gráfico de pastel interactivo mostrando la distribución de
              inversiones
            </li>
            <li>Etiquetas con porcentajes para cada segmento del portafolio</li>
            <li>
              Tabla resumen por tipo de propiedad mostrando unidades, valor y
              rendimiento
            </li>
            <li>Botón para añadir nuevas propiedades al portafolio</li>
            <li>Diseño responsivo y personalizable a través de props</li>
            <li>
              Indicadores visuales de rendimiento con codificación por colores
            </li>
          </ul>
          <h2>Tecnologías utilizadas</h2>
          <ul>
            <li>
              <strong>Chart.js:</strong> Biblioteca para la creación de gráficos
              interactivos
            </li>
            <li>
              <strong>Tailwind CSS:</strong> Para los estilos y diseño
              responsivo
            </li>
            <li>
              <strong>React Hooks:</strong> useRef y useEffect para la gestión
              del ciclo de vida del gráfico
            </li>
          </ul>
          <h2>Props</h2>
          <ArgTypes of={PortafolioChart} />
          <h2>Ejemplo de datos</h2>
          <p>
            El componente acepta datos de distribución y propiedades con la
            siguiente estructura:
          </p>
          <pre
            style={{
              backgroundColor: "#000",
              color: "#00ff00",
              padding: "20px",
              borderRadius: "5px",
            }}
          >
            <code>
              {`// Datos de distribución (para el gráfico de pastel)
const distributionData = [
  { name: "Residencial CDMX", value: 40, color: "#FF7043" },
  { name: "Comercial CDMX", value: 25, color: "#0D47A1" },
  { name: "Residencial Guadalajara", value: 15, color: "#FFC107" },
  { name: "Comercial Monterrey", value: 12, color: "#E53935" },
  { name: "Desarrollos Mixtos", value: 8, color: "#26A69A" }
];

// Datos de propiedades (para la tabla resumen)
const properties = [
  { type: "Apartamentos", units: 12, value: 24.5, percentYield: 7.8 },
  { type: "Casas", units: 4, value: 18.2, percentYield: 6.5 },
  { type: "Locales Comerciales", units: 8, value: 12.7, percentYield: 9.2 },
  { type: "Terrenos", units: 2, value: 5.3, percentYield: 4.8 }
];`}
            </code>
          </pre>
          <h2>Uso</h2>
          <p>
            El componente se puede usar en dashboards o páginas de resumen de
            inversiones inmobiliarias.
          </p>
          <pre
            style={{
              backgroundColor: "#000",
              color: "#00ff00",
              padding: "20px",
              borderRadius: "5px",
            }}
          >
            <code>
              {`import PortafolioChart from './PortafolioChart';

const InvestorDashboard = () => {
  // Datos personalizados para el portafolio
  const myDistribution = [
    { name: "Zona Norte", value: 45, color: "#4CAF50" },
    { name: "Zona Sur", value: 35, color: "#2196F3" },
    { name: "Zona Centro", value: 20, color: "#FF9800" }
  ];
  
  const myProperties = [
    { type: "Residencial", units: 8, value: 12.3, percentYield: 8.1 },
    { type: "Comercial", units: 3, value: 9.5, percentYield: 7.2 }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <PortafolioChart 
          title="Mi Portafolio" 
          subtitle="Inversiones actuales"
          distributionData={myDistribution}
          properties={myProperties}
        />
      </div>
      <div>
        {/* Otros componentes del dashboard */}
      </div>
    </div>
  );
};`}
            </code>
          </pre>
          <h2>Notas de implementación</h2>
          <p>
            El componente gestiona correctamente el ciclo de vida del gráfico,
            incluyendo:
          </p>
          <ul>
            <li>Creación inicial del gráfico cuando el componente se monta</li>
            <li>Actualización cuando los datos cambian</li>
            <li>Limpieza de recursos cuando el componente se desmonta</li>
          </ul>
          <Primary />
          <Controls />
          <Stories />
        </>
      ),
      description: {
        component:
          "Componente de visualización de portafolio inmobiliario que muestra la distribución de inversiones con gráfico de pastel y tabla resumen.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Título principal del widget",
    },
    subtitle: {
      control: "text",
      description: "Subtítulo descriptivo del widget",
    },
    distributionData: {
      control: "object",
      description: "Datos para el gráfico de distribución",
    },
    properties: {
      control: "object",
      description: "Lista de propiedades con detalles para la tabla resumen",
    },
  },
};

// Historia básica con datos por defecto
export const Default = {};

// Historia con distribución personalizada
export const CustomDistribution = {
  args: {
    distributionData: [
      { name: "Zona Norte", value: 45, color: "#4CAF50" },
      { name: "Zona Sur", value: 35, color: "#2196F3" },
      { name: "Zona Centro", value: 20, color: "#FF9800" },
    ],
    title: "Distribución Regional",
    subtitle: "Inversiones por zona geográfica",
  },
};

// Historia con portafolio de alto rendimiento
export const HighYieldPortfolio = {
  args: {
    title: "Portafolio de Alto Rendimiento",
    subtitle: "Inversiones con >8% de rendimiento anual",
    properties: [
      {
        type: "Locales Comerciales Premium",
        units: 6,
        value: 18.7,
        percentYield: 10.5,
      },
      {
        type: "Edificios Corporativos",
        units: 2,
        value: 32.4,
        percentYield: 9.8,
      },
      {
        type: "Desarrollos Turísticos",
        units: 3,
        value: 15.3,
        percentYield: 12.2,
      },
      {
        type: "Terrenos en Desarrollo",
        units: 4,
        value: 8.9,
        percentYield: 8.7,
      },
    ],
    distributionData: [
      { name: "Comercial", value: 45, color: "#5E35B1" },
      { name: "Corporativo", value: 30, color: "#00897B" },
      { name: "Turístico", value: 15, color: "#EF6C00" },
      { name: "Desarrollo", value: 10, color: "#6D4C41" },
    ],
  },
};
