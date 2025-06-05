import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropertyCard from './PropertyCard';
import PropertyCardSkeleton from '../skeleton/PropertyCardSkeleton';

interface LazyPropertyCardProps {
  property: any;
  index: number;
  onClick: (property: any) => void;
}

const LazyPropertyCard: React.FC<LazyPropertyCardProps> = ({ 
  property, 
  index, 
  onClick 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          // Simular tiempo de carga para una mejor UX
          setTimeout(() => {
            setIsLoaded(true);
          }, 300 + (index * 100)); // Escalonar la carga
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [index, isVisible]);

  return (
    <div ref={cardRef} className="min-h-[400px]">
      {!isVisible ? (
        // Placeholder mientras no es visible
        <div className="h-[400px] bg-gray-100 rounded-lg"></div>
      ) : !isLoaded ? (
        // Skeleton mientras carga
        <PropertyCardSkeleton />
      ) : (
        // Componente real con animación
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5,
            ease: "easeOut"
          }}
        >
          <PropertyCard
            imageUrl={property.imageUrl}
            propertyType={property.propertyType}
            title={property.title}
            price={property.price}
            address={property.address}
            description={property.description}
            beds={property.beds}
            baths={property.baths}
            area={property.area}
            onClick={() => onClick(property)}
          />
        </motion.div>
      )}
    </div>
  );
};

export default LazyPropertyCard; 