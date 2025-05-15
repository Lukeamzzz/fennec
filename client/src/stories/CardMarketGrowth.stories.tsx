import { Meta, StoryObj } from "@storybook/react";
import CardMarketGrowth from "@/components/platform/dashboard/CardMarketGrowth";

const meta: Meta<typeof CardMarketGrowth> = {
    title: "Dashboard/CardMarketGrowth",
    component: CardMarketGrowth,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CardMarketGrowth>;

// Historia: crecimiento moderado
export const Default: Story = {
    args: {
        title: "Crecimiento del Mercado",
        amount: 5.0,
        change: 1.2,
    },
};

// Historia: crecimiento elevado
export const HighGrowth: Story = {
    args: {
        title: "Crecimiento del Mercado",
        amount: 15.3,
        change: 4.8,
    },
};

// Historia: tendencia a la baja
export const Decline: Story = {
    args: {
        title: "Crecimiento del Mercado",
        amount: 3.8,
        change: -2.1,
    },
};
