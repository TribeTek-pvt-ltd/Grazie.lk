// API route for categories CRUD operations
import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/src/lib/supabaseServer";
import { verifyAdminApi } from "@/src/lib/apiAdminAuth";

// GET - Fetch all categories
export async function GET(req: NextRequest) {
    try {
        /* ---------- FETCH CATEGORIES ---------- */
        const { data, error } = await supabaseServer
            .from("Category")
            .select("id, Category, description")
            .order("Category");

        if (error) {
            console.error("Fetch categories error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Map Category column to name for compatibility
        const mappedData = data.map((cat: any) => ({
            ...cat,
            name: cat.Category
        }));

        return NextResponse.json({ data: mappedData });
    } catch (err) {
        console.error("Fetch categories error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// POST - Create new category
export async function POST(req: NextRequest) {
    const adminUser = await verifyAdminApi(req);
    if (!adminUser) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { name, description } = await req.json();

        if (!name) {
            return NextResponse.json({ error: "Name is required" }, { status: 400 });
        }

        const { data, error } = await supabaseServer
            .from("Category")
            .insert({
                Category: name,
                description: description
            })
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ data });
    } catch (err) {
        console.error("Create category error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// PUT - Update category
export async function PUT(req: NextRequest) {
    const adminUser = await verifyAdminApi(req);
    if (!adminUser) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id, name, description } = await req.json();

        if (!id || !name) {
            return NextResponse.json({ error: "ID and name are required" }, { status: 400 });
        }

        const { data, error } = await supabaseServer
            .from("Category")
            .update({
                Category: name,
                description: description
            })
            .eq("id", id)
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ data });
    } catch (err) {
        console.error("Update category error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// DELETE - Delete category
export async function DELETE(req: NextRequest) {
    const adminUser = await verifyAdminApi(req);
    if (!adminUser) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        const { error } = await supabaseServer
            .from("Category")
            .delete()
            .eq("id", id);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Delete category error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
