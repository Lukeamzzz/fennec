import type { Meta, StoryObj } from '@storybook/react';
import GoogleAuth from './GoogleAuth';

const meta: Meta<typeof GoogleAuth> = {
  title: 'Auth/GoogleAuth',
  component: GoogleAuth,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LoginMode: Story = {};

export const RegisterMode: Story = {};