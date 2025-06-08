import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4">
                {/* Top section with logo and social icons */}
                <div className="pt-10 flex flex-col md:flex-row items-center justify-between">
                    <Link href="/">
                        <div className="flex items-center mb-6 md:mb-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/IconOnly.png" alt="FennecLogo" className="w-20 h-20 object-contain object-center" />
                            <span className="text-xl font-bold">FENNEC</span>
                        </div>
                    </Link>
                    
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white p-2 transition-colors duration-200">
                            <Facebook size={20} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white p-2 transition-colors duration-200">
                            <Instagram size={20} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white p-2 transition-colors duration-200">
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>
                
                {/* Main link sections */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mx-auto max-w-6xl py-8">
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="font-bold mb-4 text-xl">Páginas</h3>
                        <ul className="space-y-3">
                        <li><Link href="/" className="hover:text-gray-300 transition-colors duration-200">Inicio</Link></li>
                        <li><Link href="/about" className="hover:text-gray-300 transition-colors duration-200">Acerca de</Link></li>
                        <li><Link href="/services" className="hover:text-gray-300 transition-colors duration-200">Servicios</Link></li>
                        <li><Link href="/contact" className="hover:text-gray-300 transition-colors duration-200">Contacto</Link></li>
                        </ul>
                    </div>

                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="font-bold mb-4 text-xl">Cuenta</h3>
                        <ul className="space-y-3">
                        <li><Link href="/login" className="hover:text-gray-300 transition-colors duration-200">Iniciar sesión</Link></li>
                        <li><Link href="/register" className="hover:text-gray-300 transition-colors duration-200">Registrarse</Link></li>
                        <li><Link href="/profile" className="hover:text-gray-300 transition-colors duration-200">Perfil</Link></li>
                        <li><Link href="/settings" className="hover:text-gray-300 transition-colors duration-200">Configuración</Link></li>
                        </ul>
                    </div>

                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="font-bold mb-4 text-xl">Soporte</h3>
                        <ul className="space-y-3">
                        <li><Link href="/help" className="hover:text-gray-300 transition-colors duration-200">Centro de ayuda</Link></li>
                        <li><Link href="/faq" className="hover:text-gray-300 transition-colors duration-200">Preguntas frecuentes</Link></li>
                        <li><Link href="/tickets" className="hover:text-gray-300 transition-colors duration-200">Tickets</Link></li>
                        <li><Link href="/contact-support" className="hover:text-gray-300 transition-colors duration-200">Contáctanos</Link></li>
                        </ul>
                    </div>

                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="font-bold mb-4 text-xl">Contacto</h3>
                        <ul className="space-y-3">
                        <li className="flex items-center">
                            <Mail size={16} className="mr-2 text-gray-400" />
                            <a href="mailto:info@fennec.com" className="hover:text-gray-300 transition-colors duration-200">info@fennec.com</a>
                        </li>
                        <li className="flex items-center">
                            <Phone size={16} className="mr-2 text-gray-400" />
                            <a href="tel:+123456789" className="hover:text-gray-300 transition-colors duration-200">+1 (234) 567-89</a>
                        </li>
                        <li className="flex items-center">
                            <MapPin size={16} className="mr-2 text-gray-400" />
                            <span>123 Calle Analytics, Ciudad de México</span>
                        </li>
                        </ul>
                    </div>
                    </div>

                    {/* Sección de copyright */}
                    <div className="text-center py-6">
                    <p className="text-gray-400">&copy; {new Date().getFullYear()} FENNEC ANALYTICS. Todos los derechos reservados v1.0</p>
                    <div className="mt-4 space-x-4">
                        <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">Términos de servicio</Link>
                        <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">Política de privacidad</Link>
                    </div>
                    </div>

            </div>
        </footer>
    );
};

export default Footer;