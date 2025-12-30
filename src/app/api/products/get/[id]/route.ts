import { supabaseServer } from "@/src/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const productId = id;

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
    .eq("id", productId)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(data);
}
