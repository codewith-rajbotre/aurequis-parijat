import Link from "next/link";

import type { Result } from "@/lib/errors";
import type { Brand } from "@/lib/validations/brand";

import { BrandTile } from "@/components/brands/brand-tile";
import { SectionHeader } from "@/components/common/section-header";
import { ApiErrorMessage } from "@/components/errors";

const MAX_BRANDS = 8;

interface FeaturedBrandsProps {
  brandsResult: Result<Brand[]>;
}

export function FeaturedBrands({ brandsResult }: FeaturedBrandsProps) {
  const { data: brands, error } = brandsResult;

  return (
    <section className="container mx-auto px-4 py-12 sm:px-6 sm:py-20">
      <SectionHeader
        title="Our Brands"
        description="Icons of luxury."
        action={{ label: "View all", href: "/brands" }}
      />

      {error ? (
        <ApiErrorMessage error={error} />
      ) : brands.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {brands.slice(0, MAX_BRANDS).map((brand) => (
            <BrandTile key={brand.id} brand={brand} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">
          No brands published yet.{" "}
          <Link href="/brands" className="text-brand-gold hover:opacity-80">
            Add one from the Brands page.
          </Link>
        </p>
      )}
    </section>
  );
}
