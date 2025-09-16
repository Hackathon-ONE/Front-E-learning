'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { ShieldX, ArrowLeft, Home, User } from 'lucide-react';
import Link from 'next/link';

export default function AccessDeniedPage() {
  const { user, role } = useAuth();
  const router = useRouter();

  const getRedirectPath = () => {
    if (role === "INSTRUCTOR") return "/instructor/dashboard";
    if (role === "ADMIN") return "/admin/dashboard";
    if (role === "STUDENT") return "/";
    return "/";
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <ShieldX className="w-24 h-24 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">
            Acceso Denegado
          </h1>
          <p className="text-[var(--color-text)] mb-6">
            No tienes permisos para acceder a esta página.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href={getRedirectPath()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition"
          >
            <Home className="w-5 h-5" />
            Ir a mi panel
          </Link>

          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-[var(--color-text)] rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver atrás
          </button>
        </div>

        {user && (
          <div className="mt-8 p-4 bg-[var(--color-surface)] rounded-lg">
            <div className="flex items-center gap-2 text-sm text-[var(--color-text)]">
              <User className="w-4 h-4" />
              <span>Conectado como: <strong>{user.name}</strong> ({role})</span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
