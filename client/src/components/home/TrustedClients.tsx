'use client';

import React from 'react';
import { motion } from 'framer-motion';

function TrustedClients() {
  
  const clients = [
    { id: 1, name: "Cliente 1"} ,
    { id: 2, name: "Cliente 2" },
    { id: 3, name: "Cliente 3" },
    { id: 4, name: "Cliente 4" },
    { id: 5, name: "Cliente 5" },
    { id: 6, name: "Cliente 6" },
    { id: 7, name: "Cliente 7" },
    { id: 8, name: "Cliente 8" }
  ];

  // Duplicamos los clientes para crear el efecto infinito
  const duplicatedClients = [...clients, ...clients];

  return (
    <div className="py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 sm:text-4xl">
            We partner with the best
          </h2>
        </div>

        <div className="mt-12 relative">
          {/* Contenedor del carrusel con gradientes en los bordes */}
          <div className="relative overflow-hidden">
            {/* Gradiente izquierdo */}
            <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
            
            {/* Carrusel infinito con Framer Motion */}
            <motion.div
              className="flex items-center space-x-8 py-4"
              animate={{ x: [0, -1920] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear"
                }
              }}
            >
              {duplicatedClients.map((client) => (
                <div 
                  key={`${client.id}-${Math.random()}`} 
                  className="flex-none h-24 w-48 flex items-center justify-center"
                >
                  <div className="w-36 h-16 rounded flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/tec-logo.png" 
                      alt={`${client.name} logo`} 
                      className="max-h-12" 
                    />
                  </div>
                </div>
              ))}
            </motion.div>
            
            {/* Gradiente derecho */}
            <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrustedClients;