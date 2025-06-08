"use client";
import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";
import { BarChart3, Building2, Calculator, ChartNoAxesCombined, CircleDollarSign, Database, Eye, Search, Shield, TrendingUp, Users } from "lucide-react";
import {useState, useEffect, SVGProps} from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  Icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  isPrimary?: boolean;
}

const ServiceCard = ({ title, description, features, Icon }: ServiceCardProps) => {
  return (
    <div className="rounded-xl p-8 shadow-lg group bg-white border border-gray-200">
      <div className="flex items-center mb-6">
        <div className="p-3 rounded-lg bg-orange-100">
          <Icon className="h-8 w-8 text-orange-600" />
        </div>
        <h3 className="text-2xl font-bold ml-4 text-gray-900">
          {title}
        </h3>
      </div>
      
      <p className="text-lg mb-6 text-gray-60">
        {description}
      </p>
      
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-700">
            <div className="w-2 h-2 rounded-full mr-3 transition-all duration-300 bg-orange-500"></div>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

interface SolutionCardProps {
  title: string;
  description: string;
  Icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  benefits: string[];
  index?: number;
}

const SolutionCard = ({ title, description, Icon, benefits, index = 0 }: SolutionCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 200);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className={`bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-500 border border-gray-100 transform ${
      isVisible 
        ? 'translate-y-0 opacity-100 scale-100' 
        : 'translate-y-8 opacity-0 scale-95'
    } hover:-translate-y-2`}>
      <div className="flex items-center mb-4">
        <div className={`p-3 bg-orange-100 rounded-lg transition-all duration-300 ${
          isVisible ? 'rotate-0' : 'rotate-12'
        }`}>
          <Icon className="h-6 w-6 text-orange-600" />
        </div>
        <h4 className="text-xl font-semibold ml-3 text-gray-900">{title}</h4>
      </div>
      
      <p className="text-gray-600 mb-4">{description}</p>
      
      <ul className="space-y-2">
        {benefits.map((benefit, benefitIndex) => (
          <li key={benefitIndex} className={`flex items-center text-sm text-gray-700 transition-all duration-300 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
          }`} style={{ transitionDelay: `${(index * 200) + (benefitIndex * 100)}ms` }}>
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-2"></div>
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function SolutionsPage() {
  const services = [
    {
      "title": "Plataforma de Inteligencia Inmobiliaria",
      "description": "Plataforma avanzada de búsqueda y análisis de propiedades con datos de mercado en tiempo real e información detallada.",
      "features": [
        "Búsqueda inteligente de propiedades con filtros avanzados",
        "Datos de mercado y tendencias en tiempo real",
        "Mapas interactivos e información de ubicación",
      ],
      "Icon": Search,
      "isPrimary": true
    },
    {
      "title": "Analítica de Inversión",
      "description": "Herramientas sofisticadas para el análisis de inversiones inmobiliarias, evaluación de riesgos y optimización de cartera.",
      "features": [
        "Proyecciones de ROI",
        "Análisis de tendencias de mercado",
        "Seguimiento del rendimiento de la cartera",
      ],
      "Icon": ChartNoAxesCombined
    },
    {
      "title": "Inteligencia de Mercado",
      "description": "Información profunda del mercado y análisis competitivo para ayudarte a tomar decisiones inmobiliarias informadas.",
      "features": [
        "Análisis del mercado",
        "Seguimiento de indicadores económicos"
      ],
      "Icon": TrendingUp
    },
    {
      "title": "Valoración de Propiedades",
      "description": "Valoración de propiedades utilizando algoritmos avanzados y datos completos de mercado.",
      "features": [
        "Modelos de regresión lineal",
        "Análisis comparativo de mercado",
        "Análisis del precio por metro cuadrado",
      ],
      "Icon": CircleDollarSign
    }
  ];

  const solutions = [
    {
      "title": "Para Inversionistas Inmobiliarios",
      "description": "Herramientas integrales para identificar, analizar y gestionar inversiones inmobiliarias.",
      "Icon": Building2,
      "benefits": [
        "Identificación de oportunidades de inversión",
        "Análisis de diversificación de cartera",
        "Optimización del flujo de efectivo",
        "Estrategias de sincronización del mercado"
      ]
    },
    {
      "title": "Para Agentes Inmobiliarios",
      "description": "Herramientas profesionales para atender mejor a los clientes con datos precisos del mercado y perspectivas.",
      "Icon": Users,
      "benefits": [
        "Herramientas para presentación a clientes",
        "Generación de informes de mercado",
        "Análisis de comparación de propiedades",
        "Asistencia en calificación de prospectos"
      ]
    },
    {
        "title": "Para Desarrolladores Inmobiliarios",
        "description": "Herramientas de inteligencia de mercado y análisis de sitios para la planificación de proyectos de desarrollo.",
        "Icon": Calculator,
        "benefits": [
          "Análisis de selección de sitios",
          "Pronóstico de demanda del mercado",
          "Análisis del panorama competitivo",
          "Estudios de viabilidad de desarrollo"
        ]
    },
    {
        "title": "Para Instituciones Financieras",
        "description": "Herramientas de evaluación de riesgos y gestión de cartera para préstamos e inversiones inmobiliarias.",
        "Icon": Shield,
        "benefits": [
          "Evaluación de riesgo crediticio",
          "Gestión de riesgo de cartera",
          "Análisis de exposición al mercado",
          "Soporte para cumplimiento normativo"
        ]
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Services Section */}
      <div className="pt-35 pb-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestros servicios principales</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Poderosas herramientas de análisis para la toma de decisiones inmobiliarias inteligentes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </div>

      {/* Solutions by Industry Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">Soluciones por Industria</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up">
              Soluciones personalizadas para diferentes profesionales dentro del ecosistema inmobiliario.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((solution, index) => (
              <SolutionCard key={index} {...solution} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Technology Section */}
      <div className="py-30 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Impulsado por Tecnología Avanzada</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nuestra plataforma aprovecha tecnología de vanguardia para ofrecer información precisa en tiempo real.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Análisis de datos</h3>
              <p className="text-gray-600">
                Procesa miles de registros de propiedades y datos de mercado para proporcionar información integral.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aprendizaje Automático</h3>
              <p className="text-gray-600">
                Algoritmos que aprenden de patrones de mercado para ofrecer predicciones y valoraciones precisas.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Monitoreo en Tiempo Real</h3>
              <p className="text-gray-600">
                Seguimiento continuo del mercado y actualizaciones instantáneas para mantenerte informado.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      
    </div>
  );
} 