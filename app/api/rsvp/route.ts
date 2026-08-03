import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * POST /api/rsvp
 * Body: { name, attendance, guest_count, message }
 * Inserts a new RSVP record into the `rsvps` table.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, attendance, guest_count, message } = body;

    if (!name || !attendance) {
      return NextResponse.json(
        { error: "Name and attendance are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.from("rsvps").insert([
      {
        name: String(name).trim(),
        attendance: String(attendance),
        guest_count: Number(guest_count) || 0,
        message: message ? String(message).trim() : null,
      },
    ]).select();

    if (error) {
      console.error("[RSVP] Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err) {
    console.error("[RSVP] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * GET /api/rsvp
 * Returns all RSVP responses (for admin dashboard use).
 */
export async function GET() {
  const { data, error } = await supabase
    .from("rsvps")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
