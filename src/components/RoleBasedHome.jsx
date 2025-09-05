'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { BookOpen, Users, BarChart3, Settings, User, Wallet } from 'lucide-react';

import Hero from '@/components/Hero';
import CoursesCarousel from '@/components/CoursesCarousel';
import Features from '@/components/Features';
import Partners from '@/components/Partners';
import Pricing from '@/components/Pricing';
import CTA from '@/components/CTA';
import Stats from '@/components/Stats';
import Testimonials from '@/components/Testimonials';
import LumiSection from '@/components/Lumi';

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
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">¡Hola, {user.name}! </h1>
        <p className="text-gray-400 dark:text-gray-400">Continúa tu aprendizaje donde lo dejaste</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Link
          href={`/students/${studentId}`}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <BookOpen className="w-8 h-8 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Mis Cursos</h3>
          <p className="text-gray-600 dark:text-gray-400">Accede a todos tus cursos matriculados</p>
        </Link>

        <Link
          href="/dashboard/profile"
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <User className="w-8 h-8 text-green-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Mi Perfil</h3>
          <p className="text-gray-600 dark:text-gray-400">Gestiona tu información personal</p>
        </Link>

        <Link
          href="/dashboard/settings"
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <Settings className="w-8 h-8 text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Configuración</h3>
          <p className="text-gray-600 dark:text-gray-400">Personaliza tu experiencia</p>
        </Link>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-yellow-600 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">¿Listo para aprender algo nuevo?</h2>
        <p className="mb-4">Explora nuestro catálogo de cursos y encuentra tu próximo desafío</p>
        <Link
          href="/courses"
          className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100"
        >
          Explorar Cursos
        </Link>
      </div>
    </div>
  );
}

// Dashboard para instructores
function InstructorDashboard({ user }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Panel de Instructor - {user.name} </h1>
        <p className="text-gray-400 dark:text-gray-400">Gestiona tus cursos y estudiantes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link
          href="/instructor/dashboard"
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <BarChart3 className="w-8 h-8 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Dashboard</h3>
          <p className="text-gray-600 dark:text-gray-400">Estadísticas y métricas</p>
        </Link>

        <Link
          href="/instructor/courses"
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <BookOpen className="w-8 h-8 text-green-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Mis Cursos</h3>
          <p className="text-gray-600 dark:text-gray-400">Crear y gestionar cursos</p>
        </Link>

        <Link
          href="/instructor/students"
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <Users className="w-8 h-8 text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Estudiantes</h3>
          <p className="text-gray-600 dark:text-gray-400">Gestionar estudiantes</p>
        </Link>

        <Link
          href="/dashboard/profile"
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <User className="w-8 h-8 text-orange-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Perfil</h3>
          <p className="text-gray-600 dark:text-gray-400">Información personal</p>
        </Link>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-yellow-600 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">¿Listo para crear un nuevo curso?</h2>
        <p className="mb-4">Comparte tu conocimiento con estudiantes de todo el mundo</p>
        <Link
          href="/instructor/courses/new"
          className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100"
        >
          Crear Nuevo Curso
        </Link>
      </div>
    </div>
  );
}

// Dashboard para administradores
function AdminDashboard({ user }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Panel de Administración - {user.name}</h1>
        <p className="text-gray-400 dark:text-gray-400">Control total del sistema</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        <Link
          href="/admin"
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <BarChart3 className="w-8 h-8 text-red-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Dashboard</h3>
          <p className="text-gray-600 dark:text-gray-400">Métricas del sistema</p>
        </Link>

        <Link
          href="/admin/users"
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <Users className="w-8 h-8 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Usuarios</h3>
          <p className="text-gray-600 dark:text-gray-400">Gestionar usuarios</p>
        </Link>

        <Link
          href="/admin/courses"
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <BookOpen className="w-8 h-8 text-green-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Cursos</h3>
          <p className="text-gray-600 dark:text-gray-400">Administrar cursos</p>
        </Link>

        <Link
          href="/admin/payments"
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <Wallet className="w-8 h-8 text-cyan-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Pagos</h3>
          <p className="text-gray-600 dark:text-gray-400">Administrar pagos</p>
        </Link>

        <Link
          href="/admin/settings"
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <Settings className="w-8 h-8 text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Configuración</h3>
          <p className="text-gray-600 dark:text-gray-400">Configuración del sistema</p>
        </Link>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-yellow-600 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Sistema funcionando correctamente</h2>
        <p className="mb-4">Todos los servicios están operativos y el sistema está actualizado</p>
        <Link
          href="/admin"
          className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100"
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
