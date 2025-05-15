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
        amenities: ["Piscina", "Gimnasio", "Estacionamiento"],
        investmentGrade: "A+",
        phone: "5551234567",
    },
};

// Historia: Sin amenidades
export const EmptyAmenities: Story = {
    args: {
        amenities: [],
        investmentGrade: "B",
        phone: "5559876543",
    },
};

// Historia: Grado de inversión bajo
export const LowInvestmentGrade: Story = {
    args: {
        amenities: ["Jardín", "Terraza"],
        investmentGrade: "C",
        phone: "5551122334",
    },
};
