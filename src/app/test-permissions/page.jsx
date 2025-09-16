'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function TestPermissionsPage() {
  const { user, role, isAuthenticated } = useAuth();
  const router = useRouter();
  const [testResults, setTestResults] = useState({});

  const testRoutes = [
    { path: '/', name: 'Home (Público)', shouldWork: true },
    { path: '/courses', name: 'Catálogo de Cursos (Público)', shouldWork: true },
    { path: '/courses/2', name: 'Detalle de Curso (Público)', shouldWork: true },
    {
      path: '/courses/2/lessons',
      name: 'Lecciones (Requiere Auth + Suscripción)',
      shouldWork: isAuthenticated,
    },
    {
      path: '/courses/2/resources',
      name: 'Recursos (Requiere Auth + Suscripción)',
      shouldWork: isAuthenticated,
    },
    {
      path: '/courses/2/quizzes/1',
      name: 'Quiz (Requiere Auth + Suscripción)',
      shouldWork: isAuthenticated,
    },
    {
      path: '/instructor/dashboard',
      name: 'Dashboard Instructor (Solo Instructores)',
      shouldWork: role === 'INSTRUCTOR' || role === 'ADMIN',
    },
    {
      path: '/instructor/2',
      name: 'Perfil Instructor (Solo Instructores)',
      shouldWork: role === 'INSTRUCTOR' || role === 'ADMIN',
    },
    {
      path: '/admin/dashboard',
      name: 'Dashboard Admin (Solo Admins)',
      shouldWork: role === 'ADMIN',
    },
    {
      path: '/students/3',
      name: 'Perfil Estudiante (Solo Estudiantes)',
      shouldWork: role === 'STUDENT' || role === 'ADMIN',
    },
  ];

  const testRoute = async (route) => {
    try {
      const response = await fetch(route, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  const runAllTests = async () => {
    const results = {};
    for (const route of testRoutes) {
      results[route.path] = {
        expected: route.shouldWork,
        actual: await testRoute(route.path),
        name: route.name,
      };
    }
    setTestResults(results);
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg)] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-8">
          Prueba de Permisos y Rutas
        </h1>

        {/* Estado del usuario */}
        <div className="bg-[var(--color-surface)] rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
            Estado Actual del Usuario
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p>
                <strong>Autenticado:</strong> {isAuthenticated ? 'Sí' : 'No'}
              </p>
              <p>
                <strong>Rol:</strong> {role || 'GUEST'}
              </p>
              <p>
                <strong>ID:</strong> {user?.id || 'N/A'}
              </p>
            </div>
            <div>
              <p>
                <strong>Nombre:</strong> {user?.name || 'N/A'}
              </p>
              <p>
                <strong>Email:</strong> {user?.email || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Botón para ejecutar pruebas */}
        <div className="text-center mb-8">
          <button
            onClick={runAllTests}
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition"
          >
            Ejecutar Pruebas de Permisos
          </button>
        </div>

        {/* Resultados de las pruebas */}
        {Object.keys(testResults).length > 0 && (
          <div className="bg-[var(--color-surface)] rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
              Resultados de las Pruebas
            </h2>
            <div className="space-y-4">
              {Object.entries(testResults).map(([path, result]) => (
                <div
                  key={path}
                  className={`p-4 rounded-lg border ${
                    result.expected === result.actual
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                      : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-[var(--color-text)]">{result.name}</h3>
                      <p className="text-sm text-[var(--color-text)]">Ruta: {path}</p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold ${
                          result.expected === result.actual ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {result.expected === result.actual ? '✅ CORRECTO' : '❌ INCORRECTO'}
                      </p>
                      <p className="text-sm text-[var(--color-text)]">
                        Esperado: {result.expected ? 'Acceso' : 'Sin acceso'} | Actual:{' '}
                        {result.actual ? 'Acceso' : 'Sin acceso'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enlaces de prueba manual */}
        <div className="bg-[var(--color-surface)] rounded-lg p-6">
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
            Enlaces de Prueba Manual
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testRoutes.map((route) => (
              <div
                key={route.path}
                className="border border-gray-300 dark:border-gray-600 rounded-lg p-4"
              >
                <h3 className="font-semibold text-[var(--color-text)] mb-2">{route.name}</h3>
                <p className="text-sm text-[var(--color-text)] mb-3">{route.path}</p>
                <Link
                  href={route.path}
                  className="inline-block px-4 py-2 bg-primary text-white rounded-lg text-sm hover:opacity-90 transition"
                  target="_blank"
                >
                  Probar Ruta
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Instrucciones */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
            Instrucciones de Prueba
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-[var(--color-text)]">
            <li>Inicia sesión con diferentes roles para probar los permisos</li>
            <li>Verifica que las rutas públicas funcionen sin autenticación</li>
            <li>Verifica que las rutas de instructores solo funcionen para instructores</li>
            <li>Verifica que las rutas de admin solo funcionen para administradores</li>
            <li>Verifica que las lecciones/recursos requieran suscripción</li>
            <li>
              <strong>Usuarios mockeados:</strong> Tienen acceso completo (ya pagaron)
            </li>
            <li>
              <strong>Usuarios de Google:</strong> Necesitan pagar suscripción para acceder
            </li>
            <li>
              Prueba el flujo de pago en{' '}
              <a href="/payments" className="text-primary hover:underline">
                /payments
              </a>
            </li>
            <li>
              Prueba la gestión de suscripción en{' '}
              <a href="/test-subscription" className="text-primary hover:underline">
                /test-subscription
              </a>
            </li>
          </ol>
        </div>
      </div>
    </main>
  );
}
