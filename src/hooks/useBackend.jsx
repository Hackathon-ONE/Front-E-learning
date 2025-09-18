'use client';

import { useState, useEffect, useCallback } from 'react';
import apiClient from '@/lib/apiClient';
import { CONFIG } from '@/config';

/**
 * Hook para manejar la conexión con el backend
 * Proporciona estado de conexión, fallback automático y métodos de verificación
 */
export function useBackend() {
  const [backendStatus, setBackendStatus] = useState({
    available: false,
    loading: true,
    lastChecked: null,
    error: null,
    responseTime: 0
  });

  const [isOnline, setIsOnline] = useState(true);

  // Verificar estado del backend
  const checkBackendStatus = useCallback(async () => {
    setBackendStatus(prev => ({ ...prev, loading: true }));
    
    try {
      const startTime = Date.now();
      const healthCheck = await apiClient.checkBackendHealth();
      const responseTime = Date.now() - startTime;
      
      setBackendStatus({
        available: healthCheck.available,
        loading: false,
        lastChecked: new Date().toISOString(),
        error: healthCheck.error,
        responseTime
      });
      
      return healthCheck.available;
    } catch (error) {
      setBackendStatus({
        available: false,
        loading: false,
        lastChecked: new Date().toISOString(),
        error: error.message,
        responseTime: 0
      });
      
      return false;
    }
  }, []);

  // Verificar conectividad de red
  const checkNetworkStatus = useCallback(() => {
    setIsOnline(navigator.onLine);
  }, []);

  // Verificar estado inicial
  useEffect(() => {
    checkBackendStatus();
    checkNetworkStatus();
    
    // Verificar cada 30 segundos
    const interval = setInterval(checkBackendStatus, 30000);
    
    // Escuchar cambios de conectividad
    window.addEventListener('online', checkNetworkStatus);
    window.addEventListener('offline', checkNetworkStatus);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('online', checkNetworkStatus);
      window.removeEventListener('offline', checkNetworkStatus);
    };
  }, [checkBackendStatus, checkNetworkStatus]);

  // Determinar si usar datos mock
  const shouldUseMocks = useCallback(() => {
    return CONFIG.USE_MOCKS || !backendStatus.available || !isOnline;
  }, [backendStatus.available, isOnline]);

  // Obtener estado de conexión
  const getConnectionStatus = useCallback(() => {
    if (!isOnline) {
      return {
        status: 'offline',
        message: 'Sin conexión a internet',
        color: 'red'
      };
    }
    
    if (backendStatus.loading) {
      return {
        status: 'checking',
        message: 'Verificando conexión...',
        color: 'yellow'
      };
    }
    
    if (backendStatus.available) {
      return {
        status: 'connected',
        message: `Conectado (${backendStatus.responseTime}ms)`,
        color: 'green'
      };
    }
    
    return {
      status: 'disconnected',
      message: 'Backend no disponible, usando datos mock',
      color: 'orange'
    };
  }, [isOnline, backendStatus]);

  // Forzar verificación
  const forceCheck = useCallback(async () => {
    return await checkBackendStatus();
  }, [checkBackendStatus]);

  return {
    // Estado
    backendStatus,
    isOnline,
    shouldUseMocks: shouldUseMocks(),
    
    // Métodos
    checkBackendStatus,
    forceCheck,
    getConnectionStatus,
    
    // Utilidades
    isBackendAvailable: backendStatus.available,
    isChecking: backendStatus.loading,
    lastChecked: backendStatus.lastChecked,
    responseTime: backendStatus.responseTime,
    error: backendStatus.error
  };
}

/**
 * Hook para manejar datos con fallback automático
 * Intenta obtener datos del backend, si falla usa datos mock
 */
export function useBackendData(fetchFunction, mockData, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingMock, setUsingMock] = useState(false);
  
  const { shouldUseMocks, isBackendAvailable } = useBackend();

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Si debemos usar mocks o el backend no está disponible
      if (shouldUseMocks || !isBackendAvailable) {
        setData(mockData);
        setUsingMock(true);
        setLoading(false);
        return;
      }
      
      // Intentar obtener datos del backend
      try {
        const result = await fetchFunction();
        setData(result);
        setUsingMock(false);
      } catch (backendError) {
        console.warn('Error del backend, usando datos mock:', backendError);
        setData(mockData);
        setUsingMock(true);
      }
    } catch (err) {
      setError(err.message);
      setData(mockData);
      setUsingMock(true);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, mockData, shouldUseMocks, isBackendAvailable, ...dependencies]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    usingMock,
    refetch: fetchData
  };
}

/**
 * Hook para operaciones que requieren backend
 * Maneja el estado de carga y errores automáticamente
 */
export function useBackendOperation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { shouldUseMocks, isBackendAvailable } = useBackend();

  const execute = useCallback(async (operation, mockResult = null) => {
    setLoading(true);
    setError(null);
    
    try {
      // Si debemos usar mocks o el backend no está disponible
      if (shouldUseMocks || !isBackendAvailable) {
        if (mockResult) {
          return mockResult;
        }
        throw new Error('Backend no disponible y no hay datos mock');
      }
      
      // Ejecutar operación en el backend
      return await operation();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [shouldUseMocks, isBackendAvailable]);

  return {
    execute,
    loading,
    error,
    isBackendAvailable,
    shouldUseMocks
  };
}

export default useBackend;
