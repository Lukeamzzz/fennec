import { Meta, StoryObj } from "@storybook/react";
import ReportContent from "./ReportContent";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof ReportContent> = {
  title: "Components/ReportContent",
  component: ReportContent,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    title: { control: "text" },
    subtitle: { control: "text" },
    reports: { control: "object" },
  },
};

export default meta;
type Story = StoryObj<typeof ReportContent>;

const sampleReports = [
  {
    id: 1,
    name: "Property Valuation Report - Madrid",
    date: "2023-07-10",
    type: "Valuation",
    size: "5.1 MB",
    onPreview: action("Preview clicked for report 1"),
    onDownload: action("Download clicked for report 1"),
  },
  {
    id: 2,
    name: "Barcelona Property Values Q2",
    date: "2023-06-25",
    type: "Valuation",
    size: "4.5 MB",
    onPreview: action("Preview clicked for report 2"),
    onDownload: action("Download clicked for report 2"),
  },
  {
    id: 3,
    name: "Valencia Real Estate Assessment",
    date: "2023-06-05",
    type: "Valuation",
    size: "3.8 MB",
    onPreview: action("Preview clicked for report 3"),
    onDownload: action("Download clicked for report 3"),
  },
];

export const Default: Story = {
  args: {
    title: "Informes de Valoración de Propiedades",
    subtitle:
      "Informes detallados sobre valoraciones de propiedades en diferentes regiones",
    reports: sampleReports,
  },
};

export const Empty: Story = {
  args: {
    title: "Informes de Valoración de Propiedades",
    subtitle:
      "Informes detallados sobre valoraciones de propiedades en diferentes regiones",
    reports: [], // Example with no reports
  },
};
