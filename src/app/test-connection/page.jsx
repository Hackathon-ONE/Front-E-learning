'use client';

import { useState, useEffect } from 'react';

export default function TestConnectionPage() {
  const [backendStatus, setBackendStatus] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    setLoading(true);
    setError(null);

    try {
      // Probar endpoint de estado del backend
      const statusRes = await fetch('/api/backend-status');
      const statusData = await statusRes.json();
      setBackendStatus(statusData);

      // Probar endpoint de usuarios
      const usersRes = await fetch('/api/users');
      const usersData = await usersRes.json();
      setUsers(usersData.data || []);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const testRegister = async () => {
    try {
      const testUser = {
        name: `Usuario Test ${Date.now()}`,
        email: `test${Date.now()}@ejemplo.com`,
        password: 'password123',
        role: 'STUDENT'
      };

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testUser)
      });

      const data = await res.json();
      
      if (res.ok) {
        alert('✅ Usuario registrado exitosamente');
        testConnection(); // Recargar usuarios
      } else {
        alert(`❌ Error: ${data.message}`);
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
          <p className="mt-4">Probando conexión...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          🔧 Prueba de Conexión Frontend ↔ Backend
        </h1>

        {/* Estado del Backend */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">📊 Estado del Backend</h2>
          {backendStatus ? (
            <div className="space-y-2">
              <p><strong>Estado:</strong> 
                <span className={`ml-2 px-2 py-1 rounded text-sm ${
                  backendStatus.data?.isOnline ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {backendStatus.data?.isOnline ? '✅ Online' : '❌ Offline'}
                </span>
              </p>
              <p><strong>URL:</strong> {backendStatus.data?.backendUrl}</p>
              <p><strong>Entorno:</strong> {backendStatus.data?.environment}</p>
              <p><strong>Versión:</strong> {backendStatus.data?.version}</p>
              <p><strong>Timestamp:</strong> {new Date(backendStatus.data?.timestamp).toLocaleString()}</p>
            </div>
          ) : (
            <p className="text-red-500">❌ No se pudo obtener el estado del backend</p>
          )}
        </div>

        {/* Lista de Usuarios */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">👥 Usuarios Registrados ({users.length})</h2>
            <button
              onClick={testRegister}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              + Registrar Usuario Test
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
                    <th className="px-4 py-2 text-left">Creado</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id || index} className="border-t">
                      <td className="px-4 py-2 text-sm">{user.id}</td>
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
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No hay usuarios registrados</p>
          )}
        </div>

        {/* Botones de Acción */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={testConnection}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            🔄 Probar Conexión
          </button>
          <button
            onClick={() => window.location.href = '/auth/register'}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            📝 Ir a Registro
          </button>
          <button
            onClick={() => window.location.href = '/auth/login'}
            className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600"
          >
            🔐 Ir a Login
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
