"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";

export function useRequireAuth(roles = []) {
  const { user, role, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Esperamos a que cargue la sesión

    if (!isAuthenticated) {
      // No autenticado → login
      router.replace(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
    } else if (roles.length > 0 && !roles.includes(role)) {
      // Autenticado pero sin permisos → unauthorized
      router.replace("/unauthorized");
    }
  }, [isAuthenticated, role, loading, roles, router]);

  return { user, role, isAuthenticated, loading };
}