import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Agregar headers de Cloudinary si es necesario
  const response = NextResponse.next();
  
  // Permitir imágenes de Cloudinary
  response.headers.set(
    'Content-Security-Policy',
    `img-src 'self' data: https://res.cloudinary.com ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}`
  );
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
