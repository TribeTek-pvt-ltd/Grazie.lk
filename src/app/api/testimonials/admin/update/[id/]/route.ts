import { NextResponse } from "next/server";
import { requireAdmin } from "@/src/lib/supabaseAuth";
import { supabaseServer } from "@/src/lib/supabaseServer";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdmin();
        const body = await request.json();
        const { id } = await params;

        const { data, error } = await supabaseServer
            .from("testimonials")
            .update({
                name: body.name,
                content: body.content,
                rating: body.rating,
                isActive: body.isActive,
            })
            .eq("id", id)
            .select();

        if (error) {
            console.error("Testimonial update error:", error);
            throw error;
        }

        return NextResponse.json({ data: data[0] });
    } catch (error: any) {
        console.error("Testimonial update route failure:", error);
        return NextResponse.json(
            { error: error.message || "Failed to update testimonial" },
            { status: error.message?.includes("Unauthorized") ? 401 : 500 }
        );
    }
}
