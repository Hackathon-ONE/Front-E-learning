import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Función helper para mapear roles según el email o datos del backend
function mapUserRole(email, backendRole) {
  // Primero tomamos el rol que venga del backend si existe
  if (backendRole) return backendRole;

  // Rol por defecto según email
  if (email === "admin@gmail.com") return "ADMIN";
  if (email === "instructor@gmail.com") return "INSTRUCTOR";
  return "STUDENT";
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/login", // Página personalizada de login
  },
  callbacks: {
    // Validación de inicio de sesión
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        // Solo correos verificados
        return profile.email_verified;
      }
      return true;
    },

    // Guardar rol en token JWT
    async jwt({ token, user }) {
      if (user) {
        // Si tienes un endpoint de backend para obtener el rol, aquí podrías llamarlo
        // Por ejemplo: const backendRole = await fetchRoleFromBackend(user.email)
        const backendRole = null; // placeholder por ahora

        token.role = mapUserRole(user.email, backendRole);
      }
      return token;
    },

    // Pasar rol del token a la sesión
    async session({ session, token }) {
      session.user.role = token.role || "STUDENT";
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Mantener rol en JWT
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };