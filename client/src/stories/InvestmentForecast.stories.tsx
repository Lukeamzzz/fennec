import { Meta, StoryObj } from "@storybook/react";
import InvestmentForecast from "@/components/platform/dashboard/property-card/InvestmentForecast";

const meta: Meta<typeof InvestmentForecast> = {
    title: "Dashboard/InvestmentForecast",
    component: InvestmentForecast,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InvestmentForecast>;

// Historia por defecto
export const Default: Story = {
    args: {
        valuation3Years: 4500000,
        valuation5Years: 5500000,
        growthRate: 5,        // % anual
        roiMonthly: 10000,    // ingreso mensual por renta
        breakevenYears: 7,    // años hasta punto de equilibrio
        occupancyRate: 85,    // % de ocupación
    },
};

// Historia: Crecimiento alto
export const HighGrowth: Story = {
    args: {
        valuation3Years: 5000000,
        valuation5Years: 7000000,
        growthRate: 12,
        roiMonthly: 12000,
        breakevenYears: 6,
        occupancyRate: 90,
    },
};

// Historia: Baja ocupación y ROI
export const LowPerformance: Story = {
    args: {
        valuation3Years: 3000000,
        valuation5Years: 3200000,
        growthRate: 2,
        roiMonthly: 4000,
        breakevenYears: 12,
        occupancyRate: 60,
    },
};
