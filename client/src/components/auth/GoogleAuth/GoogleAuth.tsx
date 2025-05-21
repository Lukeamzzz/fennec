"use client";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "../../../services/api";
import { showCustomToast } from "@/lib/showCustomToast";

interface GoogleAuthProps {
  mode: "login" | "signup";
}

const GoogleAuth = ({ mode }: GoogleAuthProps) => {
  const router = useRouter();
  const [showNameForm, setShowNameForm] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [tempUserData, setTempUserData] = useState<any>(null);
  
  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      if (!user.displayName && mode === "signup") {
        setTempUserData(user);
        setShowNameForm(true);
        return;
      }

      if (mode === "signup") {
        const userData = {
          email: user.email,
          name: user.displayName || name,
          firebaseId: user.uid
        };

        const response = await api.post('/auth/signup', userData);
        
        if (!response.data.message) {
          throw new Error('Error en el registro');
        }
      }

      router.push("/platform/dashboard");
    } catch (error) {
      console.error("Error de autenticación:", error);
      showCustomToast({
        message: "Error Signing Up",
        type: "error",
      });
    }
};

const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const userData = {
        email: tempUserData.email,
        name: name,
        firebaseId: tempUserData.uid
      };

      const response = await api.post('/auth/signup', userData);
      
      if (!response.data.message) {
        throw new Error('Error en el registro');
      }

      router.push("/platform/dashboard");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      showCustomToast({
        message: "Error Signing Up",
        type: "error",
      });
    }
};

  if (showNameForm) {
    return (
      <div className="mt-4">
        <form onSubmit={handleNameSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Please enter your name to continue
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-orange-500"
              placeholder="Your name"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-orange-500 hover:bg-orange-600"
          >
            Complete Signup
          </button>
        </form>
      </div>
    );
  }

  return (
    <button
      onClick={handleGoogleAuth}
      className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
      Continue with Google
    </button>
  );
};

export default GoogleAuth;