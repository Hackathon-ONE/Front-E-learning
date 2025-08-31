"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/context/AuthContext";
import { signIn } from "next-auth/react";
import Link from "next/link";
import AuthLayout from "./AuthLayout";

export default function RegisterForm() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Nombre es requerido";
    if (!formData.email.trim()) newErrors.email = "Email es requerido";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email no es válido";
    if (!formData.password.trim()) newErrors.password = "Contraseña es requerida";
    else if (formData.password.length < 6) newErrors.password = "Debe tener al menos 6 caracteres";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        role: "student", // 👈 por defecto asignamos estudiante
      }),
    });

    if (res.ok) {
      router.push("/auth/login");
    } else {
      alert("Error al registrarse");
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Nombre</label>
          <input
            type="text"
            name="name"
            className="w-full p-3 rounded-lg border border-gray-400 dark:border-gray-700"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-3 rounded-lg border border-gray-400 dark:border-gray-700"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block mb-1">Contraseña</label>
          <input
            type="password"
            name="password"
            className="w-full p-3 rounded-lg border border-gray-400 dark:border-gray-700"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg font-semibold"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--color-primary-text)"
          }}
        >
          Registrarme
        </button>
      </form>

      <div className="my-4 flex items-center justify-center gap-2">
        <span>o</span>
      </div>

      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border font-semibold"
        style={{
          borderColor: "var(--color-secondary)",
          backgroundColor: "var(--color-terciary)",
          color: "var(--color-text-primary)"
        }}
      >
        <FcGoogle className="w-5 h-5" />
        Registrarse con Google
      </button>

      {/* 🔻 Pregunta de cambio */}
      <p className="text-center mt-4 text-sm">
        ¿Ya tienes cuenta?{" "}
        <Link href="/auth/login" className="font-semibold" style={{ color: "var(--color-primary)" }}>
          Inicia sesión
        </Link>
      </p>
    </AuthLayout>
  );
}