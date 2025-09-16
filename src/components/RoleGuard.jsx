"use client";

import { useRoleAccess } from "@/hooks/useRoleAccess";
import { Loader2, ShieldX } from "lucide-react";

/**
 * Componente para proteger rutas basado en roles
 * @param {Object} props
 * @param {string[]} props.allowedRoles - Roles permitidos
 * @param {boolean} props.requireAuth - Si requiere autenticación
 * @param {React.ReactNode} props.children - Contenido a proteger
 * @param {React.ReactNode} props.fallback - Componente a mostrar si no tiene acceso
 * @param {boolean} props.showLoading - Si mostrar loading
 */
export default function RoleGuard({ 
  allowedRoles = [], 
  requireAuth = true, 
  children, 
  fallback = null,
  showLoading = true 
}) {
  const { hasAccess, loading, isAuthenticated } = useRoleAccess(allowedRoles, requireAuth);

  // Mostrar loading si está cargando
  if (loading && showLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  // Si no está autenticado y requiere autenticación
  if (requireAuth && !isAuthenticated) {
    return fallback || (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <ShieldX className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-2">
            Acceso Requerido
          </h2>
          <p className="text-[var(--color-text)]">
            Debes iniciar sesión para acceder a esta página.
          </p>
        </div>
      </div>
    );
  }

  // Si no tiene acceso
  if (!hasAccess) {
    return fallback || (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <ShieldX className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-2">
            Acceso Denegado
          </h2>
          <p className="text-[var(--color-text)]">
            No tienes permisos para acceder a esta página.
          </p>
        </div>
      </div>
    );
  }

  // Si tiene acceso, mostrar el contenido
  return <>{children}</>;
}
