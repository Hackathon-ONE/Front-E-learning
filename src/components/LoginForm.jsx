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
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    // 👇 Usamos NextAuth credentials
    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (res?.error) {
      setErrors({ general: "Credenciales inválidas" });
      return;
    }

    // 👇 Obtenemos el session para saber el rol
    const sessionRes = await fetch("/auth/session");
    const session = await sessionRes.json();
    const role = session?.user?.role || "student";

    if (role === "instructor") router.push("/instructor/dashboard");
    else if (role === "admin") router.push("/admin/dashboard");
    else router.push("/students");
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.general && (
          <p className="text-sm text-red-500">{errors.general}</p>
        )}

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-3 rounded-lg border border-gray-400 dark:border-gray-700"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email}</p>
          )}
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
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg font-semibold disabled:opacity-50"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--color-primary-text)",
          }}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <div className="my-4 flex items-center justify-center gap-2">
        <span>o</span>
      </div>

      <button
        onClick={() => signIn("google", { callbackUrl: "/students" })}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border font-semibold hover:bg-primary hover:text-primary-text"
        style={{
          borderColor: "var(--color-secondary)",
          backgroundColor: "var(--color-terciary)",
          color: "var(--color-text-primary)",
        }}
      >
        <FcGoogle className="w-5 h-5" />
        Iniciar sesión con Google
      </button>

      {/* 🔻 Links extra */}
      <div className="text-center mt-4 text-sm flex flex-col gap-2">
        <p>
          ¿No tienes cuenta?{" "}
          <Link
            href="/auth/register"
            className="font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            Regístrate
          </Link>
        </p>
        <p>
          <Link
            href="/auth/forgot-password"
            className="font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}