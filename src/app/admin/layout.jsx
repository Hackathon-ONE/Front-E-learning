"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Users, Settings, CreditCard, Home } from "lucide-react";

const navItems = [
  { name: "Panel", href: "/admin", icon: Home },
  { name: "Cursos", href: "/admin/courses", icon: BookOpen },
  { name: "Usuarios", href: "/admin/users", icon: Users },
  { name: "Pagos", href: "/admin/payments", icon: CreditCard },
  { name: "Configuración", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
    >
      {/* Sidebar */}
      <aside
        className="w-64 p-6 shadow-lg text-gray-900 dark:text-gray-100"
      >
        <h2
          className="text-2xl font-bold mb-8"
          style={{ color: "var(--color-primary)" }}
        >
          Admin
        </h2>
        <nav className="space-y-3">
          {navItems.map(({ name, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition font-medium`}
                style={{
                  backgroundColor: active
                    ? "var(--color-primary-hover)"
                    : "transparent",
                  color: active
                    ? "var(--color-primary-hover-text)"
                    : "var(--color-muted)",
                }}
              >
                <Icon size={18} color={active ? "var(--color-primary-hover-text)" : "var(--color-text)"}/>
                {name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}