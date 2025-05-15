import { Meta, StoryObj } from "@storybook/react";
import ProfileInfoSection from "./ProfileInfoSection";
import { Toaster } from "sonner";

const meta: Meta<typeof ProfileInfoSection> = {
  title: "Components/Settings/Profile/ProfileInfoSection",
  component: ProfileInfoSection,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
        <Toaster position="bottom-right" />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProfileInfoSection>;

export const Default: Story = {};
