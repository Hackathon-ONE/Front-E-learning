'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function TestInstructorFilterPage() {
  const { data: session, status } = useSession();
  const [allCourses, setAllCourses] = useState([]);
  const [instructorCourses, setInstructorCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 Cargando TODOS los cursos...');
      
      // Simular como estudiante (sin sesión)
      const response = await fetch('/api/courses');
      const data = await response.json();
      
      if (response.ok) {
        console.log('✅ Todos los cursos cargados:', data);
        setAllCourses(data.data || []);
      } else {
        console.error('❌ Error cargando todos los cursos:', data);
        setError(data.message || "Error al cargar los cursos");
      }
    } catch (err) {
      console.error('❌ Error de conexión:', err);
      setError("Error de conexión al cargar los cursos");
    } finally {
      setLoading(false);
    }
  };

  const fetchInstructorCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 Cargando cursos del instructor:', session?.user?.email);
      
      // Con sesión de instructor
      const response = await fetch('/api/courses');
      const data = await response.json();
      
      if (response.ok) {
        console.log('✅ Cursos del instructor cargados:', data);
        setInstructorCourses(data.data || []);
      } else {
        console.error('❌ Error cargando cursos del instructor:', data);
        setError(data.message || "Error al cargar los cursos del instructor");
      }
    } catch (err) {
      console.error('❌ Error de conexión:', err);
      setError("Error de conexión al cargar los cursos del instructor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role === 'INSTRUCTOR') {
      fetchInstructorCourses();
    }
  }, [status, session]);

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          🧪 Prueba de Filtrado por Instructor
        </h1>

        {/* Información de Sesión */}
        {session?.user && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">👤 Información de Sesión</h2>
            <div className="space-y-2">
              <p><strong>Usuario:</strong> {session.user.email}</p>
              <p><strong>Nombre:</strong> {session.user.name}</p>
              <p><strong>Rol:</strong> 
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  session.user.role === 'ADMIN' ? 'bg-red-100 text-red-800' :
                  session.user.role === 'INSTRUCTOR' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {session.user.role}
                </span>
              </p>
              <p><strong>ID:</strong> {session.user.id}</p>
            </div>
          </div>
        )}

        {/* Botones de Prueba */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={fetchAllCourses}
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? '🔄 Cargando...' : '🔄 Cargar Todos los Cursos'}
          </button>
          
          {session?.user?.role === 'INSTRUCTOR' && (
            <button
              onClick={fetchInstructorCourses}
              disabled={loading}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 disabled:opacity-50"
            >
              {loading ? '🔄 Cargando...' : '🔄 Cargar Mis Cursos'}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Todos los Cursos */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              📚 Todos los Cursos ({allCourses.length})
            </h2>

            {loading ? (
              <p className="text-center py-4">Cargando...</p>
            ) : error ? (
              <p className="text-center py-4 text-red-500">{error}</p>
            ) : allCourses.length > 0 ? (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {allCourses.map((course, index) => (
                  <div key={course.id || index} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{course.title}</h3>
                        <p className="text-xs text-gray-500">{course.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-mono text-gray-400">ID: {course.instructorId}</p>
                        <p className="text-xs text-gray-500">Instructor</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No hay cursos disponibles</p>
            )}
          </div>

          {/* Cursos del Instructor */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              👨‍🏫 Mis Cursos ({instructorCourses.length})
            </h2>

            {!session?.user ? (
              <p className="text-center py-4 text-gray-500">
                Inicia sesión como instructor para ver tus cursos
              </p>
            ) : session.user.role !== 'INSTRUCTOR' ? (
              <p className="text-center py-4 text-gray-500">
                Solo los instructores pueden ver esta sección
              </p>
            ) : loading ? (
              <p className="text-center py-4">Cargando...</p>
            ) : error ? (
              <p className="text-center py-4 text-red-500">{error}</p>
            ) : instructorCourses.length > 0 ? (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {instructorCourses.map((course, index) => (
                  <div key={course.id || index} className="p-3 border rounded-lg bg-green-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{course.title}</h3>
                        <p className="text-xs text-gray-500">{course.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-mono text-gray-400">ID: {course.instructorId}</p>
                        <p className="text-xs text-green-600">✅ Mi curso</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No tienes cursos creados aún</p>
            )}
          </div>
        </div>

        {/* Comparación */}
        {session?.user?.role === 'INSTRUCTOR' && allCourses.length > 0 && instructorCourses.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">📊 Comparación de Filtrado</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800">Total de Cursos</h3>
                <p className="text-2xl font-bold text-blue-600">{allCourses.length}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800">Mis Cursos</h3>
                <p className="text-2xl font-bold text-green-600">{instructorCourses.length}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800">Otros Cursos</h3>
                <p className="text-2xl font-bold text-gray-600">{allCourses.length - instructorCourses.length}</p>
              </div>
            </div>
            
            {instructorCourses.length < allCourses.length && (
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                <p className="text-yellow-800">
                  ✅ <strong>Filtrado funcionando:</strong> Solo se muestran {instructorCourses.length} de {allCourses.length} cursos totales
                </p>
              </div>
            )}
          </div>
        )}

        {/* Enlaces de Navegación */}
        <div className="flex justify-center space-x-4 mt-8">
          <a
            href="/instructor/courses"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            📚 Ver Cursos (Página Real)
          </a>
          <a
            href="/test-instructor-courses"
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            🧪 Prueba Instructor
          </a>
          <a
            href="/auth/login"
            className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600"
          >
            🔐 Login
          </a>
        </div>
      </div>
    </div>
  );
}
