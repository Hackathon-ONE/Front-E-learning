'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  TrendingUp,
  Calendar,
  Award,
  BarChart3,
} from 'lucide-react';
import Link from 'next/link';
import { studentsProgress } from '@/data/students';
import Image from 'next/image';

export default function StudentProgressPage() {
  const params = useParams();
  const [student, setStudent] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const studentId = params.id;
    const foundStudent = studentsProgress.find((s) => s.id === studentId);
    setStudent(foundStudent);
    if (foundStudent && foundStudent.courses.length > 0) {
      setSelectedCourse(foundStudent.courses[0]);
    }
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--color-text)]">
            Estudiante no encontrado
          </h1>
          <Link href="/students" className="text-primary hover:text-primary/80 mt-4 inline-block">
            Volver a estudiantes
          </Link>
        </div>
      </div>
    );
  }

  const overallProgress = Math.round(
    student.courses.reduce((acc, course) => acc + course.progress, 0) / student.courses.length
  );

  return (
    <main className="min-h-screen bg-[var(--color-bg)] py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/students/${student.id}`}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al perfil de {student.name}
          </Link>

          <div className="bg-[var(--color-surface)] rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <Image
                src={student.avatar}
                alt={student.name}
                width={128}
                height={64}
                unoptimized
                priority
                className="w-16 h-16 rounded-full border-4 border-primary/30"
              />
              <div>
                <h1 className="text-2xl font-bold text-[var(--color-text)]">
                  Progreso de {student.name}
                </h1>
                <p className="text-[var(--color-text)]">
                  Seguimiento detallado del aprendizaje
                </p>
              </div>
            </div>

            {/* Progreso general */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">{overallProgress}%</div>
                <div className="text-sm text-">Progreso General</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-1">
                  {student.completedLessons}
                </div>
                <div className="text-sm text-[var(--color-text)]">
                  Lecciones Completadas
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-1">{student.passedQuizzes}</div>
                <div className="text-sm text-[var(--color-text)]">Quizzes Aprobados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-1">
                  {student.achievements.length}
                </div>
                <div className="text-sm text-[var(--color-text)]">Logros Obtenidos</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Lista de cursos */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold text-[var(--color-text)] mb-4">Cursos</h2>
            <div className="space-y-3">
              {student.courses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => setSelectedCourse(course)}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    selectedCourse?.id === course.id
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-[var(--color-surface)] hover:shadow-md'
                  }`}
                >
                  <div className="font-medium text-sm mb-2">{course.title}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs opacity-80">{course.progress}% completado</span>
                    <div
                      className={`w-12 h-2 rounded-full ${
                        selectedCourse?.id === course.id
                          ? 'bg-[var(--color-text)]/30'
                          : 'bg-[var(--color-text)]/30'
                      }`}
                    >
                      <div
                        className={`h-2 rounded-full transition-all ${
                          selectedCourse?.id === course.id ? 'bg-white' : 'bg-primary'
                        }`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Contenido principal - Detalles del curso seleccionado */}
          <div className="lg:col-span-3">
            {selectedCourse && (
              <div className="space-y-6">
                {/* Header del curso */}
                <div className="bg-[var(--color-surface)] rounded-xl p-6 shadow-md">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2">
                        {selectedCourse.title}
                      </h2>
                      <p className="text-[var(--color-text)]">
                        Instructor: {selectedCourse.instructor} • {selectedCourse.duration}
                      </p>
                      <p className="text-sm text-[var(--color-text)] mt-1">
                        Inscrito: {new Date(selectedCourse.enrollDate).toLocaleDateString()} •
                        Último acceso: {new Date(selectedCourse.lastAccessed).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary mb-1">
                        {selectedCourse.progress}%
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          selectedCourse.status === 'completed'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        }`}
                      >
                        {selectedCourse.status === 'completed' ? 'Completado' : 'En Progreso'}
                      </div>
                    </div>
                  </div>

                  {/* Estadísticas del curso */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-[var(--color-bg)] rounded-lg p-3 text-center">
                      <BookOpen className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                      <div className="font-semibold text-[var(--color-text)]">
                        {selectedCourse.completedLessons}/{selectedCourse.totalLessons}
                      </div>
                      <div className="text-xs text-[var(--color-text)]">Lecciones</div>
                    </div>
                    <div className="bg-[var(--color-bg)] rounded-lg p-3 text-center">
                      <Target className="w-6 h-6 text-green-500 mx-auto mb-2" />
                      <div className="font-semibold text-[var(--color-text)]">
                        {selectedCourse.passedQuizzes}/{selectedCourse.totalQuizzes}
                      </div>
                      <div className="text-xs text-[var(--color-text)]">Quizzes</div>
                    </div>
                    <div className="bg-[var(--color-bg)] rounded-lg p-3 text-center">
                      <BarChart3 className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                      <div className="font-semibold text-[var(--color-text)]">
                        {selectedCourse.rating}
                      </div>
                      <div className="text-xs text-[var(--color-text)]">Rating</div>
                    </div>
                    <div className="bg-[var(--color-bg)] rounded-lg p-3 text-center">
                      <Award className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                      <div className="font-semibold text-[var(--color-text)]">
                        {selectedCourse.certificate ? 'Sí' : 'No'}
                      </div>
                      <div className="text-xs text-[var(--color-text)]">Certificado</div>
                    </div>
                  </div>
                </div>

                {/* Progreso de lecciones */}
                <div className="bg-[var(--color-surface)] rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-semibold text-[var(--color-text)] mb-4">
                    Progreso de Lecciones
                  </h3>
                  <div className="space-y-4">
                    {selectedCourse.lessons.map((lesson, index) => (
                      <div
                        key={lesson.id}
                        className={`border rounded-lg p-4 transition-all ${
                          lesson.completed
                            ? 'bg-[var(--color-bg)] text-[var(--color-text)]'
                            : 'bg-[var(--color-surface)] text-[var(--color-text)]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-surface)] text-sm font-medium">
                              {index + 1}
                            </div>
                            {lesson.completed ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <Clock className="w-5 h-5 text-[var(--color-text)]" />
                            )}
                            <div>
                              <h4 className="font-medium text-[var(--color-text)]">
                                {lesson.title}
                              </h4>
                              <p className="text-sm text-[var(--color-text)]">
                                Duración: {lesson.duration}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {lesson.quiz && (
                              <div
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  lesson.quiz.passed 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                }`}
                              >
                                Quiz: {lesson.quiz.score}%
                              </div>
                            )}
                            {lesson.completed && <CheckCircle className="w-6 h-6 text-[var(--color-text)]" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recursos del curso */}
                <div className="bg-[var(--color-surface)] rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-semibold text-[var(--color-text)] mb-4">
                    Recursos del Curso
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedCourse.resources.map((resource) => (
                      <div
                        key={resource.id}
                        className={`border rounded-lg p-4 ${
                          resource.downloaded
                            ? 'border-[var(--color-text)] bg-[var(--color-surface)]'
                            : 'border-[var(--color-text)] dark:border-[var(--color-text)]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-[var(--color-text)]">
                              {resource.title}
                            </h4>
                            <p className="text-sm text-[var(--color-text)] capitalize">
                              Tipo: {resource.type}
                            </p>
                          </div>
                          {resource.downloaded ? (
                            <CheckCircle className="w-5 h-5 text-[var(--color-text)]" />
                          ) : (
                            <XCircle className="w-5 h-5 text-[var(--color-text)]" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certificado si está disponible */}
                {selectedCourse.certificate && (
                  <div className="border border-[var(--color-text)] rounded-xl p-6">
                    <div className="flex items-center gap-4">
                      <Award className="w-12 h-12 text-yellow-500" />
                      <div>
                        <h3 className="text-xl font-semibold text-[var(--color-text)]">
                          ¡Certificado Obtenido!
                        </h3>
                        <p className="text-[var(--color-text)]">
                          Emitido el{' '}
                          {new Date(selectedCourse.certificate.issued).toLocaleDateString()}
                        </p>
                        <button className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
                          Descargar Certificado
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
