import type { Meta, StoryObj } from '@storybook/react';
import PropertyTypeCard from './PropertyTypeCard';

const meta: Meta<typeof PropertyTypeCard> = {
  title: 'Componentes/Búsqueda de Propiedades/TarjetaTipoPropiedad',
  component: PropertyTypeCard,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'click' }
  }
};

export default meta;
type Story = StoryObj<typeof PropertyTypeCard>;

export const Departamentos: Story = {
  args: {
    type: 'Departamentos'
  }
};

export const Casas: Story = {
  args: {
    type: 'Casas'
  }
};

export const Terreno: Story = {
  args: {
    type: 'Terreno'
  }
}; 