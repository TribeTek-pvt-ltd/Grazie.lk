import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/src/lib/supabaseServer";
import { verifyAdminApi } from "@/src/lib/apiAdminAuth";

export async function GET(req: NextRequest) {
  /* -----------------------------------------
     1. Verify admin authentication
  ----------------------------------------- */
  const adminUser = await verifyAdminApi(req);
  if (!adminUser) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  /* -----------------------------------------
     2. Fetch products with images
  ----------------------------------------- */
  const { data, error } = await supabaseServer
    .from("products")
    .select(`
      id,
      name,
      description,
      price,
      category_id,
      material_id,
      stock,
      created_at,
      images (
        id,
        image_url
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ products: data });
}

