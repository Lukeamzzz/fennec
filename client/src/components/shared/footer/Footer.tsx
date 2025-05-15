import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4">
                {/* Top section with logo and social icons */}
                <div className="py-10 flex flex-col md:flex-row items-center justify-between">
                    <Link href="/">
                        <div className="flex items-center mb-6 md:mb-0">
                            <img src="/images/IconOnly.png" alt="FennecLogo" className="w-20 h-20 object-contain object-center" />
                            <span className="ml-3 text-xl font-bold">FENNEC ANALYTICS</span>
                        </div>
                    </Link>
                    
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white p-2 transition-colors duration-200">
                            <Facebook size={20} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white p-2 transition-colors duration-200">
                            <Twitter size={20} />
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
                        <h3 className="font-bold mb-4 text-xl">Pages</h3>
                        <ul className="space-y-3">
                            <li><Link href="/" className="hover:text-gray-300 transition-colors duration-200">Home</Link></li>
                            <li><Link href="/about" className="hover:text-gray-300 transition-colors duration-200">About</Link></li>
                            <li><Link href="/services" className="hover:text-gray-300 transition-colors duration-200">Services</Link></li>
                            <li><Link href="/contact" className="hover:text-gray-300 transition-colors duration-200">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="font-bold mb-4 text-xl">Account</h3>
                        <ul className="space-y-3">
                            <li><Link href="/login" className="hover:text-gray-300 transition-colors duration-200">Login</Link></li>
                            <li><Link href="/register" className="hover:text-gray-300 transition-colors duration-200">Register</Link></li>
                            <li><Link href="/profile" className="hover:text-gray-300 transition-colors duration-200">Profile</Link></li>
                            <li><Link href="/settings" className="hover:text-gray-300 transition-colors duration-200">Settings</Link></li>
                        </ul>
                    </div>

                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="font-bold mb-4 text-xl">Support</h3>
                        <ul className="space-y-3">
                            <li><Link href="/help" className="hover:text-gray-300 transition-colors duration-200">Help Center</Link></li>
                            <li><Link href="/faq" className="hover:text-gray-300 transition-colors duration-200">FAQ</Link></li>
                            <li><Link href="/tickets" className="hover:text-gray-300 transition-colors duration-200">Tickets</Link></li>
                            <li><Link href="/contact-support" className="hover:text-gray-300 transition-colors duration-200">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="font-bold mb-4 text-xl">Contact</h3>
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
                                <span>123 Analytics St, San Francisco</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter subscription */}
                <div className="py-8">
                    <div className="max-w-lg mx-auto text-center">
                        <h3 className="text-xl font-bold mb-4">Subscribe to our newsletter</h3>
                        <p className="text-gray-400 mb-4">Stay updated with the latest news and announcements</p>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <input 
                                type="email" 
                                placeholder="Your email address" 
                                className="px-4 py-2 bg-gray-700 rounded-md flex-grow focus:outline-none focus:ring-2 focus:ring-gray-500"
                            />
                            <button className="px-6 py-2 bg-gray-600 hover:bg-gray-500 transition-colors duration-200 rounded-md font-medium">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Copyright section */}
                <div className="text-center py-6">
                    <p className="text-gray-400">&copy; {new Date().getFullYear()} FENNEC ANALYTICS. All rights reserved v1.0</p>
                    <div className="mt-4 space-x-4">
                        <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</Link>
                        <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</Link>
                        <Link href="/cookies" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;