import React from 'react';
import ActionButton from '@/components/property-search/property-card-details/ActionButton';
import HeartButton from '@/components/property-search/property-card-details/HeartButton';
import '@/styles/animations.css';

interface PriceCardProps {
  price: number;
  onCallAgent?: () => void;
  onEmailAgent?: () => void;
  onSave?: () => void;
  onShare?: () => void;
  isSaved?: boolean;
}

const PriceCard: React.FC<PriceCardProps> = ({
  price,
  onCallAgent,
  onEmailAgent,
  onSave,
  onShare,
  isSaved = false
}) => {
  return (
    <div className="border rounded-lg p-4 h-fit">
      <h2 className="text-lg font-semibold mb-1">Precio</h2>
      <p className="text-3xl font-bold text-gray-900 mb-6">${price.toLocaleString()}</p>
      
      <h3 className="font-medium mb-4">Contactar agente</h3>
      
      <div className="flex flex-col gap-3 mb-6">
        <button 
          className="flex items-center justify-center w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded transition-colors"
          onClick={onCallAgent}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
            <path d="M22 16.92V19.92C22 20.4704 21.7893 20.9996 21.4142 21.3746C21.0391 21.7497 20.5099 21.9604 19.9595 21.96C16.4285 21.96 13.0285 20.6405 10.2615 18.379C7.74149 16.339 5.70995 13.6095 4.3805 10.53C3.07995 7.756 1.76095 4.341 1.80045 0.799C1.80045 0.248 2.01045 -0.282 2.38545 -0.657C2.76045 -1.032 3.28945 -1.243 3.84045 -1.243H6.84045C7.92045 -1.243 8.84995 -0.533 9.01995 0.521C9.12045 1.068 9.27095 1.601 9.47095 2.115C9.78095 2.939 9.59145 3.866 9.00045 4.456L7.74045 5.716C9.00045 8.679 11.3694 11.046 14.3305 12.307L15.5905 11.047C16.1805 10.458 17.1075 10.267 17.9315 10.577C18.4455 10.778 18.9785 10.929 19.5255 11.029C20.6045 11.203 21.2994 12.175 21.2994 13.232L22 16.92Z" stroke="currentColor" fill="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="translate(0, 1)" />
          </svg>
          Llamar
        </button>
        
        <button 
          className="flex items-center justify-center w-full border border-gray-300 text-gray-700 py-3 px-4 rounded hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 transition-colors"
          onClick={onEmailAgent}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
            <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Email
        </button>
      </div>
      
      <div className="flex gap-2">
        <HeartButton 
          isLiked={isSaved}
          onClick={onSave}
        />
        
        <ActionButton 
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
          label="Compartir"
          onClick={onShare}
        />
      </div>
    </div>
  );
};

export default PriceCard; 