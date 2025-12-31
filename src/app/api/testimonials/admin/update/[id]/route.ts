import { NextResponse } from "next/server";
import { createSupabaseServerClient, requireAdmin } from "@/src/lib/supabaseAuth";

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await requireAdmin();
        const supabase = await createSupabaseServerClient();
        const body = await request.json();
        const { id } = params;

        const { data, error } = await supabase
            .from("testimonials")
            .update({
                name: body.name,
                content: body.content,
                rating: body.rating,
                isActive: body.isActive,
            })
            .eq("id", id)
            .select();

        if (error) throw error;

        return NextResponse.json({ data: data[0] });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: error.message.includes("Unauthorized") ? 401 : 500 });
    }
}
