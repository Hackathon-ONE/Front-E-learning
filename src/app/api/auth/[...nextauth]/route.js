import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { mockUsers } from '@/data/mockUsers';
import { query } from '@/lib/database';

// Función helper para mapear roles según el email o datos del backend
function mapUserRole(email, backendRole) {
  // Primero tomamos el rol que venga del backend si existe
  if (backendRole) return backendRole;

  // Buscar en mockUsers (case-insensitive)
  const user = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (user) return user.role.toUpperCase();

  // Para usuarios de Google, asignar rol de estudiante por defecto
  // Los usuarios de Google necesitarán pagar suscripción para acceder
  return 'STUDENT';
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('❌ Credenciales faltantes');
          return null;
        }

        try {
          console.log('🔍 Buscando usuario en base de datos:', credentials.email);

          // Buscar usuario en base de datos PostgreSQL
          const dbResult = await query(
            'SELECT id, full_name, email, password_hash, role, profile_photo, active FROM users WHERE email = $1 AND active = true',
            [credentials.email.toLowerCase()]
          );

          console.log('🔍 Resultado de consulta DB:', {
            rows: dbResult.rows.length,
            email: credentials.email,
            queryEmail: credentials.email.toLowerCase(),
          });

          if (dbResult.rows.length > 0) {
            const user = dbResult.rows[0];
            console.log('✅ Usuario encontrado en base de datos:', user.email);

            // Verificar contraseña (sin hashing por ahora - en producción usar bcrypt)
            if (user.password_hash === credentials.password) {
              console.log('✅ Contraseña válida para:', user.email);
              return {
                id: user.id.toString(),
                email: user.email,
                name: user.full_name,
                image: user.profile_photo || '/default-avatar.png',
                role: user.role.toUpperCase(),
              };
            } else {
              console.log('❌ Contraseña incorrecta para:', user.email);
              return null;
            }
          }

          // Fallback a mockUsers si no se encuentra en la base de datos
          console.log('⚠️ Usuario no encontrado en DB, buscando en mock data...');
          const mockUser = mockUsers.find(
            (u) =>
              u.email.toLowerCase() === credentials.email.toLowerCase() &&
              u.password === credentials.password
          );

          if (mockUser) {
            console.log('✅ Usuario encontrado en mock data:', mockUser.email);
            return {
              id: mockUser.id,
              email: mockUser.email,
              name: mockUser.name,
              image: mockUser.image,
              role: mockUser.role.toUpperCase(),
            };
          }

          console.log('❌ Usuario no encontrado en DB ni mock data');
          return null;
        } catch (error) {
          console.error('❌ Error en authorize:', error);

          // Fallback a mockUsers en caso de error de base de datos
          console.log('⚠️ Error de DB, usando fallback a mock data...');
          const mockUser = mockUsers.find(
            (u) =>
              u.email.toLowerCase() === credentials.email.toLowerCase() &&
              u.password === credentials.password
          );

          if (mockUser) {
            console.log('✅ Usuario encontrado en fallback mock data:', mockUser.email);
            return {
              id: `mock_${Date.now()}`, // Generar ID temporal para mock
              email: mockUser.email,
              name: mockUser.name,
              image: mockUser.image,
              role: mockUser.role.toUpperCase(),
            };
          }

          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth/login', // Página personalizada de login
  },
  callbacks: {
    // Validación de inicio de sesión
    async signIn({ account, profile, user }) {
      console.log('🔍 Callback signIn llamado:', { account, profile, user });

      if (account?.provider === 'google') {
        if (profile?.email_verified) {
          console.log('✅ Google profile válido');
          return true;
        }
        console.error('❌ Google profile inválido:', profile);
        return false;
      }

      if (account?.provider === 'credentials') {
        console.log('✅ Credentials provider - permitiendo login');
        return true;
      }

      console.log('⚠️ Provider no reconocido:', account?.provider);
      return true;
    },

    // Guardar rol en token JWT
    async jwt({ token, user, account }) {
      if (user) {
        // Si tienes un endpoint de backend para obtener el rol, aquí podrías llamarlo
        // Por ejemplo: const backendRole = await fetchRoleFromBackend(user.email)
        const backendRole = null; // placeholder por ahora

        // Para usuarios de Google, generar un ID único si no existe
        if (account?.provider === 'google' && !user.id) {
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
        session.user.role = token.role || 'STUDENT';
        session.user.email = token.email || session.user.email;
        session.user.name = token.name || session.user.name;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt', // Mantener rol en JWT
  },
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
