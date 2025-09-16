"use client";

import { useAuth } from "@/context/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { Lock, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";

/**
 * Componente para proteger rutas que requieren suscripción
 * @param {Object} props
 * @param {string} props.courseId - ID del curso
 * @param {React.ReactNode} props.children - Contenido a proteger
 * @param {React.ReactNode} props.fallback - Componente a mostrar si no tiene acceso
 * @param {boolean} props.showLoading - Si mostrar loading
 */
export default function SubscriptionGuard({ 
  courseId, 
  children, 
  fallback = null,
  showLoading = true 
}) {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { hasAccess, loading: subscriptionLoading, error } = useSubscription(courseId);

  // Mostrar loading si está cargando
  if ((authLoading || subscriptionLoading) && showLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  // Si no está autenticado
  if (!isAuthenticated) {
    return fallback || (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center max-w-md mx-auto p-6">
          <Lock className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-2">
            Acceso Requerido
          </h2>
          <p className="text-[var(--color-text)] mb-6">
            Debes iniciar sesión para acceder a este contenido.
          </p>
          <Link
            href={`/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`}
            className="btn-primary px-6 py-3 rounded-lg font-semibold"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    );
  }

  // Si hay error
  if (error) {
    return fallback || (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-2">
            Error de Acceso
          </h2>
          <p className="text-[var(--color-text)] mb-6">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary px-6 py-3 rounded-lg font-semibold"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // Si no tiene acceso (no está suscrito)
  if (!hasAccess) {
    return fallback || (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center max-w-md mx-auto p-6">
          <Lock className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-2">
            Suscripción Requerida
          </h2>
          <p className="text-[var(--color-text)] mb-6">
            Necesitas suscribirte para acceder al contenido de este curso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/courses/${courseId}`}
              className="btn-secondary px-6 py-3 rounded-lg font-semibold"
            >
              Ver Curso
            </Link>
            <Link
              href="/payments"
              className="btn-primary px-6 py-3 rounded-lg font-semibold"
            >
              Suscribirse
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Si tiene acceso, mostrar el contenido
  return <>{children}</>;
}
