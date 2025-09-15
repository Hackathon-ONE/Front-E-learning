"use client";

import { useParams } from "next/navigation";
import CourseDetailPage from "@/components/CourseDetailPage";

export default function CourseDetail() {
  const { id } = useParams();
  
  // Validar que el ID existe
  if (!id) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[var(--color-bg)]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--color-text)] mb-4">
            Curso no encontrado
          </h1>
          <p className="text-[var(--color-text)]">
            El ID del curso no es válido.
          </p>
        </div>
      </div>
    );
  }
  
  return <CourseDetailPage courseId={id} />;
}