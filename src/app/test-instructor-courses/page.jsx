'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function TestInstructorCoursesPage() {
  const { data: session, status } = useSession();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 Cargando cursos para instructor:', session?.user?.email);
      
      const response = await fetch('/api/courses');
      const data = await response.json();
      
      if (response.ok) {
        console.log('✅ Cursos cargados:', data);
        setCourses(data.data || []);
      } else {
        console.error('❌ Error cargando cursos:', data);
        setError(data.message || "Error al cargar los cursos");
      }
    } catch (err) {
      console.error('❌ Error de conexión:', err);
      setError("Error de conexión al cargar los cursos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchCourses();
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
          <p className="mb-4">Necesitas iniciar sesión para ver los cursos del instructor.</p>
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
          📚 Cursos del Instructor
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

        {/* Botón de Actualizar */}
        <div className="text-center mb-8">
          <button
            onClick={fetchCourses}
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? '🔄 Cargando...' : '🔄 Actualizar Cursos'}
          </button>
        </div>

        {/* Lista de Cursos */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            📚 Mis Cursos ({courses.length})
          </h2>

          {loading ? (
            <p className="text-center py-4">Cargando cursos...</p>
          ) : error ? (
            <p className="text-center py-4 text-red-500">{error}</p>
          ) : courses.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Título</th>
                    <th className="px-4 py-2 text-left">Categoría</th>
                    <th className="px-4 py-2 text-left">Nivel</th>
                    <th className="px-4 py-2 text-left">Instructor ID</th>
                    <th className="px-4 py-2 text-left">Estado</th>
                    <th className="px-4 py-2 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, index) => (
                    <tr key={course.id || index} className="border-t">
                      <td className="px-4 py-2 text-sm font-mono">{course.id}</td>
                      <td className="px-4 py-2 text-sm font-semibold">{course.title}</td>
                      <td className="px-4 py-2 text-sm">{course.category}</td>
                      <td className="px-4 py-2 text-sm">{course.level}</td>
                      <td className="px-4 py-2 text-sm font-mono">{course.instructorId}</td>
                      <td className="px-4 py-2 text-sm">
                        <span className={`px-2 py-1 rounded text-xs ${
                          course.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {course.published ? 'Publicado' : 'Borrador'}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm">
                        <div className="flex space-x-2">
                          <a
                            href={`/instructor/courses/${course.id}`}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            Ver
                          </a>
                          <a
                            href={`/instructor/courses/${course.id}/edit`}
                            className="text-green-500 hover:text-green-700"
                          >
                            Editar
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No tienes cursos creados aún.</p>
              <a
                href="/instructor/courses/new"
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
              >
                Crear Primer Curso
              </a>
            </div>
          )}
        </div>

        {/* Enlaces de Navegación */}
        <div className="flex justify-center space-x-4">
          <a
            href="/instructor/courses"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            📚 Ver Cursos (Página Real)
          </a>
          <a
            href="/instructor/courses/new"
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            ➕ Crear Curso
          </a>
          <a
            href="/test-course-creation"
            className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600"
          >
            🧪 Prueba Creación
          </a>
        </div>
      </div>
    </div>
  );
}
