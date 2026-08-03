import { createClient } from "@supabase/supabase-js";

// TODO: Replace with actual Supabase project URL and anon key in .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ────────────────────────────────────────────
// SUPABASE TABLE SCHEMAS (create in dashboard)
// ────────────────────────────────────────────
//
// Table: rsvps
// ┌─────────────┬────────────┬──────────────────────────────┐
// │ Column      │ Type       │ Notes                        │
// ├─────────────┼────────────┼──────────────────────────────┤
// │ id          │ uuid       │ Primary key, auto-generated  │
// │ name        │ text       │ NOT NULL                     │
// │ attendance  │ text       │ 'yes' | 'no'                 │
// │ guest_count │ int4       │ 0-3                          │
// │ message     │ text       │ nullable                     │
// │ created_at  │ timestampz │ auto-generated               │
// └─────────────┴────────────┴──────────────────────────────┘
//
// Table: guestbook
// ┌─────────────┬────────────┬──────────────────────────────┐
// │ Column      │ Type       │ Notes                        │
// ├─────────────┼────────────┼──────────────────────────────┤
// │ id          │ uuid       │ Primary key, auto-generated  │
// │ name        │ text       │ NOT NULL                     │
// │ message     │ text       │ NOT NULL                     │
// │ created_at  │ timestampz │ auto-generated               │
// └─────────────┴────────────┴──────────────────────────────┘
