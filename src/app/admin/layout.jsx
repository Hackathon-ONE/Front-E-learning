'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  BookOpen,
  Users,
  Settings,
  CreditCard,
  Home,
  ShieldUser,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChartArea,
} from 'lucide-react';

const navItems = [
  { name: 'Inicio', href: '/', icon: Home },
  { name: 'Panel', href: '/admin', icon: ChartArea },
  { name: 'Cursos', href: '/admin/courses', icon: BookOpen },
  { name: 'Usuarios', href: '/admin/users', icon: Users },
  { name: 'Instructores', href: '/admin/instructors', icon: ShieldUser },
  { name: 'Pagos', href: '/admin/payments', icon: CreditCard },
  { name: 'Configuración', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div
      className="min-h-screen flex overflow-x-hidden"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
    >
      {/* Mobile menu button */}
      <button
        type="button"
        aria-label="Abrir menú"
        className="lg:hidden cursor-pointer fixed top-4 left-4 z-50 p-2 rounded-md bg-[var(--color-primary)] text-gray-500 shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Cerrar menú"
          className="lg:hidden cursor-pointer fixed inset-0 bg-black bg-opacity-50 z-40 w-full h-full"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => e.key === 'Escape' && setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50 shadow-lg text-gray-900 dark:text-gray-500
          transform transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${sidebarCollapsed ? 'w-16' : 'w-64'}
          bg-[var(--color-bg)] border-r border-[var(--color-muted)]
          ${sidebarCollapsed ? 'lg:border-r-2 lg:border-[var(--color-primary)]' : ''}
        `}
      >
        <div className={`p-4 sm:p-6 ${sidebarCollapsed ? 'px-2' : ''}`}>
          {/* Header con botón de colapsar */}
          <div
            className={`flex items-center ${
              sidebarCollapsed ? 'justify-center' : 'justify-between'
            } mb-6 lg:mb-8`}
          >
            {!sidebarCollapsed && (
              <h2
                className="text-xl sm:text-2xl font-bold"
                style={{ color: 'var(--color-primary)' }}
              >
                Admin
              </h2>
            )}
            <div className="flex items-center gap-2">
              {/* Botón para colapsar/expandir sidebar */}
              <button 
                type="button"
                aria-label="Colapsar/expandir sidebar"
                className="hidden lg:flex cursor-pointer p-1.5 rounded-md bg-[var(--color-primary)] transition-colors"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                title={sidebarCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
              >
                {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              </button>
              {/* Botón para cerrar en móvil */}
              
              <button 
                type="button"
                aria-label="Cerrar menú"
                className="lg:hidden cursor-pointer p-1 rounded-md hover:bg-[var(--color-primary)]"
                onClick={() => setSidebarOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map(({ name, href, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition font-medium text-sm sm:text-base group relative ${
                    sidebarCollapsed ? 'justify-center px-2 py-4' : ''
                  }`}
                  style={{
                    backgroundColor: active ? 'var(--color-primary-hover)' : 'transparent',
                    color: active ? 'var(--color-primary-hover-text)' : 'var(--color-muted)',
                  }}
                  onClick={() => setSidebarOpen(false)}
                  title={sidebarCollapsed ? name : ''}
                  aria-label="Abrir menú"
                >
                  <div
                    className={`${
                      sidebarCollapsed ? 'flex items-center justify-center w-8 h-8' : ''
                    }`}
                  >
                    <Icon
                      size={sidebarCollapsed ? 22 : 18}
                      color={active ? 'var(--color-primary-hover-text)' : 'var(--color-text)'}
                      className={sidebarCollapsed ? 'flex-shrink-0' : ''}
                    />
                  </div>
                  {!sidebarCollapsed && <span className="truncate">{name}</span>}

                  {/* Tooltip para cuando está colapsada */}
                  {sidebarCollapsed && (
                    <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {name}
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={`flex-1 p-3 sm:p-4 md:p-6 lg:p-8 pt-16 lg:pt-8 transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-0' : ''
        }`}
      >
        {children}
      </main>
    </div>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
