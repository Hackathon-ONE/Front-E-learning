'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  BookOpen,
  BarChart3,
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  Download,
  Star,
  Calendar,
  Target,
  Award,
  PlayCircle,
  FileText,
  Heart,
  TrendingUp,
  Lightbulb,
} from 'lucide-react';
import Link from 'next/link';
import { studentsProgress } from '@/data/students';
import StudentStats from '@/components/StudentStats';
import RecommendationsForm from '../recommendations-form';
import Image from 'next/image';

export default function StudentDetailPage() {
  const params = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('courses');

  useEffect(() => {
    const studentId = params?.id;
    const foundStudent = studentsProgress.find((s) => s.id === studentId);
    setStudent(foundStudent);
    setLoading(false);
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--color-text)]">
            Estudiante no encontrado
          </h1>
          <Link href="/" className="text-primary hover:text-primary/80 mt-4 inline-block">
            Volver
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
        {/* Header con navegación */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Link>

          {/* Perfil del estudiante */}
          <div className="bg-[var(--color-surface)] rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Image
                aria-label={student.name}
                src={student.avatar || "/default-avatar.png"}
                alt={student.name}
                width={128}
                height={64}
                unoptimized
                priority
                className="w-24 h-24 rounded-full border-4 border-primary/30 shadow-lg"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">{student.name}</h1>
                <p className="text-[var(--color-text)] mb-4">{student.email}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span>Miembro desde {new Date(student.joinDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span>Progreso general: {overallProgress}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas generales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[var(--color-surface)] rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-[var(--color-text)]">
                  {student.totalCourses}
                </p>
                <p className="text-sm text-[var(--color-text)]">Cursos Inscritos</p>
              </div>
            </div>
          </div>

          <div className="bg-[var(--color-surface)] rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold text-[var(--color-text)]">
                  {student.completedCourses}
                </p>
                <p className="text-sm text-[var(--color-text)]">Cursos Completados</p>
              </div>
            </div>
          </div>

          <div className="bg-[var(--color-surface)] rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-3">
              <PlayCircle className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-[var(--color-text)]">
                  {student.completedLessons}/{student.totalLessons}
                </p>
                <p className="text-sm text-[var(--color-text)]">Lecciones</p>
              </div>
            </div>
          </div>

          <div className="bg-[var(--color-surface)] rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold text-[var(--color-text)]">
                  {student.passedQuizzes}/{student.totalQuizzes}
                </p>
                <p className="text-sm text-[var(--color-text)]">Quizzes Aprobados</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pestañas de navegación */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex flex-wrap space-x-2 sm:space-x-8">
              <button
                type="button"
                aria-label="Cursos"
                onClick={() => setActiveTab('courses')}
                className={`border-b-2 py-2 px-1 text-sm cursor-pointer font-medium transition-colors ${
                  activeTab === 'courses'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-[var(--color-text)] hover:text-[var(--color-text)] hover:border-gray-300'
                }`}
              >
                Cursos
              </button>
              
              <button
                type="button"
                aria-label="Estadísticas"
                onClick={() => setActiveTab('stats')}
                className={`border-b-2 py-2 px-1 text-sm cursor-pointer font-medium transition-colors ${
                  activeTab === 'stats'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-[var(--color-text)] hover:text-[var(--color-text)] hover:border-gray-300'
                }`}
              >
                Estadísticas
              </button>
              <button
                type="button"
                aria-label="Recomendaciones AI"
                onClick={() => setActiveTab('recommendations')}
                className={`border-b-2 py-2 px-1 text-sm cursor-pointer font-medium transition-colors ${
                  activeTab === 'recommendations'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-[var(--color-text)] hover:text-[var(--color-text)] hover:border-gray-300'
                }`}
              >
                Recomendaciones AI
              </button>
            </nav>
          </div>
        </div>

        {/* Contenido condicional según pestaña activa */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cursos inscritos */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">Cursos Inscritos</h2>
              <div className="space-y-6">
                {student.courses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-[var(--color-surface)] rounded-xl p-6 shadow-md"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">
                          {course.title}
                        </h3>
                        <p className="text-sm text-[var(--color-text)]">
                          Instructor: {course.instructor} • {course.duration} • {course.difficulty}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm">{course.rating}</span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              course.status === 'completed'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                            }`}
                          >
                            {course.status === 'completed' ? 'Completado' : 'En Progreso'}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[var(--color-text)]">
                          {course.progress}%
                        </div>
                        <div className="w-20 bg-[var(--color-text)] text-[var(--color-text)] dark:bg-gray-700 rounded-full h-2 mt-2">
                          <div
                            className="bg-primary h-2 text-gray-400 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Estadísticas del curso */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-[var(--color-text)]">
                          {course.completedLessons}/{course.totalLessons}
                        </div>
                        <div className="text-xs text-[var(--color-text)]">Lecciones</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-[var(--color-text)]">
                          {course.passedQuizzes}/{course.totalQuizzes}
                        </div>
                        <div className="text-xs text-[var(--color-text)]">Quizzes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-[var(--color-text)]">
                          {course.resources.filter((r) => r.downloaded).length}
                        </div>
                        <div className="text-xs text-[var(--color-text)]">Recursos</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-[var(--color-text)]">
                          {course.certificate ? '✓' : '-'}
                        </div>
                        <div className="text-xs text-[var(--color-text)]">Certificado</div>
                      </div>
                    </div>

                    {/* Lecciones recientes */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <h4 className="font-medium text-[var(--color-text)] mb-3">
                        Progreso de Lecciones
                      </h4>
                      <div className="space-y-2">
                        {course.lessons.slice(0, 3).map((lesson) => (
                          <div key={lesson.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {lesson.completed ? (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              ) : (
                                <Clock className="w-5 h-5 text-gray-400" />
                              )}
                              <span className="text-sm">{lesson.title}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-[var(--color-text)] dark:text-gray-400">
                              <span>{lesson.duration}</span>
                              {lesson.quiz && (
                                <span
                                  className={`px-2 py-1 rounded ${
                                    lesson.quiz.passed
                                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                                  }`}
                                >
                                  Quiz: {lesson.quiz.score}%
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                        {course.lessons.length > 3 && (
                          <div className="text-center pt-2">
                            <button 
                              type="button"
                              aria-label="Ver todas las lecciones"
                              className="text-primary cursor-pointer hover:text-primary/80 text-sm"
                            >
                              Ver todas las lecciones ({course.lessons.length})
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar con información adicional */}
            <div className="space-y-6">
              {/* Logros */}
              <div className="bg-[var(--color-surface)] rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  Logros Recientes
                </h3>
                <div className="space-y-3">
                  {student.achievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center gap-3">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <p className="font-medium text-sm">{achievement.title}</p>
                        <p className="text-xs text-[var(--color-text)]">
                          {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Temas favoritos */}
              <div className="bg-[var(--color-surface)] rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Temas Favoritos
                </h3>
                <div className="flex flex-wrap gap-2">
                  {student.favoriteTopics.map((topic, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Próximos cursos */}
              <div className="bg-[var(--color-surface)] rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  Próximos Cursos
                </h3>
                <div className="space-y-3">
                  {student.upcomingCourses.map((course) => (
                    <div key={course.id} className="border-l-4 border-primary pl-3">
                      <p className="font-medium text-sm">{course.title}</p>
                      <p className="text-xs text-[var(--color-text)]">
                        {course.instructor} • Inicia{' '}
                        {new Date(course.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recursos descargados */}
              <div className="bg-[var(--color-surface)] rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-500" />
                  Recursos Obtenidos
                </h3>
                <div className="space-y-2">
                  {student.courses
                    .flatMap((course) => course.resources.filter((r) => r.downloaded))
                    .slice(0, 5)
                    .map((resource, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Download className="w-4 h-4 text-[var(--color-text)]" />
                        <span className="truncate">{resource.title}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div>
            <StudentStats student={student} />
          </div>
        )}
        
        {activeTab === 'recommendations' && (
          <div className="bg-[var(--color-surface)] rounded-xl p-6 shadow-md">
            <div className="text-center">
              <Lightbulb className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-primary" />
              <h2 className="text-2xl sm:text-3xl font-bold mt-4">
                Recomendaciones de cursos de IA
              </h2>
              <p className="text-[var(--color-text)] mt-2 text-sm sm:text-base">
                Cuéntanos sobre ti y deja que nuestra IA te encuentre los cursos perfectos para
                ayudarte a crecer.
              </p>
              <RecommendationsForm />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}