/**
 * Middleware de debugging para detectar llamadas con undefined
 */

export function middleware(request) {
  const { pathname, searchParams } = request.nextUrl;
  
  // Detectar si la URL contiene 'undefined'
  if (pathname.includes('undefined') || searchParams.toString().includes('undefined')) {
    console.error('🚨 Middleware detectó llamada con undefined:', {
      pathname,
      searchParams: searchParams.toString(),
      url: request.url,
      method: request.method
    });
  }
  
  return;
}

export const config = {
  matcher: '/api/:path*'
};
