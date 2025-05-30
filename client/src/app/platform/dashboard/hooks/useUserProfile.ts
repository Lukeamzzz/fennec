
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import api from "@/services/api";

export interface UserProfile {
    fullName: string;
    email: string;
    telefono: string;
}

export function useUserProfile() {
    const { user, idToken } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user || !idToken) return;

            try {
                setLoading(true);
                const response = await api.get("/api/profile", {
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                    },
                });
                setProfile(response.data);
            } catch (err) {
                console.error("Error cargando perfil de usuario:", err);
                setError("No se pudo cargar el perfil");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user, idToken]);

    return { profile, loading, error };
}
