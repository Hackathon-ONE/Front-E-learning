"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BookOpen, Users, Star } from "lucide-react";
import Link from "next/link";

export default function InstructorProfilePage() {
  const { id } = useParams();
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔹 Simulación de datos (esto luego viene del backend)
    const mockInstructors = [
      {
        id: "1",
        name: "Juan Pérez",
        avatar: "https://i.pravatar.cc/150?img=1",
        specialty: "Frontend Developer & React Expert",
        bio: "Desarrollador con 8+ años de experiencia en JavaScript, React y Next.js. Apasionado por enseñar y crear experiencias digitales modernas.",
        stats: { courses: 5, students: 320, rating: 4.8 },
        courses: [
          { id: 101, title: "React desde cero", lessons: 20, students: 120 },
          { id: 102, title: "Next.js avanzado", lessons: 18, students: 85 },
        ],
        reviews: [
          {
            id: 1,
            student: "Ana Gómez",
            comment: "Excelente instructor, explica muy claro y con ejemplos prácticos.",
            rating: 5,
          },
          {
            id: 2,
            student: "Luis Pérez",
            comment: "Me ayudó a entender Next.js de forma sencilla.",
            rating: 4,
          },
        ],
      },
      {
        id: "2",
        name: "María Gómez",
        avatar: "https://i.pravatar.cc/150?img=5",
        specialty: "Fullstack Developer & Mentora",
        bio: "Apasionada por el desarrollo web moderno y la mentoría de nuevos talentos. Experiencia en React, Node.js y arquitectura cloud.",
        stats: { courses: 4, students: 210, rating: 4.9 },
        courses: [
          { id: 103, title: "Node.js para principiantes", lessons: 15, students: 90 },
          { id: 104, title: "Arquitectura web moderna", lessons: 25, students: 120 },
        ],
        reviews: [
          {
            id: 1,
            student: "Pedro Sánchez",
            comment: "María es una excelente mentora, aprendí muchísimo.",
            rating: 5,
          },
          {
            id: 2,
            student: "Laura Fernández",
            comment: "Muy clara en los conceptos, la recomiendo al 100%.",
            rating: 5,
          },
        ],
      },
    ];

    const found = mockInstructors.find((i) => i.id === id);
    setInstructor(found);
    setLoading(false);
  }, [id]);

  if (loading) return <p className="text-center py-10">Cargando perfil...</p>;
  if (!instructor) return <p className="text-center py-10">Instructor no encontrado</p>;

  return (
    <main className="min-h-screen bg-[var(--color-bg)] p-4 sm:p-6 lg:p-10">
      {/* Perfil principal */}
      <section className="max-w-5xl mx-auto bg-[var(--color-surface)] rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 sm:gap-8">
        <img
          src={instructor.avatar}
          alt={instructor.name}
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-primary/30 shadow-md mx-auto sm:mx-0"
        />
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-primary)]">
            {instructor.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-200 text-sm sm:text-base">
            {instructor.specialty}
          </p>
          <p className="mt-3 text-[var(--color-text)] leading-relaxed text-sm sm:text-base">
            {instructor.bio}
          </p>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div className="bg-[var(--color-card-primary)] p-4 rounded-xl shadow">
              <BookOpen className="mx-auto text-primary mb-2 w-6 h-6 sm:w-8 sm:h-8" />
              <p className="font-semibold text-base sm:text-lg text-black">{instructor.stats.courses}</p>
              <p className="text-xs sm:text-sm text-gray-500">Cursos</p>
            </div>
            <div className="bg-[var(--color-card-primary)] p-4 rounded-xl shadow">
              <Users className="mx-auto text-green-500 mb-2 w-6 h-6 sm:w-8 sm:h-8" />
              <p className="font-semibold text-base sm:text-lg text-black">{instructor.stats.students}</p>
              <p className="text-xs sm:text-sm text-gray-500">Estudiantes</p>
            </div>
            <div className="bg-[var(--color-card-primary)] p-4 rounded-xl shadow">
              <Star className="mx-auto text-yellow-500 mb-2 w-6 h-6 sm:w-8 sm:h-8" />
              <p className="font-semibold text-base sm:text-lg text-black">{instructor.stats.rating}</p>
              <p className="text-xs sm:text-sm text-gray-500">Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cursos del instructor */}
      <section className="max-w-5xl mx-auto mt-10 px-2">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Cursos creados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-black">
          {instructor.courses.map((c) => (
            <div
              key={c.id}
              className="bg-[var(--color-card-primary)] p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg sm:text-xl">{c.title}</h3>
              <p className="text-xs sm:text-sm text-gray-500">
                {c.lessons} lecciones · {c.students} estudiantes
              </p>
              <Link
                href={`/courses/${c.id}`}
                className="inline-block mt-3 text-primary font-medium hover:text-primary/40 text-sm sm:text-base"
              >
                Ver curso →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Reseñas */}
      <section className="max-w-5xl mx-auto mt-10 px-2">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Reseñas de estudiantes</h2>
        <div className="space-y-4">
          {instructor.reviews.map((r) => (
            <div
              key={r.id}
              className="bg-[var(--color-surface)] p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700"
            >
              <p className="font-semibold text-sm sm:text-base">{r.student}</p>
              <p className="text-yellow-500 text-sm">{"★".repeat(r.rating)}</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-2">
                "{r.comment}"
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}