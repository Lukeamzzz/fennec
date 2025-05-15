import { Meta, StoryObj } from "@storybook/react";
import Header from "@/components/platform/dashboard/property-card/Header";


const meta: Meta<typeof Header> = {
    title: "Dashboard/Header",
    component: Header,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Header>;

// Historia: caso típico
export const Default: Story = {
    args: {
        name: "Villa Contempo",
        location: "Coyoacán, CDMX",
    },
};

// Historia: nombre y ubicación largos
export const LongText: Story = {
    args: {
        name: "Residencia de Lujo en las Montañas con Vista Panorámica",
        location: "Valle de Bravo, Estado de México",
    },
};

// Historia: sin ubicación (caso borde)
export const NoLocation: Story = {
    args: {
        name: "Propiedad Misteriosa",
        location: "",
    },
};
