import Link from "next/link";

import type { Brand } from "@/lib/validations/brand";
import { cn } from "@/lib/utils";

interface ProductBrandFilterProps {
  brands: Brand[];
  activeBrandSlug?: string;
}

function chipClass(active: boolean) {
  return cn(
    "shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors",
    active
      ? "border-brand-gold bg-brand-gold text-black"
      : "border-border text-muted-foreground hover:border-brand-gold/40 hover:text-foreground",
  );
}

// Brand chips that switch the list with ?brand=<slug>; scrolls sideways on small screens.
export default function ProductBrandFilter({ brands, activeBrandSlug }: ProductBrandFilterProps) {
  return (
    <nav aria-label="Filter by brand" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
      <Link href="/products" className={chipClass(!activeBrandSlug)}>
        All Brands
      </Link>

      {brands.map((brand) => (
        <Link
          key={brand.id}
          href={`/products?brand=${encodeURIComponent(brand.slug)}`}
          className={chipClass(brand.slug === activeBrandSlug)}
        >
          {brand.name}
        </Link>
      ))}
    </nav>
  );
}
