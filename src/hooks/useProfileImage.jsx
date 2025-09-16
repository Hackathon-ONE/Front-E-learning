'use client';

import { useState, useEffect } from 'react';

/**
 * Hook para manejar imágenes de perfil con fallback automático
 * @param {string} src - URL de la imagen
 * @param {string} fallback - Imagen de respaldo
 * @returns {Object} - { src, error, retry, isRetrying }
 */
export function useProfileImage(src, fallback = '/default-avatar.png') {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const maxRetries = 2;

  useEffect(() => {
    if (src) {
      setImageSrc(src);
      setHasError(false);
      setRetryCount(0);
    }
  }, [src]);

  const handleError = () => {
    if (retryCount < maxRetries) {
      // Reintentar con un parámetro de cache busting
      setRetryCount((prev) => prev + 1);
      setImageSrc(`${src}?retry=${retryCount + 1}&t=${Date.now()}`);
    } else {
      // Usar imagen de respaldo
      setHasError(true);
      setImageSrc(fallback);
    }
  };

  const retry = () => {
    setRetryCount(0);
    setHasError(false);
    setImageSrc(src);
  };

  return {
    src: imageSrc,
    error: hasError,
    retry,
    isRetrying: retryCount > 0 && retryCount <= maxRetries,
  };
}
