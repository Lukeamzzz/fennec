import { Meta, StoryObj } from "@storybook/react";
import CardProperties from "@/components/platform/dashboard/CardProperties";

const meta: Meta<typeof CardProperties> = {
    title: "Dashboard/CardProperties",
    component: CardProperties,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CardProperties>;

// Historia: propiedades normales
export const Default: Story = {
    args: {
        title: "Total de Propiedades",
        amount: 120,
    },
};

// Historia: con error
export const WithError: Story = {
    args: {
        title: "Total de Propiedades",
        amount: 0,
        error: "Error al cargar datos",
    },
};

// Historia: cantidad alta
export const HighAmount: Story = {
    args: {
        title: "Total de Propiedades",
        amount: 1500,
    },
};
