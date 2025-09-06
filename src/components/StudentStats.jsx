'use client';

import { BarChart3, TrendingUp, Clock, Target, Award, BookOpen } from 'lucide-react';

export default function StudentStats({ student }) {
  if (!student) return null;

  // Calcular estadísticas
  const overallProgress = Math.round(
    student.courses.reduce((acc, course) => acc + course.progress, 0) / student.courses.length
  );

  const averageQuizScore = Math.round(
    student.courses
      .flatMap((course) => course.lessons.filter((lesson) => lesson.quiz))
      .reduce((acc, lesson, _, arr) => acc + lesson.quiz.score / arr.length, 0)
  );

  const totalStudyTime = student.courses
    .flatMap((course) => course.lessons.filter((lesson) => lesson.completed))
    .reduce((acc, lesson) => {
      const minutes = parseInt(lesson.duration.split(' ')[0]);
      return acc + minutes;
    }, 0);

  const studyHours = Math.floor(totalStudyTime / 60);
  const studyMinutes = totalStudyTime % 60;

  // Progreso por mes (simulado)
  const monthlyProgress = [
    { month: 'Ene', progress: 20 },
    { month: 'Feb', progress: 45 },
    { month: 'Mar', progress: overallProgress },
  ];

  return (
    <div className="space-y-6">
      {/* Gráfico de progreso mensual */}
      <div className="bg-[var(--color-card-primary)] rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-semibold text-[var(--color-card-primary-text)] mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[var(--color-progress)]" />
          Progreso Mensual
        </h3>
        <div className="flex items-end justify-between h-32 gap-4">
          {monthlyProgress.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-gray-400 dark:bg-gray-700 rounded-t-lg relative overflow-hidden">
                <div
                  className="bg-gradient-to-t from-primary to-primary/70 rounded-t-lg transition-all duration-1000 ease-out"
                  style={{ height: `${(data.progress / 100) * 120}px` }}
                ></div>
              </div>
              <div className="mt-2 text-center">
                <div className="text-sm font-medium text-[var(--color-card-primary-text)]">{data.progress}%</div>
                <div className="text-xs text-[var(--color-text)]">{data.month}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Estadísticas detalladas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tiempo de estudio */}
        <div className="bg-[var(--color-card-primary)] rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-[var(--color-accent)]" />
            <h3 className="text-lg font-semibold text-[var(--color-card-primary-text)]">Tiempo de Estudio</h3>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[var(--color-accent)] mb-2">
              {studyHours}h {studyMinutes}m
            </div>
            <div className="text-sm text-[var(--color-text)]">Total acumulado</div>
            <div className="mt-4 bg-[var(--color-card-secondary)] rounded-lg p-3">
              <div className="text-sm text-[var(--color-accent)]">
                Promedio: ~{Math.round(totalStudyTime / student.courses.length)} min por curso
              </div>
            </div>
          </div>
        </div>

        {/* Rendimiento en quizzes */}
        <div className="bg-[var(--color-card-primary)] rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-[var(--color-accent)]" />
            <h3 className="text-lg font-semibold text-[var(--color-card-primary-text)]">Rendimiento Quizzes</h3>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[var(--color-accent)] mb-2">{averageQuizScore}%</div>
            <div className="text-sm text-[var(--color-text)]">Promedio general</div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Aprobados</span>
                <span>
                  {student.passedQuizzes}/{student.totalQuizzes}
                </span>
              </div>
              <div className="w-full bg-[var(--color-card-secondary)] rounded-full h-2">
                <div
                  className="bg-[var(--color-accent)] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(student.passedQuizzes / student.totalQuizzes) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Distribución de cursos por estado */}
      <div className="bg-surface rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-[var(--color-progress)]" />
          Estado de Cursos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-[var(--color-card-secondary)] rounded-lg">
            <BookOpen className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {student.courses.filter((c) => c.status === 'completed').length}
            </div>
            <div className="text-sm text-green-700 dark:text-green-300">Completados</div>
          </div>
          <div className="text-center p-4 bg-[var(--color-card-secondary)] rounded-lg">
            <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {student.courses.filter((c) => c.status === 'in_progress').length}
            </div>
            <div className="text-sm text-blue-700 dark:text-blue-300">En Progreso</div>
          </div>
          <div className="text-center p-4 bg-[var(--color-card-secondary)] rounded-lg">
            <BookOpen className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-500">
              {student.upcomingCourses.length}
            </div>
            <div className="text-sm text-red-500">Próximos</div>
          </div>
        </div>
      </div>

      {/* Progreso por curso */}
      <div className="bg-[var(--color-card-primary)] rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-semibold text-[var(--color-card-primary-text)] mb-4">Progreso por Curso</h3>
        <div className="space-y-4">
          {student.courses.map((course) => (
            <div key={course.id}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-[var(--color-card-primary-text)]">{course.title}</span>
                <span className="text-sm text-[var(--color-muted)]">{course.progress}%</span>
              </div>
              <div className="w-full bg-[var(--color-card-secondary)] rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500  ${
                    course.status === 'completed' ? 'bg-green-500' : 'bg-primary'
                  }`}
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
