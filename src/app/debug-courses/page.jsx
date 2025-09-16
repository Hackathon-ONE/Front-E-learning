'use client';

import { coursesPageData, coursesDetailData } from '@/data/courses';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function DebugCoursesPage() {
  const [testCourseId, setTestCourseId] = useState('');
  const [testResult, setTestResult] = useState(null);

  const testCourseAccess = () => {
    if (!testCourseId) return;

    const course = 
      coursesDetailData.find((c) => c.id.toString() === String(testCourseId)) ||
      coursesPageData.find((c) => c.id.toString() === String(testCourseId));

    setTestResult({
      courseId: testCourseId,
      found: !!course,
      course: course || null,
      error: course ? null : `Curso con ID ${testCourseId} no encontrado`
    });
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg)] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-8">
          Debug de Cursos
        </h1>

        {/* Cursos disponibles */}
        <div className="bg-[var(--color-surface)] rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
            Cursos Disponibles (coursesPageData)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coursesPageData.map((course) => (
              <div key={course.id} className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                <div className="text-sm space-y-1">
                  <p><strong>ID:</strong> {course.id}</p>
                  <p><strong>Título:</strong> {course.title}</p>
                  <p><strong>Instructor:</strong> {course.instructor}</p>
                  <p><strong>Gratuito:</strong> {course.isFree ? 'Sí' : 'No'}</p>
                  <p><strong>Precio:</strong> ${course.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[var(--color-surface)] rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
            Cursos Detallados (coursesDetailData)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coursesDetailData.map((course) => (
              <div key={course.id} className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                <div className="text-sm space-y-1">
                  <p><strong>ID:</strong> {course.id}</p>
                  <p><strong>Título:</strong> {course.title}</p>
                  <p><strong>Gratuito:</strong> {course.isFree ? 'Sí' : 'No'}</p>
                  <p><strong>Lecciones:</strong> {course.lessons}</p>
                  <p><strong>Duración:</strong> {course.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prueba de acceso */}
        <div className="bg-[var(--color-surface)] rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
            Probar Acceso a Curso
          </h2>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              value={testCourseId}
              onChange={(e) => setTestCourseId(e.target.value)}
              placeholder="Ingresa un ID de curso (1-6)"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-[var(--color-bg)] text-[var(--color-text)]"
            />
            <button
              onClick={testCourseAccess}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90"
            >
              Probar
            </button>
          </div>

          {testResult && (
            <div className={`p-4 rounded-lg ${testResult.found ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
              <h3 className="font-semibold mb-2">
                {testResult.found ? '✅ Curso Encontrado' : '❌ Curso No Encontrado'}
              </h3>
              <div className="text-sm space-y-1">
                <p><strong>ID Probado:</strong> {testResult.courseId}</p>
                {testResult.course && (
                  <>
                    <p><strong>Título:</strong> {testResult.course.title}</p>
                    <p><strong>Gratuito:</strong> {testResult.course.isFree ? 'Sí' : 'No'}</p>
                  </>
                )}
                {testResult.error && (
                  <p className="text-red-600 dark:text-red-400"><strong>Error:</strong> {testResult.error}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* URLs de prueba */}
        <div className="bg-[var(--color-surface)] rounded-lg p-6">
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
            URLs de Prueba
          </h2>
          <div className="space-y-2 text-sm">
            {coursesPageData.map((course) => (
              <div key={course.id} className="flex gap-4 items-center">
                <span className="w-8 text-center">{course.id}</span>
                <a
                  href={`/courses/${course.id}`}
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  /courses/{course.id}
                </a>
                <a
                  href={`/courses/${course.id}/lessons`}
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  /courses/{course.id}/lessons
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
