import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import { fetchAdminByEmail } from "@/db/supabase/login";
import { createSession } from "@/lib/auth/session";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Email and password are required.",
                },
                {
                    status: 400,
                }
            );
        }

        const { data: admin, error } = await fetchAdminByEmail(email);

        if (error) {
            return NextResponse.json(
                {
                    success: false,
                    message: error.message,
                },
                {
                    status: error.status,
                }
            );
        }

        if (!admin) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid credentials.",
                },
                {
                    status: 401,
                }
            );
        }

        const passwordMatches = await bcrypt.compare(
            password,
            admin.password
        );

        if (!passwordMatches) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid credentials.",
                },
                {
                    status: 401,
                }
            );
        }

        await createSession(admin.id);

        return NextResponse.json({
            success: true,
            redirectTo: "/home",
        });
    } catch {
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong.",
            },
            {
                status: 500,
            }
        );
    }
}