import { NextResponse } from "next/server";
import { createSupabaseServerClient, requireAdmin } from "@/src/lib/supabaseAuth";

export async function GET() {
    try {
        await requireAdmin();
        const supabase = await createSupabaseServerClient();

        const { data, error } = await supabase
            .from("testimonials")
            .select("*");

        if (error) throw error;

        return NextResponse.json({ data });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: error.message.includes("Unauthorized") ? 401 : 500 });
    }
}
