import { supabaseServer } from "@/src/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const { name, description, price } = body;

  const { error } = await supabaseServer
    .from("products")
    .update({ name, description, price })
    .eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
