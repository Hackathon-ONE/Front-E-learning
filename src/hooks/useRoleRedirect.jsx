"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

/**
 * Hook para manejar redirecciones automáticas basadas en el rol del usuario
 * @param {Object} options - Opciones de configuración
 * @param {boolean} options.redirectOnAuth - Si debe redirigir cuando el usuario está autenticado
 * @param {boolean} options.requireAuth - Si requiere autenticación para acceder
 * @param {string[]} options.allowedRoles - Roles permitidos para acceder
 */
export function useRoleRedirect(options = {}) {
  const { 
    redirectOnAuth = false, 
    requireAuth = false, 
    allowedRoles = [] 
  } = options;
  
  const { user, role, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Esperar a que cargue la sesión

    // Si requiere autenticación y no está autenticado
    if (requireAuth && !loading && !isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    // Si debe redirigir cuando está autenticado y está autenticado
    if (redirectOnAuth && isAuthenticated) {
      router.push("/");
      return;
    }

    // Si hay roles permitidos y el usuario no tiene el rol correcto
    if (allowedRoles.length > 0 && isAuthenticated && !allowedRoles.includes(role)) {
      router.push("/"); // Redirigir a home si no tiene permisos
      return;
    }
  }, [isAuthenticated, role, loading, router, redirectOnAuth, requireAuth, allowedRoles]);

  return {
    user,
    role,
    isAuthenticated,
    loading,
    hasAccess: allowedRoles.length === 0 || allowedRoles.includes(role)
  };
}

/**
 * Hook específico para páginas que requieren autenticación
 */
export function useRequireAuth(allowedRoles = []) {
  return useRoleRedirect({
    requireAuth: true,
    allowedRoles
  });
}

/**
 * Hook específico para páginas de auth (login, register) que deben redirigir si ya está autenticado
 */
export function useAuthRedirect() {
  return useRoleRedirect({
    redirectOnAuth: true
  });
}