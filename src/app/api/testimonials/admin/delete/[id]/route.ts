import { NextResponse } from "next/server";
import { createSupabaseServerClient, requireAdmin } from "@/src/lib/supabaseAuth";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await requireAdmin();
        const supabase = await createSupabaseServerClient();
        const { id } = params;

        const { error } = await supabase
            .from("testimonials")
            .delete()
            .eq("id", id);

        if (error) throw error;

        return NextResponse.json({ message: "Testimonial deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: error.message.includes("Unauthorized") ? 401 : 500 });
    }
}
