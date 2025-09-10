"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, BookOpen, Star } from "lucide-react";
import { instructorsPage } from "@/data/instructors";
import Image from "next/image";

export default function InstructorsPage() {
  const [instructors, setInstructors] = useState(instructorsPage);

  useEffect(() => {
    setInstructors(instructorsPage);
  }, []);

  return (
    <main className="min-h-screen bg-[var(--color-bg)] py-8 sm:py-10 px-4 sm:px-6 lg:px-12">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-10">
        Nuestros Instructores
      </h1>

      <div
        className="
          grid gap-6 sm:gap-8 
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
          max-w-7xl mx-auto
          auto-rows-fr
        "
      >
        {instructors.map((instructor) => (
          <div
            key={instructor.id}
            className="
              bg-[var(--color-surface)] 
              rounded-2xl 
              shadow-lg hover:shadow-xl 
              transition 
              p-4 sm:p-6 
              flex flex-col 
              items-center 
              text-center
              h-full
            "
          >
            {/* Avatar */}
            <Image
              src={instructor.avatar}
              alt={instructor.name}
              width={128}
              height={128}
              unoptimized
              priority
              className="
                w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 
                rounded-full 
                border-4 border-primary/30 
                object-cover 
                shadow-md 
                mb-3 sm:mb-4
              "
            />

            {/* Nombre y bio */}
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[var(--color-text)] mb-1">
              {instructor.name}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[var(--color-muted)] mb-3 sm:mb-4 line-clamp-3">
              {instructor.bio}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-200 mb-3 sm:mb-4">
              <div className="flex items-center gap-1 text-gray-400">
                <BookOpen size={14} className="text-primary sm:w-4 sm:h-4" />
                {instructor.courses} cursos
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <Users size={14} className="text-green-500 sm:w-4 sm:h-4" />
                {instructor.students}
              </div>
            </div>

            {/* Reviews */}
            <div className="flex items-center gap-1 mb-4 sm:mb-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`sm:w-5 sm:h-5 ${
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
            <div className="mt-auto w-full">
              <Link href={`/instructor/${instructor.id}`} className="w-full">
                <button className="w-full py-2 sm:py-3 rounded-lg bg-primary text-white font-semibold text-xs sm:text-sm md:text-base hover:opacity-80 transition">
                  Ver perfil
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}