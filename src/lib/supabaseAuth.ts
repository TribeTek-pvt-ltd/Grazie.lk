// src/lib/supabaseAuth.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { AuthUser } from '@/src/types/supabase';

/**
 * Create a Supabase client for Server Components
 * Handles cookie-based session management
 */
export async function createSupabaseServerClient() {
    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    );
}

/**
 * Get the current session from Supabase Auth
 * Returns null if no valid session exists
 */
export async function getSession() {
    const supabase = await createSupabaseServerClient();
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
        console.error('Error getting session:', error);
        return null;
    }

    return session;
}

/**
 * Get the current authenticated user
 * Returns null if not authenticated
 */
export async function getUser(): Promise<AuthUser | null> {
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        return null;
    }

    return user as AuthUser;
}

/**
 * Check if the current user is an admin
 */
export async function isAdmin(): Promise<boolean> {
    const user = await getUser();
    return user?.user_metadata?.role === 'admin';
}

/**
 * Get admin user or throw error
 * Use this in protected routes that require admin access
 */
export async function requireAdmin(): Promise<AuthUser> {
    const user = await getUser();

    if (!user) {
        throw new Error('Unauthorized: No user session');
    }

    if (user.user_metadata?.role !== 'admin') {
        throw new Error('Unauthorized: Admin access required');
    }

    return user;
}
