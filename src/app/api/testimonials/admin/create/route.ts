import { NextResponse } from "next/server";
import { requireAdmin } from "@/src/lib/supabaseAuth";
import { supabaseServer } from "@/src/lib/supabaseServer";

export async function POST(request: Request) {
    try {
        // 1. Verify admin role (uses cookie session)
        await requireAdmin();

        // 2. Parse request body
        const body = await request.json();

        // 3. Create testimonial using service role client (bypasses RLS)
        const { data, error } = await supabaseServer
            .from("testimonials")
            .insert([
                {
                    name: body.name,
                    content: body.content,
                    rating: body.rating,
                    isActive: body.isActive ?? true,
                },
            ])
            .select();

        if (error) {
            console.error("Testimonial creation error:", error);
            throw error;
        }

        return NextResponse.json({ data: data[0] });
    } catch (error: any) {
        console.error("Testimonial create route failure:", error);
        return NextResponse.json(
            { error: error.message || "Failed to create testimonial" },
            { status: error.message?.includes("Unauthorized") ? 401 : 500 }
        );
    }
}
