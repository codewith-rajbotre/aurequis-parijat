import Products from "@/components/products/products";
import { fetchAllBrands } from "@/db/supabase/brands";
import { fetchProducts } from "@/db/supabase/products";

interface ProductsPageProps {
    searchParams: Promise<{ brand?: string | string[] }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    const { brand } = await searchParams;
    const brandSlug = typeof brand === "string" && brand ? brand : undefined;

    const [brandsResult, productsResult] = await Promise.all([
        fetchAllBrands(),
        fetchProducts(brandSlug),
    ]);

    return (
        <Products
            brandsResult={brandsResult}
            productsResult={productsResult}
            activeBrandSlug={brandSlug}
        />
    );
}
