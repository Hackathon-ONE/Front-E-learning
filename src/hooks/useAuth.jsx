"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Creamos un AuthContext global
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

// Lógica interna del auth
function useProvideAuth() {
  const [user, setUser] = useState(null); // { id, name, role }
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Simular carga inicial de sesión (fetch a /api/auth/session)
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/session");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user || null);
        }
      } catch (err) {
        console.error("Error cargando sesión", err);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  // Login
  const login = async (email, password) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Credenciales inválidas");
    const data = await res.json();
    setUser(data.user);
    return data.user;
  };

  // Register
  const register = async (formData) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) throw new Error("Error al registrarse");
    const data = await res.json();
    setUser(data.user);
    return data.user;
  };

  // Logout
  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/login");
  };

  return {
    user,
    role: user?.role || "guest",
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    register,
  };
}