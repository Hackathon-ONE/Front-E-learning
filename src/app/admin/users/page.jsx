"use client";

import { useState, useEffect } from "react";
import { Card } from "../../../components/ui/card";
import Button from "../../../components/ui/button";
import { User, Mail, Shield, Edit, Trash } from "lucide-react";

export default function UsersPage() {
  // Estado local con datos HARDCODEADOS
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan@example.com",
      role: "Administrador",
    },
    {
      id: 2,
      name: "María Gómez",
      email: "maria@example.com",
      role: "Editor",
    },
    {
      id: 3,
      name: "Carlos Ruiz",
      email: "carlos@example.com",
      role: "Usuario",
    },
  ]);

  // 🚀 Aquí luego podrás traer los datos desde tu backend o DB
  /*
  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("Error al cargar usuarios", err));
  }, []);
  */

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-2">Gestión de Usuarios</h1>
      <p className="text-gray-400 mb-6">
        Administra los usuarios registrados en la plataforma.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <Card
            key={user.id}
            className="p-4 flex flex-col justify-between rounded-2xl shadow-md bg-[var(--card-bg)] border border-[var(--border-color)]"
          >
            <div className="flex items-center gap-3 mb-3">
              <User className="w-10 h-10 text-[var(--primary-color)]" />
              <div>
                <h2 className="font-semibold text-lg">{user.name}</h2>
                <p className="text-sm text-gray-400 flex items-center gap-1">
                  <Mail size={14} /> {user.email}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Shield size={14} /> {user.role}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                // onClick={() => handleEdit(user.id)}
              >
                <Edit size={16} /> Editar
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="flex items-center gap-1"
                // onClick={() => handleDelete(user.id)}
              >
                <Trash size={16} /> Eliminar
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}