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
      category,
      Category (id, Category),
      material,
      stock,
      delivey_days,
      images (
        id,
        image_url
      )
    `)
    .order("id", { ascending: false });

  if (error) {
    console.error("Fetch products error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ products: data });
}

