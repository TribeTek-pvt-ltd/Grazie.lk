import { NextRequest, NextResponse } from "next/server";
import { adminAuthMiddleware } from "@/src/lib/middleware";
import { supabaseServer } from "@/src/lib/supabaseServer";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const authResult = adminAuthMiddleware(req);

  if (authResult instanceof NextResponse) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { data, error } = await supabaseServer
    .from("products")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ data });
}
