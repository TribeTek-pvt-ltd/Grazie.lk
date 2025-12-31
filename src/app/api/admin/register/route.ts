// src/app/api/admin/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from '@supabase/ssr';
import { supabaseServer } from "@/src/lib/supabaseServer";

export async function POST(req: NextRequest) {
    try {
        const { email, password, name } = await req.json();

        // Validation
        if (!email || !password || !name) {
            return NextResponse.json(
                { error: "Email, password, and name are required" },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: "Password must be at least 6 characters" },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Create user with Supabase Auth using service role
        const { data, error } = await supabaseServer.auth.admin.createUser({
            email,
            password,
            email_confirm: true, // Auto-confirm email
            user_metadata: {
                role: 'admin',
                name: name,
            },
        });

        if (error) {
            console.error("Supabase registration error:", error);

            // Handle specific errors
            if (error.message.includes("already registered")) {
                return NextResponse.json(
                    { error: "Email already registered" },
                    { status: 409 }
                );
            }

            return NextResponse.json(
                { error: error.message || "Registration failed" },
                { status: 400 }
            );
        }

        if (!data.user) {
            return NextResponse.json(
                { error: "Failed to create user" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Admin user created successfully",
            user: {
                id: data.user.id,
                email: data.user.email,
                name: data.user.user_metadata?.name,
            },
        });
    } catch (error) {
        console.error("Admin registration error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
