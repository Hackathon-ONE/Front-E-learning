"use client";

import { useState, useEffect } from "react";
import { User, BookOpen, BarChart, Lightbulb } from "lucide-react";
import Link from "next/link";
import RecommendationsForm from "./recommendations-form";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // 🔹 Mock data (luego reemplazas con fetch a tu backend)
    const mockData = [
      {
        id: 1,
        name: "Ana Gómez",
        email: "ana@example.com",
        avatar: "https://i.pravatar.cc/150?img=20",
        enrolledCourses: 3,
        progress: "70%",
      },
      {
        id: 2,
        name: "Luis Pérez",
        email: "luis@example.com",
        avatar: "https://i.pravatar.cc/150?img=15",
        enrolledCourses: 2,
        progress: "40%",
      },
      {
        id: 3,
        name: "María Rodríguez",
        email: "maria@example.com",
        avatar: "https://i.pravatar.cc/150?img=32",
        enrolledCourses: 5,
        progress: "85%",
      },
    ];
    setStudents(mockData);
  }, []);

  return (
    <main className="min-h-screen bg-[var(--color-bg)] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <section className="max-w-7xl mx-auto">
        {/* Título */}
        <header className="mb-10 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)]">
            Estudiantes
          </h1>
          <p className="text-gray-500 dark:text-gray-300 mt-2 text-sm sm:text-base">
            Gestiona y revisa el progreso de los estudiantes inscritos en tus cursos.
          </p>
        </header>

        {/* Grid de estudiantes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {students.map((student) => (
            <div
              key={student.id}
              className="bg-[var(--color-surface)] shadow-md rounded-2xl p-6 flex flex-col items-center text-center transition hover:shadow-xl"
            >
              {/* Avatar */}
              <img
                src={student.avatar}
                alt={student.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-primary/30 shadow mb-4 object-cover"
              />

              {/* Info */}
              <h2 className="text-base sm:text-lg font-bold text-[var(--color-text)]">
                {student.name}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 break-words">
                {student.email}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4 text-xs sm:text-sm">
                <div className="flex items-center gap-1 sm:gap-2">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span>{student.enrolledCourses} cursos</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <BarChart className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  <span>{student.progress}</span>
                </div>
              </div>

              {/* Botones */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Link
                  href={`/students/${student.id}/progress`}
                  className="w-full sm:w-auto text-center btn-primary px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold"
                >
                  Ver progreso
                </Link>
                <Link
                  href={`/students/${student.id}`}
                  className="w-full sm:w-auto text-center px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-hover-text)] transition"
                >
                  Perfil
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Recomendaciones IA */}
        <div className="space-y-6 sm:space-y-8 max-w-3xl mx-auto mt-12 sm:mt-16 px-2">
          <div className="text-center">
            <Lightbulb className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-bold font-headline mt-4">
              Recomendaciones de cursos de IA
            </h2>
            <p className="text-gray-500 dark:text-gray-300 mt-2 text-sm sm:text-base">
              Cuéntanos sobre ti y deja que nuestra IA te encuentre los cursos
              perfectos para ayudarte a crecer.
            </p>
          </div>
          <RecommendationsForm />
        </div>
      </section>
    </main>
  );
}