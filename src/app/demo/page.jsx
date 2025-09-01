"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, PlayCircle, X, Star } from "lucide-react";

export default function DemoPage() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [blockedLesson, setBlockedLesson] = useState(null);

  const lessons = [
    { id: 0, title: "Introducción al curso", free: true, video: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { id: 1, title: "Lección 1: Conceptos básicos", free: false },
    { id: 2, title: "Lección 2: Ejercicios prácticos", free: false },
    { id: 3, title: "Lección 3: Proyecto final", free: false },
  ];

  const handleLessonClick = (lesson) => {
    if (lesson.free) {
      setCurrentLesson(lesson.id);
    } else {
      setBlockedLesson(lesson);
      setShowModal(true);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] p-4 md:p-8">
      <section className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
          Demo Gratis del Curso
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Video principal */}
          <div className="md:col-span-2 w-full bg-[var(--color-surface)] rounded-xl shadow-lg overflow-hidden">
            {lessons[currentLesson]?.video ? (
              <video
                src={lessons[currentLesson].video}
                controls
                className="w-full h-64 md:h-[400px] object-cover"
              />
            ) : (
              <div className="flex justify-center items-center h-64 md:h-[400px] text-center p-6">
                <p className="text-lg flex items-center gap-2">
                  <PlayCircle className="w-5 h-5" />
                  Selecciona la primera lección para comenzar
                </p>
              </div>
            )}
            <div className="p-4 border-t border-[var(--color-muted)]">
              <h2 className="text-lg md:text-xl font-semibold">
                {lessons[currentLesson]?.title || "Lección bloqueada"}
              </h2>
            </div>
          </div>

          {/* Lista de lecciones */}
          <aside className="bg-[var(--color-surface)] rounded-xl shadow-lg p-4 space-y-3">
            <h3 className="text-lg font-semibold mb-2">Lecciones</h3>
            <ul className="space-y-2 text-gray-500 text-sm">
              {lessons.map((lesson) => (
                <li
                  key={lesson.id}
                  onClick={() => handleLessonClick(lesson)}
                  className={`flex items-center text-gray-500 justify-between p-3 rounded-lg cursor-pointer transition ${
                    lesson.free
                      ? "bg-[var(--color-card-primary)] hover:bg-[var(--color-card-secondary)]"
                      : "bg-[var(--color-card-secondary)] opacity-80"
                  }`}
                >
                  <span className="text-xs md:text-sm flex items-center gap-2 text-gray-500">
                    {lesson.free ? (
                      <PlayCircle className="w-4 h-4 text-[var(--color-primary)]" />
                    ) : (
                      <Lock className="w-4 h-4 text-gray-500" />
                    )}
                    {lesson.title}
                  </span>
                  {lesson.free ? (
                    <span className="text-[var(--color-primary)] font-semibold flex items-center gap-1">
                      <Star className="w-4 h-4" /> Gratis
                    </span>
                  ) : (
                    <span className="text-gray-500 text-sm flex items-center gap-1">
                      <Lock className="w-4 h-4" /> Suscripción
                    </span>
                  )}
                </li>
              ))}
            </ul>

            {/* CTA para suscribirse */}
            <div className="mt-6 text-center">
              <Link href="/payments">
                <button className="w-full py-2 rounded-lg btn-primary text-xs sm:text-base flex items-center justify-center">
                  Suscríbete para desbloquear todas las lecciones
                </button>
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Modal dinámico */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
          <div className="bg-[var(--color-surface)] rounded-xl shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-[var(--color-muted)] hover:text-[var(--color-primary)]"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Lección bloqueada
            </h2>
            <p className="mb-4 text-[var(--color-muted)]">
              <strong>{blockedLesson?.title}</strong> está disponible solo para
              usuarios con suscripción activa.
            </p>

            <div className="flex flex-col gap-3">
              <Link href="/payments" onClick={() => setShowModal(false)}>
                <button className="w-full py-3 rounded-lg btn-primary flex items-center justify-center gap-2">
                  <Star className="w-5 h-5" /> Suscribirme ahora
                </button>
              </Link>
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-3 rounded-lg bg-[var(--color-secondary)] text-[var(--color-secondary-text)] hover:bg-[var(--color-secondary-hover)] hover:text-[var(--color-secondary-hover-text)] flex items-center justify-center gap-2"
              >
                <PlayCircle className="w-5 h-5" /> Seguir explorando
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}