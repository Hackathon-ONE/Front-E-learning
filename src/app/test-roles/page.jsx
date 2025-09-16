'use client';

import { useAuth } from '@/context/AuthContext';
import { useRoleAccess } from '@/hooks/useRoleAccess';
import { ROLES, hasPermission } from '@/utils/roleUtils';
import { useState } from 'react';

export default function TestRolesPage() {
  const { user, role, isAuthenticated } = useAuth();
  const { hasAccess, isInstructor, isAdmin, isStudent } = useRoleAccess([ROLES.ADMIN]);
  const [testEmail, setTestEmail] = useState('');

  const testUsers = [
    { email: 'admin@lumina.com', password: 'admin123', role: 'ADMIN' },
    { email: 'instructor@lumina.com', password: 'instructor123', role: 'INSTRUCTOR' },
    { email: 'student@example.com', password: 'student123', role: 'STUDENT' },
  ];

  return (
    <main className="min-h-screen bg-[var(--color-bg)] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-8">
          Prueba de Roles y Permisos
        </h1>

        {/* Estado actual del usuario */}
        <div className="bg-[var(--color-surface)] rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
            Estado Actual del Usuario
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><strong>Autenticado:</strong> {isAuthenticated ? 'Sí' : 'No'}</p>
              <p><strong>ID:</strong> {user?.id || 'N/A'}</p>
              <p><strong>Nombre:</strong> {user?.name || 'N/A'}</p>
              <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
              <p><strong>Rol:</strong> {role || 'N/A'}</p>
            </div>
            <div>
              <p><strong>Es Instructor:</strong> {isInstructor ? 'Sí' : 'No'}</p>
              <p><strong>Es Admin:</strong> {isAdmin ? 'Sí' : 'No'}</p>
              <p><strong>Es Estudiante:</strong> {isStudent ? 'Sí' : 'No'}</p>
              <p><strong>Tiene Acceso Admin:</strong> {hasAccess ? 'Sí' : 'No'}</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-semibold text-[var(--color-text)] mb-2">URLs de Prueba:</h3>
            <div className="text-sm space-y-1">
              <p><strong>Perfil Instructor:</strong> <code>/instructor/{user?.id || 'ID_NO_DISPONIBLE'}</code></p>
              <p><strong>Perfil Estudiante:</strong> <code>/students/{user?.id || 'ID_NO_DISPONIBLE'}</code></p>
            </div>
          </div>
        </div>

        {/* Prueba de permisos */}
        <div className="bg-[var(--color-surface)] rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
            Prueba de Permisos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-[var(--color-text)] mb-2">Permisos de Admin:</h3>
              <ul className="space-y-1 text-sm">
                <li>manage_users: {hasPermission(role, 'manage_users') ? '✓' : '✗'}</li>
                <li>manage_courses: {hasPermission(role, 'manage_courses') ? '✓' : '✗'}</li>
                <li>access_admin_panel: {hasPermission(role, 'access_admin_panel') ? '✓' : '✗'}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-[var(--color-text)] mb-2">Permisos de Instructor:</h3>
              <ul className="space-y-1 text-sm">
                <li>create_courses: {hasPermission(role, 'create_courses') ? '✓' : '✗'}</li>
                <li>edit_own_courses: {hasPermission(role, 'edit_own_courses') ? '✓' : '✗'}</li>
                <li>access_instructor_panel: {hasPermission(role, 'access_instructor_panel') ? '✓' : '✗'}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Credenciales de prueba */}
        <div className="bg-[var(--color-surface)] rounded-lg p-6">
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
            Credenciales de Prueba
          </h2>
          <div className="space-y-4">
            {testUsers.map((testUser, index) => (
              <div key={index} className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                  <div>
                    <strong>Email:</strong> {testUser.email}
                  </div>
                  <div>
                    <strong>Password:</strong> {testUser.password}
                  </div>
                  <div>
                    <strong>Rol:</strong> {testUser.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instrucciones */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
            Instrucciones de Prueba
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-[var(--color-text)]">
            <li>Inicia sesión con diferentes credenciales para probar los roles</li>
            <li>Verifica que los instructores puedan acceder a /instructor/dashboard</li>
            <li>Verifica que los estudiantes NO puedan acceder a /instructor/dashboard</li>
            <li>Verifica que los administradores puedan acceder a todas las rutas</li>
            <li>Prueba el login case-insensitive (mayúsculas/minúsculas)</li>
          </ol>
        </div>
      </div>
    </main>
  );
}
