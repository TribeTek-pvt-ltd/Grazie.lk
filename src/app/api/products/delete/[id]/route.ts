import { supabaseServer } from "@/src/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const productId = id;

  // First, delete associated images to avoid foreign key constraint violations
  const { error: imagesError } = await supabaseServer
    .from("images")
    .delete()
    .eq("product_id", productId);

  if (imagesError) {
    console.error("Error deleting product images:", imagesError);
    return NextResponse.json({ error: imagesError.message }, { status: 400 });
  }

  // Then, delete the product
  const { error } = await supabaseServer
    .from("products")
    .delete()
    .eq("id", productId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
