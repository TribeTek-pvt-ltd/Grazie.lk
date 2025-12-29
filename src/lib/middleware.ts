// src/lib/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// Admin UI pages only
const ADMIN_PAGES = ["/admin"];

export function adminAuthMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public & system paths
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/login")
  ) {
    return NextResponse.next();
  }

  // Skip API routes
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Protect admin pages only
  if (!ADMIN_PAGES.some((page) => pathname.startsWith(page))) {
    return NextResponse.next();
  }

  // Validate admin JWT
  const token = req.cookies.get("adminToken")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Apply middleware only to admin pages
export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
