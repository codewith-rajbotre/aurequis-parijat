import Brands from "@/components/brands/brands";
import { fetchAllBrands } from "@/db/supabase/brands";

export default async function BrandsPage() {
    const brandsResult = await fetchAllBrands();
    return <Brands brandsResult={brandsResult} />;
}
