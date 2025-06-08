import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";
import {ArrowRight, BadgeCheck, ChartNoAxesCombined, CircleDollarSign, Gauge, Shield, TrendingUp } from "lucide-react";
import FeatureCard from "@/components/home/FeatureCard";
import Link from "next/link";
import TypingEffect from "@/lib/TypingEffect";
import TestimonialCard from "@/components/home/TestimonialCard";

const plans = [
  {
    name: "Inicial",
    price: 499,
    features: [
      "5 valoraciones de propiedad al mes",
      "Informes de tendencias del mercado",
      "Visualización de datos limitada",
      "Soporte por correo electrónico"
    ]
  },
  {
    name: "Profesional",
    price: 999,
    features: [
      "15 valoraciones de propiedad al mes",
      "Análisis detallado del mercado",
      "Visualización interactiva de datos",
      "Soporte prioritario por correo y chat",
      "Generación de informes personalizados"
    ],
    isPopular: true
  },
  {
    name: "Empresarial",
    price: 1999,
    features: [
      "50 valoraciones de propiedad al mes",
      "Análisis en tiempo real del mercado",
      "Modelado avanzado de riesgos",
      "Visualización de datos personalizada",
      "Soporte dedicado 24/7",
      "Soporte para integración personalizada"
    ]
  }
];

export default function Home() {
  return (
    <div>
      <Navbar/>
      
      <div className="w-full bg-[#F56C12] flex items-center justify-around text-center h-screen px-10 pt-20 shadow-xl">
        <div className="w-1/2 space-y-10 text-left">
          <h1 className="text-white text-6xl font-bold">Optimiza tus decisiones con inteligencia inmobiliaria</h1>
          <p className="text-white text-2xl">Accede a análisis estratégicos, visualizaciones intuitivas y modelos predictivos para comprender el mercado, anticipar tendencias y tomar decisiones con mayor confianza.</p>
        </div>
        
        <img src="./images/3DHouse.png" alt="" className="w-1/3"/>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#F56C12" d="M0,160L30,165.3C60,171,120,181,180,160C240,139,300,85,360,53.3C420,21,480,11,540,32C600,53,660,107,720,117.3C780,128,840,96,900,117.3C960,139,1020,213,1080,208C1140,203,1200,117,1260,85.3C1320,53,1380,75,1410,85.3L1440,96L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"></path>
      </svg>

      <div className="bg-white w-full mb-30">
      <h1 className="text-gray-900 text-5xl font-bold text-center mb-7">Transformamos datos en oportunidades</h1>
      <h4 className="text-gray-600 text-center text-xl font-medium mb-10">Descubre el potencial y el valor real de cualquier propiedad con las herramientas avanzadas de Fennec</h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mx-20">
          <FeatureCard
            title="Valoración Precisa"
            description="Aprovecha algoritmos avanzados para analizar múltiples factores y determinar valores de propiedades."
            Icon={CircleDollarSign}
          />
          <FeatureCard
            title="Análisis de Mercado"
            description="Sigue tendencias del mercado para identificar oportunidades de inversión óptimas."
            Icon={TrendingUp}
          />
          <FeatureCard
            title="Evaluación de Riesgos"
            description="Analiza riesgos potenciales para tomar decisiones de inversión más seguras e informadas."
            Icon={Shield}
          />
          <FeatureCard
            title="Seguimiento de Rendimiento"
            description="Monitorea el rendimiento de tu portafolio de inversiones."
            Icon={ChartNoAxesCombined}
          />
          <FeatureCard
            title="Panel Intuitivo"
            description="Visualiza datos en tiempo real con gráficos dinámicos y paneles para obtener información profunda."
            Icon={Gauge}
          />
          
          <Link href="/signup" className="bg-white text-xl font-semibold flex items-center justify-center border-2 border-orange-500 border-dashed rounded-xl hover:scale-103 duration-300">
            <div className="flex items-center p-6">
              Únete a Fennec
              <ArrowRight className="h-6 w-6 ml-2" />
            </div>
          </Link>
        </div>
      </div>

      <div className="bg-gray-300 w-full py-30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-15">
            <TypingEffect/>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard
          quote="Gracias a Fennec, pude identificar una oportunidad que otros inversores pasaron por alto. Mi rendimiento fue tres veces mayor de lo que esperaba."
          name="María Zardoya"
          role="Inversionista Inmobiliaria"
          />
          <TestimonialCard
            quote="Como agente inmobiliario, Fennec me ha permitido ofrecer valoraciones precisas en tiempo récord y ganarme la confianza de mis clientes."
            name="Ella Marija Lani"
            role="Agente Inmobiliario"
          />
          <TestimonialCard
            quote="El análisis de tendencias me ha ayudado a anticipar los cambios del mercado antes que la competencia."
            name="Fiona Apple"
            role="Desarrolladora Inmobiliaria"
          />
          </div>
        </div>
      </div>

      <div className="w-full py-20">
        <div className="text-center pb-13">
          <h2 className="text-5xl font-bold pb-5">Tu inversión comieza aquí</h2>
          <p className="text-muted-foreground text-lg">Crea tu cuenta y elige entre nuestros planes para comenzar a aprovechar todas las ventajas.{" "}
            <Link href={"/signup"} className="text-orange-500 hover:text-orange-600 font-medium underline underline-offset-2">
             Únete ahora.
            </Link>
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-10 justify-center">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-gray-900 to-gray-700 w-90 max-w-sm p-4 shadow-xl rounded-xl duration-300 hover:-translate-y-1 relative"
            >
              {plan.isPopular && (
                <span className="absolute -top-3 right-4 bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Popular
                </span>
              )}

              <h1 className="text-3xl mt-2 font-semibold text-white">
                {plan.name}
              </h1>
              <div className="flex flex-col items-center my-3 text-white">
                <h2 className="text-6xl font-semibold">${plan.price.toLocaleString()}</h2>
                <p className="text-sm">mxn/mes</p>
              </div>
              <ul className="space-y-2 w-full py-4 flex flex-col">
                {plan.features.map((text, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <BadgeCheck className="text-orange-600 min-w-2 h-6 mt-0.5" />
                    <span className="flex-1 text-white">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <Footer/>
    </div>
  );
}