import { supabaseServer } from "@/src/lib/supabaseServer";
import { NextResponse, NextRequest } from "next/server";
import { verifyAdminApi } from "@/src/lib/apiAdminAuth";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  /* ---------- AUTH CHECK ---------- */
  const adminUser = await verifyAdminApi(req);
  if (!adminUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const { id: productId } = await params;

    const name = formData.get("name")?.toString().trim();
    const description = formData.get("description")?.toString().trim();
    const priceRaw = formData.get("price")?.toString();
    const stockRaw = formData.get("stock")?.toString();
    const category = formData.get("category")?.toString() || null;
    const material = formData.get("material")?.toString() || null;
    const deliveyDaysRaw = formData.get("delivey_days")?.toString();

    const price = Number(priceRaw);
    const stock = Number(stockRaw);
    const delivey_days = deliveyDaysRaw ? Number(deliveyDaysRaw) : null;

    /* ---------- VALIDATION ---------- */
    if (!name || !description || !priceRaw || !stockRaw) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (isNaN(price) || price <= 0) {
      return NextResponse.json({ error: "Invalid price" }, { status: 400 });
    }

    if (isNaN(stock) || stock < 0) {
      return NextResponse.json({ error: "Invalid stock value" }, { status: 400 });
    }

    /* ---------- UPDATE PRODUCT ---------- */
    const { error: productError } = await supabaseServer
      .from("products")
      .update({
        name,
        description,
        price,
        category_id: category, // Using category_id as per schema
        material,
        stock,
        delivey_days,
      })
      .eq("id", productId);

    if (productError) {
      return NextResponse.json({ error: productError.message }, { status: 400 });
    }

    /* ---------- HANDLE IMAGES (OPTIONAL) ---------- */
    const imageFiles = formData.getAll("images") as File[];

    // Only update images if new ones are provided
    if (imageFiles.length > 0 && imageFiles[0].size > 0) {
      const imageUrls: string[] = [];

      for (const image of imageFiles) {
        if (image.size === 0) continue;

        const fileName = (image as any).name || `product-${Date.now()}.png`;
        const filePath = `product/${Date.now()}-${fileName}`;
        const buffer = Buffer.from(await image.arrayBuffer());

        const { error: uploadError } = await supabaseServer.storage
          .from("Grazie")
          .upload(filePath, buffer, {
            contentType: image.type,
            upsert: false,
          });

        if (uploadError) {
          console.error("Upload error during update:", uploadError);
          return NextResponse.json({ error: `Upload failed for ${fileName}` }, { status: 400 });
        }

        const { data: urlData } = supabaseServer.storage
          .from("Grazie")
          .getPublicUrl(filePath);

        imageUrls.push(urlData.publicUrl);
      }

      // 1. Delete old image records
      await supabaseServer
        .from("images")
        .delete()
        .eq("product_id", productId);

      // 2. Insert new image records
      const { error: imageError } = await supabaseServer
        .from("images")
        .insert({
          product_id: productId,
          image_url: imageUrls,
        });

      if (imageError) {
        return NextResponse.json({ error: imageError.message }, { status: 400 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Update product error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
