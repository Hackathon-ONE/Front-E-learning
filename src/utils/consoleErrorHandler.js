/**
 * Utilidad para manejar errores de consola y warnings
 * Ayuda a filtrar errores no críticos de extensiones del navegador
 */

// Función para filtrar errores no críticos
export function filterConsoleErrors() {
  if (typeof window === 'undefined') return;

  const originalError = console.error;
  const originalWarn = console.warn;

  // Filtrar errores de extensiones del navegador
  console.error = (...args) => {
    const message = args.join(' ');
    
    // Ignorar errores específicos de extensiones
    if (
      message.includes('runtime.lastError') ||
      message.includes('message port closed') ||
      message.includes('Extension context invalidated') ||
      message.includes('chrome-extension://')
    ) {
      return; // No mostrar estos errores
    }
    
    originalError.apply(console, args);
  };

  // Filtrar warnings de precarga de recursos
  console.warn = (...args) => {
    const message = args.join(' ');
    
    // Ignorar warnings de precarga de CSS específicos
    if (
      message.includes('preloaded using link preload but not used') ||
      message.includes('was preloaded using link preload') ||
      message.includes('_next/static/css/') ||
      message.includes('Please make sure it has an appropriate `as` value') ||
      message.includes('within a few seconds from the window\'s load event')
    ) {
      return; // No mostrar estos warnings
    }
    
    originalWarn.apply(console, args);
  };
}

// Función para configurar el manejo de errores globales
export function setupErrorHandling() {
  if (typeof window === 'undefined') return;

  // Manejar errores no capturados
  window.addEventListener('error', (event) => {
    const message = event.message || '';
    
    // Ignorar errores de extensiones
    if (
      message.includes('runtime.lastError') ||
      message.includes('message port closed') ||
      message.includes('Extension context invalidated')
    ) {
      event.preventDefault();
      return false;
    }
  });

  // Manejar promesas rechazadas
  window.addEventListener('unhandledrejection', (event) => {
    const message = event.reason?.message || '';
    
    // Ignorar errores de extensiones
    if (
      message.includes('runtime.lastError') ||
      message.includes('message port closed') ||
      message.includes('Extension context invalidated')
    ) {
      event.preventDefault();
      return false;
    }
  });
}

// Función para limpiar la consola de errores no críticos
export function cleanConsole() {
  if (typeof window === 'undefined') return;

  // Solo en desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.clear();
    console.log('🚀 Lumina Platform - Consola limpiada');
    console.log('ℹ️ Errores de extensiones del navegador filtrados');
  }
}
