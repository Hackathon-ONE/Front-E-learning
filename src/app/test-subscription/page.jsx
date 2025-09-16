'use client';

import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { activateSubscription, deactivateSubscription, getUserSubscriptionStatus, isGoogleUser } from '@/utils/userUtils';

export default function TestSubscriptionPage() {
  const { user, isAuthenticated } = useAuth();
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  const checkStatus = () => {
    if (user) {
      const status = getUserSubscriptionStatus(user);
      setSubscriptionStatus(status);
    }
  };

  const activateSub = () => {
    if (user?.id) {
      activateSubscription(user.id);
      checkStatus();
    }
  };

  const deactivateSub = () => {
    if (user?.id) {
      deactivateSubscription(user.id);
      checkStatus();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--color-text)] mb-4">
            Debes iniciar sesión para probar la suscripción
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
          Prueba de Sistema de Suscripción
        </h1>

        {/* Información del usuario */}
        <div className="bg-[var(--color-surface)] rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
            Información del Usuario
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><strong>ID:</strong> {user?.id || 'N/A'}</p>
              <p><strong>Nombre:</strong> {user?.name || 'N/A'}</p>
              <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
              <p><strong>Rol:</strong> {user?.role || 'N/A'}</p>
            </div>
            <div>
              <p><strong>Proveedor:</strong> {isGoogleUser(user) ? 'Google' : 'credentials'}</p>
              <p><strong>Imagen:</strong> {user?.image ? 'Sí' : 'No'}</p>
              <p><strong>Tipo:</strong> {isGoogleUser(user) ? 'Usuario de Google' : 'Usuario Mockeado'}</p>
            </div>
          </div>
        </div>

        {/* Controles de suscripción */}
        <div className="bg-[var(--color-surface)] rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
            Controles de Suscripción
          </h2>
          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={checkStatus}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:opacity-90 transition"
            >
              Verificar Estado
            </button>
            <button
              onClick={activateSub}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:opacity-90 transition"
            >
              Activar Suscripción
            </button>
            <button
              onClick={deactivateSub}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:opacity-90 transition"
            >
              Desactivar Suscripción
            </button>
          </div>
        </div>

        {/* Estado de la suscripción */}
        {subscriptionStatus && (
          <div className="bg-[var(--color-surface)] rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
              Estado de la Suscripción
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-4 rounded-lg ${subscriptionStatus.isSubscribed ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                <h3 className="font-semibold text-[var(--color-text)] mb-2">Suscripción Activa</h3>
                <p className={`text-lg font-bold ${subscriptionStatus.isSubscribed ? 'text-green-600' : 'text-red-600'}`}>
                  {subscriptionStatus.isSubscribed ? 'SÍ' : 'NO'}
                </p>
              </div>
              <div className={`p-4 rounded-lg ${subscriptionStatus.isMocked ? 'bg-blue-100 dark:bg-blue-900/20' : 'bg-gray-100 dark:bg-gray-900/20'}`}>
                <h3 className="font-semibold text-[var(--color-text)] mb-2">Usuario Mockeado</h3>
                <p className={`text-lg font-bold ${subscriptionStatus.isMocked ? 'text-blue-600' : 'text-gray-600'}`}>
                  {subscriptionStatus.isMocked ? 'SÍ' : 'NO'}
                </p>
              </div>
              <div className={`p-4 rounded-lg ${subscriptionStatus.isGoogle ? 'bg-green-100 dark:bg-green-900/20' : 'bg-gray-100 dark:bg-gray-900/20'}`}>
                <h3 className="font-semibold text-[var(--color-text)] mb-2">Usuario de Google</h3>
                <p className={`text-lg font-bold ${subscriptionStatus.isGoogle ? 'text-green-600' : 'text-gray-600'}`}>
                  {subscriptionStatus.isGoogle ? 'SÍ' : 'NO'}
                </p>
              </div>
              <div className={`p-4 rounded-lg ${subscriptionStatus.hasAccess ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                <h3 className="font-semibold text-[var(--color-text)] mb-2">Tiene Acceso</h3>
                <p className={`text-lg font-bold ${subscriptionStatus.hasAccess ? 'text-green-600' : 'text-red-600'}`}>
                  {subscriptionStatus.hasAccess ? 'SÍ' : 'NO'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Enlaces de prueba */}
        <div className="bg-[var(--color-surface)] rounded-lg p-6">
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
            Enlaces de Prueba
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-[var(--color-text)] mb-2">Cursos de Prueba</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/courses/1"
                    className="text-primary hover:underline"
                    target="_blank"
                  >
                    Curso 1 (Gratuito)
                  </a>
                </li>
                <li>
                  <a
                    href="/courses/2"
                    className="text-primary hover:underline"
                    target="_blank"
                  >
                    Curso 2 (De Pago)
                  </a>
                </li>
                <li>
                  <a
                    href="/courses/3"
                    className="text-primary hover:underline"
                    target="_blank"
                  >
                    Curso 3 (De Pago)
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--color-text)] mb-2">Lecciones de Prueba</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/courses/2/lessons"
                    className="text-primary hover:underline"
                    target="_blank"
                  >
                    Lecciones Curso 2
                  </a>
                </li>
                <li>
                  <a
                    href="/courses/2/resources"
                    className="text-primary hover:underline"
                    target="_blank"
                  >
                    Recursos Curso 2
                  </a>
                </li>
                <li>
                  <a
                    href="/courses/2/quizzes/1"
                    className="text-primary hover:underline"
                    target="_blank"
                  >
                    Quiz Curso 2
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Instrucciones */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
            Instrucciones de Prueba
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-[var(--color-text)]">
            <li>Usa "Verificar Estado" para ver el estado actual de tu suscripción</li>
            <li>Usa "Activar Suscripción" para simular un pago exitoso</li>
            <li>Usa "Desactivar Suscripción" para simular la cancelación</li>
            <li>Prueba acceder a los enlaces de cursos y lecciones</li>
            <li><strong>Usuarios mockeados:</strong> Siempre tienen acceso completo (ya pagaron)</li>
            <li><strong>Usuarios de Google:</strong> Necesitan activar suscripción manualmente</li>
            <li>Los usuarios de Google reciben ID único con formato: google_[email]_[timestamp]</li>
            <li>Prueba el flujo completo: Login con Google → Verificar estado → Activar suscripción</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
