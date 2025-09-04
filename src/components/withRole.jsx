"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function withRole(Component, allowedRoles = []) {
  return function ProtectedPage(props) {
    const { user, role, loading, isAuthenticated } = useAuth();
    const router = useRouter();

    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
      );
    }

    if (!isAuthenticated) {
      router.push("/(auth)/login");
      return null;
    }

    if (!allowedRoles.includes(role)) {
      router.push("/");
      return null;
    }

    return <Component {...props} />;
  };
}