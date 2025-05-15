import { Meta, StoryObj } from "@storybook/react";
import Preview from "./Preview";
import { FileText, BarChartHorizontalBig } from "lucide-react"; // Import icons

const meta: Meta<typeof Preview> = {
  title: "Components/PreviewPlaceholder",
  component: Preview,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    icon: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Preview>;

export const Default: Story = {
  args: {
    title: "Vista previa del informe",
    description:
      "Este es un ejemplo de cómo se vería el informe Property Valuation Report – Madrid. En una implementación real, aquí se mostraría el contenido real del informe.",
    icon: FileText,
  },
};

// Example with a different icon and text
export const ChartPreview: Story = {
  args: {
    title: "Vista previa del gráfico",
    description:
      "El gráfico de análisis de mercado se generará aquí una vez que los datos estén disponibles.",
    icon: BarChartHorizontalBig,
  },
};
