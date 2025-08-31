"use client";

import { useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([
    { id: 1, name: "Juan Pérez", email: "juan@example.com", role: "student" },
    { id: 2, name: "María López", email: "maria@example.com", role: "instructor" },
    { id: 3, name: "Carlos Admin", email: "admin@example.com", role: "admin" },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (user) => {
    setSelectedUser({ ...user });
  };

  const handleSave = () => {
    setUsers((prev) =>
      prev.map((u) => (u.id === selectedUser.id ? selectedUser : u))
    );
    setSelectedUser(null);
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] p-4 md:p-6">
      <section className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
          Gestión de Usuarios
        </h1>

        {/* Tabla responsive */}
        <div className="overflow-x-auto rounded-xl shadow-sm border border-[var(--color-muted)]">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead className="bg-[var(--color-surface)] text-left">
              <tr>
                <th className="p-3 md:p-4">Nombre</th>
                <th className="p-3 md:p-4">Email</th>
                <th className="p-3 md:p-4">Rol</th>
                <th className="p-3 md:p-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-[var(--color-muted)] hover:bg-[var(--color-card-secondary)] transition"
                >
                  <td className="p-3 md:p-4 text-gray-500">{user.name}</td>
                  <td className="p-3 md:p-4 text-gray-500">{user.email}</td>
                  <td className="p-3 md:p-4 capitalize text-gray-500">{user.role}</td>
                  <td className="p-3 md:p-4 text-right">
                    <button
                      onClick={() => handleEdit(user)}
                      className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg btn-primary text-sm md:text-base"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal responsivo */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
            <div className="bg-[var(--color-surface)] dark:bg-[var(--color-card-secondary)] rounded-xl p-6 w-full max-w-lg shadow-xl">
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-center md:text-left">
                Editar Usuario
              </h2>

              <div className="space-y-4">
                {/* Nombre */}
                <div>
                  <label className="block mb-1 text-sm">Nombre</label>
                  <input
                    type="text"
                    value={selectedUser.name}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, name: e.target.value })
                    }
                    className="w-full p-2.5 md:p-3 rounded-lg border border-[var(--color-muted)] bg-[var(--color-card-primary)] text-[var(--color-card-primary-text)] text-sm md:text-base"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-1 text-sm">Email</label>
                  <input
                    type="email"
                    value={selectedUser.email}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, email: e.target.value })
                    }
                    className="w-full p-2.5 md:p-3 rounded-lg border border-[var(--color-muted)] bg-[var(--color-card-primary)] text-[var(--color-card-primary-text)] text-sm md:text-base"
                  />
                </div>

                {/* Rol */}
                <div>
                  <label className="block mb-1 text-sm">Rol</label>
                  <select
                    value={selectedUser.role}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, role: e.target.value })
                    }
                    className="w-full p-2.5 md:p-3 rounded-lg border border-[var(--color-muted)] bg-[var(--color-card-primary)] text-[var(--color-card-primary-text)] text-sm md:text-base"
                  >
                    <option value="student">Estudiante</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              {/* Botones */}
              <div className="flex flex-col md:flex-row justify-end gap-3 mt-6">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="px-4 py-2 rounded-lg bg-[var(--color-secondary)] text-[var(--color-secondary-text)] hover:bg-[var(--color-secondary-hover)] hover:text-[var(--color-secondary-hover-text)] w-full md:w-auto"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded-lg btn-primary w-full md:w-auto"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}