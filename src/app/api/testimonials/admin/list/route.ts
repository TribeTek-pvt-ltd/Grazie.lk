import { NextResponse } from "next/server";
import { requireAdmin } from "@/src/lib/supabaseAuth";
import { supabaseServer } from "@/src/lib/supabaseServer";

export async function GET() {
    try {
        await requireAdmin();

        const { data, error } = await supabaseServer
            .from("testimonials")
            .select("*");

        if (error) {
            console.error("Testimonial list error:", error);
            throw error;
        }

        return NextResponse.json({ data });
    } catch (error: any) {
        console.error("Testimonial list route failure:", error);
        return NextResponse.json(
            { error: error.message || "Failed to list testimonials" },
            { status: error.message?.includes("Unauthorized") ? 401 : 500 }
        );
    }
}
