"use client";

import { createContext, useContext, useMemo } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const { data: session, status } = useSession();

  const value = useMemo(() => ({
    user: session?.user || null,
    role: session?.user?.role || "guest",
    isAuthenticated: status === "authenticated",
    loading: status === "loading",
    signIn,
    signOut,
  }), [session, status]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);