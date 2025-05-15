import type { Meta, StoryObj } from '@storybook/react';
import PropertyLocation from './PropertyLocation';

const meta: Meta<typeof PropertyLocation> = {
  title: 'Componentes/Búsqueda de Propiedades/UbicaciónPropiedad',
  component: PropertyLocation,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  }
};

export default meta;
type Story = StoryObj<typeof PropertyLocation>;

export const Predeterminado: Story = {
  args: {
    address: 'Calle Reforma 100, Polanco, Ciudad de México',
    // We're using a placeholder image here, in a real app you would use a valid map URL
    mapUrl: '/images/placeholder-img.webp'
  }
};

export const SinMapa: Story = {
  args: {
    address: 'Calle Reforma 100, Polanco, Ciudad de México',
    mapUrl: undefined
  }
}; 