'use client';

import { useState, useEffect } from 'react';
import { CONFIG } from '@/config';
import apiClient from '@/lib/apiClient';
import { CheckCircle, XCircle, AlertTriangle, Database, Users, BookOpen, CreditCard, BarChart3, RefreshCw } from 'lucide-react';

export default function TestBackendRealPage() {
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [backendStatus, setBackendStatus] = useState({
    available: false,
    responseTime: 0,
    lastChecked: null,
    error: null
  });

  useEffect(() => {
    checkBackendHealth();
  }, []);

  const checkBackendHealth = async () => {
    try {
      const startTime = Date.now();
      const healthCheck = await apiClient.checkBackendHealth();
      const responseTime = Date.now() - startTime;
      
      setBackendStatus({
        available: healthCheck.available,
        responseTime,
        lastChecked: new Date().toISOString(),
        error: healthCheck.error
      });
    } catch (error) {
      setBackendStatus({
        available: false,
        responseTime: 0,
        lastChecked: new Date().toISOString(),
        error: error.message
      });
    }
  };

  const runBackendTests = async () => {
    setIsRunning(true);
    setTestResults([]);

    const tests = [
      {
        name: 'Verificar Backend Disponible',
        test: async () => {
          const response = await fetch(`${CONFIG.API_URL}/health`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          });
          return {
            status: response.ok ? 'PASS' : 'FAIL',
            details: {
              statusCode: response.status,
              statusText: response.statusText,
              responseTime: Date.now()
            }
          };
        }
      },
      {
        name: 'Probar Endpoint de Cursos (Sin Auth)',
        test: async () => {
          const response = await fetch(`${CONFIG.API_URL}/courses`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          });
          return {
            status: response.status === 403 ? 'EXPECTED' : response.ok ? 'PASS' : 'FAIL',
            details: {
              statusCode: response.status,
              statusText: response.statusText,
              message: response.status === 403 ? 'Requiere autenticación (esperado)' : 'Respuesta inesperada'
            }
          };
        }
      },
      {
        name: 'Probar Endpoint de Autenticación',
        test: async () => {
          const response = await fetch(`${CONFIG.API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: 'admin@lumina.com',
              password: 'admin123'
            })
          });
          return {
            status: response.ok ? 'PASS' : 'FAIL',
            details: {
              statusCode: response.status,
              statusText: response.statusText,
              message: response.ok ? 'Login exitoso' : 'Error en login'
            }
          };
        }
      },
      {
        name: 'Probar CORS',
        test: async () => {
          const response = await fetch(`${CONFIG.API_URL}/courses`, {
            method: 'OPTIONS',
            headers: {
              'Origin': 'http://localhost:9002',
              'Access-Control-Request-Method': 'GET',
              'Access-Control-Request-Headers': 'Content-Type, Authorization'
            }
          });
          return {
            status: response.ok ? 'PASS' : 'FAIL',
            details: {
              statusCode: response.status,
              corsHeaders: {
                'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
                'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
                'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers')
              }
            }
          };
        }
      },
      {
        name: 'Probar Estructura de Respuesta',
        test: async () => {
          try {
            const response = await fetch(`${CONFIG.API_URL}/auth/login`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: 'test@test.com',
                password: 'test123'
              })
            });
            
            const data = await response.json();
            const hasExpectedStructure = data.hasOwnProperty('success') || 
                                       data.hasOwnProperty('message') || 
                                       data.hasOwnProperty('data');
            
            return {
              status: hasExpectedStructure ? 'PASS' : 'FAIL',
              details: {
                statusCode: response.status,
                hasSuccess: data.hasOwnProperty('success'),
                hasMessage: data.hasOwnProperty('message'),
                hasData: data.hasOwnProperty('data'),
                responseStructure: Object.keys(data)
              }
            };
          } catch (error) {
            return {
              status: 'FAIL',
              details: {
                error: error.message,
                message: 'Error al parsear respuesta JSON'
              }
            };
          }
        }
      }
    ];

    const results = [];
    for (const test of tests) {
      try {
        const result = await test.test();
        results.push({
          name: test.name,
          status: result.status,
          details: result.details
        });
      } catch (error) {
        results.push({
          name: test.name,
          status: 'FAIL',
          details: {
            error: error.message
          }
        });
      }
    }

    setTestResults(results);
    setIsRunning(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PASS':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'FAIL':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'EXPECTED':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PASS':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'FAIL':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'EXPECTED':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-[var(--color-text)]">
            🧪 Pruebas de Integración con Backend Real
          </h1>
          <button
            onClick={checkBackendHealth}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <RefreshCw className="w-4 h-4" />
            Verificar Backend
          </button>
        </div>

        {/* Estado del Backend */}
        <div className="bg-[var(--color-surface)] rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
            Estado del Backend Real
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-[var(--color-card-primary)] p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                {backendStatus.available ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                <span className="font-semibold text-[var(--color-text)]">Estado</span>
              </div>
              <p className={`text-sm ${
                backendStatus.available ? 'text-green-600' : 'text-red-600'
              }`}>
                {backendStatus.available ? 'Conectado' : 'Desconectado'}
              </p>
            </div>

            <div className="bg-[var(--color-card-primary)] p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-5 h-5 text-blue-500" />
                <span className="font-semibold text-[var(--color-text)]">URL</span>
              </div>
              <p className="text-sm text-[var(--color-text)] break-all">
                {CONFIG.API_URL}
              </p>
            </div>

            <div className="bg-[var(--color-card-primary)] p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-5 h-5 text-purple-500" />
                <span className="font-semibold text-[var(--color-text)]">Tiempo de Respuesta</span>
              </div>
              <p className="text-sm text-[var(--color-text)]">
                {backendStatus.responseTime}ms
              </p>
            </div>

            <div className="bg-[var(--color-card-primary)] p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-[var(--color-text)]">Última Verificación</span>
              </div>
              <p className="text-sm text-[var(--color-text)]">
                {backendStatus.lastChecked ? 
                  new Date(backendStatus.lastChecked).toLocaleString() : 
                  'Nunca'
                }
              </p>
            </div>
          </div>

          {backendStatus.error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              <strong>Error:</strong> {backendStatus.error}
            </div>
          )}
        </div>

        {/* Botón de Pruebas */}
        <div className="bg-[var(--color-surface)] rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[var(--color-text)]">
              Pruebas de Integración
            </h2>
            <button
              onClick={runBackendTests}
              disabled={isRunning}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Ejecutando Pruebas...
                </>
              ) : (
                <>
                  <Database className="w-4 h-4" />
                  Ejecutar Pruebas
                </>
              )}
            </button>
          </div>
          
          <p className="text-[var(--color-text)] mb-4">
            Estas pruebas verifican la conectividad y funcionalidad del backend real en 
            <code className="bg-gray-100 px-2 py-1 rounded text-sm">{CONFIG.API_URL}</code>
          </p>
        </div>

        {/* Resultados de las Pruebas */}
        {testResults.length > 0 && (
          <div className="bg-[var(--color-surface)] rounded-lg p-6">
            <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
              📊 Resultados de las Pruebas
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-100 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-800">
                  {testResults.filter(r => r.status === 'PASS').length}
                </div>
                <div className="text-green-600">Pruebas Exitosas</div>
              </div>
              
              <div className="bg-red-100 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-red-800">
                  {testResults.filter(r => r.status === 'FAIL').length}
                </div>
                <div className="text-red-600">Pruebas Fallidas</div>
              </div>
              
              <div className="bg-yellow-100 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-yellow-800">
                  {testResults.filter(r => r.status === 'EXPECTED').length}
                </div>
                <div className="text-yellow-600">Comportamiento Esperado</div>
              </div>
            </div>

            <div className="space-y-4">
              {testResults.map((test, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${getStatusColor(test.status)}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(test.status)}
                      <h3 className="font-semibold text-[var(--color-text)]">
                        {test.name}
                      </h3>
                    </div>
                    <span className={`px-2 py-1 rounded text-sm ${
                      test.status === 'PASS' ? 'bg-green-200 text-green-800' :
                      test.status === 'FAIL' ? 'bg-red-200 text-red-800' :
                      'bg-yellow-200 text-yellow-800'
                    }`}>
                      {test.status}
                    </span>
                  </div>
                  
                  {test.details && (
                    <div className="text-sm text-[var(--color-text)] space-y-1">
                      {test.details.statusCode && (
                        <p><strong>Status Code:</strong> {test.details.statusCode}</p>
                      )}
                      {test.details.statusText && (
                        <p><strong>Status Text:</strong> {test.details.statusText}</p>
                      )}
                      {test.details.message && (
                        <p><strong>Mensaje:</strong> {test.details.message}</p>
                      )}
                      {test.details.error && (
                        <p><strong>Error:</strong> {test.details.error}</p>
                      )}
                      {test.details.corsHeaders && (
                        <div>
                          <p><strong>CORS Headers:</strong></p>
                          <ul className="ml-4 space-y-1">
                            {Object.entries(test.details.corsHeaders).map(([key, value]) => (
                              <li key={key}><strong>{key}:</strong> {value || 'No configurado'}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Resumen */}
            {testResults.length > 0 && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-bold text-lg mb-2 text-blue-800">📋 Resumen de Integración</h3>
                <div className="text-sm text-blue-700 space-y-1">
                  <p><strong>Backend URL:</strong> {CONFIG.API_URL}</p>
                  <p><strong>Estado:</strong> {backendStatus.available ? '✅ Disponible' : '❌ No disponible'}</p>
                  <p><strong>Pruebas Exitosas:</strong> {testResults.filter(r => r.status === 'PASS').length}/{testResults.length}</p>
                  <p><strong>Recomendación:</strong> {
                    testResults.filter(r => r.status === 'PASS').length === testResults.length ? 
                    '✅ El backend está funcionando correctamente' :
                    testResults.filter(r => r.status === 'FAIL').length > 0 ?
                    '⚠️ Hay problemas de conectividad o configuración' :
                    'ℹ️ El backend responde pero puede requerir configuración adicional'
                  }</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
