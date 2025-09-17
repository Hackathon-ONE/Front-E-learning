'use client';

import { useEffect } from 'react';
import { filterConsoleErrors, setupErrorHandling, cleanConsole } from '@/utils/consoleErrorHandler';

export default function ConsoleErrorHandler() {
  useEffect(() => {
    // Configurar el manejo de errores
    filterConsoleErrors();
    setupErrorHandling();
    
    // Limpiar la consola en desarrollo
    if (process.env.NODE_ENV === 'development') {
      cleanConsole();
    }
  }, []);

  return null; // Este componente no renderiza nada
}
