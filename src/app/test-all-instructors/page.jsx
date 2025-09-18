'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function TestAllInstructorsPage() {
  const { data: session, status } = useSession();
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInstructors = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 Cargando instructores...');
      
      const response = await fetch('/api/users');
      const data = await response.json();
      
      if (response.ok) {
        const instructorsData = data.data.filter(user => user.role === 'INSTRUCTOR');
        console.log('✅ Instructores cargados:', instructorsData);
        setInstructors(instructorsData);
      } else {
        console.error('❌ Error cargando instructores:', data);
        setError(data.message || "Error al cargar los instructores");
      }
    } catch (err) {
      console.error('❌ Error de conexión:', err);
      setError("Error de conexión al cargar los instructores");
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 Cargando todos los cursos...');
      
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

  const testInstructorFilter = async (instructorId) => {
    try {
      console.log(`🔍 Probando filtrado para instructor ID: ${instructorId}`);
      
      const response = await fetch(`/api/courses?instructorId=${instructorId}`);
      const data = await response.json();
      
      if (response.ok) {
        console.log(`✅ Cursos del instructor ${instructorId}:`, data);
        return data.data || [];
      } else {
        console.error(`❌ Error cargando cursos del instructor ${instructorId}:`, data);
        return [];
      }
    } catch (err) {
      console.error(`❌ Error de conexión para instructor ${instructorId}:`, err);
      return [];
    }
  };

  useEffect(() => {
    fetchInstructors();
    fetchCourses();
  }, []);

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
          👨‍🏫 Prueba de Todos los Instructores
        </h1>

        {/* Información de Sesión */}
        {session?.user && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">👤 Sesión Actual</h2>
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
            onClick={fetchInstructors}
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? '🔄 Cargando...' : '🔄 Cargar Instructores'}
          </button>
          
          <button
            onClick={fetchCourses}
            disabled={loading}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? '🔄 Cargando...' : '🔄 Cargar Cursos'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lista de Instructores */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              👨‍🏫 Instructores ({instructors.length})
            </h2>

            {loading ? (
              <p className="text-center py-4">Cargando...</p>
            ) : error ? (
              <p className="text-center py-4 text-red-500">{error}</p>
            ) : instructors.length > 0 ? (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {instructors.map((instructor, index) => (
                  <div key={instructor.id || index} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{instructor.name}</h3>
                        <p className="text-xs text-gray-500">{instructor.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-mono text-gray-400">ID: {instructor.id}</p>
                        <button
                          onClick={() => testInstructorFilter(instructor.id)}
                          className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200"
                        >
                          Probar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No hay instructores disponibles</p>
            )}
          </div>

          {/* Lista de Cursos */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              📚 Todos los Cursos ({courses.length})
            </h2>

            {loading ? (
              <p className="text-center py-4">Cargando...</p>
            ) : error ? (
              <p className="text-center py-4 text-red-500">{error}</p>
            ) : courses.length > 0 ? (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {courses.map((course, index) => (
                  <div key={course.id || index} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{course.title}</h3>
                        <p className="text-xs text-gray-500">{course.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-mono text-gray-400">Instructor: {course.instructorId}</p>
                        <p className="text-xs text-gray-500">ID: {course.id}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No hay cursos disponibles</p>
            )}
          </div>
        </div>

        {/* Estadísticas */}
        {instructors.length > 0 && courses.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">📊 Estadísticas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800">Total Instructores</h3>
                <p className="text-2xl font-bold text-blue-600">{instructors.length}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800">Total Cursos</h3>
                <p className="text-2xl font-bold text-green-600">{courses.length}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-800">Promedio por Instructor</h3>
                <p className="text-2xl font-bold text-purple-600">
                  {(courses.length / instructors.length).toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Enlaces de Navegación */}
        <div className="flex justify-center space-x-4 mt-8">
          <a
            href="/test-instructor-filter"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            🧪 Prueba Filtrado
          </a>
          <a
            href="/instructor/courses"
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            📚 Mis Cursos
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
