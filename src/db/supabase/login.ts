import { type Result, toAppError } from "@/lib/errors";
import { getSupabase } from "@/lib/supabase";

// `data: null` with no error means no admin has this email.
export async function fetchAdminByEmail(
    email: string,
): Promise<Result<{ id: string; password: string } | null>> {
    try {
        const { data, error, status } = await getSupabase()
            .from("luxury_admin")
            .select("*")
            .eq("email", email)
            .maybeSingle();

        if (error) {
            console.error("Failed to fetch admin:", error);
            return { data: null, error: toAppError(error, status, "Unable to sign in right now.") };
        }

        return { data, error: null };
    } catch (error) {
        console.error("Failed to fetch admin:", error);
        return { data: null, error: toAppError(error, undefined, "Unable to sign in right now.") };
    }
}
