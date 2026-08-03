import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * POST /api/guestbook
 * Body: { name, message }
 * Inserts a new entry into the `guestbook` table.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, message } = body;

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.from("guestbook").insert([
      {
        name: String(name).trim(),
        message: String(message).trim(),
      },
    ]).select();

    if (error) {
      console.error("[Guestbook] Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err) {
    console.error("[Guestbook] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * GET /api/guestbook
 * Returns all guestbook entries (newest first).
 */
export async function GET() {
  const { data, error } = await supabase
    .from("guestbook")
    .select("id, name, message, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
