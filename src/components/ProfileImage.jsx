'use client';

import Image from 'next/image';
import { useProfileImage } from '@/hooks/useProfileImage';

/**
 * Componente de imagen de perfil que maneja errores de carga
 * @param {Object} props
 * @param {string} props.src - URL de la imagen
 * @param {string} props.alt - Texto alternativo
 * @param {number} props.width - Ancho de la imagen
 * @param {number} props.height - Alto de la imagen
 * @param {string} props.className - Clases CSS adicionales
 * @param {string} props.fallback - Imagen de respaldo
 */
export default function ProfileImage({
  src,
  alt = 'Avatar',
  width = 40,
  height = 40,
  className = '',
  fallback = '/default-avatar.png',
}) {
  const { src: imageSrc, error, retry, isRetrying } = useProfileImage(src, fallback);

  const handleError = () => {
    retry();
  };

  return (
    <div className="relative">
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${isRetrying ? 'opacity-50' : ''}`}
        onError={handleError}
        priority={false}
        unoptimized={imageSrc?.includes('googleusercontent.com')}
      />
      {isRetrying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
}
