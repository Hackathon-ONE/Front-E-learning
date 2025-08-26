"use client";

import { useState } from "react";
import { User, Lock, Bell, ChevronDown, ChevronUp } from "lucide-react";

export default function SettingsPage() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-primary">Configuración</h1>
      <p className="text-gray-400 mb-8">Modifica las opciones de la plataforma.</p>

      {/* Sección Perfil */}
      <div className="border rounded-2xl mb-4 bg-card shadow-sm">
        <button
          className="w-full flex justify-between items-center p-4 hover:bg-muted rounded-t-2xl"
          onClick={() => toggleSection("perfil")}
        >
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            <span className="font-semibold">Perfil</span>
          </div>
          {openSection === "perfil" ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
        {openSection === "perfil" && (
          <div className="p-4 border-t text-sm text-gray-400 space-y-3">
            <label className="block">
              Nombre:
              <input
                type="text"
                defaultValue="Juan Pérez"
                className="w-full mt-1 p-2 border rounded-lg bg-background"
              />
            </label>
            <label className="block">
              Email:
              <input
                type="email"
                defaultValue="juan@example.com"
                className="w-full mt-1 p-2 border rounded-lg bg-background"
              />
            </label>
            <button className="mt-3 px-4 py-2 bg-primary text-gray-900 dark:text-gray-100 rounded-lg">
              Guardar cambios
            </button>
          </div>
        )}
      </div>

      {/* Sección Seguridad */}
      <div className="border rounded-2xl mb-4 bg-card shadow-sm">
        <button
          className="w-full flex justify-between items-center p-4 hover:bg-muted rounded-t-2xl"
          onClick={() => toggleSection("seguridad")}
        >
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            <span className="font-semibold">Seguridad</span>
          </div>
          {openSection === "seguridad" ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
        {openSection === "seguridad" && (
          <div className="p-4 border-t text-sm text-gray-400 space-y-3">
            <label className="block">
              Contraseña actual:
              <input
                type="password"
                className="w-full mt-1 p-2 border rounded-lg bg-background"
              />
            </label>
            <label className="block">
              Nueva contraseña:
              <input
                type="password"
                className="w-full mt-1 p-2 border rounded-lg bg-background"
              />
            </label>
            <button className="mt-3 px-4 py-2 bg-primary text-gray-900 dark:text-gray-100 rounded-lg">
              Actualizar contraseña
            </button>
          </div>
        )}
      </div>

      {/* Sección Notificaciones */}
      <div className="border rounded-2xl mb-4 bg-card shadow-sm">
        <button
          className="w-full flex justify-between items-center p-4 hover:bg-muted rounded-t-2xl"
          onClick={() => toggleSection("notificaciones")}
        >
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            <span className="font-semibold">Notificaciones</span>
          </div>
          {openSection === "notificaciones" ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
        {openSection === "notificaciones" && (
          <div className="p-4 border-t text-sm text-gray-400 space-y-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked />
              Recibir correos de actividad
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Notificaciones push
            </label>
            <button className="mt-3 px-4 py-2 bg-primary text-gray-900 dark:text-gray-100 rounded-lg">
              Guardar preferencias
            </button>
          </div>
        )}
      </div>
    </div>
  );
}