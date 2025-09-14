"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { lessonsPlayerData } from "@/data/courses";
import { ArrowLeft } from "lucide-react";

export default function LessonPlayerPage() {
  const { courseId, lessonId } = useParams();
  const router = useRouter();
  const lessons = lessonsPlayerData;

  const activeLesson =
    lessons.find((l) => l.id.toString() === lessonId?.toString()) ||
    lessons[0]; // fallback seguro

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
          />
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
