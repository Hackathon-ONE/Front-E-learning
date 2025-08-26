"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

export default function LessonPlayerPage() {
  const { courseId, lessonId } = useParams();

  // 🔹 Mock de datos (normalmente estos vienen del backend)
  const lessons = [
    { id: "1", title: "Presentación", duration: "08 min" },
    { id: "2", title: "Preparando el ambiente", duration: "12 min" },
    { id: "3", title: "Mi primer prompt", duration: "10 min" },
  ];

  const [currentLesson, setCurrentLesson] = useState(lessonId || "1");

  return (
    <div
      className="flex h-screen"
      style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
    >
      {/* 📑 Sidebar lecciones */}
      <aside
        className="w-1/4 p-6 overflow-y-auto"
        style={{ backgroundColor: "var(--color-card-primary)" }}
      >
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Contenido del curso</h2>
        <ul className="space-y-3">
          {lessons.map((lesson) => (
            <li
              key={lesson.id}
              onClick={() => setCurrentLesson(lesson.id)}
              className={`p-3 rounded-lg cursor-pointer transition ${
                currentLesson === lesson.id
                  ? "font-semibold"
                  : "opacity-80 hover:opacity-100"
              }`}
              style={{
                backgroundColor:
                  currentLesson === lesson.id
                    ? "var(--color-primary)"
                    : "var(--color-surface)",
                color:
                  currentLesson === lesson.id
                    ? "var(--color-primary-text)"
                    : "var(--color-text)",
              }}
            >
              <div className="flex justify-between">
                <span>{lesson.title}</span>
                <span className="text-sm opacity-70">{lesson.duration}</span>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* 🎬 Player */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center bg-black">
          <video
            key={currentLesson}
            controls
            className="w-full h-full object-cover"
            src={`/videos/${currentLesson}.mp4`} // ⚠️ aquí se conecta tu backend/CDN
          />
        </div>
        <div
          className="p-4"
          style={{ backgroundColor: "var(--color-card-primary)" }}
        >
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {lessons.find((l) => l.id === currentLesson)?.title}
          </h1>
          <p className="text-sm opacity-75 mt-1 text-gray-900 dark:text-gray-100">
            Curso {courseId} · Lección {currentLesson}
          </p>
        </div>
      </main>
    </div>
  );
}