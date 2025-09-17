'use client';

import { useBackend } from '@/hooks/useBackend';
import { Wifi, WifiOff, AlertTriangle, RefreshCw } from 'lucide-react';

export default function BackendStatus({ showDetails = false, className = '' }) {
  const { 
    getConnectionStatus, 
    forceCheck, 
    isChecking, 
    responseTime, 
    lastChecked 
  } = useBackend();

  const status = getConnectionStatus();

  const getStatusIcon = () => {
    switch (status.status) {
      case 'connected':
        return <Wifi className="w-4 h-4 text-green-500" />;
      case 'offline':
        return <WifiOff className="w-4 h-4 text-red-500" />;
      case 'disconnected':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'checking':
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status.color) {
      case 'green':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'red':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'yellow':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'blue':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (showDetails) {
    return (
      <div className={`p-4 rounded-lg border ${getStatusColor()} ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className="font-medium">{status.message}</span>
          </div>
          <button
            onClick={forceCheck}
            disabled={isChecking}
            className="p-1 hover:bg-white/50 rounded transition disabled:opacity-50"
            title="Verificar conexión"
          >
            <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
          </button>
        </div>
        
        {responseTime > 0 && (
          <div className="mt-2 text-sm opacity-75">
            Tiempo de respuesta: {responseTime}ms
          </div>
        )}
        
        {lastChecked && (
          <div className="mt-1 text-xs opacity-60">
            Última verificación: {new Date(lastChecked).toLocaleTimeString()}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 text-sm ${className}`}>
      {getStatusIcon()}
      <span className={status.color === 'green' ? 'text-green-600' : 
                      status.color === 'red' ? 'text-red-600' : 
                      status.color === 'yellow' ? 'text-yellow-600' : 
                      'text-gray-600'}>
        {status.message}
      </span>
    </div>
  );
}
