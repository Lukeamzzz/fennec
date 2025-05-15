import { Meta, StoryObj } from "@storybook/react";
import CreateReport from "./CreateReport";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof CreateReport> = {
  title: "Components/CreateReportForm",
  component: CreateReport,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    reportTypes: { control: "object" },
    onSubmit: { action: "submitted" },
    onClose: { action: "closed" },
  },
};

export default meta;
type Story = StoryObj<typeof CreateReport>;

const sampleReportTypes = [
  "Análisis de Mercado",
  "Valoración de Propiedad",
  "Informe de Riesgo",
  "Due Diligence",
  "Otro",
];

export const Default: Story = {
  args: {
    reportTypes: sampleReportTypes,
    onSubmit: action("Report Submitted"),
    onClose: action("Modal Closed"),
  },
};
