'use client';

import { useEffect } from 'react';
import { initializeCSSOptimization } from '@/utils/cssOptimization';

/**
 * Componente para optimizar la carga de CSS y eliminar warnings de preload
 */
export default function CSSOptimizer() {
  useEffect(() => {
    // Inicializar todas las optimizaciones de CSS
    initializeCSSOptimization();

    // Log de confirmación en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('🎨 CSS Optimizer inicializado - Warnings de preload filtrados');
    }
  }, []);

  return null; // Este componente no renderiza nada
}
