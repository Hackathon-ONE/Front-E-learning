import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { mockUsers } from "@/data/mockUsers";

// Función helper para mapear roles según el email o datos del backend
function mapUserRole(email, backendRole) {
  // Primero tomamos el rol que venga del backend si existe
  if (backendRole) return backendRole;

  // Buscar en mockUsers
  const user = mockUsers.find(u => u.email === email);
  if (user) return user.role.toUpperCase();

  // Rol por defecto según email
  if (email === "admin@gmail.com") return "ADMIN";
  if (email === "instructor@gmail.com") return "INSTRUCTOR";
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

        // Buscar usuario en mockUsers
        const user = mockUsers.find(
          u => u.email === credentials.email && u.password === credentials.password
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
      if (session.user) {
        session.user.id = token.sub;
        session.user.image = token.picture;
        session.user.role = token.role || "STUDENT";
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