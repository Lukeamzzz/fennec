import { Meta, StoryObj } from "@storybook/react";
import ProfileSection from "./ProfileSection";

const meta: Meta<typeof ProfileSection> = {
  title: "Components/Settings/Profile/ProfileSection", // Use consistent casing
  component: ProfileSection,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen", // Use fullscreen as it includes Toaster and padding
  },
  // No args needed as it wraps other components
};

export default meta;
type Story = StoryObj<typeof ProfileSection>;

export const Default: Story = {};
