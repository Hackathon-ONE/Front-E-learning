"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, BookOpen, Star } from "lucide-react";

export default function InstructorsPage() {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    // 🚀 Datos simulados (esto vendrá del backend)
    const mockInstructors = [
      {
        id: 1,
        name: "Juan Pérez",
        bio: "Especialista en React y Next.js con 8 años de experiencia.",
        avatar: "https://i.pravatar.cc/150?img=1",
        courses: 5,
        reviews: 4.7,
        students: 320,
      },
      {
        id: 2,
        name: "María Gómez",
        bio: "Apasionada por el diseño web y UX. Instructora de Figma y Tailwind.",
        avatar: "https://i.pravatar.cc/150?img=5",
        courses: 3,
        reviews: 4.9,
        students: 210,
      },
      {
        id: 3,
        name: "Carlos López",
        bio: "Backend developer con foco en Node.js, NestJS y bases de datos.",
        avatar: "https://i.pravatar.cc/150?img=3",
        courses: 7,
        reviews: 4.5,
        students: 410,
      },
    ];
    setInstructors(mockInstructors);
  }, []);

  return (
    <main className="min-h-screen bg-[var(--color-bg)] py-10 px-4 sm:px-6 lg:px-12">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-10">
        Nuestros Instructores
      </h1>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {instructors.map((instructor) => (
          <div
            key={instructor.id}
            className="bg-[var(--color-surface)] rounded-2xl shadow-lg hover:shadow-xl transition p-6 flex flex-col items-center text-center"
          >
            {/* Avatar */}
            <img
              src={instructor.avatar}
              alt={instructor.name}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-4 border-primary/30 object-cover shadow-md mb-4"
            />

            {/* Nombre y bio */}
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--color-text)] mb-1">
              {instructor.name}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[var(--color-muted)] mb-4 line-clamp-3">
              {instructor.bio}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-200 mb-4">
              <div className="flex items-center gap-1 text-gray-400">
                <BookOpen size={16} className="text-primary" />
                {instructor.courses} cursos
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <Users size={16} className="text-green-500" />
                {instructor.students}
              </div>
            </div>

            {/* Reviews */}
            <div className="flex items-center gap-1 mb-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={`${
                    i < Math.round(instructor.reviews)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-xs sm:text-sm md:text-base font-semibold">
                {instructor.reviews.toFixed(1)}
              </span>
            </div>

            {/* Botón Ver perfil */}
            <Link href={`/instructor/${instructor.id}`} className="w-full">
              <button className="w-full py-2 sm:py-3 rounded-lg bg-primary text-white font-semibold text-sm sm:text-base hover:opacity-80 transition">
                Ver perfil
              </button>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}