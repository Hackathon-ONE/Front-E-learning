'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import {
  BookOpen,
  Users,
  BarChart3,
  Settings,
  User,
  Wallet,
  GraduationCap,
  UserStar,
} from 'lucide-react';

import Hero from '@/components/Hero';
import CoursesCarousel from '@/components/CoursesCarousel';
import Features from '@/components/Features';
import Partners from '@/components/Partners';
import Pricing from '@/components/Pricing';
import CTA from '@/components/CTA';
import Stats from '@/components/Stats';
import Testimonials from '@/components/Testimonials';
import LumiSection from '@/components/Lumi';
import SuggestionsForm from '@/app/instructor/[id]/suggestions-form';

// Componente para usuarios no autenticados (contenido público)
function PublicHome() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <LumiSection />
      <Partners />
      <CoursesCarousel />
      <Pricing />
      <Testimonials />
      <CTA />
    </>
  );
}

// Dashboard para estudiantes
function StudentDashboard({ user }) {
  // Asumiendo que el user tiene un ID
  const studentId = user?.id || '1'; // Fallback a '1' si no hay ID
  // const studentId = user?.id ?? "mock-student";

  return (
    <div className="container mx-auto px-4 py-8 bg-surface">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">¡Hola, {user?.name || 'Estudiante'}! </h1>
        <p className="text-[var(--color-text)]">Continúa tu aprendizaje donde lo dejaste</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Link
          href={`/students/${studentId}`}
          aria-label="Mi Perfil"
          className="bg-[var(--color-card-primary)] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <User className="w-8 h-8 text-green-600 mb-4" />
          <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">Mi Perfil</h3>
          <p className="text-[var(--color-text)]">Gestiona tu información personal</p>
        </Link>

        <Link
          href="/courses"
          aria-label="Explorar Cursos"
          className="bg-[var(--color-card-primary)] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <BookOpen className="w-8 h-8 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">Explorar Cursos</h3>
          <p className="text-[var(--color-text)]">Accede a todos los cursos disponibles</p>
        </Link>

        <Link
          href="/dashboard/settings"
          aria-label="Configuración"
          className="bg-[var(--color-card-primary)] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <Settings className="w-8 h-8 text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">Configuración</h3>
          <p className="text-[var(--color-text)]">Personaliza tu experiencia</p>
        </Link>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-yellow-600 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">¿Listo para aprender algo nuevo?</h2>
        <p className="mb-4">Suscríbete y encuentra tu próximo desafío</p>
        <Link
          href="/payments"
          aria-label="Suscribirse"
          className="bg-[var(--color-card-primary)] text-[var(--color-primary)] px-6 py-2 rounded-lg font-semibold hover:bg-[var(--color-secondary-hover)]"
        >
          Suscribirse
        </Link>
      </div>
    </div>
  );
}

