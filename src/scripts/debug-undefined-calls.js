/**
 * Script para debuggear llamadas con undefined
 */

// Interceptar fetch para detectar llamadas con undefined
const originalFetch = global.fetch;

global.fetch = function(url, options) {
  // Detectar si la URL contiene 'undefined'
  if (typeof url === 'string' && url.includes('undefined')) {
    console.error('🚨 Llamada con undefined detectada:', {
      url,
      options,
      stack: new Error().stack
    });
  }
  
  return originalFetch.apply(this, arguments);
};

console.log('🔍 Interceptor de fetch activado para detectar llamadas con undefined');
