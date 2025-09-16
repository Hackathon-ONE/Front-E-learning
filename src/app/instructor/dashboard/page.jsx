"use client";

import { useEffect, useState } from "react";
import {
  PlusCircle,
  Users,
  BookOpen,
  LineChart,
  Pencil,
  DollarSign,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { instructorDashboardData } from "@/data/instructors";
// import { useFetch } from "@/hooks/useFetch";
import withRole from "@/components/withRole";
import Image from "next/image";
import { useInstructorAccess } from "@/hooks/useRoleAccess";
import { useRouter } from "next/navigation";

function InstructorDashboard() {
  // Verificar acceso de instructor
  const { hasAccess, loading: roleLoading } = useInstructorAccess();
 /*  const { data: instructorData, loading, error } = useFetch("/api/instructor/dashboard"); */
  const [instructor, setInstructor] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // 🔹 Simulación de carga (con mocks)
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      try {
        setInstructor(instructorDashboardData);
        setCourses(instructorDashboardData.courses || []);
      } catch {
        setError("No se pudieron cargar los datos del instructor.");
      } finally {
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Loader y error
  if (loading || roleLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin w-12 h-12 text-primary" />
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="flex justify-center py-20">
        <div className="text-center">
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-2">
            Acceso Denegado
          </h2>
          <p className="text-[var(--color-text)]">
            No tienes permisos para acceder a esta página.
          </p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center text-red-500 py-10">{error}</div>
    );
  }

  // 🔹 Tomamos un curso de ejemplo (primer curso) para acciones
  const firstCourseId = courses.length > 0 ? courses[0].id : 1;

  /* useEffect(() => {
    async function fetchInstructor() {
      try {
        setLoading(true);
        setError(null);

        // Cambiar la ruta por endpoint real
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/instructor/dashboard`);
        if (!res.ok) throw new Error("Error al obtener datos del dashboard");

        const data = await res.json();
        setInstructor(data);
      } catch (err) {
        console.error(err);
        setError("Hubo un problema al cargar los datos.");
      } finally {
        setLoading(false);
      }
    }

    fetchInstructor();
  }, []);
 */

    return (
      <section className="p-6 md:p-12 space-y-8 max-w-7xl mx-auto">
        {/* Perfil del Instructor */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 mb-4 rounded-lg font-medium 
                   bg-[var(--color-surface)] text-[var(--color-text)] 
                   hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-text)]
                   transition w-full sm:w-auto"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm sm:text-base">Volver</span>
        </button>
        <header className="flex flex-col md:flex-row items-center gap-6">
          {instructor.avatar ? (
            <Image
              aria-label={instructor.name}
              src={instructor.avatar || '/default-avatar.png'}
              alt={instructor.name}
              width={128}
              height={64}
              unoptimized
              priority
              className="w-24 h-24 rounded-full object-cover border-4 border-primary/20 shadow"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-surface flex items-center justify-center text-2xl font-bold text-[var(--color-text)]">
              {instructor.name.charAt(0)}
            </div>
          )}
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold">Bienvenido, {instructor.name}</h1>
            <p className="text-[var(--color-text)] text-secondary-text">{instructor.bio}</p>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex flex-col items-center">
              <BookOpen className="w-8 h-8 text-primary mb-2" />
              <p className="text-lg font-semibold">{instructor.stats.courses}</p>
              <p className="text-[var(--color-text)] text-sm">Cursos creados</p>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex flex-col items-center">
              <Users className="w-8 h-8 text-green-500 mb-2" />
              <p className="text-lg font-semibold">{instructor.stats.students}</p>
              <p className="text-[var(--color-text)] text-sm">Estudiantes inscritos</p>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex flex-col items-center">
              <LineChart className="w-8 h-8 text-blue-500 mb-2" />
              <p className="text-lg font-semibold">{instructor.stats.progressReports}</p>
              <p className="text-[var(--color-text)] text-sm">Reportes de progreso</p>
            </div>
          </Card>
          {/* 💰 Nueva Card de Ganancias */}
          <Card className="p-6">
            <div className="flex flex-col items-center">
              <DollarSign className="w-8 h-8 text-yellow-500 mb-2" />
              <p className="text-lg font-semibold">${instructor.stats.earnings.toLocaleString()}</p>
              <p className="text-[var(--color-text)] text-sm">Ganancias totales</p>
            </div>
          </Card>
        </div>

        {/* Acciones rápidas */}
        <div>
          <h2 className="text-xl font-bold mb-4">Acciones rápidas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Ver cursos */}
            <Card className="p-6 hover:shadow-md transition cursor-pointer">
              <div className="flex flex-col items-center">
                <BookOpen className="w-10 h-10 text-indigo-500 mb-3" />
                <h3 className="text-lg font-semibold">Ver cursos</h3>
                <Link href="/instructor/courses">
                  <Button
                    type="button"
                    aria-label="Ver cursos"
                    className="mt-3 p-2 cursor-pointer rounded-lg border border-primary text-[var(--color-text)] hover:bg-primary hover:text-white transition text-sm md:text-base"
                  >
                    Ver más
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Crear nuevo curso */}
            <Card className="p-6 hover:shadow-md transition cursor-pointer">
              <div className="flex flex-col items-center">
                <PlusCircle className="w-10 h-10 text-primary mb-3" />
                <h3 className="text-lg font-semibold">Crear nuevo curso</h3>
                <Link href="/instructor/courses/new">
                  <Button
                    type="button"
                    aria-label="Crear nuevo curso"
                    className="mt-3 p-2 cursor-pointer rounded-lg border border-primary text-[var(--color-text)] hover:bg-primary hover:text-white transition text-sm md:text-base"
                  >
                    Ver más
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Editar curso */}
            <Card className="p-6 hover:shadow-md transition cursor-pointer">
              <div className="flex flex-col items-center">
                <Pencil className="w-10 h-10 text-accent mb-3" />
                <h3 className="text-lg font-semibold">Editar curso</h3>
                <Link href={`/instructor/courses/${firstCourseId}/edit`}>
                  <Button
                    type="button"
                    aria-label="Editar curso"
                    className="mt-3 p-2 cursor-pointer rounded-lg border border-primary text-[var(--color-text)] hover:bg-primary hover:text-white transition text-sm md:text-base"
                  >
                    Ver más
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Gestionar estudiantes */}
            <Card className="p-6 hover:shadow-md transition cursor-pointer">
              <div className="flex flex-col items-center">
                <Users className="w-10 h-10 text-green-500 mb-3" />
                <h3 className="text-lg font-semibold">Gestionar estudiantes</h3>
                <Link href={`/instructor/courses/${firstCourseId}/students`}>
                  <Button
                    type="button"
                    aria-label="Gestionar estudiantes"
                    className="mt-3 p-2 cursor-pointer rounded-lg border border-primary text-[var(--color-text)] hover:bg-primary hover:text-white transition text-sm md:text-base"
                  >
                    Ver más
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Gestionar pagos */}
            <Card className="p-6 hover:shadow-md transition cursor-pointer">
              <div className="flex flex-col items-center">
                <DollarSign className="w-10 h-10 text-green-500 mb-3" />
                <h3 className="text-lg font-semibold">Gestionar pagos</h3>
                <Link href="/instructor/earnings">
                  <Button
                    type="button"
                    aria-label="Gestionar pagos"
                    className="mt-3 p-2 cursor-pointer rounded-lg border border-primary text-[var(--color-text)] hover:bg-primary hover:text-white transition text-sm md:text-base"
                  >
                    Ver más
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Analíticas */}
            <Card className="p-6 hover:shadow-md transition cursor-pointer">
              <div className="flex flex-col items-center">
                <LineChart className="w-10 h-10 text-blue-500 mb-3" />
                <h3 className="text-lg font-semibold">Analíticas</h3>
                <Link href={`/instructor/courses/${firstCourseId}/analytics`}>
                  <Button
                    type="button"
                    aria-label="Analíticas"
                    className="mt-3 p-2 cursor-pointer rounded-lg border border-primary text-[var(--color-text)] hover:bg-primary hover:text-white transition text-sm md:text-base"
                  >
                    Ver más
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  export default withRole(InstructorDashboard, ["INSTRUCTOR"]);