// src/lib/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from '@supabase/ssr';

// Admin UI pages only
const ADMIN_PAGES = ["/admin"];

export async function adminAuthMiddleware(req: NextRequest) {
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

  // Create Supabase client for middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll().map(cookie => ({
            name: cookie.name,
            value: cookie.value,
          }));
        },
        setAll(cookiesToSet) {
          // Not needed for middleware
        },
      },
    }
  );

  try {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (!session || error) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Verify admin role
    if (session.user.user_metadata?.role !== 'admin') {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Middleware auth error:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Apply middleware only to admin pages
export const config = {
  matcher: ["/admin/:path*", "/admin"],
};

