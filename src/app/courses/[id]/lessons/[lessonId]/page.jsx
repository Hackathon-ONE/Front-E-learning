"use client";

import { useParams, useRouter } from "next/navigation";
import { lessonsPlayerData } from "@/data/courses";
import { ArrowLeft, Lock, AlertCircle } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function LessonPlayerPage() {
  const { id: courseId, lessonId } = useParams();
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { hasAccess, loading: subscriptionLoading, error } = useSubscription(courseId);
  const lessons = lessonsPlayerData;

  const activeLesson =
    lessons.find((l) => l.id.toString() === lessonId?.toString()) ||
    lessons[0]; // fallback seguro

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
    <div
      className="flex flex-col md:flex-row h-auto"
      style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
    >
      {/* Sidebar lecciones */}
      <aside
        className="w-full md:w-1/4 p-4 md:p-6 overflow-y-auto border-b md:border-b-0 md:border-r"
        style={{ backgroundColor: "var(--color-card-primary)" }}
      >
        {/* Botón volver */}
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

        <h2 className="text-lg font-bold mb-4 text-[var(--color-text)]">
          Contenido del curso
        </h2>
        <ul className="space-y-3">
          {lessons.map((lesson) => (
            <li
              key={lesson.id}
              onClick={() =>
                router.push(`/courses/${courseId}/lessons/${lesson.id}`)
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  router.push(`/courses/${courseId}/lessons/${lesson.id}`);
                }
              }}
              tabIndex={0}
              role="button"
              className={`p-3 rounded-lg cursor-pointer transition text-[var(--color-text)] text-sm sm:text-base ${
                lessonId?.toString() === lesson.id.toString()
                  ? "font-semibold"
                  : "opacity-80 hover:opacity-100"
              }`}
              style={{
                backgroundColor:
                  lessonId?.toString() === lesson.id.toString()
                    ? "var(--color-primary)"
                    : "var(--color-surface)",
                color:
                  lessonId?.toString() === lesson.id.toString()
                    ? "var(--color-primary-text)"
                    : "var(--color-text)",
              }}
            >
              <div className="flex justify-between items-center text-sm md:text-base">
                <span>{lesson.title}</span>
                <span className="text-xs opacity-90 text-[var(--color-text)]">
                  {lesson.duration}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Player */}
      <main className="flex-1 flex flex-col">
        <div className="w-full bg-black relative aspect-video">
          <video
            key={activeLesson.id}
            controls
            loop
            playsInline
            className="w-full h-full object-contain"
            src={activeLesson.videoUrl || "/video/video1.mp4"}
            // poster={activeLesson.posterUrl || "/video/video1.jpg"}
            aria-label={`Video de ${activeLesson.title}`}
          >
            <track kind="captions" srcLang="es" label="Español" />
          </video>
        </div>


        {/* Info de la lección */}
        <div
          className="p-4 sm:p-6"
          style={{ backgroundColor: "var(--color-card-primary)" }}
        >
          <h1 className="text-lg sm:text-xl font-semibold text-[var(--color-text)]">
            {activeLesson.title}
          </h1>
          <p className="text-xs sm:text-sm opacity-75 mt-1 text-[var(--color-text)]">
            Curso {courseId} · Lección {activeLesson.id}
          </p>
        </div>
      </main>
    </div>
  );
}
