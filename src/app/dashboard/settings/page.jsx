"use client";
import { useState /*, useEffect */ } from "react";
import { LogOut, Moon, Sun } from "lucide-react";
import { profileDashboard } from "@/data/users";

export default function SettingsPage() {
  const [profile, setProfile] = useState(profileDashboard);
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
  });
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [feedback, setFeedback] = useState("");
  const [saving, setSaving] = useState(false);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleNotificationsChange = (e) => {
    setNotifications({ ...notifications, [e.target.name]: e.target.checked });
  };

  const handlePasswordsChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleThemeChange = (mode) => {
    setTheme(mode);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", mode === "dark");
    }
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setFeedback("Datos actualizados correctamente.");
      setTimeout(() => setFeedback(""), 3000);
    }, 1200);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      setFeedback("Las contraseñas no coinciden.");
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setFeedback("Contraseña actualizada.");
      setPasswords({ current: "", new: "", confirm: "" });
      setTimeout(() => setFeedback(""), 3000);
    }, 1200);
  };

  const handleLogout = () => {
    // Aquí iría la lógica real de logout
    setFeedback("Sesión cerrada.");
    setTimeout(() => setFeedback(""), 2000);
  };

  /*
  import { useEffect, useState } from "react";

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        setError(null);
        // Cambia la URL por tu endpoint real de Spring Boot
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`);
        if (!res.ok) throw new Error("Error al obtener datos del usuario");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError("No se pudo cargar el perfil.");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  // Puedes mostrar loading y error así:
  if (loading) return <div className="text-center py-10">Cargando perfil...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  */

  return (
    <main className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center py-6 px-2 sm:px-4">
      <section className="w-full max-w-3xl bg-[var(--color-surface)] rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 flex flex-col gap-8 sm:gap-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-primary)] mb-2 text-center">Configuración</h1>
        {/* Feedback */}
        {feedback && (
          <div className="text-center text-[var(--color-primary)] font-semibold mb-2">
            {feedback}
          </div>
        )}

        {/* Datos personales */}
        <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4 bg-[var(--color-card-primary)] rounded-xl shadow p-4 sm:p-6 w-full">
          <h2 className="text-lg sm:text-xl font-bold text-[var(--color-text)] mb-2">Datos personales</h2>
          <label className="font-semibold text-[var(--color-text)]">
            Nombre
            <input
              type="text"
              name="name"
              id="name"
              value={profile.name}
              onChange={handleProfileChange}
              className="mt-1 w-full px-3 py-2 rounded border border-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-text)]"
              required
            />
          </label>
          <label className="font-semibold text-[var(--color-text)]">
            Email
            <input
              type="email"
              name="email"
              id="email"
              value={profile.email}
              onChange={handleProfileChange}
              className="mt-1 w-full px-3 py-2 rounded border border-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-text)]"
              required
            />
          </label>
          <button
            aria-label="Guardar cambios"
            type="submit"
            className="btn-primary py-2 px-6 rounded-lg font-bold text-base sm:text-lg mt-2 self-end"
            disabled={saving}
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>

        {/* Cambiar contraseña */}
        <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4 bg-[var(--color-card-primary)] rounded-xl shadow p-4 sm:p-6 w-full">
          <h2 className="text-lg sm:text-xl font-bold text-[var(--color-text)] mb-2">Cambiar contraseña</h2>
          <label className="font-semibold text-[var(--color-text)]">
            Contraseña actual
            <input
              id="current-password"
              type="password"
              name="current"
              value={passwords.current}
              onChange={handlePasswordsChange}
              className="mt-1 w-full px-3 py-2 rounded border border-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-text)]"
              required
            />
          </label>
          <label className="font-semibold text-[var(--color-text)]">
            Nueva contraseña
            <input
              id="new-password"
              type="password"
              name="new"
              value={passwords.new}
              onChange={handlePasswordsChange}
              className="mt-1 w-full px-3 py-2 rounded border border-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-text)]"
              required
            />
          </label>
          <label className="font-semibold text-[var(--color-text)]">
            Confirmar nueva contraseña
            <input
              id="confirm-password"
              type="password"
              name="confirm"
              value={passwords.confirm}
              onChange={handlePasswordsChange}
              className="mt-1 w-full px-3 py-2 rounded border border-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-text)]"
              required
            />
          </label>
          <button
            aria-label="Actualizar contraseña"
            type="submit"
            className="btn-primary py-2 px-6 rounded-lg font-bold text-base sm:text-lg mt-2 self-end"
            disabled={saving}
          >
            {saving ? "Guardando..." : "Actualizar contraseña"}
          </button>
        </form>

        {/* Preferencias */}
        <div className="flex flex-col gap-4 bg-[var(--color-card-primary)] border border-[var(--color-muted)] rounded-xl shadow p-4 sm:p-6 w-full">
          <h2 className="text-lg sm:text-xl font-bold text-[var(--color-text)] mb-2">Preferencias</h2>
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Notificaciones */}
            <div className="flex-1">
              <h3 className="font-semibold text-[var(--color-text)] mb-2">Notificaciones</h3>
              <label className="flex items-center gap-2 mb-2">
                <input
                  id="email-notifications"
                  type="checkbox"
                  name="email"
                  checked={notifications.email}
                  onChange={handleNotificationsChange}
                  className="accent-[var(--color-primary)]"
                />
                <span className="text-[var(--color-text)]">Email</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  id="sms-notifications"
                  type="checkbox"
                  name="sms"
                  checked={notifications.sms}
                  onChange={handleNotificationsChange}
                  className="accent-[var(--color-primary)]"
                />
                <span className="text-[var(--color-text)]">SMS</span>
              </label>
            </div>
            {/* Tema */}
            <div className="flex-1 mt-4 sm:mt-0">
              <h3 className="font-semibold text-[var(--color-text)] mb-2">Tema</h3>
              <div className="flex gap-4 flex-col xs:flex-row sm:flex-row">
                <button
                  aria-label="Tema claro"
                  id="light-theme"
                  type="button"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-semibold transition ${
                    theme === "light"
                      ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                      : "bg-white text-[var(--color-primary)] border-gray-200"
                  }`}
                  onClick={() => handleThemeChange("light")}
                >
                  <Sun size={18} /> Claro
                </button>
                <button
                  aria-label="Tema oscuro"
                  id="dark-theme"
                  type="button"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-semibold transition ${
                    theme === "dark"
                      ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                      : "bg-white text-[var(--color-primary)] border-gray-200"
                  }`}
                  onClick={() => handleThemeChange("dark")}
                >
                  <Moon size={18} /> Oscuro
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cerrar sesión */}
        <div className="flex justify-end w-full">
          <button
            type="button"
            aria-label="Cerrar sesión"
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition w-full sm:w-auto"
          >
            <LogOut size={18} /> Cerrar sesión
          </button>
        </div>
      </section>
    </main>
  );
}