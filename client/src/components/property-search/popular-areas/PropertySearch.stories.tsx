import type { Meta, StoryObj } from '@storybook/react';
import PropertySearch from './PropertySearch';

const meta: Meta<typeof PropertySearch> = {
  title: 'Componentes/Búsqueda de Propiedades/BúsquedaPropiedad',
  component: PropertySearch,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof PropertySearch>;

export const Predeterminado: Story = {}; 