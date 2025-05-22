"use client";

import { useEffect, useState } from "react";
import { showCustomToast } from "@/lib/showCustomToast";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import api from "@/services/api";

function ProfileInfoSection() {
  const { logout } = useAuth();
  const router = useRouter();
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
  });


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/api/profile"); // token ya está en api headers
        console.log(">> Datos recibidos del backend:", response.data);
        setProfileData(response.data);
      } catch (error) {
        showCustomToast({
          message: "No se pudo cargar el perfil",
          type: "error",
        });
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showCustomToast({
      message: "Perfil actualizado correctamente",
      type: "success",
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      showCustomToast({
        message: "Error cerrando sesión",
        type: "error",
      });
    }
  };

  return (
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-medium text-center mb-2">
          Información del Perfil
        </h2>
        <p className="text-gray-500 text-center text-sm mb-6">
          Esta información se mostrará públicamente.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre completo
            </label>
            <input
                type="text"
                id="fullName"
                name="fullName"
                value={profileData.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
                type="email"
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Cerrar sesión
            </button>
            <button
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
  );
}

export default ProfileInfoSection;
