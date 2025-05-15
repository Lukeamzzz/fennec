import type { Meta, StoryObj } from '@storybook/react';
import ActionButton from '@/components/property-search/property-card-details/ActionButton';
import { Heart, Share } from 'lucide-react';

const meta: Meta<typeof ActionButton> = {
  title: 'Componentes/Búsqueda de Propiedades/BotónAcción',
  component: ActionButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onClick: { action: 'click' }
  }
};

export default meta;
type Story = StoryObj<typeof ActionButton>;

export const BotónGuardar: Story = {
  args: {
    icon: <Heart size={20} className="text-gray-500" />,
    label: 'Guardar'
  }
};

export const BotónCompartir: Story = {
  args: {
    icon: <Share size={20} className="text-gray-500" />,
    label: 'Compartir'
  }
};

export const BotónMeGusta: Story = {
  args: {
    icon: <Heart size={20} className="text-red-500 fill-current" />,
    label: 'Me Gusta'
  }
}; 