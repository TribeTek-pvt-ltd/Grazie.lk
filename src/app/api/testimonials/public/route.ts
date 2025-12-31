import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/src/lib/supabaseAuth";

export async function GET() {
    try {
        const supabase = await createSupabaseServerClient();

        const { data, error } = await supabase
            .from("testimonials")
            .select("*")
            .eq("isActive", true);

        if (error) throw error;

        return NextResponse.json({ data });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
