"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/context/AuthContext";
import { signIn } from "next-auth/react";
import Link from "next/link";
import AuthLayout from "./AuthLayout";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email es requerido";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email no es válido";
    if (!formData.password.trim()) newErrors.password = "Contraseña es requerida";
    else if (formData.password.length < 6)
      newErrors.password = "Debe tener al menos 6 caracteres";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const redirectByRole = async () => {
    const sessionRes = await fetch("/api/auth/session");
    const session = await sessionRes.json();
    const role = session?.user?.role;

    if (role === "ADMIN") router.push("/admin/dashboard");
    else if (role === "INSTRUCTOR") router.push("/instructor/dashboard");
    else router.push("/students");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

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

    // Redirige según rol después del login con credentials
    redirectByRole();
  };

  const handleGoogleLogin = async () => {
    setLoading(true);

    const res = await signIn("google", { callbackUrl: "/students", redirect: true });
    setLoading(false);

    if (res?.error) {
      setErrors({ general: "Error al iniciar sesión con Google" });
      return;
    }

    // Redirige según rol después del login con Google
    redirectByRole();
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.general && <p className="text-sm text-red-500">{errors.general}</p>}

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
        onClick={handleGoogleLogin}
        disabled={loading}
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