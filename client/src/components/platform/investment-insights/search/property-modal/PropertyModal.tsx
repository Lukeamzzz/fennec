import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Bed, Bath, Car, Square, MapPin, Phone, Mail } from 'lucide-react';
import { Property } from '../property-card/PropertyCard';

interface PropertyModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

const PropertyModal: React.FC<PropertyModalProps> = ({ property, isOpen, onClose }) => {
  // Cerrar el modal con la tecla Escape
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEscKey);
    
    // Bloquear el scroll del body cuando el modal está abierto
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);
  
  // No renderizar nada si no hay propiedad o si el modal está cerrado
  if (!property) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay de fondo */}
          <motion.div
            className="fixed inset-0 bg-black/75 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg overflow-hidden shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cabecera del modal con botón de cierre */}
              <div className="relative p-4 border-b">
                <h2 className="text-2xl font-bold pr-8">{property.title}</h2>
                <button 
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                  onClick={onClose}
                >
                  <X size={24} />
                </button>
              </div>
              
              {/* Contenido con scroll */}
              <div className="overflow-y-auto p-0">
                {/* Imagen principal */}
                <div className="relative w-full h-64 sm:h-80 md:h-96">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={property.image} 
                    alt={property.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <button className="bg-white p-2 rounded-full shadow-md">
                      <Heart size={24} />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-4 py-2 rounded font-bold text-xl">
                    ${property.price.toLocaleString()}
                  </div>
                </div>
                
                {/* Detalles de la propiedad */}
                <div className="p-6">
                  {/* Dirección */}
                  <div className="flex items-center text-gray-600 mb-6">
                    <MapPin size={20} className="mr-2" />
                    <span>{property.address}</span>
                  </div>
                  
                  {/* Características principales */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 border-b pb-6">
                    <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                      <Bed size={24} className="mb-2 text-orange-500" />
                      <span className="font-bold text-lg">{property.recamaras}</span>
                      <span className="text-sm text-gray-500">Recámaras</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                      <Bath size={24} className="mb-2 text-orange-500" />
                      <span className="font-bold text-lg">{property.banos}</span>
                      <span className="text-sm text-gray-500">Baños</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                      <Car size={24} className="mb-2 text-orange-500" />
                      <span className="font-bold text-lg">{property.estacionamiento}</span>
                      <span className="text-sm text-gray-500">Estacionamiento</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                      <Square size={24} className="mb-2 text-orange-500" />
                      <span className="font-bold text-lg">{property.metros}</span>
                      <span className="text-sm text-gray-500">m²</span>
                    </div>
                  </div>
                  
                  {/* Descripción */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-3">Descripción</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {property.description}
                      {/* Descripción expandida para el modal */}
                      {property.type === "Casa" && (
                        <>
                          <br /><br />
                          Esta hermosa casa cuenta con acabados de lujo, amplios espacios y excelente iluminación natural. 
                          La propiedad está ubicada en una zona privilegiada con fácil acceso a vías principales, 
                          centros comerciales y escuelas de prestigio.
                          <br /><br />
                          Incluye jardín privado, sistema de seguridad las 24 horas, y acabados de primera calidad.
                        </>
                      )}
                      {property.type === "Departamento" && (
                        <>
                          <br /><br />
                          Este moderno departamento ofrece espacios funcionales y cómodos con acabados contemporáneos. 
                          El edificio cuenta con amenidades como gimnasio, área de coworking y terraza común.
                          <br /><br />
                          Ubicado en una zona con excelente plusvalía y todos los servicios a tu alcance.
                        </>
                      )}
                      {property.type === "Terreno" && (
                        <>
                          <br /><br />
                          Terreno con excelente ubicación y todos los servicios disponibles. Ideal para desarrollo 
                          residencial o comercial según el uso de suelo permitido en la zona.
                          <br /><br />
                          Cuenta con documentación en regla y posibilidad de financiamiento.
                        </>
                      )}
                    </p>
                  </div>
                  
                  {/* Información de contacto */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="text-xl font-bold mb-3">Contacto</h3>
                    <div className="flex items-center mb-3">
                      <Phone size={20} className="mr-3 text-orange-500" />
                      <span>(55) 1234-5678</span>
                    </div>
                    <div className="flex items-center">
                      <Mail size={20} className="mr-3 text-orange-500" />
                      <span>contacto@inmobiliaria.com</span>
                    </div>
                  </div>
                  
                  {/* Características adicionales */}
                  {(property.type === "Casa" || property.type === "Departamento") && (
                    <div className="mb-6">
                      <h3 className="text-xl font-bold mb-3">Características</h3>
                      <ul className="grid grid-cols-2 gap-2">
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                          Cocina integral
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                          Closets
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                          {property.type === "Casa" ? "Jardín" : "Elevador"}
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                          Seguridad 24/7
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                          {property.type === "Casa" ? "Terraza" : "Gimnasio"}
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                          Cisterna
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PropertyModal;