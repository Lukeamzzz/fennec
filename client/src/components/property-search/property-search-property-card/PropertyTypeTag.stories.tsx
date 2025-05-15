import type { Meta, StoryObj } from '@storybook/react';
import PropertyTypeTag from './PropertyTypeTag';

const meta: Meta<typeof PropertyTypeTag> = {
  title: 'Componentes/Búsqueda de Propiedades/EtiquetaTipoPropiedad',
  component: PropertyTypeTag,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'imagen',
      values: [
        {
          name: 'imagen',
          value: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80)',
        },
      ],
    },
  },
  argTypes: {
    onClick: { action: 'click' }
  }
};

export default meta;
type Story = StoryObj<typeof PropertyTypeTag>;

export const Apartamento: Story = {
  args: {
    type: 'Apartamento'
  }
};

export const Casa: Story = {
  args: {
    type: 'Casa'
  }
};

export const Terreno: Story = {
  args: {
    type: 'Terreno'
  }
}; 