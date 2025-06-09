"use client";

import { usePathname, useRouter } from "next/navigation";
import { protectedRoutes } from "@/utils/protectedRoutes";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect, useRef } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, role } = useAuth(); // Use role from auth context
  
  const redirectingRef = useRef<boolean>(false);

  // Handle redirects based on auth state and role
  useEffect(() => {
    // Prevent multiple redirects and wait for all data to load
    if (redirectingRef.current || loading) return;

    const handleRedirect = (path: string) => {
      redirectingRef.current = true;
      router.push(path);
      // Reset redirect flag after navigation
      setTimeout(() => {
        redirectingRef.current = false;
      }, 1000);
    };

    // No user trying to access protected routes
    if (!user) {
      if (pathname === "/plans" || 
          pathname.startsWith("/platform") || 
          protectedRoutes.has(pathname)) {
        console.log("No user, redirecting to login");
        handleRedirect("/login");
        return;
      }
    }

    // User exists, check role-based access
    if (user) {
      // Active user with unpaid role trying to access platform
      if (pathname.startsWith("/platform") &&
          role !== "professional" &&
          role !== "starter" &&
          role !== "empresarial") {

        console.log("Unpaid user trying to access platform, redirecting to plans");
        handleRedirect("/plans");
        return;
      }

      // Active user with unpaid role trying to access login/signup (should go to plans instead)
      if ((pathname === "/login" || pathname === "/signup") &&  role !== "professional" &&
          role !== "starter" &&
          role !== "empresarial") {
        console.log("Unpaid user on auth pages, redirecting to plans");
        handleRedirect("/plans");
        return;
      }

      // Paid user trying to access login/signup (should go to dashboard)
      if ((pathname === "/login" || pathname === "/signup") &&  role !== "professional" &&
          role !== "starter" &&
          role !== "empresarial") {
        console.log("Paid user on auth pages, redirecting to dashboard");
        handleRedirect("/platform/dashboard");
        return;
      }

      // Paid user on plans page (should go to dashboard)  
      if (pathname === "/plans" && role !== "professional" &&
          role !== "starter" &&
          role !== "empresarial") {
        console.log("Paid user on plans page, redirecting to dashboard");
        handleRedirect("/platform/dashboard");
        return;
      }
    }

  }, [user, loading, role, pathname, router]);

  // Show loading while checking auth state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return <>{children}</>;
}