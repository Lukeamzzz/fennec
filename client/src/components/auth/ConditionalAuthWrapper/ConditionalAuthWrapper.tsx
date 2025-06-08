"use client";

import { usePathname } from "next/navigation";
import { AuthProvider } from "@/providers/AuthProvider";
import { AuthGuard } from "@/components/auth/AuthGuard/AuthGuard";

// Define your public routes that don't need authentication
const publicRoutes = ["/", "/solutions", "/about"];

interface ConditionalAuthWrapperProps {
  children: React.ReactNode;
}

export function ConditionalAuthWrapper({ children }: ConditionalAuthWrapperProps) {
  const pathname = usePathname();
  
  // Check if current route is public
  const isPublicRoute = publicRoutes.includes(pathname);

  if (isPublicRoute) {
    // Public routes: no auth provider or guard
    return <>{children}</>;
  }

  // Protected routes: wrap with auth provider and guard
  return (
    <AuthProvider>
      <AuthGuard>{children}</AuthGuard>
    </AuthProvider>
  );
}