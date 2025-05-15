import { Meta, StoryObj } from "@storybook/react";
import WhiteButton from "./WhiteButton";

// Component's metadata
const meta: Meta<typeof WhiteButton> = {
    title: "Components/WhiteButton",
    component: WhiteButton,
    tags: ["autodocs"]
};

export default meta;

// Basic story
export const Basic: StoryObj<typeof WhiteButton> = {
    args: { text: "Iniciar Sesión" }
};

// Alternative story
export const Alternative: StoryObj<typeof WhiteButton> = {
    args: { text: "Ver detalles" }
};