"use client";

import React, { useEffect, useState } from "react";
import { showCustomToast } from "@/lib/showCustomToast";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { TailChase } from 'ldrs/react';
import 'ldrs/react/TailChase.css';

function ProfileInfoSection() {
  const { logout, idToken, user, loading } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    telefono: ""
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user || !idToken) return;

      try {
        setIsLoading(true);
        const response = await api.get("/api/profile", {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
        setProfileData(response.data);
      } catch (error: any) {
        if (error?.response?.status === 401) {
          router.push("/login");
          return;
        }
        showCustomToast({
          message: "No se pudo cargar el perfil",
          type: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (!loading) {
      fetchProfile();
    }
  }, [user, idToken, loading, router]);

  if (loading || isLoading) {
    return (
        <div className="bg-white rounded-lg p-6 flex items-center justify-center">
          <TailChase size="40" speed="1.75" color="#F56C12" />
        </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await api.post(
          "/api/profile/updatephone",
          { phone: profileData.telefono },
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
      );

      showCustomToast({
        message: "Teléfono actualizado correctamente",
        type: "success",
      });
    } catch (error) {
      showCustomToast({
        message: "Error al actualizar el teléfono",
        type: "error",
      });
    }
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
        <h2 className="text-xl font-medium text-center mb-2">Información del Perfil</h2>
        <p className="text-gray-500 text-center text-sm mb-6">
          Esta información se mostrará públicamente.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre completo
            </label>
            <h1 className="bar_409d0f capitalize">{profileData.fullName}</h1>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <h1>{profileData.email}</h1>
          </div>

          <div className="mb-4">
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </label>
            <input
                type="text"
                id="telefono"
                value={profileData.telefono}
                onChange={(e) =>
                    setProfileData({ ...profileData, telefono: e.target.value })
                }
                className="mt-1 block rounded-md border border-gray-300 shadow-sm p-2 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
            />
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            >
              Guardar teléfono
            </button>

            <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Cerrar sesión
            </button>
          </div>
        </form>
      </div>
  );
}

export default ProfileInfoSection;
