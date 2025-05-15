import { Meta, StoryObj } from "@storybook/react";
import PropertyType from "./PropertyType";

// Component's metadata
const meta: Meta<typeof PropertyType> = {
    title: "Components/PropertyType",
    component: PropertyType,
    tags: ["autodocs"]
}

export default meta;

// Casa story
export const Casa: StoryObj<typeof PropertyType> = {
    args: {iconType: "casa", size: 20}
};

// Departamento story
export const Departamento: StoryObj<typeof PropertyType> = {
    args: {iconType: "departamento", size: 20}
};

// Terreno story
export const Terreno: StoryObj<typeof PropertyType> = {
    args: {iconType: "terreno", size: 20}
};

// Fallback story
export const Fallback: StoryObj<typeof PropertyType> = {
    args: {iconType: "random", size: 20}
}