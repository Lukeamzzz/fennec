'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import GoogleAuth from '../GoogleAuth/GoogleAuth';

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    let tempErrors = {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
    let isValid = true;

    if (!formData.firstName) {
      tempErrors.firstName = 'Nombre es requerido';
      isValid = false;
    }

    if (!formData.lastName) {
      tempErrors.lastName = 'Apellido es requerido';
      isValid = false;
    }

    if (!formData.phone) {
      tempErrors.phone = 'Teléfono es requerido';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      tempErrors.phone = 'Teléfono debe tener 10 dígitos';
      isValid = false;
    }

    if (!formData.email) {
      tempErrors.email = 'Email es requerido';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email no es válido';
      isValid = false;
    }

    if (!formData.password) {
      tempErrors.password = 'Contraseña es requerida';
      isValid = false;
    } else if (formData.password.length < 6) {
      tempErrors.password = 'Contraseña debe tener al menos 6 caracteres';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = 'Las contraseñas no coinciden';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      console.log('Datos de registro:', formData);
    }
  };

  const handleGoogleAuth = () => {
    console.log('Procesando autenticación con Google para registro');
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Crear cuenta</h2>
        <p className="text-gray-600 mt-2">Únete a nuestra plataforma</p>
      </div>
      
      <div className="mb-6">
        <GoogleAuth mode="signup" onAuth={handleGoogleAuth} />
        
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-500 text-sm">o regístrate con email</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition`}
              placeholder="Tu nombre"
            />
            {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Apellido
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition`}
              placeholder="Tu apellido"
            />
            {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition`}
            placeholder="Tu número de teléfono"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition`}
            placeholder="tu@email.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition`}
            placeholder="Mínimo 6 caracteres"
          />
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirmar contraseña
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition`}
            placeholder="Confirma tu contraseña"
          />
          {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
          >
            Registrarse
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <Link href="/login" className="text-orange-500 hover:text-orange-600 font-medium">
            Inicia sesión
          </Link>
        </p>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6">
        <p className="text-xs text-gray-500 text-center">
          Al registrarte, aceptas nuestros{' '}
          <a href="/terms" className="text-orange-500 hover:text-orange-600">
            Términos y Condiciones
          </a>{' '}
          y{' '}
          <a href="/privacy" className="text-orange-500 hover:text-orange-600">
            Política de Privacidad
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;