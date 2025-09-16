'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { MenuIcon, XIcon, CircleUserRound } from 'lucide-react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import ProfileImage from './ProfileImage';
import Notifications from './Notifications';
import { useRouter } from 'next/navigation';

const navLinks = [
  { href: '/team', label: 'Team Lumina' },
  { href: '/payments', label: 'Planes' },
  { href: '/help/faq', label: 'FAQ' },
  { href: '/help/contact', label: 'Contacto' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user;

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  const closeDropdown = () => setDropdownOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-[var(--color-surface)] shadow-md border-b border-primary">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            aria-label="Logo"
            src="/Logo.png"
            alt="Logo"
            width={80}
            height={80}
            priority
            unoptimized
            className="hover:scale-110 hover:shadow-lg hover:shadow-primary/20 rounded-xl"
            style={{ height: 'auto', width: '30%' }}
            onError={(e) => {
              e.currentTarget.src = '/default-avatar.png'; // coloca tu imagen local en /public
            }}
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[var(--color-text)] hover:text-primary transition"
            >
              {label}
            </Link>
          ))}
          <ThemeToggle />
          <Notifications />

          {/* User Dropdown */}
          <div className="relative">
            <button
              type="button"
              aria-label="User menu"
              aria-expanded={dropdownOpen}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="rounded-full p-1 hover:bg-secondary cursor-pointer transition flex items-center gap-2"
            >
              {user?.image ? (
                <>
                  <ProfileImage
                    src={user.image}
                    alt={user.name || 'avatar'}
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-full border cursor-pointer"
                  />
                  <span className="text-sm text-[var(--color-text)] hidden lg:block">
                    {user.name}
                  </span>
                </>
              ) : (
                <CircleUserRound className="w-8 h-8 text-[var(--color-text)] hover:text-primary transition" />
              )}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-xl shadow-lg border border-muted bg-[var(--color-card-secondary)] p-2 z-50">
                {!user ? (
                  <>
                    <button
                      type="button"
                      aria-label="Iniciar sesión"
                      onClick={() => {
                        closeDropdown();
                        router.push('/auth/login');
                      }}
                      className="w-full text-left cursor-pointer px-3 py-2 text-[var(--color-text)] hover:text-primary rounded-md"
                    >
                      Iniciar sesión
                    </button>
                    <Link
                      href="/demo"
                      onClick={closeDropdown}
                      className="block rounded-md px-3 py-2 text-[var(--color-text)] hover:text-primary"
                    >
                      Demo gratis
                    </Link>
                  </>
                ) : (
                  <>
                    <p className="px-3 py-2 font-semibold border-b border-muted mb-2">
                      {user.name}
                    </p>

                    {/* Opciones específicas por rol */}
                    {user.role === 'ADMIN' && (
                      <Link
                        href="/admin"
                        className="block rounded-md px-3 py-2 text-[var(--color-text)] hover:bg-secondary"
                      >
                        Panel Admin
                      </Link>
                    )}

                    {user.role === 'INSTRUCTOR' && (
                      <>
                        <Link
                          href="/"
                          onClick={closeDropdown}
                          className="block rounded-md px-3 py-2 text-[var(--color-text)] hover:bg-secondary"
                        >
                          Inicio
                        </Link>
                        <Link
                          href={`/instructor/${user.id || '1'}`}
                          onClick={closeDropdown}
                          className="block rounded-md px-3 py-2 text-[var(--color-text)] hover:bg-secondary"
                        >
                          Perfil
                        </Link>
                        <Link
                          href="/instructor/dashboard"
                          onClick={closeDropdown}
                          className="block rounded-md px-3 py-2 text-[var(--color-text)] hover:bg-secondary"
                        >
                          Panel Instructor
                        </Link>
                      </>
                    )}

                    {user.role === 'STUDENT' && (
                      <>
                        <Link
                          href="/"
                          onClick={closeDropdown}
                          className="block rounded-md px-3 py-2 text-[var(--color-text)] hover:bg-secondary"
                        >
                          Panel
                        </Link>
                        <Link
                          href={`/students/${user.id || '1'}`}
                          onClick={closeDropdown}
                          className="block rounded-md px-3 py-2 text-[var(--color-text)] hover:bg-secondary"
                        >
                          Perfil
                        </Link>
                      </>
                    )}

                    {/* Opciones comunes */}
                    <Link
                      href="/dashboard/settings"
                      onClick={closeDropdown}
                      className="block rounded-md px-3 py-2 text-[var(--color-text)] hover:bg-secondary"
                    >
                      Configuración
                    </Link>

                    <hr className="my-2 border-muted" />

                    <button
                      type="button"
                      aria-label="Cerrar sesión"
                      onClick={() => {
                        closeDropdown();
                        handleSignOut();
                      }}
                      className="w-full text-left cursor-pointer rounded-md px-3 py-2 text-[var(--color-text)] hover:bg-secondary text-red-600"
                    >
                      Cerrar sesión
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Button */}
        <button
          type="button"
          aria-label="Toggle menu"
          className="md:hidden cursor-pointer text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-[var(--color-surface)] px-4 pb-4 flex flex-col gap-3 transition-all duration-300 ${
          mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        {/* Usuario + ThemeToggle */}
        <div className="flex justify-between items-center py-2 border-b border-muted">
          <div className="flex items-center gap-2">
            {user?.image ? (
              <ProfileImage
                src={user.image}
                alt={user.name || 'avatar'}
                width={36}
                height={36}
                className="w-9 h-9 rounded-full border"
              />
            ) : (
              <CircleUserRound className="w-8 h-8 text-foreground" />
            )}
            {user && <span className="text-sm text-foreground font-medium">{user.name}</span>}
          </div>
          <ThemeToggle />
        </div>

        {/* Links principales */}
        {navLinks.map(({ href, label }) => (
          <Link key={href} href={href} className="px-4 py-2 hover:bg-secondary rounded-lg">
            {label}
          </Link>
        ))}

        {/* Links de usuario */}
        {!user ? (
          <>
            <button
              type="button"
              aria-label="Iniciar sesión"
              onClick={() => {
                setMobileOpen(false);
                router.push('/auth/login');
              }}
              className="px-4 py-2 bg-primary cursor-pointer text-[var(--color-primary-text)] rounded-lg text-center"
            >
              Iniciar sesión
            </button>
            <Link
              href="/demo"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2 bg-primary text-[var(--color-primary-text)] rounded-lg text-center"
            >
              Demo gratis
            </Link>
          </>
        ) : (
          <>
            {/* Opciones específicas por rol */}
            {user.role === 'ADMIN' && (
              <Link
                href="/admin/dashboard"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2 hover:bg-secondary rounded-lg text-center"
              >
                Panel Admin
              </Link>
            )}

            {user.role === 'INSTRUCTOR' && (
              <>
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2 hover:bg-secondary rounded-lg text-center"
                >
                  Inicio
                </Link>
                <Link
                  href={`/instructor/${user.id || '1'}`}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2 hover:bg-secondary rounded-lg text-center"
                >
                  Perfil
                </Link>
                <Link
                  href="/instructor/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2 hover:bg-secondary rounded-lg text-center"
                >
                  Panel Instructor
                </Link>
              </>
            )}

            {user.role === 'STUDENT' && (
              <>
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2 hover:bg-secondary rounded-lg text-center"
                >
                  Panel
                </Link>
                <Link
                  href={`/students/${user.id || '1'}`}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2 hover:bg-secondary rounded-lg text-center"
                >
                  Perfil
                </Link>
              </>
            )}

            {/* Opciones comunes */}
            <Link
              href="/dashboard/profile"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2 hover:bg-secondary rounded-lg text-center"
            >
              Perfil
            </Link>
            <Link
              href="/dashboard/settings"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2 hover:bg-secondary rounded-lg text-center"
            >
              Configuración
            </Link>
            <button
              type="button"
              aria-label="Cerrar sesión"
              onClick={() => {
                setMobileOpen(false);
                handleSignOut();
              }}
              className="px-4 py-2 hover:bg-secondary cursor-pointer rounded-lg text-center w-full text-red-600"
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
