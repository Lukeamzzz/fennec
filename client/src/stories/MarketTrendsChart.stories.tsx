import { Meta, StoryObj } from "@storybook/react";
import MarketTrendsChart from "@/components/platform/dashboard/MarketTrendsChart";

const meta: Meta<typeof MarketTrendsChart> = {
    title: "Dashboard/MarketTrendsChart",
    component: MarketTrendsChart,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MarketTrendsChart>;

// Historia por defecto
export const Default: Story = {};
