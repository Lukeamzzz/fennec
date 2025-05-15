import { Meta, StoryObj } from "@storybook/react";
import PriceChart from "@/components/platform/dashboard/property-card/PriceChart";

const meta: Meta<typeof PriceChart> = {
    title: "Dashboard/PriceChart",
    component: PriceChart,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PriceChart>;

// Historia: datos crecientes
export const IncreasingTrend: Story = {
    args: {
        previousPrices: [3000000, 3200000, 3400000, 3600000],
    },
};

// Historia: datos estables
export const FlatTrend: Story = {
    args: {
        previousPrices: [3500000, 3500000, 3500000, 3500000],
    },
};

// Historia: datos volátiles
export const VolatileTrend: Story = {
    args: {
        previousPrices: [3000000, 4000000, 3200000, 3800000],
    },
};

// Historia: pocos puntos de datos
export const MinimalData: Story = {
    args: {
        previousPrices: [3200000, 3400000],
    },
};
