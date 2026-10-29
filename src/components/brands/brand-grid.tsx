import type { Brand } from "@/lib/validations/brand";

import BrandCard from "@/components/brands/brand-card";

interface BrandGridProps {
  brands: Brand[];
}

export default function BrandGrid({ brands }: BrandGridProps) {
  if (brands.length === 0) {
    return (
      <div className="flex min-h-87.5 items-center justify-center rounded-3xl border border-dashed border-border bg-card">
        <div className="space-y-3 text-center">
          <h2 className="text-2xl font-semibold text-foreground">
            No Brands Available
          </h2>

          <p className="max-w-md text-muted-foreground">
            No luxury brands have been added yet. Click{" "}
            <span className="font-medium text-brand-gold">Add Brand</span> to
            create your first collection.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {brands.map((brand) => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
      </div>
    </section>
  );
}
