// src/lib/apiAdminAuth.ts
import { NextRequest } from "next/server";
import { createServerClient } from '@supabase/ssr';
import { AuthUser } from '@/src/types/supabase';

/**
 * Verify admin authentication for API routes
 * Returns the authenticated admin user or null
 */
export async function verifyAdminApi(req: NextRequest): Promise<AuthUser | null> {
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
          // Not needed for API routes - cookies are read-only
        },
      },
    }
  );

  try {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    // Check if user has admin role
    const authUser = user as AuthUser;
    if (authUser.user_metadata?.role !== 'admin') {
      return null;
    }

    return authUser;
  } catch (error) {
    console.error('Admin verification error:', error);
    return null;
  }
}

