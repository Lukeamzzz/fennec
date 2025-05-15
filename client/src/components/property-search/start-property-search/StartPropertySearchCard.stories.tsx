import type { Meta, StoryObj } from '@storybook/react';
import StartPropertySearchCard from './StartPropertySearchCard';

const meta: Meta<typeof StartPropertySearchCard> = {
  title: 'Componentes/Búsqueda de Propiedades/TarjetaInicioBúsqueda',
  component: StartPropertySearchCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    onClick: { action: 'click' }
  }
};

export default meta;
type Story = StoryObj<typeof StartPropertySearchCard>;

export const Predeterminado: Story = {};

export const TextoPersonalizado: Story = {
  args: {
    title: "Descubre Tu Propiedad Perfecta",
    subtitle: "Comienza Tu Búsqueda Inmobiliaria",
    description: "Utiliza nuestras potentes herramientas de búsqueda para encontrar tu propiedad ideal en Ciudad de México."
  }
}; 