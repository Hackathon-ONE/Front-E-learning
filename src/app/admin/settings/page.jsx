"use client";

import { useState } from "react";
import { User, Lock, Bell, ChevronDown, ChevronUp } from "lucide-react";

export default function SettingsPage() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div 
      className="min-h-screen p-3 sm:p-4 md:p-6"
      style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-[var(--color-text)]">
            Configuración
          </h1>
          <p className="text-sm sm:text-base text-[var(--color-text)]">
            Modifica las opciones de la plataforma.
          </p>
        </div>

        {/* Sección Perfil */}
        <div className="bg-[var(--color-card-primary)] border border-[var(--color-muted)] rounded-xl mb-4 shadow-sm">
          <button
            className="w-full flex justify-between items-center p-4 sm:p-6 hover:bg-[var(--color-card-secondary)] rounded-t-xl transition-colors"
            onClick={() => toggleSection("perfil")}
          >
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-[var(--color-primary)]" />
              <span className="font-semibold text-[var(--color-card-primary-text)]">Perfil</span>
            </div>
            {openSection === "perfil" ? (
              <ChevronUp className="w-5 h-5 text-[var(--color-muted)]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[var(--color-muted)]" />
            )}
          </button>
          {openSection === "perfil" && (
            <div className="p-4 sm:p-6 border-t border-[var(--color-muted)] space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="profile-name" className="block text-sm font-medium text-[var(--color-card-primary-text)] mb-2">
                    Nombre:
                  </label>
                  <input
                    id="profile-name"
                    type="text"
                    defaultValue="Juan Pérez"
                    className="w-full p-3 border border-[var(--color-muted)] rounded-lg bg-[var(--color-card-secondary)] text-[var(--color-card-primary-text)] text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="profile-email" className="block text-sm font-medium text-[var(--color-card-primary-text)] mb-2">
                    Email:
                  </label>
                  <input
                    id="profile-email"
                    type="email"
                    defaultValue="juan@example.com"
                    className="w-full p-3 border border-[var(--color-muted)] rounded-lg bg-[var(--color-card-secondary)] text-[var(--color-card-primary-text)] text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                  />
                </div>
              </div>
              <button className="px-4 py-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg text-sm font-medium transition-colors">
                Guardar cambios
              </button>
            </div>
          )}
        </div>

        {/* Sección Seguridad */}
        <div className="bg-[var(--color-card-primary)] border border-[var(--color-muted)] rounded-xl mb-4 shadow-sm">
          <button
            className="w-full flex justify-between items-center p-4 sm:p-6 hover:bg-[var(--color-card-secondary)] rounded-t-xl transition-colors"
            onClick={() => toggleSection("seguridad")}
          >
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-[var(--color-primary)]" />
              <span className="font-semibold text-[var(--color-card-primary-text)]">Seguridad</span>
            </div>
            {openSection === "seguridad" ? (
              <ChevronUp className="w-5 h-5 text-[var(--color-muted)]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[var(--color-muted)]" />
            )}
          </button>
          {openSection === "seguridad" && (
            <div className="p-4 sm:p-6 border-t border-[var(--color-muted)] space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="current-password" className="block text-sm font-medium text-[var(--color-card-primary-text)] mb-2">
                    Contraseña actual:
                  </label>
                  <input
                    id="current-password"
                    type="password"
                    className="w-full p-3 border border-[var(--color-muted)] rounded-lg bg-[var(--color-card-secondary)] text-[var(--color-card-primary-text)] text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium text-[var(--color-card-primary-text)] mb-2">
                    Nueva contraseña:
                  </label>
                  <input
                    id="new-password"
                    type="password"
                    className="w-full p-3 border border-[var(--color-muted)] rounded-lg bg-[var(--color-card-secondary)] text-[var(--color-card-primary-text)] text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                  />
                </div>
              </div>
              <button className="px-4 py-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg text-sm font-medium transition-colors">
                Actualizar contraseña
              </button>
            </div>
          )}
        </div>

        {/* Sección Notificaciones */}
        <div className="bg-[var(--color-card-primary)] border border-[var(--color-muted)] rounded-xl mb-4 shadow-sm">
          <button
            className="w-full flex justify-between items-center p-4 sm:p-6 hover:bg-[var(--color-card-secondary)] rounded-t-xl transition-colors"
            onClick={() => toggleSection("notificaciones")}
          >
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-[var(--color-primary)]" />
              <span className="font-semibold text-[var(--color-card-primary-text)]">Notificaciones</span>
            </div>
            {openSection === "notificaciones" ? (
              <ChevronUp className="w-5 h-5 text-[var(--color-muted)]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[var(--color-muted)]" />
            )}
          </button>
          {openSection === "notificaciones" && (
            <div className="p-4 sm:p-6 border-t border-[var(--color-muted)] space-y-4">
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--color-card-secondary)] transition-colors">
                  <input 
                    type="checkbox" 
                    defaultChecked 
                    className="w-4 h-4 text-[var(--color-primary)] border-[var(--color-muted)] rounded focus:ring-[var(--color-primary)]"
                  />
                  <span className="text-sm text-[var(--color-card-primary-text)]">Recibir correos de actividad</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--color-card-secondary)] transition-colors">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-[var(--color-primary)] border-[var(--color-muted)] rounded focus:ring-[var(--color-primary)]"
                  />
                  <span className="text-sm text-[var(--color-card-primary-text)]">Notificaciones push</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--color-card-secondary)] transition-colors">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-[var(--color-primary)] border-[var(--color-muted)] rounded focus:ring-[var(--color-primary)]"
                  />
                  <span className="text-sm text-[var(--color-card-primary-text)]">Notificaciones de seguridad</span>
                </label>
              </div>
              <button className="px-4 py-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg text-sm font-medium transition-colors">
                Guardar preferencias
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}