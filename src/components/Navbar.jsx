"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { MenuIcon, XIcon, CircleUserRound } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { data: session } = useSession();
  const user = session?.user;

  // Rutas segun rol
  const roleRoutes = {
    student: "/students",
    instructor: "/instructor/dashboard",
    admin: "/admin/dashboard",
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-50 bg-surface shadow-sm border-b border-primary">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-xl font-bold text-primary">
          🎓 E-Learning
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/courses" className="text-foreground hover:text-primary transition">
            Cursos
          </Link>
          <Link href="/about" className="text-foreground hover:text-primary transition">
            Sobre Nosotros
          </Link>
          <Link href="/help/faq" className="text-foreground hover:text-primary transition">
            FAQ
          </Link>
          <ThemeToggle />

          {/* Dropdown user */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="rounded-full p-1 hover:bg-secondary transition"
            >
              {user?.image ? (
                <div className="flex items-center gap-2">
                  <img
                    src={user.image}
                    alt={user.name || "avatar"}
                    className="w-9 h-9 rounded-full border"
                  />
                  <span className="text-sm text-foreground">{user.name}</span>
                </div>
              ) : (
                <CircleUserRound className="w-8 h-8 text-foreground hover:text-primary transition" />
              )}
            </button>

            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 
                        bg-surface 
                        dark:bg-surface 
                        text-primary
                        rounded-xl shadow-lg border border-muted p-2 z-50"
              >
                {!user ? (
                  <>
                    <Link
                      href="/auth/login"
                      className="block rounded-md px-3 py-2 hover:bg-secondary"
                    >
                      Iniciar sesión
                    </Link>
                    <Link
                      href="/demo"
                      className="block rounded-md px-3 py-2 hover:bg-secondary"
                    >
                      Demo gratis
                    </Link>
                  </>
                ) : (
                  <>
                    {/* Dashboard según rol */}
                    <Link
                      href={roleRoutes[user.role] || "/dashboard"}
                      className="block rounded-md px-3 py-2 hover:bg-secondary"
                    >
                      Dashboard
                    </Link>

                    {user.role === "student" && (
                      <Link
                        href="/students/courses"
                        className="block rounded-md px-3 py-2 hover:bg-secondary"
                      >
                        Mis Inscripciones
                      </Link>
                    )}
                    {user.role === "instructor" && (
                      <Link
                        href="/instructor/courses"
                        className="block rounded-md px-3 py-2 hover:bg-secondary"
                      >
                        Mis Cursos
                      </Link>
                    )}
                    {user.role === "admin" && (
                      <Link
                        href="/admin/users"
                        className="block rounded-md px-3 py-2 hover:bg-secondary"
                      >
                        Gestión de Usuarios
                      </Link>
                    )}

                    <Link
                      href="/dashboard/settings"
                      className="block rounded-md px-3 py-2 hover:bg-secondary"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left rounded-md px-3 py-2 hover:bg-secondary"
                    >
                      Cerrar sesión
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-surface px-4 pb-4 flex flex-col gap-2">
          {user?.image ? (
            <div className="flex items-center gap-2 mb-2">
              <img
                src={user.image}
                alt={user.name || "avatar"}
                className="w-9 h-9 rounded-full border"
              />
              <span className="text-sm text-foreground">{user.name}</span>
            </div>
          ) : (
            <CircleUserRound className="w-8 h-8 text-foreground hover:text-primary transition mb-2" />
          )}

          <Link href="/courses" className="text-foreground hover:text-primary transition">
            Cursos
          </Link>
          <Link href="/about" className="text-foreground hover:text-primary transition">
            Sobre Nosotros
          </Link>
          <Link href="/help/faq" className="text-foreground hover:text-primary transition">
            FAQ
          </Link>

          {user && (
            <Link
              href={roleRoutes[user.role] || "/dashboard"}
              className="text-foreground hover:text-primary transition"
            >
              Dashboard
            </Link>
          )}
          <ThemeToggle />

          {!user ? (
            <div className="flex flex-col gap-2 mt-2">
              <Link
                href="/auth/login"
                className="px-4 py-2 bg-secondary rounded-lg hover:bg-secondary transition"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/demo"
                className="px-4 py-2 bg-secondary rounded-lg hover:bg-secondary transition"
              >
                Demo gratis
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2 mt-2">
              {user.role === "student" && (
                <Link
                  href="/students/courses"
                  className="px-4 py-2 hover:bg-secondary rounded-lg"
                >
                  Mis Inscripciones
                </Link>
              )}
              {user.role === "instructor" && (
                <Link
                  href="/instructor/courses"
                  className="px-4 py-2 hover:bg-secondary rounded-lg"
                >
                  Mis Cursos
                </Link>
              )}
              {user.role === "admin" && (
                <Link
                  href="/admin/users"
                  className="px-4 py-2 hover:bg-secondary rounded-lg"
                >
                  Gestión de Usuarios
                </Link>
              )}
              <Link
                href="/dashboard/settings"
                className="px-4 py-2 hover:bg-secondary rounded-lg"
              >
                Settings
              </Link>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 hover:bg-secondary rounded-lg text-left w-full"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}