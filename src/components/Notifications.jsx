"use client";

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { useAuth } from "@/context/AuthContext"; 
import { notificationsByRole } from "@/data/notifications"; 

export default function Notifications() {
  const { user, role, isAuthenticated } = useAuth() || {}; 
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated && role) {
      setNotifications(notificationsByRole[role] || []);
    } else {
      setNotifications([]);
    }
  }, [role, isAuthenticated]);

  if (!isAuthenticated) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="relative">
      <button
        aria-label="Notificaciones"
        onClick={() => setOpen((prev) => !prev)}
        className="relative p-2 rounded-full hover:bg-[var(--color-surface)] transition"
      >
        <Bell className="w-6 h-6 text-[var(--color-text)]" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[var(--color-primary)] text-[var(--color-primary-text)] text-xs font-bold px-1.5 py-0.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-[var(--color-surface)] rounded-xl shadow-lg border border-[var(--color-muted)] z-50">
          <div className="p-4 border-b border-[var(--color-muted)] font-semibold">
            Notificaciones
          </div>
          <ul className="max-h-64 overflow-y-auto divide-y divide-[var(--color-muted)]">
            {notifications.length === 0 ? (
              <li className="p-4 text-center text-sm text-[var(--color-muted)]">
                No tienes notificaciones
              </li>
            ) : (
              notifications.map((n) => (
                <li
                  key={n.id}
                  onClick={() => markAsRead(n.id)}
                  className={`p-3 text-sm cursor-pointer transition hover:bg-[var(--color-card-secondary)] ${
                    !n.read ? "font-semibold" : "opacity-75"
                  }`}
                >
                  {n.message}
                </li>
              ))
            )}
          </ul>
          {notifications.length > 0 && (
            <div className="p-3 text-center">
              <button
                aria-label="Marcar todas como leídas"
                onClick={() =>
                  setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
                }
                className="w-full py-2 text-sm rounded-lg btn-primary"
              >
                Marcar todas como leídas
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}