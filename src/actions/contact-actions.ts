
"use server";

import { createWebsiteVisitor } from "@/db/supabase/website_visitores";
import { getSupabase } from "@/lib/supabase";
import { contactSchema } from "@/lib/validations/contacts";


export type ContactActionResult =
    | { success: true; message: string }
    | { success: false; message: string };

export async function submitContactEnquiry(
    input: unknown,
): Promise<ContactActionResult> {
    try {
        const validation = contactSchema.safeParse(input);

        if (!validation.success) {
            return {
                success: false,
                message:
                    validation.error.issues[0]?.message ??
                    "Please check your contact details.",
            };
        }


        const result = await createWebsiteVisitor(
            getSupabase(),
            validation.data,
        );

        if (!result.success) {
            return {
                success: false,
                message: result.error,
            };
        }

        return {
            success: true,
            message: "Your enquiry has been submitted successfully.",
        };
    } catch (error) {
        console.error("Contact action failed:", error);

        return {
            success: false,
            message: "Unable to submit your enquiry. Please try again.",
        };
    }
}
