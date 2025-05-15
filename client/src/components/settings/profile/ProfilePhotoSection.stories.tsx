import { Meta, StoryObj } from "@storybook/react";
import ProfilePhotoSection from "./ProfilePhotoSection";

const meta: Meta<typeof ProfilePhotoSection> = {
  title: "Components/Settings/Profile/ProfilePhotoSection",
  component: ProfilePhotoSection,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProfilePhotoSection>;

export const Default: Story = {};
