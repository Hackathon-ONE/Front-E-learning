"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/context/AuthContext";
import { signIn } from "next-auth/react";
import Link from "next/link";
import AuthLayout from "./AuthLayout";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { login } = useAuth();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email es requerido";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email no es válido";
    if (!formData.password.trim()) newErrors.password = "Contraseña es requerida";
    else if (formData.password.length < 6) newErrors.password = "Debe tener al menos 6 caracteres";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    login(formData);
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
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
          Entrar
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
          backgroundColor: "var(--color-surface)",
          color: "var(--color-text)"
        }}
      >
        <FcGoogle className="w-5 h-5" />
        Iniciar sesión con Google
      </button>

      {/* 🔻 Links extra */}
      <div className="text-center mt-4 text-sm flex flex-col gap-2">
        <p>
          ¿No tienes cuenta?{" "}
          <Link href="/auth/register" className="font-semibold" style={{ color: "var(--color-primary)" }}>
            Regístrate
          </Link>
        </p>
        <p>
          <Link href="/auth/forgot-password" className="font-semibold" style={{ color: "var(--color-primary)" }}>
            ¿Olvidaste tu contraseña?
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}