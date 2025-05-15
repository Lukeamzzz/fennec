import { Meta, StoryObj } from "@storybook/react";
import ArrowButton from "./ArrowButton";

// Component's metadata
const meta: Meta<typeof ArrowButton> = {
  title: "Components/ArrowButton",
  component: ArrowButton,
  tags: ["autodocs"]
};

export default meta;

// Basic story
export const Basic: StoryObj<typeof ArrowButton> = {
  args: { text: "Comenzar", className: "py-3 px-9" }
};

// Alternative story
export const Alternative: StoryObj<typeof ArrowButton> = {
  args: { text: "Ver Detalles", className: "py-2 px-12"}
};
