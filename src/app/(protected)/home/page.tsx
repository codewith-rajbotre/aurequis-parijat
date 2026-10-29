import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { HomePage } from "@/components/home/home-page";
import { fetchAllBrands } from "@/db/supabase/brands";

export default async function Home() {
    const cookieStore = await cookies();

    const session = cookieStore.get("luxury_session");

    if (!session) {
        redirect("/login");
    }

    const brandsResult = await fetchAllBrands();

    return <HomePage brandsResult={brandsResult} />;
}