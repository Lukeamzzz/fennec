import type { Meta, StoryObj } from '@storybook/react';
import PropertyCard from './PropertyCard';

const meta: Meta<typeof PropertyCard> = {
  title: 'Componentes/Búsqueda de Propiedades/TarjetaPropiedad',
  component: PropertyCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onFavoriteToggle: { action: 'favoritoToggle' },
    onClick: { action: 'click' },
    onPropertyTypeClick: { action: 'tipoPropiedadClick' }
  }
};

export default meta;
type Story = StoryObj<typeof PropertyCard>;

export const Apartamento: Story = {
  args: {
    imageUrl: '/images/placeholder-img.webp',
    propertyType: 'Apartamento',
    title: 'Apartamento de Lujo',
    price: 500000,
    address: 'Calle Reforma 100',
    description: 'Hermosa propiedad con increíbles comodidades en una ubicación excelente con vistas panorámicas.',
    beds: 1,
    baths: 1,
    area: 80,
    isFavorited: false
  }
};

export const Casa: Story = {
  args: {
    imageUrl: '/images/placeholder-img.webp',
    propertyType: 'Casa',
    title: 'Casa Familiar Moderna',
    price: 950000,
    address: 'Avenida Polanco 123',
    description: 'Espaciosa casa familiar con jardín, perfecta para quienes buscan comodidad y tranquilidad.',
    beds: 3,
    baths: 2,
    area: 150,
    isFavorited: true
  }
};

export const Terreno: Story = {
  args: {
    imageUrl: '/images/placeholder-img.webp',
    propertyType: 'Terreno',
    title: 'Oportunidad de Desarrollo',
    price: 750000,
    address: 'Boulevard Condesa 45',
    description: 'Excelente terreno en zona de alta plusvalía, ideal para construir la casa de tus sueños.',
    beds: 0,
    baths: 0,
    area: 500,
    isFavorited: false
  }
}; 