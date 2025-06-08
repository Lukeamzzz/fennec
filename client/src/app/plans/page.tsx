"use client";
import CardSubscription from "@/stories/CardSubscription";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PlansPage() {
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver a inicio
        </Link>
      </div>

      <div className="container mx-auto px-4 py-7">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Escoge el plan correcto para ti</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <CardSubscription
              key={index}
              name={plan.name}
              price={plan.price}
              features={plan.features}
              isPopular={plan.isPopular}
            />
          ))}
        </div>
      </div>
    </div>
  );
}