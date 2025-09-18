'use client';

import { useState, useEffect } from 'react';

export default function TestDBIntegrationPage() {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const runTests = async () => {
    setLoading(true);
    setTestResults([]);

    const tests = [
      {
        name: 'Conexión a Base de Datos',
        test: async () => {
          const response = await fetch('/api/backend-status');
          const data = await response.json();
          return {
            success: response.ok,
            message: data.message,
            data: data.data,
          };
        },
      },
      {
        name: 'Lista de Usuarios de DB',
        test: async () => {
          const response = await fetch('/api/users');
          const data = await response.json();
          if (response.ok) {
            setUsers(data.data || []);
          }
          return {
            success: response.ok,
            message: data.message,
            count: data.count,
            source: data.source,
          };
        },
      },
      {
        name: 'Registro de Usuario en DB',
        test: async () => {
          const testUser = {
            name: `Test User ${Date.now()}`,
            email: `test.${Date.now()}@database.com`,
            password: 'password123',
            role: 'STUDENT',
          };

          const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testUser),
          });

          const data = await response.json();
          return {
            success: response.ok,
            message: data.message,
            userId: data.user?.id,
            userEmail: data.user?.email,
          };
        },
      },
      {
        name: 'Login con Usuario de DB',
        test: async () => {
          // Usar un usuario existente de la base de datos
          const credentials = {
            email: 'test.nuevo@ejemplo.com',
            password: 'password123',
          };

          const response = await fetch('/api/auth/signin/credentials', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          });

          return {
            success: response.ok,
            message: response.ok ? 'Login exitoso' : 'Error en login',
            status: response.status,
          };
        },
      },
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
          data: result,
        });
      } catch (error) {
        results.push({
          name: test.name,
          success: false,
          message: error.message,
          duration: 'N/A',
          error: true,
        });
      }
    }

    setTestResults(results);
    setLoading(false);
  };

  useEffect(() => {
    runTests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          🗄️ Verificación de Integración con PostgreSQL
        </h1>

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

        {/* Usuarios de Base de Datos */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            👥 Usuarios en Base de Datos ({users.length})
          </h2>

          {users.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Nombre</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Rol</th>
                    <th className="px-4 py-2 text-left">Activo</th>
                    <th className="px-4 py-2 text-left">Creado</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id || index} className="border-t">
                      <td className="px-4 py-2 text-sm font-mono">{user.id}</td>
                      <td className="px-4 py-2 text-sm">{user.name}</td>
                      <td className="px-4 py-2 text-sm">{user.email}</td>
                      <td className="px-4 py-2 text-sm">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            user.role === 'ADMIN'
                              ? 'bg-red-100 text-red-800'
                              : user.role === 'INSTRUCTOR'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {user.active ? 'Sí' : 'No'}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No hay usuarios disponibles</p>
          )}
        </div>

        {/* Información de Estado */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">📊 Estado de la Integración</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold">✅ Funcionalidades Implementadas:</h3>
              <ul className="text-sm space-y-1">
                <li>• Conexión a PostgreSQL (Render.com)</li>
                <li>• Pool de conexiones con SSL</li>
                <li>• Registro de usuarios en DB</li>
                <li>• Consulta de usuarios de DB</li>
                <li>• Login con credenciales de DB</li>
                <li>• Fallback a mock data</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">🔧 Configuración:</h3>
              <ul className="text-sm space-y-1">
                <li>• Host: dpg-d2vdr87diees73e0t6d0-a.oregon-postgres.render.com</li>
                <li>• Base de datos: elearning_8xpu</li>
                <li>• Usuario: elearning_8xpu_user</li>
                <li>• SSL: Habilitado</li>
                <li>• Pool: 20 conexiones máx</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
