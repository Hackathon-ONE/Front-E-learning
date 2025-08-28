"use client";

import { useState } from "react";

export default function Dropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 rounded-md bg-[var(--color-primary)] text-white"
      >
        Opciones
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg 
                     bg-[var(--color-surface)] text-[var(--color-text)] 
                     border border-[var(--color-muted)] z-50"
        >
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-[var(--color-secondary)] hover:text-white cursor-pointer">
              Perfil
            </li>
            <li className="px-4 py-2 hover:bg-[var(--color-secondary)] hover:text-white cursor-pointer">
              Configuración
            </li>
            <li className="px-4 py-2 hover:bg-[var(--color-secondary)] hover:text-white cursor-pointer">
              Cerrar sesión
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}