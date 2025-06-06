"use client";

import { usePathname, useRouter } from "next/navigation";
import { protectedRoutes } from "@/utils/protectedRoutes";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect } from "react";
import axios from "axios";
import api from "@/services/api";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    const checkRoleAccess = async () => {
      try {
        const token = await user?.getIdToken();
        if (!token) return;

        const response = await api.get("/api/profile/get_rol", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const tipoRole = response.data.tipoRole;
        console.log("tipoRole", tipoRole);

        if (pathname.startsWith("/dashboard") && tipoRole !== "professional") {
          router.push("/plans");
        }

      } catch (error) {
        console.error("Error validando rol:", error);
        // Solo redirige a login si está en ruta protegida
        if (pathname === "/plans" || pathname.startsWith("/dashboard") || protectedRoutes.has(pathname)) {
          router.push("/login");
        }
      }
    };

    if (loading) return;

    if (!user) {
      if (pathname === "/plans" || pathname.startsWith("/dashboard") || protectedRoutes.has(pathname)) {
        router.push("/login");
      }
      return;
    }

    // Si el usuario intenta ir a login/signup ya autenticado
    if (user && (pathname === "/login" || pathname === "/signup")) {
      router.push("/plans");
      return;
    }

    // Solo valida el rol si está autenticado y en ruta sensible
    if (user && (pathname === "/plans" || pathname.startsWith("/dashboard") || protectedRoutes.has(pathname))) {
      checkRoleAccess();
    }

  }, [user, loading, pathname, router]);

  return <>{children}</>;
}
