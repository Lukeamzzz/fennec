"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { showCustomToast } from "@/lib/showCustomToast";
import GoogleAuth from "@/components/auth/GoogleAuth/GoogleAuth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: ''
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.nombre.trim()) {
      setError("Name is required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userData = {
        email: formData.email,
        password: formData.password,
        nombre: formData.nombre,
        telefono: formData.telefono,
        tipoRole: "usuario"
      };

      const response = await api.post('/auth/signup', userData);

      if (response.status !== 200) {
        throw new Error('Registration failed');
      }

      await signInWithEmailAndPassword(auth, formData.email, formData.password);

      showCustomToast({
        message: "Cuenta creada exitosamente",
        type: "success",
      });

      router.push("/plans");
    }  catch (error: unknown) {
      console.error("Signup error:", error);
      let errorMessage = "An error occurred during signup";

      if (typeof error === "object" && error !== null) {
        const err = error as { response?: { status?: number }, message?: string };

        if (err.response?.status === 409) {
          errorMessage = "Email already exists";
        } else if (err.response?.status === 400) {
          errorMessage = "Invalid data provided";
        } else if (err.message) {
          errorMessage = err.message;
        }
      }

      setError(errorMessage);
      showCustomToast({ message: errorMessage, type: "error" });
    }
  };

  return (
      <div className="min-h-screen flex">
        <div className="w-1/2 bg-white py-6 flex items-center">
          <div className="w-full max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-2">Únete a Fennec hoy</h1>
          <p className="text-gray-500 mb-5">Regístrate y comienza a disfrutar todo lo que tenemos para ti.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                  <div className="text-red-600 text-sm font-medium">{error}</div>
              )}

              <div>
                <label htmlFor="nombre" className="text-sm font-medium text-gray-700">
                  Nombre
                </label>

                <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-orange-500"
                    placeholder="John"
                    required
                />
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Correo electrónico
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-orange-500"
                    placeholder="ejemplo@mail.com"
                    required
                />
              </div>

              <div>
                <label htmlFor="telefono" className="text-sm font-medium text-gray-700">
                  Número celular
                </label>
                <input
                    id="telefono"
                    name="telefono"
                    type="text"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-orange-500"
                    placeholder="5512345678"
                    required
                />
              </div>

              <div>
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-orange-500"
                    placeholder="8+ caracteres"
                    required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirma tu contraseña
                </label>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-orange-500"
                    placeholder="Confirma tu contraseña"
                    required
                />
              </div>

              <button
                  type="submit"
                  className="w-full mt-8 py-3 px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-orange-500 hover:bg-orange-600 transition-colors duration-300"
              >
                Registrarse
              </button>
            </form>

            {/* Line separator */}
            <div className="flex items-center my-2 text-gray-500 text-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4">ó</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* <div>
              <GoogleAuth mode="signup"/>
            </div> */}

            <div className="text-center mt-4">
              <p className="text-gray-500">
                ¿Ya tienes cuenta?{" "}
                <Link href="/login" className="text-orange-500 hover:underline hover:text-orange-600">
                  Inicia sesión
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="w-1/2 bg-orange-600 p-8 flex items-center justify-center text-white">
          <div className="max-w-md">
            <h2 className="text-5xl font-bold mb-8">
              &#34;Descubre tu próxima oportunidad inmobiliaria con Fennec&#34;
            </h2>
            <div>
              <p className="font-semibold">- Andrés Tavera</p>
              <p className="text-sm opacity-80">Co-Fundador</p>
            </div>
          </div>
        </div>
      </div>
  );
}

export default SignupPage;
