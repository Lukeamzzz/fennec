import { Meta, StoryObj } from "@storybook/react";
import InvestmentInsight from "./InvestmentInsight";

const meta: Meta<typeof InvestmentInsight> = {
  /**
   * Specifies the title of the story.
   */
  title: "Components/InvestmentInsight",
  /**
   * Specifies the component to display in the story.
   */
  component: InvestmentInsight,
  /**
   * Specifies the tags to display in the story.
   */
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  /**
   * Specifies the argTypes to display in the story.
   */
  argTypes: {
    title: { control: "text" },
    badgeText: { control: "text" },
    location: { control: "text" },
    description: { control: "text" },
    investmentRequired: { control: "text" },
    projectedRoi: { control: "text" },
    estimatedTerm: { control: "text" },
    riskLevel: { control: "text" },
    highlights: { control: "object" },
    tags: { control: "object" },
  },
};

export default meta;
type Story = StoryObj<typeof InvestmentInsight>;

// Default story that matches the exact design from the image
export const Default: Story = {
  args: {
    title: "Desarrollo Vertical Cuauhtémoc",
    badgeText: "Desarrollo",
    location: "Cuauhtémoc, CDMX",
    description:
      "Proyecto de desarrollo de torre de uso mixto en una de las zonas con mayor potencial de crecimiento en la Ciudad de México.",
    investmentRequired: "$75-120M",
    projectedRoi: "14.2%",
    estimatedTerm: "36-48 meses",
    riskLevel: "Medio",
    highlights: [
      "50+ unidades residenciales",
      "Amenidades de lujo",
      "Planta baja comercial",
      "Certificación LEED",
    ],
    tags: ["Alta Demanda", "Zona Premium"],
  },
};
