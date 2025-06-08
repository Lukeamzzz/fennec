import React from 'react';
import Image from 'next/image';

interface BenefitComponentProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
}

const BenefitComponent: React.FC<BenefitComponentProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  reverse = false
}) => {
  return (
    <div className={`flex items-center ${reverse ? 'flex-row-reverse' : ''} gap-8 mb-12`}>
      <div className="flex-1">
        <Image 
          src={imageSrc} 
          alt={imageAlt} 
          width={400}
          height={300}
          className="w-full h-auto rounded-lg shadow-lg" 
        />
      </div>
      <div className="flex-1">
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default BenefitComponent;