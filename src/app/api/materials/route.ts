// API route for materials CRUD operations
import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/src/lib/supabaseServer";
import { verifyAdminApi } from "@/src/lib/apiAdminAuth";

// GET - Fetch all materials from materials table
export async function GET(req: NextRequest) {
    try {
        const { data, error } = await supabaseServer
            .from("materials")
            .select("id, name")
            .order("name");

        if (error) {
            console.error("Fetch materials error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ data });
    } catch (err) {
        console.error("Fetch materials error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// POST - Create new material
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
            .from("materials")
            .insert({ name })
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ data });
    } catch (err) {
        console.error("Create material error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// PUT - Update material
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
            .from("materials")
            .update({ name })
            .eq("id", id)
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ data });
    } catch (err) {
        console.error("Update material error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// DELETE - Delete material
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
            .from("materials")
            .delete()
            .eq("id", id);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Delete material error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
