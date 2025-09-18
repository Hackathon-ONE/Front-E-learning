'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function TestCourseCreationPage() {
  const { data: session, status } = useSession();
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  const runTests = async () => {
    setLoading(true);
    setTestResults([]);

    const tests = [
      {
        name: 'Verificar Sesión de Usuario',
        test: async () => {
          return {
            success: !!session?.user,
            message: session?.user ? `Usuario autenticado: ${session.user.email} (${session.user.role})` : 'No hay sesión activa',
            user: session?.user
          };
        }
      },
      {
        name: 'Listar Cursos Existentes',
        test: async () => {
          const response = await fetch('/api/courses');
          const data = await response.json();
          if (response.ok) {
            setCourses(data.data || []);
          }
          return {
            success: response.ok,
            message: data.message,
            count: data.count,
            source: data.source
          };
        }
      },
      {
        name: 'Crear Nuevo Curso',
        test: async () => {
          if (!session?.user) {
            return {
              success: false,
              message: 'No hay sesión activa - no se puede crear curso'
            };
          }

          const testCourse = {
            title: `Curso Test ${Date.now()}`,
            description: `Este es un curso de prueba creado el ${new Date().toLocaleString()}`,
            category: 'Prueba',
            level: 'Principiante',
            price: 25,
            resourceUrl: 'https://ejemplo.com/recurso',
            imageUrl: '/courses/test.jpg'
          };

          const response = await fetch('/api/courses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testCourse)
          });

          const data = await response.json();
          return {
            success: response.ok,
            message: data.message,
            course: data.course,
            status: response.status
          };
        }
      }
    ];

    const results = [];

    for (const test of tests) {
      try {
        const startTime = Date.now();
        const result = await test.test();
        const duration = Date.now() - startTime;

        results.push({
          name: test.name,
          success: result.success,
          message: result.message,
          duration: `${duration}ms`,
          data: result
        });
      } catch (error) {
        results.push({
          name: test.name,
          success: false,
          message: error.message,
          duration: 'N/A',
          error: true
        });
      }
    }

    setTestResults(results);
    setLoading(false);
  };

  useEffect(() => {
    if (status === 'authenticated') {
      runTests();
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4">Cargando sesión...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">🔐 Autenticación Requerida</h1>
          <p className="mb-4">Necesitas iniciar sesión como instructor para probar la creación de cursos.</p>
          <a 
            href="/auth/login" 
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Ir a Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          📚 Prueba de Creación de Cursos
        </h1>

        {/* Información de Sesión */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">👤 Información de Sesión</h2>
          <div className="space-y-2">
            <p><strong>Usuario:</strong> {session?.user?.email}</p>
            <p><strong>Nombre:</strong> {session?.user?.name}</p>
            <p><strong>Rol:</strong> 
              <span className={`ml-2 px-2 py-1 rounded text-xs ${
                session?.user?.role === 'ADMIN' ? 'bg-red-100 text-red-800' :
                session?.user?.role === 'INSTRUCTOR' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {session?.user?.role}
              </span>
            </p>
            <p><strong>ID:</strong> {session?.user?.id}</p>
          </div>
        </div>

        {/* Botón de Prueba */}
        <div className="text-center mb-8">
          <button
            onClick={runTests}
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? '🔄 Ejecutando Pruebas...' : '🔄 Ejecutar Pruebas'}
          </button>
        </div>

        {/* Resultados de Pruebas */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">🧪 Resultados de Pruebas</h2>

          <div className="space-y-3">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{result.name}</h3>
                    <p className={`text-sm ${result.success ? 'text-green-700' : 'text-red-700'}`}>
                      {result.success ? '✅' : '❌'} {result.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Duración: {result.duration}</p>
                    {result.data && (
                      <div className="mt-2 text-xs bg-gray-100 p-2 rounded">
                        <pre>{JSON.stringify(result.data, null, 2)}</pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lista de Cursos */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            📚 Cursos en Base de Datos ({courses.length})
          </h2>

          {courses.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Título</th>
                    <th className="px-4 py-2 text-left">Categoría</th>
                    <th className="px-4 py-2 text-left">Instructor ID</th>
                    <th className="px-4 py-2 text-left">Activo</th>
                    <th className="px-4 py-2 text-left">Publicado</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, index) => (
                    <tr key={course.id || index} className="border-t">
                      <td className="px-4 py-2 text-sm font-mono">{course.id}</td>
                      <td className="px-4 py-2 text-sm">{course.title}</td>
                      <td className="px-4 py-2 text-sm">{course.category}</td>
                      <td className="px-4 py-2 text-sm">{course.instructorId}</td>
                      <td className="px-4 py-2 text-sm">
                        <span className={`px-2 py-1 rounded text-xs ${
                          course.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {course.active ? 'Sí' : 'No'}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm">
                        <span className={`px-2 py-1 rounded text-xs ${
                          course.published ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {course.published ? 'Sí' : 'No'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No hay cursos disponibles</p>
          )}
        </div>

        {/* Enlaces de Navegación */}
        <div className="flex justify-center space-x-4">
          <a
            href="/instructor/courses/new"
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            📝 Crear Curso (Formulario)
          </a>
          <a
            href="/instructor/courses"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            📚 Ver Cursos
          </a>
          <a
            href="/test-db-integration"
            className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600"
          >
            🔗 Prueba General
          </a>
        </div>
      </div>
    </div>
  );
}
