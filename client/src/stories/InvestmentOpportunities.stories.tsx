import { Meta, StoryObj } from "@storybook/react";
import InvestmentOpportunities from "@/components/platform/dashboard//InvestmentOpportunities";

const meta: Meta<typeof InvestmentOpportunities> = {
    title: "Dashboard/InvestmentOpportunities",
    component: InvestmentOpportunities,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InvestmentOpportunities>;

// Historia por defecto
export const Default: Story = {};
