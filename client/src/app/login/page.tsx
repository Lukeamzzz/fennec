"use client";
import GoogleAuth from "@/components/auth/GoogleAuth/GoogleAuth";
import Link from "next/link";
import React, { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import api from "@/services/api";

function LoginPage() {
    const router = useRouter();
    const { loading } = useAuth();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            console.log("=== FRONTEND LOGIN DEBUG ===");
            console.log("Email:", email);

            // First Firebase authentication
            const result = await signInWithEmailAndPassword(auth, email, password);
            console.log("Firebase UID:", result.user.uid);
            console.log("Firebase Email:", result.user.email);

            // Then validate with backend
            const loginData = {
                firebaseId: result.user.uid,
                email: result.user.email
            };
            console.log("Sending to backend:", loginData);

            try {
                const response = await api.post('/auth/login', loginData);
                console.log("Backend response:", response.data);
                router.push("/platform/dashboard");
            } catch (backendErr) {
                console.error("Backend error:", backendErr);
                await auth.signOut();
                setError("La cuenta no fue encontrada en el sistema. Por favor regístrate.");
            }
        } catch (err) {
            console.error("Firebase error:", err);
            setError("Credenciales inválidas. Intenta de nuevo.");
        }
    };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="w-1/2 bg-white p-8 flex items-center">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-2">Bienvenido de nuevo a Fennec</h1>
          <p className="text-gray-500 mb-8">Accede a tu cuenta para continuar.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-orange-500"
                placeholder="ejemplo@mail.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-orange-500"
                placeholder="8+ caracteres"
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              className="w-full mt-8 py-3 px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-orange-500 hover:bg-orange-600 transition-colors duration-300"
            >
              Iniciar Sesión
            </button>
          </form>

          {/* Line separator */}
          <div className="flex items-center my-2 text-gray-500 text-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4">ó</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div>
            <GoogleAuth mode="signup"/>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-4">
            <p className="text-gray-500">
              ¿Aún no tienes una cuenta?{" "}
              <Link href="/signup" className="text-orange-500 hover:underline">
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-orange-600 p-8 flex items-center justify-center text-white">
        <div className="max-w-md">
          <h2 className="text-5xl font-bold mb-8">&#34;Fennec, donde los datos inmobiliarios se encuentran con el destino.&#34;</h2>
          <div>
            <p className="font-semibold">- Gerardo Alavez</p>
            <p className="text-sm opacity-80">Co-Fundador</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;