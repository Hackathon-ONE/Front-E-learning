"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/context/AuthContext";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function AuthForm({ isRegister }) {
  const [showRegister, setShowRegister] = useState(isRegister);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { login, register } = useAuth();
  const { data: session } = useSession();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (showRegister && !formData.name.trim()) newErrors.name = "Nombre es requerido";
    if (!formData.email.trim()) newErrors.email = "Email es requerido";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email no es válido";
    if (!formData.password.trim()) newErrors.password = "Contraseña es requerida";
    else if (formData.password.length < 6) newErrors.password = "Debe tener al menos 6 caracteres";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Si hay sesión, mostrar avatar + logout
  if (session?.user) {
    return (
      <div className="text-center">
        {session.user.image && (
          <img
            src={session.user.image}
            alt="avatar"
            className="w-8 h-8 rounded-full mx-auto"
          />
        )}
        <p>{session.user.name}</p>
        <button
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
          className="mt-2 text-sm text-red-500"
        >
          Logout
        </button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (showRegister) {
      register(formData);
    } else {
      login(formData);
    }
  };

  // ✅ Si NO hay sesión, mostrar el form
  return (
    <div className="flex items-center justify-center" style={{ backgroundColor: "var(--color-bg)" }}>
      <div
        className="w-full rounded-xl p-4"
        style={{
          backgroundColor: "var(--color-card-primary)",
          color: "var(--color-card-primary-text)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
        }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          {showRegister ? "Registro" : "Login"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {showRegister && (
            <div>
              <label className="block mb-1 text-gray-900 dark:text-gray-100">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-400 dark:border-gray-700"
              />
              {errors.name && <p className="text-sm mt-1" style={{ color: "red" }}>{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="block mb-1 text-gray-900 dark:text-gray-100">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-400 dark:border-gray-700"
            />
            {errors.email && <p className="text-sm mt-1" style={{ color: "red" }}>{errors.email}</p>}
          </div>

          <div>
            <label className="block mb-1 text-gray-900 dark:text-gray-100">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-400 dark:border-gray-700"
            />
            {errors.password && <p className="text-sm mt-1" style={{ color: "red" }}>{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-primary-text)"
            }}
          >
            {showRegister ? "Registrarse" : "Iniciar sesión"}
          </button>
        </form>

        <div className="my-4 flex items-center justify-center gap-2 text-gray-900 dark:text-gray-100">
          <span>o</span>
        </div>

        <button onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border font-semibold"
          style={{
            borderColor: "var(--color-secondary)",
            backgroundColor: "var(--color-surface)",
            color: "var(--color-text)"
          }}
        >
          <FcGoogle className="w-5 h-5 text-primary hover:text-primary/80 transition cursor-pointer" />
          {showRegister ? "Registrarse con Google" : "Iniciar sesión con Google"}
          </button>

        <p className="text-center mt-4">
          {showRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
          <button
            onClick={() => setShowRegister(!showRegister)}
            className="font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            {showRegister ? "Inicia sesión" : "Regístrate"}
          </button>
        </p>
      </div>
    </div>
  );
}