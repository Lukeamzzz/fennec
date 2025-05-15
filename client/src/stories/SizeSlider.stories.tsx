import { Meta, StoryObj } from "@storybook/react";
import SizeSlider from "@/components/platform/dashboard/SizeSlider";

const meta: Meta<typeof SizeSlider> = {
    title: "Dashboard/SizeSlider",
    component: SizeSlider,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SizeSlider>;

// Historia por defecto
export const Default: Story = {};
