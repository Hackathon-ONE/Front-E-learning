"use client";

import { createContext, useContext, useMemo } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const { data: session } = useSession();

  const value = useMemo(() => ({
    session,
    signIn,
    signOut,
  }), [session]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);