// Dashboard para instructores
function InstructorDashboard({ user }) {
  // Obtener el ID del instructor actual
  const instructorId = user?.id || '1'; // Fallback a '1' si no hay ID

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">¡Hola, {user?.name || 'Instructor'}! </h1>
        <p className="text-[var(--color-text)]">Gestiona tus cursos y estudiantes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Link
          href="/instructor/dashboard"
          aria-label="Dashboard"
          className="bg-[var(--color-card-primary)] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <BarChart3 className="w-8 h-8 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">Dashboard</h3>
          <p className="text-[var(--color-text)]">Estadísticas y métricas</p>
        </Link>

        <Link
          href="/instructor/courses"
          aria-label="Mis Cursos"
          className="bg-[var(--color-card-primary)] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <BookOpen className="w-8 h-8 text-green-600 mb-4" />
          <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">Mis Cursos</h3>
          <p className="text-[var(--color-text)]">Crear y gestionar cursos</p>
        </Link>

        <Link
          href="/instructor/students"
          aria-label="Estudiantes"
          className="bg-[var(--color-card-primary)] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <Users className="w-8 h-8 text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">Estudiantes</h3>
          <p className="text-[var(--color-text)]">Gestionar estudiantes</p>
        </Link>

        {/* <Link
          href={`/instructor/${instructorId}`}
          aria-label="Perfil"
          className="bg-[var(--color-card-primary)] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <User className="w-8 h-8 text-orange-600 mb-4" />
          <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">Perfil</h3>
          <p className="text-[var(--color-text)]">Información personal</p>
        </Link> */}
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-yellow-600 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">¿Listo para crear un nuevo curso?</h2>
        <p className="mb-4">Comparte tu conocimiento con estudiantes de todo el mundo</p>
        <Link
          href="/instructor/courses/new"
          aria-label="Crear Nuevo Curso"
          className="bg-[var(--color-text)] text-[var(--color-primary)] px-6 py-2 rounded-lg font-semibold hover:bg-gray-50"
        >
          Crear Nuevo Curso
        </Link>
      </div> 
      <div className="mt-8">
      <SuggestionsForm />
      </div>
    </div>
  );
}

// Dashboard para administradores
function AdminDashboard({ user }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">¡Hola, {user?.name || 'Administrador'}! </h1>
        <p className="text-[var(--color-text)]">Control total del sistema</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 bg-surface">
        <Link
          href="/admin/users"
          aria-label="Usuarios"
          className="bg-[var(--color-card-primary)] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <Users className="w-8 h-8 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">Usuarios</h3>
          <p className="text-[var(--color-text)]">Gestionar usuarios</p>
        </Link>

        <Link
          href="/admin/courses"
          aria-label="Cursos"
          className="bg-[var(--color-card-primary)] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <BookOpen className="w-8 h-8 text-green-600 mb-4" />
          <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">Cursos</h3>
          <p className="text-[var(--color-text)]">Administrar cursos</p>
        </Link>

        <Link
          href="/admin/payments"
          aria-label="Pagos"
          className="bg-[var(--color-card-primary)] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <Wallet className="w-8 h-8 text-cyan-600 mb-4" />
          <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">Pagos</h3>
          <p className="text-[var(--color-text)]">Administrar pagos</p>
        </Link>

        <Link
          href="/instructor"
          aria-label="Instructores"
          className="bg-[var(--color-card-primary)] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <UserStar className="w-8 h-8 text-red-600 mb-4" />
          <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">Instructores</h3>
          <p className="text-[var(--color-text)]">Gestionar instructores</p>
        </Link>

        <Link
          href="/students"
          aria-label="Inscritos"
          className="bg-[var(--color-card-primary)] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <GraduationCap className="w-8 h-8 text-yellow-600 mb-4" />
          <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">Inscritos</h3>
          <p className="text-[var(--color-text)]">Gestionar estudiantes inscritos</p>
        </Link>

        <Link
          href="/admin/settings"
          aria-label="Configuración"
          className="bg-[var(--color-card-primary)] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <Settings className="w-8 h-8 text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">Configuración</h3>
          <p className="text-[var(--color-text)]">Configuración del sistema</p>
        </Link>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-yellow-600 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Sistema funcionando correctamente</h2>
        <p className="mb-4">Todos los servicios están operativos y el sistema está actualizado</p>
        <Link
          href="/admin"
          aria-label="Ver Detalles"
          className="bg-[var(--color-card-primary)] text-[var(--color-primary)] px-6 py-2 rounded-lg font-semibold hover:bg-[var(--color-secondary-hover)]"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
}

export default function RoleBasedHome() {
  const { user, role, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <PublicHome />;
  }

  switch (role) {
    case 'ADMIN':
      return <AdminDashboard user={user} />;
    case 'INSTRUCTOR':
      return <InstructorDashboard user={user} />;
    case 'STUDENT':
    default:
      return <StudentDashboard user={user} />;
  }
}
