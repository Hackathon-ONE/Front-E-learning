"use client";

import { useState, useEffect } from "react";
import { User, BookOpen, BarChart } from "lucide-react";
import Link from "next/link";

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
    <main className="min-h-screen bg-[var(--color-bg)] py-10 px-6">
      <section className="max-w-7xl mx-auto">
        {/* Título */}
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold">
            Estudiantes
          </h1>
          <p className="text-gray-500 dark:text-gray-300 mt-2">
            Gestiona y revisa el progreso de los estudiantes inscritos en tus cursos.
          </p>
        </header>

        {/* Grid de estudiantes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {students.map((student) => (
            <div
              key={student.id}
              className="bg-[var(--color-surface)] shadow-lg rounded-2xl p-6 flex flex-col items-center text-center transition hover:shadow-xl"
            >
              {/* Avatar */}
              <img
                src={student.avatar}
                alt={student.name}
                className="w-24 h-24 rounded-full border-4 border-primary/30 shadow mb-4 object-cover"
              />

              {/* Info */}
              <h2 className="text-lg font-bold text-[var(--color-text)]">
                {student.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {student.email}
              </p>

              {/* Stats */}
              <div className="flex justify-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span>{student.enrolledCourses} cursos</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart className="w-5 h-5 text-green-500" />
                  <span>{student.progress}</span>
                </div>
              </div>

              {/* Botones */}
              <div className="mt-6 flex gap-3">
                <Link
                  href={`/students/${student.id}/progress`}
                  className="btn-primary px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  Ver progreso
                </Link>
                <Link
                  href={`/students/${student.id}`}
                  className="px-4 py-2 rounded-lg text-sm font-semibold border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-hover-text)] transition"
                >
                  Perfil
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}