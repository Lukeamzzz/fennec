"use client";
import CardSubscription from "@/stories/CardSubscription";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PlansPage() {
  const plans = [
    {
      name: "Starter",
      price: 499,
      features: [
        "5 property valuations per month",
        "Market trend reports",
        "Limited data visualization",
        "Email support"
      ],
      bgColor: "bg-white"
    },
    {
      name: "Professional",
      price: 999,
      features: [
        "15 property valuations per month",
        "Detailed market analysis",
        "Interactive data visualization",
        "Priority email & chat support",
        "Custom reports generation",
      ],
      isPopular: true,
      bgColor: "bg-white"
    },
    {
      name: "Enterprise",
      price: 1999,
      features: [
        "50 property valuations per month",
        "Real-time market analytics",
        "Advanced risk modeling",
        "Custom data visualization",
        "24/7 dedicated support",
        "Custom integration support"
      ],
      bgColor: "bg-white"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose the right plan for you</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <CardSubscription
              key={index}
              name={plan.name}
              price={plan.price}
              features={plan.features}
              isPopular={plan.isPopular}
              bgColor={plan.bgColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}