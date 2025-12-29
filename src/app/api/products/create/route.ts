// import { NextRequest, NextResponse } from "next/server";
// import { supabaseServer } from "@/src/lib/supabaseServer";
// import { verifyAdminApi } from "@/src/lib/apiAdminAuth";

// export async function POST(req: NextRequest) {
//   /* ---------- AUTH CHECK ---------- */
//   if (!verifyAdminApi(req)) {
//     return NextResponse.json(
//       { error: "Unauthorized" },
//       { status: 401 }
//     );
//   }

//   try {
//     const body = await req.formData();

//     const name = body.get("name")?.toString().trim();
//     const description = body.get("description")?.toString().trim();
//     const priceRaw = body.get("price");
//     const stockRaw = body.get("stock");

//     const category = body.get("category")?.toString() || null;
//     const material = body.get("material")?.toString() || null;
//     const image = body.get("image") as File | null;

//     const price = Number(priceRaw);
//     const stock = Number(stockRaw);

//     /* ---------- VALIDATION ---------- */
//     if (!name || !description || priceRaw === null || stockRaw === null) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     if (isNaN(price) || price <= 0) {
//       return NextResponse.json(
//         { error: "Invalid price" },
//         { status: 400 }
//       );
//     }

//     if (isNaN(stock) || stock < 0) {
//       return NextResponse.json(
//         { error: "Invalid stock value" },
//         { status: 400 }
//       );
//     }

//     if (!image) {
//       return NextResponse.json(
//         { error: "Image is required" },
//         { status: 400 }
//       );
//     }

//     /* ---------- IMAGE UPLOAD ---------- */
//     const filePath = `products/${Date.now()}-${image.name}`;

//     const { error: uploadError } = await supabaseServer.storage
//       .from("products")
//       .upload(filePath, image, {
//         contentType: image.type,
//       });

//     if (uploadError) {
//       return NextResponse.json(
//         { error: uploadError.message },
//         { status: 400 }
//       );
//     }

//     const { data: urlData } = supabaseServer.storage
//       .from("products")
//       .getPublicUrl(filePath);

//     /* ---------- PRODUCT INSERT ---------- */
//     const { data: product, error: productError } = await supabaseServer
//       .from("products")
//       .insert({
//         name,
//         description,
//         price,
//         category,
//         material,
//         stock,
//       })
//       .select()
//       .single();

//     if (productError) {
//       return NextResponse.json(
//         { error: productError.message },
//         { status: 400 }
//       );
//     }

//     /* ---------- IMAGE INSERT ---------- */
//     const { error: imageError } = await supabaseServer
//       .from("product_images")
//       .insert({
//         product_id: product.id,
//         image_url: urlData.publicUrl,
//       });

//     if (imageError) {
//       return NextResponse.json(
//         { error: imageError.message },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error("Create product error:", err);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }


// src/api/products/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/src/lib/supabaseServer";
import { verifyAdminApi } from "@/src/lib/apiAdminAuth";

export async function POST(req: NextRequest) {
  /* ---------- AUTH CHECK ---------- */
  if (!verifyAdminApi(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();

    const name = formData.get("name")?.toString().trim();
    const description = formData.get("description")?.toString().trim();
    const priceRaw = formData.get("price")?.toString();
    const stockRaw = formData.get("stock")?.toString();
    const category = formData.get("category")?.toString() || null;
    const material = formData.get("material")?.toString() || null;
    const imageBlob = formData.get("image") as Blob | null;

    const price = Number(priceRaw);
    const stock = Number(stockRaw);

    console.log({ name, description, priceRaw, stockRaw, imageBlob });

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

    if (!imageBlob) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    /* ---------- IMAGE UPLOAD ---------- */
    // Give a fallback filename because Blob may not have name
    const fileName = (imageBlob as any)?.name || `product-${Date.now()}.png`;
    const filePath = `products/${Date.now()}-${fileName}`;
    console.log("Uploading to:", filePath);

    const { error: uploadError } = await supabaseServer.storage
      .from("products")
      .upload(filePath, imageBlob, { contentType: imageBlob.type });
       console.log("Uploading to:", uploadError);

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 400 });
    }

    const { data: urlData } = supabaseServer.storage
      .from("products")
      .getPublicUrl(filePath);
    console.log("Image URL:", urlData.publicUrl);

    /* ---------- PRODUCT INSERT ---------- */
    const { data: product, error: productError } = await supabaseServer
      .from("products")
      .insert({ name, description, price, category, material, stock })
      .select()
      .single();

    if (productError) {
      return NextResponse.json({ error: productError.message }, { status: 400 });
    }

    /* ---------- IMAGE INSERT ---------- */
    const { error: imageError } = await supabaseServer
      .from("product_images")
      .insert({ product_id: product.id, image_url: urlData.publicUrl });

    if (imageError) {
      return NextResponse.json({ error: imageError.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Create product error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
