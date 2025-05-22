import { Meta, StoryObj } from "@storybook/react";
import DashboardPropertyCard from "@/components/platform/dashboard/property-card/DashboardPropertyCard";

const meta: Meta<typeof DashboardPropertyCard> = {
    title: "Dashboard/DashboardPropertyCard",
    component: DashboardPropertyCard,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DashboardPropertyCard>;

// Historia: Uso típico
export const Default: Story = {
    args: {
        name: "Villa Contempo",
        location: "Coyoacán, CDMX",
        description:
            "Hermosa propiedad de estilo contemporáneo, con amplios espacios y excelente iluminación natural.",
        price: 3500000,
        size: 120,
        bedrooms: 3,
        bathrooms: 2,
        previousPrices: [3000000, 3200000, 3400000],
        valuation3Years: 4500000,
        valuation5Years: 5500000,
        growthRate: 0.05,
        roiMonthly: 0.003,
        occupancyRate: 0.85,
        riskFactors: ["Inundaciones", "Grietas"],
        amenities: ["Piscina", "Gimnasio", "Estacionamiento"],
        investmentGrade: "A",
    },
};

// Historia: Sin amenidades ni riesgos
export const Minimal: Story = {
    args: {
        name: "Loft Urbano",
        location: "Roma Norte, CDMX",
        description: "Loft céntrico, ideal para inversionistas que buscan simplicidad.",
        price: 2500000,
        size: 60,
        bedrooms: 1,
        bathrooms: 1,
        previousPrices: [2300000, 2400000],
        valuation3Years: 2800000,
        valuation5Years: 3000000,
        growthRate: 0.04,
        roiMonthly: 0.0025,
        breakevenYears: 8,
        occupancyRate: 0.9,
        riskFactors: [],
        amenities: [],
        investmentGrade: "B",

    },
};

// Historia: Alto riesgo y baja calificación
export const HighRisk: Story = {
    args: {
        name: "Edificio Antiguo",
        location: "Tlalpan, CDMX",
        description:
            "Propiedad con potencial de revalorización, sujeto a reparaciones estructurales.",
        price: 1500000,
        size: 200,
        bedrooms: 4,
        bathrooms: 3,
        previousPrices: [1400000, 1450000, 1500000],
        valuation3Years: 1600000,
        valuation5Years: 1700000,
        growthRate: 0.015,
        roiMonthly: 0.001,
        breakevenYears: 12,
        occupancyRate: 0.7,
        riskFactors: ["Sismos", "Retraso de obra", "Deterioro"],
        amenities: ["Jardín"],
        investmentGrade: "C",
    },
};
