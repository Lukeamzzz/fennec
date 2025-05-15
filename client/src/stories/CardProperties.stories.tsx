import { Meta, StoryObj } from "@storybook/react";
import CardProperties from "@/components/platform/dashboard/CardProperties";

const meta: Meta<typeof CardProperties> = {
    title: "Dashboard/CardProperties",
    component: CardProperties,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CardProperties>;

// Historia: cambio positivo
export const PositiveChange: Story = {
    args: {
        title: "Total de Propiedades",
        amount: 120,
        change: 5.3,
    },
};

// Historia: cambio negativo
export const NegativeChange: Story = {
    args: {
        title: "Total de Propiedades",
        amount: 80,
        change: -2.4,
    },
};

// Historia: sin cambio
export const NoChange: Story = {
    args: {
        title: "Total de Propiedades",
        amount: 100,
        change: 0,
    },
};
