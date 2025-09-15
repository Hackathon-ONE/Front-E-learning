"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { lessonsCoursesData } from "@/data/courses";
import { ArrowLeft, Lock, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";

export default function LessonsPage() {
  const { id } = useParams(); // courseId
  const [lessons, setLessons] = useState([]);
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { hasAccess, loading: subscriptionLoading, error } = useSubscription(id);

  useEffect(() => {
    // fetch(`/api/courses/${id}/lessons`)
    setLessons(lessonsCoursesData);
  }, [id]);

  // Mostrar loading mientras se verifica la autenticación y suscripción
  if (authLoading || subscriptionLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[var(--color-bg)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-[var(--color-text)]">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[var(--color-bg)]">
        <div className="text-center max-w-md mx-auto p-6">
          <Lock className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">
            Acceso Restringido
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

  // Si no tiene acceso al curso, mostrar mensaje de suscripción requerida
  if (!hasAccess) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[var(--color-bg)]">
        <div className="text-center max-w-md mx-auto p-6">
          <Lock className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">
            Suscripción Requerida
          </h2>
          <p className="text-[var(--color-text)] mb-6">
            Necesitas suscribirte para acceder al contenido de este curso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/courses/${id}`}
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

  // Si hay error, mostrar mensaje de error
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[var(--color-bg)]">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">
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

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 px-4 py-2 mb-4 rounded-lg font-medium 
                   bg-[var(--color-surface)] text-[var(--color-text)] 
                   hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-text)]
                   transition w-full sm:w-auto"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm sm:text-base">Volver</span>
      </button>
      {/* Título */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        Lecciones del curso {id}
      </h1>

      {/* Lista de lecciones */}
      <ul className="space-y-4">
        {lessons.map((lesson) => (
          <li
            key={lesson.id}
            className="flex justify-between items-center bg-[var(--color-surface)] 
                       p-4 rounded-lg shadow hover:shadow-md transition"
          >
            {/* Info de la lección */}
            <div>
              <h2 className="text-lg font-semibold">{lesson.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Duración: {lesson.duration}
              </p>
            </div>

            {/* Acción */}
            <Link
              href={`/courses/${id}/lessons/${lesson.id}`}
              className="btn-primary px-4 py-2 rounded-lg text-sm font-medium"
            >
              {lesson.completed ? "Revisar" : "Ver ahora"}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
        <Link
          href={`/courses/${id}/quizzes/${id}`}
          className="btn-primary px-6 py-3 rounded-lg text-sm font-semibold text-center w-full sm:w-auto"
        >
          Tomar Quiz
        </Link>
        <Link
          href={`/courses/${id}/resources`}
          className="btn-primary px-6 py-3 rounded-lg text-sm font-semibold text-center w-full sm:w-auto"
        >
          Recursos
        </Link>
      </div>
    </div>
  );
}