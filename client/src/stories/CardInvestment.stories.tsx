import { Meta, StoryObj } from "@storybook/react";
import CardInvestment from "@/components/platform/dashboard/CardInvestment";

const meta: Meta<typeof CardInvestment> = {
    title: "Dashboard/CardInvestment",
    component: CardInvestment,
    tags: ["autodocs"],
};


export default meta;
type Story = StoryObj<typeof CardInvestment>;

// Historia: caso típico de inversión en casa
export const Default: Story = {
    args: {
        title: "Villa Contempo",
        localization: "Coyoacán, CDMX",
        price: 3500000,
        roi: 3.5,           // porcentaje
        risk: "A",
        type: "casa",
    },
};

// Historia: inversión en departamento
export const Apartment: Story = {
    args: {
        title: "Depto Moderno",
        localization: "Polanco, CDMX",
        price: 5000000,
        roi: 4.2,
        risk: "B",
        type: "departamento",
    },
};

// Historia: inversión en terreno
export const Land: Story = {
    args: {
        title: "Terreno Rural",
        localization: "Milpa Alta, CDMX",
        price: 800000,
        roi: 1.8,
        risk: "C",
        type: "terreno",
    },
};
