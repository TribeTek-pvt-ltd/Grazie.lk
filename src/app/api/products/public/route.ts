// Public API route for fetching products (no auth required)
import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/src/lib/supabaseServer";

export async function GET(req: NextRequest) {
    try {
        const { data, error } = await supabaseServer
            .from("products")
            .select(`
        id,
        name,
        description,
        price,
        stock,
        category,
        Category (id, Category),
        material,
        delivey_days,
        images (
          id,
          image_url
        )
      `)
            .gt("stock", 0) // Only show products in stock
            .order("id", { ascending: false });

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ products: data });
    } catch (err) {
        console.error("Fetch public products error:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
