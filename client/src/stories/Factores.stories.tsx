import { Meta, StoryObj } from "@storybook/react";
import Factores from "./Factores";
import { Info, AlertTriangle } from "lucide-react";

const meta: Meta<typeof Factores> = {
  title: "Components/Factores",
  component: Factores,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    badgeText: { control: "text" },
    description: { control: "text" },
    badgeBgColor: { control: "color" },
    badgeTextColor: { control: "color" },
    icon: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Factores>;

// Default story replicating the provided image
export const Default: Story = {
  args: {
    title: "Saturación en mercados premium",
    badgeText: "Medio-Alto",
    description: "Exploración de mercados secundarios emergentes",
    icon: Info,
    badgeBgColor: "bg-red-100",
    badgeTextColor: "text-red-700",
  },
};

// Example story with different content and styling
export const Warning: Story = {
  args: {
    title: "Riesgo Regulatorio",
    badgeText: "Alto",
    description: "Nuevas leyes podrían impactar la inversión",
    icon: AlertTriangle,
    badgeBgColor: "bg-yellow-100",
    badgeTextColor: "text-yellow-700",
  },
};

// Example story with different content and styling
export const Positive: Story = {
  args: {
    title: "Demanda Creciente",
    badgeText: "Bajo",
    description: "Se espera un aumento en la población local",
    icon: Info, // You might use a different icon like TrendingUp
    badgeBgColor: "bg-green-100",
    badgeTextColor: "text-green-700",
  },
};
