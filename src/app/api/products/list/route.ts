import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { supabaseServer } from "@/src/lib/supabaseServer";

export async function GET(req: NextRequest) {
  /* -----------------------------------------
     1. Read admin token from cookie
  ----------------------------------------- */
  const token = req.cookies.get("adminToken")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid token" },
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
      material,
      stock,
      product_images (
        id,
        image_url
      )
    `)

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ data });
}
