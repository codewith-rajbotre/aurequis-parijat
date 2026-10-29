import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { MissingConfigError } from "@/lib/errors";

let client: SupabaseClient | null = null;

// Created on first use so a missing env var becomes a catchable error
// instead of crashing every page that imports this module.
export function getSupabase() {
    if (client) {
        return client;
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !anonKey) {
        throw new MissingConfigError(
            "Database connection is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
        );
    }

    client = createClient(url, anonKey);

    return client;
}
