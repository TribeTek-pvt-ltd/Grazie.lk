import { NextResponse } from "next/server";
import { supabaseServer } from "@/src/lib/supabaseServer";

export async function GET() {
    try {
        const { data, error } = await supabaseServer
            .from("testimonials")
            .select("*")
            .eq("isActive", true);

        if (error) {
            console.error("Public testimonial fetch error:", error);
            throw error;
        }

        return NextResponse.json({ data });
    } catch (error: any) {
        console.error("Public testimonial route failure:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
