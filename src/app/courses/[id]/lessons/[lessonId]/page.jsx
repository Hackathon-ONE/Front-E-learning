"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { lessonsPlayerData } from "@/data/courses";

export default function LessonPlayerPage() {
  const { courseId, lessonId } = useParams();
  const lessons = lessonsPlayerData;
  const [currentLesson, setCurrentLesson] = useState(lessonId || "1");

  return (
    <div
      className="flex flex-col md:flex-row h-screen"
      style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
    >
      {/* Sidebar lecciones */}
      <aside
        className="w-full md:w-1/4 p-4 md:p-6 overflow-y-auto border-b md:border-b-0 md:border-r"
        style={{ backgroundColor: "var(--color-card-primary)" }}
      >
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
          Contenido del curso
        </h2>
        <ul className="space-y-3">
          {lessons.map((lesson) => (
            <li
              key={lesson.id}
              onClick={() => setCurrentLesson(lesson.id)}
              className={`p-3 rounded-lg cursor-pointer transition text-sm sm:text-base ${
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
              <div className="flex justify-between items-center">
                <span>{lesson.title}</span>
                <span className="text-xs sm:text-sm opacity-70">
                  {lesson.duration}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Player */}
      <main className="flex-1 flex flex-col">
        {/* Video Player */}
        <div className="flex-1 flex items-center justify-center bg-black relative">
          <video
            key={currentLesson}
            controls
            className="w-full h-full object-contain sm:object-cover"
            src={`/videos/${currentLesson}.mp4`} // conectar con backend/CDN real
          />
        </div>

        {/* Info de la lección */}
        <div
          className="p-4 sm:p-6"
          style={{ backgroundColor: "var(--color-card-primary)" }}
        >
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
            {lessons.find((l) => l.id === currentLesson)?.title}
          </h1>
          <p className="text-xs sm:text-sm opacity-75 mt-1 text-gray-900 dark:text-gray-100">
            Curso {courseId} · Lección {currentLesson}
          </p>
        </div>
      </main>
    </div>
  );
}