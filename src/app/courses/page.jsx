"use client";

import { useState, useEffect } from "react";
import { Search, ChevronDown, Loader2 } from "lucide-react";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { coursesPageData } from "@/data/courses";
import Image from "next/image";

// Fake user para simular login/inscripción
const fakeUser = {
  isLoggedIn: true, // cambia a false para probar como visitante
  enrolledCourses: [2],
};

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Simulación de carga (con mocks)
  useEffect(() => {
    try {
      setLoading(true);
      // Simulamos un pequeño delay (para que se vea el loader)
      const timer = setTimeout(() => {
        setCourses(coursesPageData);
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    } catch (err) {
      setError("No se pudieron cargar los cursos.");
      setLoading(false);
    }
  }, []);

  // Estados de filtros
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [instructor, setInstructor] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [type, setType] = useState("all");
  
  // Estado para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  // Extraer categorías e instructores únicos
  const categories = ["all", ...new Set(courses.map((c) => c.category))];
  const instructors = ["all", ...new Set(courses.map((c) => c.instructor))];

  // 🔎 Filtrado de cursos
  const filteredCourses = courses
    .filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))
    .filter((c) => (category === "all" ? true : c.category === category))
    .filter((c) => (instructor === "all" ? true : c.instructor === instructor))
    .filter((c) => {
      if (type === "free") return c.isFree === true;
      if (type === "paid") return c.isFree === false;
      return true;
    })
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

  // Renderizar acceso
  const renderAccessInfo = (course) => {
    if (course.isFree) {
      return (
        <p className="text-green-600 dark:text-green-400 font-semibold text-sm mt-2">
          Curso gratuito: acceso libre
        </p>
      );
    }
    if (!fakeUser.isLoggedIn) {
      return (
        <p className="text-red-600 dark:text-red-400 text-sm mt-2">
          Inicia sesión para acceder
        </p>
      );
    }
    if (fakeUser.enrolledCourses.includes(course.id)) {
      return (
        <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm mt-2">
          Inscrito: acceso completo
        </p>
      );
    }
    return (
      <button
        aria-label="Inscribirse"
        type="button"
        className="mt-2 cursor-pointer px-4 py-2 rounded-lg bg-primary text-white hover:bg-gray-800 transition text-sm"
        onClick={(e) => {
          e.preventDefault();
          router.push("/payments");
        }}
      >
        Inscribirse
      </button>
    );
  };

  // Lógica de paginación
 const totalPages = Math.ceil(courses.length / coursesPerPage);
 const startIndex = (currentPage - 1) * coursesPerPage;
 const endIndex = startIndex + coursesPerPage;
 const currentCourses = courses.slice(startIndex, endIndex);

  // Loader y error
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin w-12 h-12 text-primary" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        {error}
      </div>
    );
  }

  // Render principal
  return (
    <div className="flex flex-col md:flex-row p-4 sm:p-6 md:p-8 lg:p-12 gap-6 sm:gap-8">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 bg-surface text-[var(--color-text)] p-4 sm:p-6 rounded-2xl shadow-md h-fit border border-[var(--color-text)]">
        <h2 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-[var(--color-text)] ">
          Filtros
        </h2>

        {/* Búsqueda */}
        <div className="relative mb-6 sm:mb-8">
          <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          <input
            id="search-courses"
            type="text"
            placeholder="Buscar cursos..."
            name="search-courses"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 rounded-lg text-[var(--color-text)] border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary text-xs sm:text-sm"
          />
        </div>

        {/* Categorías */}
        <div className="mb-6 sm:mb-8">
          <h3 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 text-[var(--color-text)]">
            Categoría
          </h3>
          <ul className="space-y-1 sm:space-y-2">
            {categories.map((cat, i) => (
              <li key={i} className="flex items-center gap-2">
                <input
                  type="radio"
                  id={`cat-${cat}`}
                  name="category"
                  value={cat}
                  checked={category === cat}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--color-text)] border-gray-300 focus:ring-primary"
                />
                <label
                  htmlFor={`cat-${cat}`}
                  className="text-xs sm:text-sm text-[var(--color-text)] cursor-pointer"
                >
                  {cat === "all" ? "Todas" : cat}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructores */}
        <div className="mb-6 sm:mb-8">
          <h3 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 text-[var(--color-text)]">
            Instructor
          </h3>
          <ul className="space-y-1 sm:space-y-2">
            {instructors.map((inst, i) => (
              <li key={i} className="flex items-center gap-2">
                <input
                  type="radio"
                  id={`inst-${inst}`}
                  name="instructor"
                  value={inst}
                  checked={instructor === inst}
                  onChange={(e) => setInstructor(e.target.value)}
                  className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--color-text)] border-gray-300 focus:ring-primary"
                />
                <label
                  htmlFor={`inst-${inst}`}
                  className="text-xs sm:text-sm text-[var(--color-text)] cursor-pointer"
                >
                  {inst === "all" ? "Todos" : inst}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Tipo */}
        <div className="mb-6 sm:mb-8">
          <h3 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 text-[var(--color-text)]">
            Tipo
          </h3>
          <ul className="space-y-1 sm:space-y-2">
            {["all", "free", "paid"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <input
                  type="radio"
                  id={`type-${t}`}
                  name="type"
                  value={t}
                  checked={type === t}
                  onChange={(e) => setType(e.target.value)}
                  className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--color-text)] border-gray-300 focus:ring-primary"
                />
                <label
                  htmlFor={`type-${t}`}
                  className="text-xs sm:text-sm text-[var(--color-text)] cursor-pointer"
                >
                  {t === "all"
                    ? "Todos"
                    : t === "free"
                      ? "Gratis"
                      : "De pago"}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Orden */}
        <div>
          <h3 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 text-[var(--color-text)]">
            Ordenar por
          </h3>
          <button
            type="button"
            aria-label="Ordenar por"
            onClick={() =>
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            className="cursor-pointer w-full flex items-center justify-between px-3 sm:px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-xs sm:text-sm text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-text)] transition"
          >
            {sortOrder === "asc" ? "Ascendente (A-Z)" : "Descendente (Z-A)"}
            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--color-text)]" />
          </button>
        </div>
      </aside>

      {/* Catálogo */}
      <main className="flex-1">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
          Catálogo de Cursos
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredCourses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.id}/overview`}
              className="block h-full"
            >
              <Card className="group relative flex flex-col rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md bg-surface h-full transition-transform transform hover:scale-105 hover:-rotate-1 hover:shadow-2xl">
                <div className="relative w-full aspect-square">
                  <Image
                    aria-label={course.title}
                    src={course.cover}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4">
                  <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-200 text-sm line-clamp-2">
                    {course.description}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* 🔥 Paginación clásica */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10">
            <nav className="flex flex-wrap gap-2 sm:gap-3">
              {/* Botón anterior */}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.max(prev - 1, 1))
                }
                disabled={currentPage === 1}
                className="cursor-pointer px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-700 text-sm sm:text-base disabled:opacity-50"
              >
                Anterior
              </button>

              {/* Números */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-lg text-sm cursor-pointer sm:text-base ${
                      currentPage === page
                        ? "bg-primary text-white"
                        : "border border-gray-300 dark:border-gray-700"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              {/* Botón siguiente */}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="cursor-pointer px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-700 text-sm sm:text-base disabled:opacity-50"
              >
                Siguiente
              </button>
            </nav>
          </div>
        )}
      </main>
    </div>
  );
}