'use client';

import { useState, useEffect } from 'react';
import { CONFIG } from '@/config';
import apiClient from '@/lib/apiClient';
import { CheckCircle, XCircle, AlertTriangle, Settings, Database, Wifi, WifiOff } from 'lucide-react';

export default function BackendConfigPage() {
  const [backendStatus, setBackendStatus] = useState({
    available: false,
    responseTime: 0,
    lastChecked: null,
    error: null
  });
  
  const [config, setConfig] = useState({
    backendUrl: CONFIG.BACKEND_URL,
    apiUrl: CONFIG.API_URL,
    useMocks: CONFIG.USE_MOCKS
  });
  
  const [isChecking, setIsChecking] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    checkBackendStatus();
  }, []);

  const checkBackendStatus = async () => {
    setIsChecking(true);
    setMessage('');
    
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
      
      if (healthCheck.available) {
        setMessage('✅ Backend conectado exitosamente');
      } else {
        setMessage('⚠️ Backend no disponible, usando datos mock');
      }
    } catch (error) {
      setBackendStatus({
        available: false,
        responseTime: 0,
        lastChecked: new Date().toISOString(),
        error: error.message
      });
      setMessage('❌ Error al conectar con el backend');
    } finally {
      setIsChecking(false);
    }
  };

  const handleConfigChange = (field, value) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveConfig = async () => {
    setIsSaving(true);
    setMessage('');
    
    try {
      // En una aplicación real, esto se guardaría en el backend o en variables de entorno
      // Por ahora, solo actualizamos el estado local
      localStorage.setItem('lumina_backend_config', JSON.stringify(config));
      
      setMessage('✅ Configuración guardada exitosamente');
      
      // Recargar la página para aplicar los cambios
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setMessage('❌ Error al guardar la configuración');
    } finally {
      setIsSaving(false);
    }
  };

  const testConnection = async () => {
    setIsChecking(true);
    setMessage('');
    
    try {
      // Probar la conexión directamente con fetch
      const startTime = Date.now();
      const response = await fetch(`${config.apiUrl}/courses`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const responseTime = Date.now() - startTime;
      
      if (response.status === 403) {
        setMessage(`✅ Backend responde correctamente (${responseTime}ms) - Requiere autenticación`);
      } else if (response.ok) {
        setMessage(`✅ Conexión exitosa (${responseTime}ms)`);
      } else {
        setMessage(`⚠️ Backend responde con status ${response.status} (${responseTime}ms)`);
      }
    } catch (error) {
      setMessage(`❌ Error de conexión: ${error.message}`);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-[var(--color-text)]">
            Configuración del Backend
          </h1>
        </div>

        {/* Estado del Backend */}
        <div className="bg-[var(--color-surface)] rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[var(--color-text)]">
              Estado del Backend
            </h2>
            <button
              onClick={checkBackendStatus}
              disabled={isChecking}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition disabled:opacity-50"
            >
              {isChecking ? '🔄 Verificando...' : '🔄 Verificar'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[var(--color-card-primary)] p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                {backendStatus.available ? (
                  <Wifi className="w-5 h-5 text-green-500" />
                ) : (
                  <WifiOff className="w-5 h-5 text-red-500" />
                )}
                <span className="font-semibold text-[var(--color-text)]">
                  Estado
                </span>
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
                <span className="font-semibold text-[var(--color-text)]">
                  Tiempo de Respuesta
                </span>
              </div>
              <p className="text-sm text-[var(--color-text)]">
                {backendStatus.responseTime}ms
              </p>
            </div>

            <div className="bg-[var(--color-card-primary)] p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-[var(--color-text)]">
                  Última Verificación
                </span>
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

        {/* Configuración */}
        <div className="bg-[var(--color-surface)] rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
            Configuración de Conexión
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                URL del Backend
              </label>
              <input
                type="url"
                value={config.backendUrl}
                onChange={(e) => handleConfigChange('backendUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="http://localhost:8080"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                URL de la API
              </label>
              <input
                type="url"
                value={config.apiUrl}
                onChange={(e) => handleConfigChange('apiUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="http://localhost:8080/api"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="useMocks"
                checked={config.useMocks}
                onChange={(e) => handleConfigChange('useMocks', e.target.checked)}
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
              />
              <label htmlFor="useMocks" className="text-sm font-medium text-[var(--color-text)]">
                Usar datos mock cuando el backend no esté disponible
              </label>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={testConnection}
              disabled={isChecking}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isChecking ? '🔄 Probando...' : '🧪 Probar Conexión'}
            </button>
            
            <button
              onClick={saveConfig}
              disabled={isSaving}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {isSaving ? '💾 Guardando...' : '💾 Guardar Configuración'}
            </button>
          </div>
        </div>

        {/* Información de Endpoints */}
        <div className="bg-[var(--color-surface)] rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
            Endpoints Disponibles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-[var(--color-text)] mb-2">Autenticación</h3>
              <ul className="text-sm text-[var(--color-text)] space-y-1">
                <li>POST /auth/login</li>
                <li>POST /auth/register</li>
                <li>POST /auth/logout</li>
                <li>POST /auth/refresh</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-[var(--color-text)] mb-2">Usuarios</h3>
              <ul className="text-sm text-[var(--color-text)] space-y-1">
                <li>GET /users</li>
                <li>GET /users/&#123;id&#125;</li>
                <li>GET /users/profile</li>
                <li>PUT /users/profile</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-[var(--color-text)] mb-2">Cursos</h3>
              <ul className="text-sm text-[var(--color-text)] space-y-1">
                <li>GET /courses</li>
                <li>GET /courses/&#123;id&#125;</li>
                <li>POST /courses</li>
                <li>PUT /courses/&#123;id&#125;</li>
                <li>DELETE /courses/&#123;id&#125;</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-[var(--color-text)] mb-2">Suscripciones</h3>
              <ul className="text-sm text-[var(--color-text)] space-y-1">
                <li>GET /subscriptions</li>
                <li>POST /subscriptions</li>
                <li>PUT /subscriptions/&#123;id&#125;</li>
                <li>DELETE /subscriptions/&#123;id&#125;</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mensajes */}
        {message && (
          <div className={`p-4 rounded-lg ${
            message.includes('✅') ? 'bg-green-100 border border-green-400 text-green-700' :
            message.includes('⚠️') ? 'bg-yellow-100 border border-yellow-400 text-yellow-700' :
            'bg-red-100 border border-red-400 text-red-700'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
