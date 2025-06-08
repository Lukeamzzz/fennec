import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  currentImageIndex: number;
  totalImages: number;
  onPrevImage?: () => void;
  onNextImage?: () => void;
  goToImage?: (index: number) => void;
  title: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  currentImageIndex,
  totalImages,
  onPrevImage,
  onNextImage,
  goToImage,
  title
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const handlePrev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isTransitioning && onPrevImage) {
      setIsTransitioning(true);
      onPrevImage();
      setTimeout(() => setIsTransitioning(false), 300);
    }
  }, [isTransitioning, onPrevImage]);

  const handleNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isTransitioning && onNextImage) {
      setIsTransitioning(true);
      onNextImage();
      setTimeout(() => setIsTransitioning(false), 300);
    }
  }, [isTransitioning, onNextImage]);

  // Permitir cambio de imagen con teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && onPrevImage && !isTransitioning) {
        setIsTransitioning(true);
        onPrevImage();
        setTimeout(() => setIsTransitioning(false), 300);
      } else if (e.key === 'ArrowRight' && onNextImage && !isTransitioning) {
        setIsTransitioning(true);
        onNextImage();
        setTimeout(() => setIsTransitioning(false), 300);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onPrevImage, onNextImage, isTransitioning]);

  const mainImage = images.length > 0 ? images[currentImageIndex] : '/images/placeholder-img.webp';

  return (
    <div className="relative">
      <div className="relative h-80 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mainImage} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out"
        />
        
        {/* Sobreposición para permitir gestos de deslizamiento (swipe) */}
        <div 
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
          onClick={(e) => e.currentTarget === e.target && handleNext(e)}
        ></div>
      </div>
      
      {totalImages > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded-full">
          {currentImageIndex + 1} / {totalImages}
        </div>
      )}

      {totalImages > 1 && (
        <>
          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-orange-50 hover:text-orange-600 rounded-full p-3 shadow-md hover:bg-opacity-100 transition-all focus:outline-none focus:ring-2 focus:ring-orange-300"
            onClick={handlePrev}
            aria-label="Imagen anterior"
            disabled={isTransitioning}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-orange-50 hover:text-orange-600 rounded-full p-3 shadow-md hover:bg-opacity-100 transition-all focus:outline-none focus:ring-2 focus:ring-orange-300"
            onClick={handleNext}
            aria-label="Siguiente imagen"
            disabled={isTransitioning}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
      
      {/* Miniaturas inferiores para navegación rápida */}
      {totalImages > 1 && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-30 py-2 px-4">
          <div className="flex items-center justify-center gap-2 overflow-x-auto">
            {images.map((img, index) => (
              <button 
                key={index}
                className={`w-12 h-8 border-2 flex-shrink-0 transition-all ${
                  index === currentImageIndex 
                    ? 'border-orange-500 opacity-100' 
                    : 'border-transparent opacity-70 hover:opacity-100 hover:border-orange-300'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (index !== currentImageIndex && !isTransitioning) {
                    setIsTransitioning(true);
                    if (goToImage) {
                      goToImage(index);
                    } else {
                      // Lógica anterior por si goToImage no está disponible
                      if (index > currentImageIndex && onNextImage) {
                        for (let i = 0; i < index - currentImageIndex; i++) {
                          setTimeout(() => onNextImage(), i * 50);
                        }
                      } else if (index < currentImageIndex && onPrevImage) {
                        for (let i = 0; i < currentImageIndex - index; i++) {
                          setTimeout(() => onPrevImage(), i * 50);
                        }
                      }
                    }
                    setTimeout(() => setIsTransitioning(false), 300);
                  }
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img} 
                  alt={`Miniatura ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery; 