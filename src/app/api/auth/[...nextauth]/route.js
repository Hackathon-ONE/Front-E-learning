import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { mockUsers } from "@/data/mockUsers";

// Función helper para mapear roles según el email o datos del backend
function mapUserRole(email, backendRole) {
  // Primero tomamos el rol que venga del backend si existe
  if (backendRole) return backendRole;

  // Buscar en mockUsers (case-insensitive)
  const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (user) return user.role.toUpperCase();

  // Para usuarios de Google, asignar rol de estudiante por defecto
  // Los usuarios de Google necesitarán pagar suscripción para acceder
  return "STUDENT";
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Buscar usuario en mockUsers (case-insensitive para email)
        const user = mockUsers.find(
          u => u.email.toLowerCase() === credentials.email.toLowerCase() && u.password === credentials.password
        );

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role.toUpperCase()
          };
        }

        return null;
      }
    }),
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
      if (account?.provider === "google") {
        if (profile?.email_verified) return true;
        console.error("Google profile inválido:", profile);
        return false;
      }
      return true;
    },

    // Guardar rol en token JWT
    async jwt({ token, user, account }) {
      if (user) {
        // Si tienes un endpoint de backend para obtener el rol, aquí podrías llamarlo
        // Por ejemplo: const backendRole = await fetchRoleFromBackend(user.email)
        const backendRole = null; // placeholder por ahora

        // Para usuarios de Google, generar un ID único si no existe
        if (account?.provider === "google" && !user.id) {
          user.id = `google_${user.email?.split('@')[0]}_${Date.now()}`;
        }

        token.role = mapUserRole(user.email, backendRole);
        token.userId = user.id; // Guardar el ID del usuario
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }
      return token;
    },

    // Pasar rol del token a la sesión
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId || token.sub; // Usar userId del token o sub como fallback
        session.user.image = token.image || token.picture || '/default-avatar.png';
        session.user.role = token.role || "STUDENT";
        session.user.email = token.email || session.user.email;
        session.user.name = token.name || session.user.name;
      }
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