import type { Meta, StoryObj } from '@storybook/react';
import PriceCard from '@/components/property-search/property-card-details/PriceCard';

const meta: Meta<typeof PriceCard> = {
  title: 'Componentes/Búsqueda de Propiedades/TarjetaPrecio',
  component: PriceCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onCallAgent: { action: 'llamar agente' },
    onEmailAgent: { action: 'email agente' },
    onSave: { action: 'guardar' },
    onShare: { action: 'compartir' }
  }
};

export default meta;
type Story = StoryObj<typeof PriceCard>;

export const PrecioEstándar: Story = {
  args: {
    price: 500000,
    isSaved: false
  }
};

export const PrecioAlto: Story = {
  args: {
    price: 2500000,
    isSaved: false
  }
};

export const Guardado: Story = {
  args: {
    price: 500000,
    isSaved: true
  }
}; 