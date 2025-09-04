import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = req.nextUrl.clone();

  // Si no hay sesión -> redirigir a login
  if (!token) {
    if (url.pathname.startsWith("/dashboard") || url.pathname.startsWith("/admin")) {
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Obtener rol del token
  const role = token.role || "student"; // fallback a student

  // Restringir rutas por rol
  if (url.pathname.startsWith("/admin") && role !== "admin") {
    url.pathname = "/403"; // tu página de acceso denegado
    return NextResponse.redirect(url);
  }

  if (url.pathname.startsWith("/instructor") && role !== "instructor" && role !== "admin") {
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
  ],
};