"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { CheckCircle, Circle } from "lucide-react";

export default function StudentProgressPage() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    // 🔹 Mock data (reemplaza con fetch a tu API)
    const mockStudents = [
      {
        id: "1",
        name: "Ana Gómez",
        email: "ana@example.com",
        avatar: "https://i.pravatar.cc/150?img=20",
        courses: [
          {
            id: "c1",
            title: "React desde cero",
            progress: 70,
            lessons: [
              { id: "l1", title: "Introducción a React", completed: true },
              { id: "l2", title: "Componentes y Props", completed: true },
              { id: "l3", title: "Estado y Eventos", completed: false },
              { id: "l4", title: "Hooks básicos", completed: false },
            ],
          },
          {
            id: "c2",
            title: "Next.js avanzado",
            progress: 40,
            lessons: [
              { id: "l1", title: "SSR vs SSG", completed: true },
              { id: "l2", title: "ISR", completed: false },
              { id: "l3", title: "Middleware", completed: false },
            ],
          },
        ],
      },
    ];

    const found = mockStudents.find((s) => s.id === id);
    setStudent(found);
  }, [id]);

  if (!student) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
        <p className="text-gray-500">Estudiante no encontrado</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-bg)] py-8 px-4 sm:px-8">
      {/* Perfil del estudiante */}
      <section className="max-w-5xl mx-auto bg-[var(--color-surface)] rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row gap-6 items-center">
        <img
          src={student.avatar}
          alt={student.name}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-[var(--color-primary)]/30 shadow-md"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold text-[var(--color-primary)]">
            {student.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-300">{student.email}</p>
        </div>
      </section>

      {/* Cursos */}
      <section className="max-w-5xl mx-auto mt-10 space-y-8">
        <h2 className="text-xl font-bold mb-4">Progreso en cursos</h2>
        {student.courses.map((course) => (
          <div
            key={course.id}
            className="bg-[var(--color-surface)] rounded-xl shadow p-6"
          >
            {/* Header del curso */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <span className="text-sm text-gray-500 dark:text-gray-300">
                {course.progress}% completado
              </span>
            </div>

            {/* Barra de progreso */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-lg overflow-hidden mb-6">
              <div
                className="bg-[var(--color-progress)] h-3 rounded-lg"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>

            {/* Lista de lecciones */}
            <ul className="space-y-3">
              {course.lessons.map((lesson) => (
                <li
                  key={lesson.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  {lesson.completed ? (
                    <CheckCircle className="text-green-500" size={20} />
                  ) : (
                    <Circle className="text-gray-400" size={20} />
                  )}
                  <span
                    className={`${
                      lesson.completed
                        ? "line-through text-gray-500"
                        : "text-[var(--color-text)]"
                    }`}
                  >
                    {lesson.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
}