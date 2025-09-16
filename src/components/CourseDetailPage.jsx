'use client';

import { useState } from 'react';
import { PlayCircle, Clock, CheckCircle, Loader2, Lock, ArrowLeft } from 'lucide-react';
import Card from '@/components/ui/Card';
import Link from 'next/link';
import { courseDetailMock, coursesPageData, coursesDetailData } from '@/data/courses';
import { lessonsMock } from '@/data/lessons';
import { linkedCoursesMock } from '@/data/linkedCourses';
import { instructorMock, instructorsData } from '@/data/instructors';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { isMockedUser } from '@/utils/userUtils';

export default function CourseDetailPage({ courseId }) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { hasAccess, loading: subscriptionLoading } = useSubscription(courseId);

  // Validar que courseId existe
  if (!courseId || courseId === 'undefined') {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[var(--color-bg)]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--color-text)] mb-4">Curso no encontrado</h1>
          <p className="text-[var(--color-text)]">El ID del curso no es válido.</p>
        </div>
      </div>
    );
  }
  const [course] = useState(() => {
    const found = coursesDetailData.find((c) => c.id.toString() === String(courseId));
    if (found) return found;
    const basic = coursesPageData.find((c) => c.id.toString() === String(courseId));
    if (basic) {
      return {
        id: basic.id,
        title: basic.title,
        description: basic.description,
        cover: basic.cover,
        duration: '—',
        students: 0,
        lessons: 0,
        objectives: courseDetailMock.objectives,
      };
    }
    return courseDetailMock;
  });
  const [lessons] = useState(lessonsMock);
  const [linkedCourses] = useState(linkedCoursesMock);

  // Mapeo de cursos a instructores por nombre
  const courseInstructorMap = {
    'Marco Alonzo': '1',
    'Benjamín Pérez': '1',
    'Ana Torres': '2',
    'Carlos Mora': '3',
    'Fernanda López': '2',
    'María Gómez': '2',
  };

  // Buscar el instructor correcto del curso
  const [instructor] = useState(() => {
    // Buscar el curso en coursesPageData para obtener el nombre del instructor
    const courseWithInstructor = coursesPageData.find((c) => c.id.toString() === String(courseId));
    if (courseWithInstructor && courseWithInstructor.instructor) {
      const instructorId = courseInstructorMap[courseWithInstructor.instructor];
      if (instructorId) {
        const foundInstructor = instructorsData.find((i) => i.id === instructorId);
        if (foundInstructor) {
          return {
            id: foundInstructor.id,
            name: foundInstructor.name,
            bio: foundInstructor.bio,
            avatar: foundInstructor.avatar,
            title: foundInstructor.specialty,
            linkedin: `https://linkedin.com/in/${foundInstructor.name
              .toLowerCase()
              .replace(' ', '-')}`,
            github: `https://github.com/${foundInstructor.name.toLowerCase().replace(' ', '-')}`,
            twitter: `https://twitter.com/${foundInstructor.name.toLowerCase().replace(' ', '-')}`,
          };
        }
      }
    }
    // Fallback al instructor mock si no se encuentra
    return instructorMock;
  });

  const [progress] = useState(100);

  // Mostrar loading mientras se verifica la suscripción
  if (subscriptionLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[var(--color-bg)]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-[var(--color-text)]">Cargando información del curso...</p>
        </div>
      </div>
    );
  }

  // Verificar si el usuario es un usuario mockeado (ya tiene suscripción)
  const isMocked = isMockedUser(user);

  return (
    <section className="p-6 md:p-12 space-y-8">
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
      {/* Header */}
      <header className="rounded-2xl p-8 shadow-md flex flex-col md:flex-row md:items-center md:justify-between bg-primary text-primary-text">
        <div>
          <h1 className="text-xl md:text-2xl font-bold mb-2">{course.title}</h1>
          <p className="text-sm text-secondary">
            Carga horaria: {course.duration} · Alumnos: {course.students}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-4">
          {!isAuthenticated ? (
            <Link href={`/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`}>
              <button
                type="button"
                aria-label="Iniciar sesión"
                className="px-6 cursor-pointer py-2 rounded-lg shadow transition bg-[var(--color-accent)] text-white hover:scale-105"
              >
                Iniciar Sesión
              </button>
            </Link>
          ) : isMocked || hasAccess ? (
            <Link href={`/courses/${courseId}/lessons/${lessons[0].id}`}>
              <button
                type="button"
                aria-label="Acceder al curso"
                className="px-6 cursor-pointer py-2 rounded-lg shadow transition bg-[var(--color-muted)] text-[var(--color-primary-text)] hover:scale-105"
              >
                Acceder Curso
              </button>
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => router.push('/payments')}
              className="px-6 cursor-pointer py-2 rounded-lg shadow transition bg-[var(--color-accent)] text-white hover:scale-105"
            >
              Suscribirse
            </button>
          )}
        </div>
      </header>

      {/* Progreso */}
      <div className="rounded-xl shadow p-6 bg-surface">
        <h2 className="text-lg font-semibold mb-4">Progreso del curso</h2>
        <div className="flex items-center gap-4">
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm font-medium text-muted">{progress}%</span>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Instructor */}
          <Card className="p-6 bg-[var(--color-card-primary)]">
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={instructor.avatar || '/default-avatar.png'}
                alt={instructor.name}
                width={60}
                height={60}
                className="rounded-full"
                style={{ width: 'auto', height: 'auto' }}
              />
              <div>
                <h3 className="font-semibold text-lg">{instructor.name}</h3>
                <p className="text-sm text-muted">{instructor.title}</p>
              </div>
            </div>
            <p className="text-sm text-muted mb-4">{instructor.bio}</p>
            <div className="flex gap-2">
              <a
                href={instructor.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href={instructor.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href={instructor.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-blue-400 text-white hover:bg-blue-500 transition"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </Card>

          {/* Cursos relacionados */}
          <Card className="p-6 bg-[var(--color-card-primary)]">
            <h3 className="font-semibold text-lg mb-4">Cursos relacionados</h3>
            <div className="space-y-3">
              {linkedCourses.map((linkedCourse) => (
                <Link
                  key={linkedCourse.id}
                  href={`/courses/${linkedCourse.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface transition"
                >
                  <Image
                    src={linkedCourse.cover || '/default-avatar.png'}
                    alt={linkedCourse.title}
                    width={50}
                    height={50}
                    className="rounded-lg"
                  />
                  <div>
                    <h4 className="font-medium text-sm">{linkedCourse.title}</h4>
                    <p className="text-xs text-muted">{linkedCourse.instructor}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        </aside>

        {/* Aulas */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">Aulas</h2>
          <div className="space-y-4">
            {lessons.map((lesson) => (
              <Card
                key={lesson.id}
                className="flex items-center justify-between p-4 rounded-xl hover:shadow-lg transition bg-[var(--color-card-primary)]"
              >
                <div className="flex items-center gap-3">
                  {(() => {
                    if (!isAuthenticated) {
                      return <Lock className="w-5 h-5 text-gray-400" />;
                    }
                    if (!isMocked && !hasAccess) {
                      return <Lock className="w-5 h-5 text-yellow-500" />;
                    }
                    if (lesson.completed) {
                      return <CheckCircle className="w-5 h-5 text-accent" />;
                    }
                    return <PlayCircle className="w-5 h-5 text-primary" />;
                  })()}
                  <div>
                    <h3 className="text-md font-semibold">{lesson.title}</h3>
                    <p className="text-xs flex items-center gap-1 text-muted">
                      <Clock className="w-4 h-4" /> {lesson.duration}
                    </p>
                  </div>
                </div>
                {(() => {
                  if (!isAuthenticated) {
                    return <span className="text-sm text-gray-400">Inicia sesión</span>;
                  }
                  if (!isMocked && !hasAccess) {
                    return <span className="text-sm text-yellow-600">Suscripción requerida</span>;
                  }
                  return (
                    <Link href={`/courses/${course.id}/lessons/${lesson.id}`}>
                      <button
                        type="button"
                        aria-label="Ver lección"
                        className="text-sm cursor-pointer text-primary hover:scale-110 transition"
                      >
                        {lesson.completed ? 'Revisar' : 'Ver ahora'}
                      </button>
                    </Link>
                  );
                })()}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
