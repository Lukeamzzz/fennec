import type { Meta, StoryObj } from '@storybook/react';
import ImageGallery from '@/components/property-search/property-card-details/ImageGallery';
import { useState } from 'react';

const meta: Meta<typeof ImageGallery> = {
  title: 'Componentes/Búsqueda de Propiedades/GaleríaImágenes',
  component: ImageGallery,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onPrevImage: { action: 'imagen anterior' },
    onNextImage: { action: 'siguiente imagen' },
    goToImage: { action: 'ir a imagen' }
  }
};

export default meta;
type Story = StoryObj<typeof ImageGallery>;

const imagenesMuestra = [
  '/images/placeholder-img.webp',
  '/images/placeholder-img.webp',
  '/images/placeholder-img.webp',
];

export const UnicoImagen: Story = {
  args: {
    images: ['/images/placeholder-img.webp'],
    currentImageIndex: 0,
    totalImages: 1,
    title: 'Casa Ejemplo'
  }
};

export const MultipleImagenes: Story = {
  args: {
    images: imagenesMuestra,
    currentImageIndex: 0,
    totalImages: imagenesMuestra.length,
    title: 'Casa Ejemplo'
  }
};

export const SegundaImagen: Story = {
  args: {
    images: imagenesMuestra,
    currentImageIndex: 1,
    totalImages: imagenesMuestra.length,
    title: 'Casa Ejemplo'
  }
};

// Historia interactiva con funcionalidad de navegación real
export const Interactivo: Story = {
  render: function Render(args) {
    const [currentIdx, setCurrentIdx] = useState(0);
    const images = imagenesMuestra;
    
    const handlePrev = () => {
      setCurrentIdx(prev => (prev === 0 ? images.length - 1 : prev - 1));
    };
    
    const handleNext = () => {
      setCurrentIdx(prev => (prev === images.length - 1 ? 0 : prev + 1));
    };
    
    const goToImage = (index: number) => {
      setCurrentIdx(index);
    };
    
    return (
      <ImageGallery
        {...args}
        images={images}
        currentImageIndex={currentIdx}
        totalImages={images.length}
        onPrevImage={handlePrev}
        onNextImage={handleNext}
        goToImage={goToImage}
        title="Demostración Interactiva"
      />
    );
  }
}; 