"use client";
import { useState } from "react";
import { BookOpen, Users, Clock, CheckCircle } from "lucide-react";
import Image from "next/image";
import Button from "../../../../components/ui/button";
import Link from "next/link";

const mockCourse = {
  title: "React desde Cero",
  description:
    "Aprende React desde los fundamentos hasta crear aplicaciones modernas. Incluye hooks, componentes, rutas y mejores prácticas.",
  cover: "/courses/react.jpg",
  lessons: 24,
  duration: "12h 30m",
  students: 320,
  progress: 45,
  objectives: [
    "Comprender la arquitectura de React",
    "Crear componentes reutilizables",
    "Gestionar estado con hooks",
    "Implementar rutas y navegación",
    "Consumir APIs REST",
  ],
};

export default function CourseOverviewPage() {
  const [course] = useState(mockCourse);

  return (
    <main className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center py-8 px-2 sm:px-4">
      <section className="w-full max-w-4xl bg-[var(--color-surface)] rounded-2xl shadow-xl p-4 sm:p-8 flex flex-col gap-8">
        {/* Portada y título */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-56 flex-shrink-0">
            <Image
              src={course.cover}
              alt={course.title}
              width={224}
              height={224}
              className="rounded-xl object-cover w-full h-40 md:h-56"
              priority
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-primary)]">{course.title}</h1>
            <p className="text-[var(--color-text)] text-base sm:text-lg">{course.description}</p>
            <div className="flex flex-wrap gap-4 mt-2">
              <span className="flex items-center gap-1 text-sm text-[var(--color-muted)]">
                <BookOpen size={18} /> {course.lessons} lecciones
              </span>
              <span className="flex items-center gap-1 text-sm text-[var(--color-muted)]">
                <Clock size={18} /> {course.duration}
              </span>
              <span className="flex items-center gap-1 text-sm text-[var(--color-muted)]">
                <Users size={18} /> {course.students} estudiantes
              </span>
            </div>
            {/* Barra de progreso */}
            <div className="w-full bg-gray-200 rounded-full h-3 mt-4 overflow-hidden">
              <div
                className="bg-[var(--color-primary)] h-3 rounded-full transition-all"
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-[var(--color-muted)]">Progreso</span>
              <span className="text-xs font-bold text-[var(--color-primary)]">{course.progress}%</span>
            </div>
          </div>
        </div>

        {/* Objetivos */}
        <div>
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-2">¿Qué aprenderás?</h2>
          <ul className="list-none flex flex-col gap-2">
            {course.objectives.map((obj, i) => (
              <li key={i} className="flex items-center gap-2 text-[var(--color-text)]">
                <CheckCircle size={18} className="text-green-500" />
                {obj}
              </li>
            ))}
          </ul>
        </div>

        {/* Acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end items-center">
          <Link href={`/courses/lessons`}>
            <Button className="btn-primary px-8 py-3 rounded-lg text-lg font-bold w-full sm:w-auto">
              Continuar curso
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
