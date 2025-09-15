'use client';

import { useState } from 'react';
import IntegrationTestService from '@/lib/integrationTest';

export default function TestIntegrationPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const runTests = async () => {
    setIsRunning(true);
    setError(null);
    setResults(null);

    try {
      const testService = new IntegrationTestService();
      const testResults = await testService.runAllTests();
      setResults(testResults);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-[var(--color-text)]">
          🧪 Testing de Integración Frontend ↔ Backend Java
        </h1>

        <div className="bg-[var(--color-surface)] rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-[var(--color-text)]">
            Descripción del Test
          </h2>
          <p className="text-[var(--color-text)] mb-4">
            Este test verifica que el frontend esté preparado para recibir datos del backend Java/Spring Boot.
            Simula las respuestas del backend y verifica la compatibilidad de datos.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-[var(--color-card-primary)] p-4 rounded-lg">
              <h3 className="font-semibold text-[var(--color-text)] mb-2">Tests Incluidos:</h3>
              <ul className="text-sm text-[var(--color-text)] space-y-1">
                <li>✅ Autenticación</li>
                <li>✅ Endpoint de Usuarios</li>
                <li>✅ Endpoint de Cursos</li>
                <li>✅ Endpoint de Lecciones</li>
                <li>✅ Endpoint de Suscripciones</li>
                <li>✅ Compatibilidad de Datos</li>
              </ul>
            </div>
            
            <div className="bg-[var(--color-card-primary)] p-4 rounded-lg">
              <h3 className="font-semibold text-[var(--color-text)] mb-2">Verificaciones:</h3>
              <ul className="text-sm text-[var(--color-text)] space-y-1">
                <li>🔍 Estructura de respuestas</li>
                <li>🔍 Campos requeridos</li>
                <li>🔍 Códigos de estado HTTP</li>
                <li>🔍 Tiempo de respuesta</li>
                <li>🔍 Operaciones POST/PUT</li>
              </ul>
            </div>
          </div>

          <button
            onClick={runTests}
            disabled={isRunning}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? '🔄 Ejecutando Tests...' : '🚀 Ejecutar Tests de Integración'}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <h3 className="font-bold">Error:</h3>
            <p>{error}</p>
          </div>
        )}

        {results && (
          <div className="bg-[var(--color-surface)] rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-text)]">
              📊 Resultados de los Tests
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-100 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-800">
                  {results.filter(r => r.status === 'PASS').length}
                </div>
                <div className="text-green-600">Tests Pasados</div>
              </div>
              
              <div className="bg-red-100 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-red-800">
                  {results.filter(r => r.status === 'FAIL').length}
                </div>
                <div className="text-red-600">Tests Fallidos</div>
              </div>
              
              <div className="bg-blue-100 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-800">
                  {Math.round((results.filter(r => r.status === 'PASS').length / results.length) * 100)}%
                </div>
                <div className="text-blue-600">Éxito</div>
              </div>
            </div>

            <div className="space-y-4">
              {results.map((test, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    test.status === 'PASS' 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-[var(--color-text)]">
                      {test.status === 'PASS' ? '✅' : '❌'} {test.name}
                    </h3>
                    <span className={`px-2 py-1 rounded text-sm ${
                      test.status === 'PASS' 
                        ? 'bg-green-200 text-green-800' 
                        : 'bg-red-200 text-red-800'
                    }`}>
                      {test.status}
                    </span>
                  </div>
                  
                  {test.details && (
                    <div className="text-sm text-[var(--color-text)] space-y-1">
                      <p>Status Code: {test.details.statusCode}</p>
                      {test.details.userCount !== undefined && (
                        <p>Usuarios: {test.details.userCount}</p>
                      )}
                      {test.details.courseCount !== undefined && (
                        <p>Cursos: {test.details.courseCount}</p>
                      )}
                      {test.details.lessonCount !== undefined && (
                        <p>Lecciones: {test.details.lessonCount}</p>
                      )}
                      {test.details.subscriptionCount !== undefined && (
                        <p>Suscripciones: {test.details.subscriptionCount}</p>
                      )}
                      <p>Campos requeridos: {test.details.hasRequiredFields ? '✅' : '❌'}</p>
                    </div>
                  )}
                  
                  {test.error && (
                    <div className="text-sm text-red-600 mt-2">
                      Error: {test.error}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {results.filter(r => r.status === 'PASS').length === results.length && (
              <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                <h3 className="font-bold text-lg mb-2">🎉 ¡Excelente!</h3>
                <p>El frontend está completamente preparado para recibir datos del backend Java/Spring Boot.</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 bg-[var(--color-surface)] rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-[var(--color-text)]">
            📋 Próximos Pasos
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-[var(--color-text)]">
            <li>Configurar el backend Java/Spring Boot con los endpoints documentados</li>
            <li>Actualizar la URL del backend en las variables de entorno</li>
            <li>Implementar la autenticación JWT en el backend</li>
            <li>Configurar CORS para permitir requests del frontend</li>
            <li>Ejecutar este test nuevamente con el backend real</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
