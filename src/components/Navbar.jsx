"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { MenuIcon, XIcon, CircleUserRound } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Notifications from "./Notifications";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" }); // redirige a /inicio
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
            style={{ height: "auto", width: "30%" }}
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {["/about", "/payments", "/help/faq", "/help/contact"].map((href, i) => (
            <Link
              key={i}
              href={href}
              className="text-foreground hover:text-primary transition"
            >
              {href === "/about" ? "Quiénes Somos" : href === "/payments" ? "Planes" : href === "/help/faq" ? "FAQ" : href === "/help/contact" ? "Contacto" : ""}
            </Link>
          ))}
          <ThemeToggle />
          <div className="flex items-center gap-4">
            <Notifications />
          </div>

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
                    alt={user.name || "avatar"}
                    className="w-9 h-9 sm:w-8 sm:h-8 rounded-full border"
                  />
                  <span className="text-sm text-foreground hidden lg:block">{user.name}</span>
                </>
              ) : (
                <CircleUserRound className="w-8 h-8 text-foreground hover:text-primary transition" />
              )}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 max-h-72 overflow-auto bg-[var(--color-surface)] dark:bg-surface text-primary rounded-xl shadow-lg border border-muted p-2 z-50 transition-all duration-300">
                {!user ? (
                  <>
                    <Link href="/auth/login" className="block rounded-md px-3 py-2 hover:bg-[var(--color-dropdown)]">Iniciar sesión</Link>
                    <Link href="/demo" className="block rounded-md px-3 py-2 hover:bg-[var(--color-dropdown)]">Demo gratis</Link>
                  </>
                ) : (
                  <>
                    <Link href="/inicio" className="block rounded-md px-3 py-2 hover:bg-secondary">Inicio</Link>
                    <Link href="/dashboard/settings" className="block rounded-md px-3 py-2 hover:bg-secondary">Settings</Link>
                    <button onClick={handleSignOut} className="w-full text-left rounded-md px-3 py-2 hover:bg-secondary">Cerrar sesión</button>
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
          mobileOpen ? "max-h-screen opacity-90" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {/* Usuario + ThemeToggle */}
        <div className="flex justify-between items-center py-2 border-b border-muted">
          <div className="flex items-center gap-2">
            {user?.image ? (
              <img src={user.image} alt={user.name || "avatar"} className="w-9 h-9 rounded-full border" />
            ) : (
              <CircleUserRound className="w-8 h-8 text-foreground" />
            )}
            {user && <span className="text-sm text-foreground font-medium">{user.name}</span>}
          </div>
          <ThemeToggle />
        </div>

        {/* Links principales */}
        <div className="flex flex-col gap-2 mt-2">
          <Link href="/about" className="px-4 py-2 hover:bg-secondary rounded-lg">Sobre Nosotros</Link>
          <Link href="/payments" className="px-4 py-2 hover:bg-secondary rounded-lg">Planes</Link>
          <Link href="/help/faq" className="px-4 py-2 hover:bg-secondary rounded-lg">FAQ</Link>
          <Link href="/help/contact" className="px-4 py-2 hover:bg-secondary rounded-lg">Contacto</Link>
        </div>

        {/* Links de usuario */}
        <div className="flex flex-col gap-2 mt-2">
          {!user ? (
            <>
              <Link href="/auth/login" className="px-4 py-2 bg-[var(--color-dropdown)] rounded-lg text-center">Iniciar sesión</Link>
              <Link href="/demo" className="px-4 py-2 bg-[var(--color-dropdown)] rounded-lg text-center">Demo gratis</Link>
            </>
          ) : (
            <>
              <Link href="/" className="px-4 py-2 hover:bg-secondary rounded-lg text-center">Inicio</Link>
              <Link href="/dashboard/settings" className="px-4 py-2 hover:bg-secondary rounded-lg text-center">Settings</Link>
              <button onClick={handleSignOut} className="px-4 py-2 hover:bg-secondary rounded-lg text-center w-full">Cerrar sesión</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}