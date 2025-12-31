import { NextResponse } from "next/server";
import { createSupabaseServerClient, requireAdmin } from "@/src/lib/supabaseAuth";

export async function POST(request: Request) {
    try {
        await requireAdmin();
        const supabase = await createSupabaseServerClient();
        const body = await request.json();

        const { data, error } = await supabase
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

        if (error) throw error;

        return NextResponse.json({ data: data[0] });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: error.message.includes("Unauthorized") ? 401 : 500 });
    }
}
