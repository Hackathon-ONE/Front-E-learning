"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Hook para manejar acceso basado en roles de manera más robusta
 * @param {string[]} allowedRoles - Roles permitidos para acceder
 * @param {boolean} requireAuth - Si requiere autenticación
 * @param {string} redirectPath - Ruta personalizada de redirección
 */
export function useRoleAccess(allowedRoles = [], requireAuth = true, redirectPath = null) {
  const { user, role, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Esperar a que cargue la sesión

    // Si requiere autenticación y no está autenticado
    if (requireAuth && !isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    // Si hay roles permitidos y el usuario no tiene el rol correcto
    if (allowedRoles.length > 0 && isAuthenticated && !allowedRoles.includes(role)) {
      if (redirectPath) {
        router.push(redirectPath);
      } else {
        // Redirigir según el rol del usuario
        if (role === "INSTRUCTOR") {
          router.push("/instructor/dashboard");
        } else if (role === "ADMIN") {
          router.push("/admin/dashboard");
        } else if (role === "STUDENT") {
          router.push("/");
        } else {
          router.push("/403");
        }
      }
      return;
    }
  }, [isAuthenticated, role, loading, router, requireAuth, allowedRoles, redirectPath]);

  return {
    user,
    role,
    isAuthenticated,
    loading,
    hasAccess: allowedRoles.length === 0 || allowedRoles.includes(role),
    isInstructor: role === "INSTRUCTOR",
    isAdmin: role === "ADMIN",
    isStudent: role === "STUDENT",
  };
}

/**
 * Hook específico para instructores
 */
export function useInstructorAccess() {
  return useRoleAccess(["INSTRUCTOR", "ADMIN"]);
}

/**
 * Hook específico para administradores
 */
export function useAdminAccess() {
  return useRoleAccess(["ADMIN"]);
}

/**
 * Hook específico para estudiantes
 */
export function useStudentAccess() {
  return useRoleAccess(["STUDENT", "ADMIN"]);
}
