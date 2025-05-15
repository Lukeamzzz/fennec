import { Meta, StoryObj } from "@storybook/react";
import PropertyEstimator from "@/components/platform/dashboard/PropertyEstimator";

const meta: Meta<typeof PropertyEstimator> = {
    title: "Dashboard/PropertyEstimator",
    component: PropertyEstimator,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PropertyEstimator>;

// Historia por defecto
export const Default: Story = {};
