"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { MenuIcon, XIcon, CircleUserRound } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Notifications from "./Notifications";
import { useRouter } from "next/navigation";

const navLinks = [
  { href: "/team", label: "Team Lumina" },
  { href: "/payments", label: "Planes" },
  { href: "/help/faq", label: "FAQ" },
  { href: "/help/contact", label: "Contacto" },
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
    signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="sticky top-0 z-50 bg-[var(--color-surface)] shadow-md border-b border-primary">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/Logo.png"
            alt="Logo"
            width={16}
            height={16}
            priority
            unoptimized
            style={{ height: 'auto', width: '30%' }}
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="text-foreground hover:text-primary transition">
              {label}
            </Link>
          ))}
          <ThemeToggle />
          <Notifications />

          {/* User Dropdown */}
          <div className="relative">
            <button
              aria-label="User menu"
              aria-expanded={dropdownOpen}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="rounded-full p-1 hover:bg-secondary transition flex items-center gap-2"
            >
              {user?.image ? (
                <>
                  <img
                    src={user.image}
                    alt={user.name || 'avatar'}
                    className="w-9 h-9 rounded-full border"
                  />
                  <span className="text-sm text-foreground hidden lg:block">{user.name}</span>
                </>
              ) : (
                <CircleUserRound className="w-8 h-8 text-foreground hover:text-primary transition" />
              )}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-[var(--color-surface)] rounded-xl shadow-lg border border-muted p-2 z-50">
                {!user ? (
                  <>
                    <button
                      onClick={() => router.push('/auth/login')}
                      className="w-full text-left px-3 py-2 text-gray-400 hover:bg-[var(--color-dropdown)] rounded-md"
                    >
                      Iniciar sesión
                    </button>
                    <Link
                      href="/demo"
                      className="block rounded-md px-3 py-2 text-gray-400 hover:bg-[var(--color-dropdown)]"
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
                      <Link href="/admin" className="block rounded-md px-3 py-2 hover:bg-secondary">
                        Dashboard
                      </Link>
                    )}

                    {user.role === 'INSTRUCTOR' && (
                      <>
                        <Link
                          href="/instructor/dashboard"
                          className="block rounded-md px-3 py-2 hover:bg-secondary"
                        >
                          Dashboard
                        </Link>
                        <Link
                          href="/dashboard/profile"
                          className="block rounded-md px-3 py-2 hover:bg-secondary"
                        >
                          Perfil
                        </Link>
                      </>
                    )}

                    {user.role === 'STUDENT' && (
                      <Link
                        href="/dashboard/profile"
                        className="block rounded-md px-3 py-2 hover:bg-secondary"
                      >
                        Perfil
                      </Link>
                    )}

                    {/* Opciones comunes */}
                    <Link
                      href="/dashboard/settings"
                      className="block rounded-md px-3 py-2 hover:bg-secondary"
                    >
                      Configuración
                    </Link>

                    <hr className="my-2 border-muted" />

                    <button
                      onClick={handleSignOut}
                      className="w-full text-left rounded-md px-3 py-2 hover:bg-secondary text-red-600"
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
          aria-label="Toggle menu"
          className="md:hidden text-2xl"
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
              <img
                src={user.image}
                alt={user.name || 'avatar'}
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
              onClick={() => router.push('/auth/login')}
              className="px-4 py-2 bg-[var(--color-dropdown)] text-gray-800 rounded-lg text-center"
            >
              Iniciar sesión
            </button>
            <Link
              href="/demo"
              className="px-4 py-2 bg-[var(--color-dropdown)] text-gray-800 rounded-lg text-center"
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
                className="px-4 py-2 hover:bg-secondary rounded-lg text-center"
              >
                Dashboard Admin
              </Link>
            )}

            {user.role === 'INSTRUCTOR' && (
              <Link
                href="/instructor/dashboard"
                className="px-4 py-2 hover:bg-secondary rounded-lg text-center"
              >
                Dashboard Instructor
              </Link>
            )}

            {/* Opciones comunes */}
            <Link
              href="/dashboard/profile"
              className="px-4 py-2 hover:bg-secondary rounded-lg text-center"
            >
              Perfil
            </Link>
            <Link
              href="/dashboard/settings"
              className="px-4 py-2 hover:bg-secondary rounded-lg text-center"
            >
              Configuración
            </Link>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 hover:bg-secondary rounded-lg text-center w-full text-red-600"
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
}