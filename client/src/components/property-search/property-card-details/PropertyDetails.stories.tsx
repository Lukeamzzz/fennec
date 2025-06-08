import type { Meta, StoryObj } from '@storybook/react';
import PropertyDetails from '@/components/property-search/property-card-details/PropertyDetails';

const meta: Meta<typeof PropertyDetails> = {
  title: 'Componentes/Búsqueda de Propiedades/DetallesPropiedad',
  component: PropertyDetails,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    onCallAgent: { action: 'llamó al agente' },
    onEmailAgent: { action: 'envió email al agente' },
    onSave: { action: 'guardó propiedad' },
    onShare: { action: 'compartió propiedad' },
    onContactAgent: { action: 'contactó al agente' },
    onClose: { action: 'cerró detalles' }
  }
};

export default meta;
type Story = StoryObj<typeof PropertyDetails>;

const imagenesMuestra = [
  '/images/placeholder-img.webp',
  '/images/placeholder-img.webp',
  '/images/placeholder-img.webp',
];

export const ApartamentoDeLujo: Story = {
  args: {
    title: 'Apartamento de Lujo',
    address: 'Calle Reforma 100, Polanco',
    description: 'Hermosa propiedad con increíbles comodidades en una ubicación deseable. Perfecta para familias o inversionistas que buscan bienes raíces de calidad.',
    price: 500000,
    beds: 1,
    baths: 1,
    area: 80,
    year: 2000,
    amenities: [
      { name: 'Estacionamiento' },
      { name: 'Seguridad' },
      { name: 'Piscina' },
      { name: 'Gimnasio' },
      { name: 'Jardín' }
    ],
    isSaved: false,
    images: imagenesMuestra,
    initialImageIndex: 0
  }
};

export const CasaFamiliar: Story = {
  args: {
    title: 'Casa Familiar Moderna',
    address: 'Avenida Polanco 123, Polanco',
    description: 'Espaciosa casa familiar con jardín, perfecta para quienes buscan comodidad y tranquilidad. Cuenta con acabados de alta gama, excelente iluminación natural y cercanía a escuelas y parques.',
    price: 950000,
    beds: 3,
    baths: 2,
    area: 150,
    year: 2015,
    amenities: [
      { name: 'Jardín' },
      { name: 'Estacionamiento' },
      { name: 'Sistema de Seguridad' },
      { name: 'Área de BBQ' }
    ],
    isSaved: true,
    images: imagenesMuestra,
    initialImageIndex: 0
  }
}; 