import type { Meta, StoryObj } from '@storybook/react';
import LikeButton from './LikeButton';

const meta: Meta<typeof LikeButton> = {
  title: 'Componentes/Búsqueda de Propiedades/BotónMeGusta',
  component: LikeButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onToggle: { action: 'toggle' }
  }
};

export default meta;
type Story = StoryObj<typeof LikeButton>;

export const Predeterminado: Story = {
  args: {
    isLiked: false
  }
};

export const MeGusta: Story = {
  args: {
    isLiked: true
  }
}; 