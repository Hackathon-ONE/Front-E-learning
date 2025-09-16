'use client';

import { useAuth } from '@/context/AuthContext';
import { useSession } from 'next-auth/react';

export default function DebugUserPage() {
  const { user, role, isAuthenticated } = useAuth();
  const { data: session } = useSession();

  return (
    <main className="min-h-screen bg-[var(--color-bg)] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-8">
          Debug de Usuario
        </h1>

        <div className="bg-[var(--color-surface)] rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
            Datos del AuthContext
          </h2>
          <div className="space-y-2 text-sm">
            <p><strong>Autenticado:</strong> {isAuthenticated ? 'Sí' : 'No'}</p>
            <p><strong>ID:</strong> {user?.id || 'No disponible'}</p>
            <p><strong>Nombre:</strong> {user?.name || 'No disponible'}</p>
            <p><strong>Email:</strong> {user?.email || 'No disponible'}</p>
            <p><strong>Rol:</strong> {role || 'No disponible'}</p>
            <p><strong>Imagen:</strong> {user?.image || 'No disponible'}</p>
          </div>
        </div>

        <div className="bg-[var(--color-surface)] rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
            Datos de la Sesión (NextAuth)
          </h2>
          <div className="space-y-2 text-sm">
            <p><strong>ID:</strong> {session?.user?.id || 'No disponible'}</p>
            <p><strong>Nombre:</strong> {session?.user?.name || 'No disponible'}</p>
            <p><strong>Email:</strong> {session?.user?.email || 'No disponible'}</p>
            <p><strong>Rol:</strong> {session?.user?.role || 'No disponible'}</p>
            <p><strong>Imagen:</strong> {session?.user?.image || 'No disponible'}</p>
          </div>
        </div>

        <div className="bg-[var(--color-surface)] rounded-lg p-6">
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
            URLs de Prueba
          </h2>
          <div className="space-y-2 text-sm">
            <p><strong>Perfil Instructor:</strong> <code>/instructor/{user?.id || 'ID_NO_DISPONIBLE'}</code></p>
            <p><strong>Perfil Estudiante:</strong> <code>/students/{user?.id || 'ID_NO_DISPONIBLE'}</code></p>
            <p><strong>Dashboard Instructor:</strong> <code>/instructor/dashboard</code></p>
          </div>
        </div>
      </div>
    </main>
  );
}
