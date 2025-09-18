/**
 * Utilidades para optimizar la carga de CSS y eliminar warnings
 */

// Función para detectar y filtrar warnings de CSS preload
export function filterCSSPreloadWarnings() {
  if (typeof window === 'undefined') return;

  const originalWarn = console.warn;
  
  console.warn = (...args) => {
    const message = args.join(' ');
    
    // Patrones específicos de warnings de CSS preload
    const cssPreloadPatterns = [
      'preloaded using link preload but not used',
      'was preloaded using link preload',
      '_next/static/css/',
      'Please make sure it has an appropriate `as` value',
      'within a few seconds from the window\'s load event',
      'cb74a29fa9526037.css', // Archivo específico que causa el warning
    ];
    
    // Verificar si el mensaje contiene alguno de los patrones
    const shouldFilter = cssPreloadPatterns.some(pattern => 
      message.includes(pattern)
    );
    
    if (shouldFilter) {
      // Log silencioso para debugging (solo en desarrollo)
      if (process.env.NODE_ENV === 'development') {
        console.debug('🔇 CSS Preload Warning filtrado:', message);
      }
      return; // No mostrar el warning
    }
    
    // Mostrar otros warnings normalmente
    originalWarn.apply(console, args);
  };
}

// Función para optimizar la carga de CSS
export function optimizeCSSLoading() {
  if (typeof window === 'undefined') return;

  // Optimizar preload links
  const preloadLinks = document.querySelectorAll('link[rel="preload"][as="style"]');
  preloadLinks.forEach(link => {
    // Convertir preload a stylesheet después de un breve delay
    setTimeout(() => {
      if (link.rel === 'preload' && link.getAttribute('as') === 'style') {
        link.rel = 'stylesheet';
        link.removeAttribute('as');
        link.setAttribute('data-optimized', 'true');
      }
    }, 50); // Delay muy corto para evitar el warning
  });

  // Marcar CSS crítico como optimizado
  const criticalCSS = document.querySelector('style[data-nextjs-css]');
  if (criticalCSS) {
    criticalCSS.setAttribute('data-optimized', 'true');
  }
}

// Función para monitorear la carga de CSS
export function monitorCSSLoading() {
  if (typeof window === 'undefined') return;

  // Observer para detectar cuando se cargan estilos
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Optimizar nuevos links de preload
            if (node.tagName === 'LINK' && node.rel === 'preload') {
              setTimeout(() => {
                if (node.getAttribute('as') === 'style') {
                  node.rel = 'stylesheet';
                  node.removeAttribute('as');
                }
              }, 10);
            }
          }
        });
      }
    });
  });

  // Observar cambios en el head
  observer.observe(document.head, {
    childList: true,
    subtree: true,
  });

  return observer;
}

// Función principal para inicializar todas las optimizaciones
export function initializeCSSOptimization() {
  if (typeof window === 'undefined') return;

  // Filtrar warnings
  filterCSSPreloadWarnings();
  
  // Optimizar carga inicial
  optimizeCSSLoading();
  
  // Monitorear carga futura
  const observer = monitorCSSLoading();
  
  // Cleanup cuando la página se descarga
  window.addEventListener('beforeunload', () => {
    if (observer) {
      observer.disconnect();
    }
  });
}
