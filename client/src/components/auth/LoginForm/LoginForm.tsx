'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import GoogleAuth from '../GoogleAuth/GoogleAuth';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validate = () => {
    let tempErrors = {
      email: '',
      password: '',
      general: ''
    };
    let isValid = true;

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
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      console.log('Datos de inicio de sesión:', formData);
    }
  };

  const handleGoogleAuth = () => {
    // Lógica específica después de autenticación con Google
    console.log('Procesando autenticación con Google para inicio de sesión');
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Iniciar Sesión</h2>
        <p className="text-gray-600 mt-2">Bienvenido de nuevo</p>
      </div>
      
      {errors.general && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {errors.general}
        </div>
      )}
      
      <div className="mb-6">
        <GoogleAuth mode="login" onAuth={handleGoogleAuth} />
        
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-500 text-sm">o inicia sesión con email</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
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
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <Link href="/forgot-password" className="text-sm text-orange-500 hover:text-orange-600">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition`}
            placeholder="Tu contraseña"
          />
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
        </div>

        <div className="flex items-center">
          <input
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
          />
          <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
            Recordar sesión
          </label>
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
          >
            Iniciar Sesión
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          ¿No tienes una cuenta?{' '}
          <Link href="/signup" className="text-orange-500 hover:text-orange-600 font-medium">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;