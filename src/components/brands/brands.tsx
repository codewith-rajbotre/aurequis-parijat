"use client";

import type { Result } from "@/lib/errors";
import type { Brand } from "@/lib/validations/brand";

import { ApiErrorMessage } from "@/components/errors";

import BrandGrid from "./brand-grid";
import BrandHeader from "./brand-header";
import EmptyBrandState from "./empty-brand-state";

interface BrandsProps {
  brandsResult: Result<Brand[]>;
}

export default function Brands({ brandsResult }: BrandsProps) {
  const { data: brands, error } = brandsResult;

  return (
    <section className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10 2xl:max-w-screen-2xl">
        <BrandHeader totalBrands={brands?.length ?? null} />

        {error ? (
          <ApiErrorMessage error={error} />
        ) : brands.length > 0 ? (
          <BrandGrid brands={brands} />
        ) : (
          <EmptyBrandState />
        )}
      </div>
    </section>
  );
}
