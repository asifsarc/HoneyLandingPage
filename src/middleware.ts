import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "sundarban-naturals-super-secret-jwt-key-2026"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes
  if (pathname.startsWith("/admin")) {
    const isLoginPage = pathname === "/admin/login";
    const isAdminRoot = pathname === "/admin" || pathname === "/admin/";
    const sessionToken = request.cookies.get("sn_admin_session")?.value;

    let isAuthenticated = false;

    if (sessionToken) {
      try {
        const { payload } = await jwtVerify(sessionToken, JWT_SECRET);
        if (payload && payload.userId) {
          isAuthenticated = true;
        }
      } catch {
        isAuthenticated = false;
      }
    }

    // If user is accessing /admin directly while authenticated -> redirect to /admin/dashboard
    if (isAdminRoot && isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    // If user is accessing /admin/login while already authenticated -> redirect to /admin/dashboard
    if (isLoginPage && isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    // If user is accessing protected admin pages while NOT authenticated -> redirect to /admin/login
    if (!isLoginPage && !isAuthenticated) {
      const loginUrl = new URL("/admin/login", request.url);
      const targetDestination = isAdminRoot ? "/admin/dashboard" : pathname;
      loginUrl.searchParams.set("from", targetDestination);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
