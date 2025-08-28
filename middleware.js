import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token"); // suponiendo que se guarda el token en cookies
  const url = req.nextUrl.clone();

  if (!token) {
    // si no hay token -> redirigir a login
    if (url.pathname.startsWith("/dashboard") || url.pathname.startsWith("/admin")) {
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Decodificar rol (ejemplo simplificado)
  const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  const role = payload.role;

  // Restringir rutas por rol
  if (url.pathname.startsWith("/admin") && role !== "admin") {
    url.pathname = "/403"; // página de acceso denegado
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"], // rutas protegidas
};