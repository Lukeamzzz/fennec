import { Meta, StoryObj } from "@storybook/react";
import CardSubscription from "./CardSubscription";

// Component's metadata
const meta: Meta<typeof CardSubscription> = {
  title: "Components/CardSubscription",
  component: CardSubscription,
  tags: ["autodocs"],
};

export default meta;

export const Profesional: StoryObj<typeof CardSubscription> = {
    args: { 
        name: "Profesional", 
        price: 499.99,
        features: ["Acceso a todas las funcionalidades", "Soporte prioritario", "Actualizaciones regulares"],
        isPopular: false
    }
};

export const Empresarial: StoryObj<typeof CardSubscription> = {
    args: {
        name: "Empresarial",
        price: 799.99,
        features: ["Acceso a todas las funcionalidades", "Soporte prioritario", "Actualizaciones regulares", "Asesoramiento personalizado", "Acceso a recursos adicionales"],
        isPopular: true,
        bgColor: 'bg-stone-100'
    }
};