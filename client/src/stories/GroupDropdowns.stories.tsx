import { Meta, StoryObj } from "@storybook/react";
import GroupDropdowns from "@/components/platform/dashboard/dropdowns/GroupDropdowns";

const meta: Meta<typeof GroupDropdowns> = {
    title: "Dashboard/GroupDropdowns",
    component: GroupDropdowns,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GroupDropdowns>;

// Historia por defecto
export const Default: Story = {};
