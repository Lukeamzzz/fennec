import { Meta, StoryObj } from "@storybook/react";
import RiskFactors from "@/components/platform/dashboard/property-card/RiskFactors";

const meta: Meta<typeof RiskFactors> = {
    title: "Dashboard/RiskFactors",
    component: RiskFactors,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RiskFactors>;

// Historia por defecto con un par de factores de riesgo
export const Default: Story = {
    args: {
        riskFactors: ["Inundaciones", "Grietas"],
    },
};

// Historia sin factores de riesgo (lista vacía)
export const Empty: Story = {
    args: {
        riskFactors: [],
    },
};

// Historia con múltiples factores para probar scroll/overflow
export const Multiple: Story = {
    args: {
        riskFactors: [
            "Inundaciones",
            "Grietas",
            "Retraso de obra",
            "Deterioro estructural",
            "Cambios regulatorios",
            "Demanda baja",
        ],
    },
};
