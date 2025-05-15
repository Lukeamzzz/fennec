import { Meta, StoryObj } from "@storybook/react";
import DetailsGrid from "@/components/platform/dashboard/property-card/DetailsGrid";

const meta: Meta<typeof DetailsGrid> = {
    title: "Dashboard/DetailsGrid",
    component: DetailsGrid,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DetailsGrid>;

// Historia: Valores por defecto
export const Default: Story = {
    args: {
        price: 3500000,
        size: 120,
        bedrooms: 3,
        bathrooms: 2,
    },
};

// Historia: Propiedad compacta/cómoda
export const Compact: Story = {
    args: {
        price: 500000,
        size: 45,
        bedrooms: 1,
        bathrooms: 1,
    },
};

// Historia: Propiedad de lujo/gran escala
export const Luxury: Story = {
    args: {
        price: 10000000,
        size: 500,
        bedrooms: 10,
        bathrooms: 8,
    },
};
