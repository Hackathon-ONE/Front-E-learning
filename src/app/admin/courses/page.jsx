"use client";

import { useState, useEffect } from "react";
import { coursesDashboardMock } from "@/data/courses";
import { BookOpen } from 'lucide-react';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);

  // Simulación de carga de datos desde backend
  useEffect(() => {
    // ⚡ En el futuro, aquí llamarás a tu API de Spring Boot
    /*
    async function fetchCourses() {
      try {
        const response = await fetch("http://localhost:8080/api/courses"); // endpoint de tu backend
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error al traer los cursos:", error);
      }
    }
    fetchCourses();
    */

    // De momento trabajamos con datos hardcodeados:
    const hardcodedCourses = coursesDashboardMock;
    setCourses(hardcodedCourses);
  }, []);

  return (
    <div
      className="min-h-screen p-3 sm:p-4 md:p-6"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 text-[var(--color-primary)]">
                Gestión de Cursos
              </h1>
              <p className="text-sm sm:text-base text-[var(--color-muted)]">
                Aquí podrás crear, editar o eliminar cursos.
              </p>
            </div>
            <button className="w-full sm:w-auto px-4 py-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg text-sm sm:text-base font-medium transition-colors">
              + Nuevo Curso
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="mb-6 p-4 bg-[var(--color-card-primary)] rounded-xl shadow-sm border border-[var(--color-muted)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label
                htmlFor="search-courses"
                className="block text-sm text-[var(--color-card-primary-text)] font-medium mb-1"
              >
                Buscar
              </label>
              <input
                id="search-courses"
                type="text"
                placeholder="Nombre del curso..."
                className="w-full p-2.5 rounded-lg border border-[var(--color-muted)] bg-[var(--color-card-secondary)] text-[var(--color-card-primary-text)] text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="category-filter"
                className="block text-sm text-[var(--color-card-primary-text)] font-medium mb-1"
              >
                Categoría
              </label>
              <select
                id="category-filter"
                className="w-full p-2.5 rounded-lg border border-[var(--color-muted)] bg-[var(--color-card-secondary)] text-[var(--color-card-primary-text)] text-sm"
              >
                <option value="">Todas las categorías</option>
                <option value="programming">Programación</option>
                <option value="design">Diseño</option>
                <option value="business">Negocios</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="status-filter"
                className="block text-sm text-[var(--color-card-primary-text)] font-medium mb-1"
              >
                Estado
              </label>
              <select
                id="status-filter"
                className="w-full p-2.5 rounded-lg border border-[var(--color-muted)] bg-[var(--color-card-secondary)] text-[var(--color-card-primary-text)] text-sm"
              >
                <option value="">Todos los estados</option>
                <option value="published">Publicado</option>
                <option value="draft">Borrador</option>
                <option value="archived">Archivado</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full p-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg text-sm font-medium transition-colors">
                Aplicar Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Course List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-[var(--color-card-primary)] border border-[var(--color-muted)] rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="aspect-video bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-primary)]/5 rounded-lg mb-4 flex items-center justify-center">
                <BookOpen className="w-12 sm:w-24 sm:h-36 sm:aspect-none text-[var(--color-primary)]"></BookOpen>
              </div>
              <h2 className="text-base sm:text-md font-semibold text-[var(--color-card-primary-text)] mb-2 line-clamp-2">
                {course.name}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-muted)] line-clamp-3 mb-4">
                {course.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <button className="flex-1 px-3 py-2 text-xs sm:text-sm bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg transition-colors">
                  Editar
                </button>
                <button className="flex-1 px-3 py-2 text-xs sm:text-sm border border-[var(--color-muted)] bg-red-200 hover:bg-[var(--color-muted)] text-[var(--color-card-primary-text)] rounded-lg transition-colors">
                  Ver
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Paginación */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 text-sm border border-[var(--color-muted)] text-gray-400 rounded-lg hover:bg-[var(--color-muted)] transition-colors">
              Anterior
            </button>
            <button className="px-3 py-2 text-sm bg-[var(--color-primary)] text-gray-600 rounded-lg">
              1
            </button>
            <button className="px-3 py-2 text-sm border border-[var(--color-muted)] text-gray-400 rounded-lg hover:bg-[var(--color-muted)] transition-colors">
              2
            </button>
            <button className="px-3 py-2 text-sm border border-[var(--color-muted)] text-gray-400 rounded-lg hover:bg-[var(--color-muted)] transition-colors">
              3
            </button>
            <button className="px-3 py-2 text-sm border border-[var(--color-muted)] text-gray-400 rounded-lg hover:bg-[var(--color-muted)] transition-colors">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}