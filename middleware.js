import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { normalizeRole, canAccessRoute, ROLES } from "./src/utils/roleUtils";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = req.nextUrl.clone();

  // Obtener rol del token (normalizar a mayúsculas)
  const role = token ? normalizeRole(token.role) : ROLES.GUEST;

  // Verificar acceso a la ruta
  if (!canAccessRoute(role, url.pathname)) {
    // Si no está autenticado y trata de acceder a una ruta que requiere autenticación
    if (!token && (url.pathname.includes("/lessons") || url.pathname.includes("/resources") || url.pathname.includes("/quizzes") || url.pathname.startsWith("/dashboard") || url.pathname.startsWith("/admin") || url.pathname.startsWith("/instructor") || url.pathname.startsWith("/students"))) {
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }
    
    // Si está autenticado pero no tiene permisos
    url.pathname = "/403";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/instructor/:path*",
    "/students/:path*",
    "/courses/:path*/lessons/:path*",
    "/courses/:path*/resources/:path*",
    "/courses/:path*/quizzes/:path*",
  ],
};