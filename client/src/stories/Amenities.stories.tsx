import { Meta, StoryObj } from "@storybook/react";
import Amenities from "@/components/platform/dashboard/property-card/Amenities";

const meta: Meta<typeof Amenities> = {
    title: "Dashboard/Amenities",
    component: Amenities,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Amenities>;

// Historia por defecto
export const Default: Story = {
    args: {
        investmentGrade: "A+",
    },
};

// Historia: Grado de inversión bajo
export const LowInvestmentGrade: Story = {
    args: {
        investmentGrade: "C",
    },
};

// Historia: Grado de inversión numérico
export const NumericGrade: Story = {
    args: {
        investmentGrade: 8.5,
    },
};
