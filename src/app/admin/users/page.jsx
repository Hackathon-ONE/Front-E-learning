"use client";

import { useState } from "react";
import { usersData } from "@/data/users";

export default function UsersPage() {
  const [users, setUsers] = useState(usersData);
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
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] p-2 sm:p-6">
      <section className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Gestión de Usuarios</h1>
            <p className="text-sm sm:text-base text-[var(--color-muted)] mt-1">
              Administra los usuarios de la plataforma
            </p>
          </div>
          <button className="w-full sm:w-auto px-4 py-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-gray-800 rounded-lg text-sm sm:text-base font-medium transition-colors">
            + Nuevo Usuario
          </button>
        </div>

        {/* Filtros */}
        <div className="mb-6 p-4 bg-[var(--color-card-primary)] rounded-xl shadow-sm border border-[var(--color-muted)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm text-gray-800 font-medium mb-1">Buscar</label>
              <input
                type="text"
                placeholder="Nombre o email..."
                className="w-full p-2.5 rounded-lg border border-[var(--color-muted)] bg-[var(--color-card-secondary)] text-[var(--color-card-primary-text)] text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-800 font-medium mb-1">Rol</label>
              <select className="w-full p-2.5 rounded-lg border border-[var(--color-muted)] bg-[var(--color-card-secondary)] text-[var(--color-card-primary-text)] text-sm">
                <option value="">Todos los roles</option>
                <option value="student">Estudiante</option>
                <option value="instructor">Instructor</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-800 font-medium mb-1">Estado</label>
              <select className="w-full p-2.5 rounded-lg border border-[var(--color-muted)] bg-[var(--color-card-secondary)] text-[var(--color-card-primary-text)] text-sm">
                <option value="">Todos los estados</option>
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
                <option value="suspended">Suspendido</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full p-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-gray-800 rounded-lg text-sm font-medium transition-colors">
                Aplicar Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Tabla responsive */}
        <div className="bg-[var(--color-card-primary)] rounded-xl shadow-sm border border-[var(--color-muted)] overflow-hidden">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-[var(--color-muted)]">
                <thead className="bg-[var(--color-surface)]">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                      Email
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Rol
                    </th>
                    <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-[var(--color-card-primary)] divide-y divide-[var(--color-muted)]">
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-[var(--color-card-secondary)] transition-colors"
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                            {user.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-800">
                              {user.name}
                            </div>
                            <div className="text-xs text-gray-500 sm:hidden">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                        {user.email}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                              : user.role === "instructor"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                              : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          }`}
                        >
                          {user.role === "admin"
                            ? "Administrador"
                            : user.role === "instructor"
                            ? "Instructor"
                            : "Estudiante"}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEdit(user)}
                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                            title="Editar"
                          >
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            title="Eliminar"
                          >
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Paginación */}
          <div className="bg-[var(--color-surface)] px-4 py-3 flex items-center justify-between border-t border-[var(--color-muted)] sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-[var(--color-muted)] text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Anterior
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-[var(--color-muted)] text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Siguiente
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-400">
                  Mostrando <span className="font-medium">1</span> a{" "}
                  <span className="font-medium">10</span> de{" "}
                  <span className="font-medium">24</span> resultados
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-[var(--color-muted)] bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Anterior</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="z-10 bg-[var(--color-primary)] border-[var(--color-primary)] text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    1
                  </button>
                  <button className="bg-white border-[var(--color-muted)] text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    2
                  </button>
                  <button className="bg-white border-[var(--color-muted)] text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    3
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-[var(--color-muted)] bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Siguiente</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Modal responsivo */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-[var(--color-surface)] dark:bg-[var(--color-card-secondary)] rounded-xl p-6 w-full max-w-md sm:max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[var(--color-card-primary-text)]">
                  Editar Usuario
                </h2>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {/* Avatar y Nombre */}
                <div className="flex flex-col items-center mb-4">
                  <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mb-3">
                    {selectedUser.name.charAt(0)}
                  </div>
                  <div className="text-center">
                    <h3 className="font-medium text-[var(--color-card-primary-text)]">
                      {selectedUser.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedUser.email}
                    </p>
                  </div>
                </div>

                {/* Nombre */}
                <div>
                  <label className="block text-sm font-medium text-[var(--color-card-primary-text)] mb-1.5">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    value={selectedUser.name}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, name: e.target.value })
                    }
                    className="w-full p-2.5 rounded-lg border border-[var(--color-muted)] bg-[var(--color-card-primary)] text-[var(--color-card-primary-text)] text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                    placeholder="Nombre completo"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-[var(--color-card-primary-text)] mb-1.5">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    value={selectedUser.email}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, email: e.target.value })
                    }
                    className="w-full p-2.5 rounded-lg border border-[var(--color-muted)] bg-[var(--color-card-primary)] text-[var(--color-card-primary-text)] text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                    placeholder="correo@ejemplo.com"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Rol */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-card-primary-text)] mb-1.5">
                      Rol de usuario
                    </label>
                    <select
                      value={selectedUser.role}
                      onChange={(e) =>
                        setSelectedUser({ ...selectedUser, role: e.target.value })
                      }
                      className="w-full p-2.5 rounded-lg border border-[var(--color-muted)] bg-[var(--color-card-primary)] text-[var(--color-card-primary-text)] text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                    >
                      <option value="student">Estudiante</option>
                      <option value="instructor">Instructor</option>
                      <option value="admin">Administrador</option>
                    </select>
                  </div>

                  {/* Estado */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-card-primary-text)] mb-1.5">
                      Estado
                    </label>
                    <select
                      className="w-full p-2.5 rounded-lg border border-[var(--color-muted)] bg-[var(--color-card-primary)] text-[var(--color-card-primary-text)] text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                    >
                      <option value="active">Activo</option>
                      <option value="inactive">Inactivo</option>
                      <option value="suspended">Suspendido</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Botones */}
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8 pt-4 border-t border-[var(--color-muted)]">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="px-4 py-2.5 rounded-lg border border-[var(--color-muted)] bg-transparent text-[var(--color-card-primary-text)] hover:bg-[var(--color-muted)] transition-colors text-sm font-medium w-full sm:w-auto"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2.5 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white transition-colors text-sm font-medium w-full sm:w-auto"
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}