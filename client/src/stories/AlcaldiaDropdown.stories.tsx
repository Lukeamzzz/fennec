import { Meta, StoryObj } from "@storybook/react";
import AlcaldiaDropdown from "@/components/platform/dashboard/dropdowns/AlcaldiaDropdown";


const meta: Meta<typeof AlcaldiaDropdown> = {
    title: "Dashboard/AlcaldiaDropdown",
    component: AlcaldiaDropdown,
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof AlcaldiaDropdown>;

// Historia por defecto (usa la primera alcaldía)
export const Default: Story = {};
