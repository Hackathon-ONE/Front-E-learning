"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

export default function withRole(Component, allowedRoles = []) {
  return function ProtectedPage(props) {
    const { user, role, loading, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (loading) return; // Esperar a que cargue la sesión

      if (!isAuthenticated) {
        router.push("/auth/login");
        return;
      }

      if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        router.push("/403");
        return;
      }
    }, [isAuthenticated, role, loading, router, allowedRoles]);

    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
      );
    }

    if (!isAuthenticated) {
      return null; // Se redirige en useEffect
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
      return null; // Se redirige en useEffect
    }

    return <Component {...props} />;
  };
}