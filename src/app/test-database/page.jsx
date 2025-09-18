'use client';

import { useState, useEffect } from 'react';

export default function TestDatabasePage() {
  const [dbStatus, setDbStatus] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    testDatabaseConnection();
  }, []);

  const testDatabaseConnection = async () => {
    setLoading(true);
    setError(null);
    setTestResults([]);

    const tests = [
      { name: 'Conexión a Base de Datos', endpoint: '/api/backend-status' },
      { name: 'Lista de Usuarios', endpoint: '/api/users' },
      { name: 'Registro de Usuario', endpoint: '/api/register', method: 'POST' }
    ];

    const results = [];

    for (const test of tests) {
      try {
        const startTime = Date.now();
        
        let response;
        if (test.method === 'POST') {
          // Test de registro
          const testUser = {
            name: `Test User ${Date.now()}`,
            email: `test${Date.now()}@database.com`,
            password: 'password123',
            role: 'STUDENT'
          };
          
          response = await fetch(test.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testUser)
          });
        } else {
          response = await fetch(test.endpoint);
        }

        const data = await response.json();
        const duration = Date.now() - startTime;

        results.push({
          name: test.name,
          status: response.ok ? 'success' : 'error',
          statusCode: response.status,
          duration: `${duration}ms`,
          data: data,
          source: data.source || 'unknown'
        });

        if (test.name === 'Lista de Usuarios' && response.ok) {
          setUsers(data.data || []);
        }

      } catch (err) {
        results.push({
          name: test.name,
          status: 'error',
          statusCode: 'N/A',
          duration: 'N/A',
          error: err.message,
          source: 'error'
        });
      }
    }

    setTestResults(results);
    setLoading(false);
  };

  const testLogin = async () => {
    try {
      const testCredentials = {
        email: 'test@database.com',
        password: 'password123'
      };

      const response = await fetch('/api/auth/signin/credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testCredentials)
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('✅ Login exitoso con base de datos');
      } else {
        alert(`❌ Error en login: ${data.error || 'Error desconocido'}`);
      }
    } catch (err) {
      alert(`❌ Error de conexión: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4">Probando conexión con base de datos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          🗄️ Prueba de Integración con Base de Datos PostgreSQL
        </h1>

        {/* Resultados de Pruebas */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">🧪 Resultados de Pruebas</h2>
            <button
              onClick={testDatabaseConnection}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              🔄 Ejecutar Pruebas
            </button>
          </div>
          
          <div className="space-y-3">
            {testResults.map((result, index) => (
              <div key={index} className={`p-4 rounded-lg border ${
                result.status === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{result.name}</h3>
                    <p className="text-sm text-gray-600">
                      Status: <span className={`font-mono ${
                        result.status === 'success' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {result.statusCode} {result.status === 'success' ? '✅' : '❌'}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Duración: {result.duration} | Fuente: {result.source}
                    </p>
                    {result.error && (
                      <p className="text-sm text-red-600 mt-1">Error: {result.error}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Usuarios de Base de Datos */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">👥 Usuarios en Base de Datos ({users.length})</h2>
            <button
              onClick={testLogin}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              🔐 Probar Login
            </button>
          </div>
          
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
                        <span className={`px-2 py-1 rounded text-xs ${
                          user.role === 'ADMIN' ? 'bg-red-100 text-red-800' :
                          user.role === 'INSTRUCTOR' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm">
                        <span className={`px-2 py-1 rounded text-xs ${
                          user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
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
            <p className="text-gray-500">No hay usuarios en la base de datos</p>
          )}
        </div>

        {/* Información de Conexión */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">🔧 Información de Conexión</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Base de Datos:</strong> PostgreSQL (Render.com)</p>
            <p><strong>Pool de Conexiones:</strong> Configurado con pg</p>
            <p><strong>SSL:</strong> Habilitado para Render.com</p>
            <p><strong>Fallback:</strong> Mock data si hay errores</p>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={testDatabaseConnection}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            🔄 Probar Conexión
          </button>
          <button
            onClick={() => window.location.href = '/test-connection'}
            className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600"
          >
            🔗 Prueba General
          </button>
          <button
            onClick={() => window.location.href = '/auth/register'}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            📝 Registrar Usuario
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>
    </div>
  );
}
