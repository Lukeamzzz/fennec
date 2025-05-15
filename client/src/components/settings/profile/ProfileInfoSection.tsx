"use client";

import { useState } from "react";
import { showCustomToast } from "@/lib/showCustomToast";

function ProfileInfoSection() {
  const [profileData, setProfileData] = useState({
    fullName: "Usuario Demo",
    email: "usuario@ejemplo.com",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showCustomToast({
      message: "Perfil actualizado correctamente",
      type: "success",
    });
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-medium text-center mb-2">
        Información del perfil
      </h2>
      <p className="text-gray-500 text-center text-sm mb-6">
        Esta información será mostrada públicamente, así que ten cuidado con lo
        que compartes.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileInfoSection;
