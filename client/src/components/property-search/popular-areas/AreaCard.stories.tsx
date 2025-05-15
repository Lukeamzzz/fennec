import type { Meta, StoryObj } from '@storybook/react';
import AreaCard from './AreaCard';

const meta: Meta<typeof AreaCard> = {
  title: 'Componentes/Búsqueda de Propiedades/TarjetaZona',
  component: AreaCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onClick: { action: 'click' }
  }
};

export default meta;
type Story = StoryObj<typeof AreaCard>;

export const Polanco: Story = {
  args: {
    areaName: 'Polanco'
  }
};

export const Condesa: Story = {
  args: {
    areaName: 'Condesa'
  }
};

export const RomaNorte: Story = {
  args: {
    areaName: 'Roma Norte'
  }
}; 