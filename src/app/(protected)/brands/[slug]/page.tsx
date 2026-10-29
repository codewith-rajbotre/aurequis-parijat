import { notFound } from "next/navigation";

import { fetchBrandBySlug } from "@/db/supabase/brands";
import { fetchProducts } from "@/db/supabase/products";

import BrandPage from "@/components/brand-details/brand-page";
import { ApiErrorMessage } from "@/components/errors";

interface BrandPageRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: BrandPageRouteProps) {
  const { slug } = await params;
  // Products load separately so a products failure only affects the products section.
  const [{ data: brand, error }, productsResult] = await Promise.all([
    fetchBrandBySlug(slug),
    fetchProducts(slug),
  ]);

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-20">
        <ApiErrorMessage error={error} />
      </section>
    );
  }

  if (!brand) {
    notFound();
  }

  return <BrandPage brand={brand} productsResult={productsResult} />;
}
