// src/app/api/admin/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from '@supabase/ssr';

export async function POST(req: NextRequest) {
    try {
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
                        // Not needed for logout
                    },
                },
            }
        );

        // Sign out from Supabase
        await supabase.auth.signOut();

        // Create response and clear cookies
        const response = NextResponse.json({ success: true });

        response.cookies.delete('sb-access-token');
        response.cookies.delete('sb-refresh-token');

        return response;
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
