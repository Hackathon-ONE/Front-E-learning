'use client';

import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import ProfileImage from '@/components/ProfileImage';
import Image from 'next/image';

export default function DebugImagesPage() {
  const { user, isAuthenticated } = useAuth();
  const [testResults, setTestResults] = useState({});

  const testImageLoad = async (url, name) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      setTestResults((prev) => ({
        ...prev,
        [name]: {
          status: response.status,
          success: response.ok,
          headers: Object.fromEntries(response.headers.entries()),
        },
      }));
    } catch (error) {
      setTestResults((prev) => ({
        ...prev,
        [name]: {
          status: 'ERROR',
          success: false,
          error: error.message,
        },
      }));
    }
  };

  const runAllTests = () => {
    if (user?.image) {
      testImageLoad(user.image, 'userImage');
    }
    testImageLoad('/default-avatar.png', 'defaultAvatar');
    testImageLoad(
      'https://lh3.googleusercontent.com/a/ACg8ocJAl7auDFTiAd2N33BTEc9leGvBu7XS02e-jqsqkymPf8yumLoy7g=s96-c',
      'googleTest'
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--color-text)] mb-4">
            Debes iniciar sesión para probar las imágenes
          </h1>
          <a
            href="/auth/login"
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition"
          >
            Iniciar Sesión
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-8">
          Debug de Imágenes de Perfil
        </h1>

        {/* Información del usuario */}
        <div className="bg-[var(--color-surface)] rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
            Información del Usuario
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p>
                <strong>Nombre:</strong> {user?.name || 'N/A'}
              </p>
              <p>
                <strong>Email:</strong> {user?.email || 'N/A'}
              </p>
              <p>
                <strong>Rol:</strong> {user?.role || 'N/A'}
              </p>
            </div>
            <div>
              <p>
                <strong>URL de Imagen:</strong>
              </p>
              <p className="text-sm break-all text-blue-600">{user?.image || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Pruebas de imágenes */}
        <div className="bg-[var(--color-surface)] rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
            Pruebas de Carga de Imágenes
          </h2>
          <button
            onClick={runAllTests}
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition mb-6"
          >
            Ejecutar Pruebas
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Imagen del usuario */}
            <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
              <h3 className="font-semibold text-[var(--color-text)] mb-2">Imagen del Usuario</h3>
              <div className="flex items-center gap-4 mb-4">
                <ProfileImage
                  src={user?.image}
                  alt={user?.name || 'Usuario'}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div>
                  <p className="text-sm text-[var(--color-text)]">Componente ProfileImage</p>
                  <p className="text-xs text-gray-500">Con manejo de errores</p>
                </div>
              </div>
              {testResults.userImage && (
                <div className="text-xs">
                  <p>
                    <strong>Estado:</strong> {testResults.userImage.success ? '✅ OK' : '❌ Error'}
                  </p>
                  <p>
                    <strong>Código:</strong> {testResults.userImage.status}
                  </p>
                </div>
              )}
            </div>

            {/* Imagen por defecto */}
            <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
              <h3 className="font-semibold text-[var(--color-text)] mb-2">Imagen por Defecto</h3>
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src="/default-avatar.png"
                  alt="Avatar por defecto"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div>
                  <p className="text-sm text-[var(--color-text)]">Imagen local</p>
                  <p className="text-xs text-gray-500">Siempre disponible</p>
                </div>
              </div>
              {testResults.defaultAvatar && (
                <div className="text-xs">
                  <p>
                    <strong>Estado:</strong>{' '}
                    {testResults.defaultAvatar.success ? '✅ OK' : '❌ Error'}
                  </p>
                  <p>
                    <strong>Código:</strong> {testResults.defaultAvatar.status}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Soluciones implementadas */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
            Soluciones Implementadas
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-[var(--color-text)]">
            <li>
              <strong>Componente ProfileImage:</strong> Maneja errores automáticamente con fallback
            </li>
            <li>
              <strong>Hook useProfileImage:</strong> Reintenta la carga hasta 2 veces antes de usar
              fallback
            </li>
            <li>
              <strong>Configuración Next.js:</strong> Múltiples dominios de Google configurados
            </li>
            <li>
              <strong>Imagen por defecto:</strong> Fallback local siempre disponible
            </li>
            <li>
              <strong>Cache busting:</strong> Parámetros de tiempo para evitar cache
            </li>
            <li>
              <strong>Optimización deshabilitada:</strong> Para imágenes de Google (evita problemas
              de optimización)
            </li>
          </ul>
        </div>

        {/* Información sobre el error 429 */}
        <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
            Sobre el Error 429 "Too Many Requests"
          </h3>
          <p className="text-sm text-[var(--color-text)] mb-2">
            Google limita las solicitudes a sus servidores de imágenes cuando se hacen muchas
            peticiones. Esto es normal y temporal.
          </p>
          <p className="text-sm text-[var(--color-text)]">
            <strong>Solución:</strong> El sistema automáticamente usa la imagen por defecto cuando
            esto ocurre.
          </p>
        </div>
      </div>
    </div>
  );
}
