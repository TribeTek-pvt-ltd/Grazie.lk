import { NextResponse } from "next/server";
import { requireAdmin } from "@/src/lib/supabaseAuth";
import { supabaseServer } from "@/src/lib/supabaseServer";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdmin();
        const { id } = await params;

        const { error } = await supabaseServer
            .from("testimonials")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Testimonial delete error:", error);
            throw error;
        }

        return NextResponse.json({ message: "Testimonial deleted successfully" });
    } catch (error: any) {
        console.error("Testimonial delete route failure:", error);
        return NextResponse.json(
            { error: error.message || "Failed to delete testimonial" },
            { status: error.message?.includes("Unauthorized") ? 401 : 500 }
        );
    }
}
