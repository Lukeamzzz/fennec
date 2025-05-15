import { Meta, StoryObj } from "@storybook/react";
import CardValuationData from "@/components/platform/dashboard/CardValuationData";

const meta: Meta<typeof CardValuationData> = {
    title: "Dashboard/CardValuationData",
    component: CardValuationData,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CardValuationData>;

// Historia: crecimiento positivo
export const Growth: Story = {
    args: {
        title: "Valor de mercado",
        amount: 4500000,
        change: 5.4,
    },
};

// Historia: descenso en valoración
export const Decline: Story = {
    args: {
        title: "Valor de mercado",
        amount: 4200000,
        change: -3.2,
    },
};

// Historia: sin variación respecto al mes anterior
export const Stable: Story = {
    args: {
        title: "Valor de mercado",
        amount: 4300000,
        change: 0,
    },
};
