import type { Meta, StoryObj } from '@storybook/react';
import EnterPlan from './EnterPlan';

const meta: Meta<typeof EnterPlan> = {
  title: 'Payments/EnterPlan',
  component: EnterPlan,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Monthly: Story = {
  args: {
    isMonthly: true,
  },
};

export const Annual: Story = {
  args: {
    isMonthly: false,
  },
};