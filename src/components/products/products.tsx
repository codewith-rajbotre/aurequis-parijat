"use client";

import { useState } from "react";

import { Package, Plus } from "lucide-react";

import type { Result } from "@/lib/errors";
import type { Brand } from "@/lib/validations/brand";
import type { Product } from "@/lib/types/product";

import { LinkButton } from "@/components/common/link-button";
import { ApiErrorMessage } from "@/components/errors";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import DeleteProductDialog from "./delete-product-dialog";
import ProductBrandFilter from "./product-brand-filter";
import ProductCard from "./product-card";
import ProductFormDialog from "./product-form-dialog";

interface ProductsProps {
  brandsResult: Result<Brand[]>;
  productsResult: Result<Product[]>;
  // Set when the list is filtered to one brand (?brand=<slug>).
  activeBrandSlug?: string;
}

export default function Products({ brandsResult, productsResult, activeBrandSlug }: ProductsProps) {
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState<Product | null>(null);

  const brands = brandsResult.data ?? [];
  const { data: products, error } = productsResult;
  const activeBrand = brands.find((brand) => brand.slug === activeBrandSlug);
  const unknownBrand = Boolean(activeBrandSlug && brandsResult.data && !activeBrand);
  // Products can only be added once at least one brand exists.
  const canAdd = brands.length > 0;

  function openForm(product: Product | null) {
    setEditing(product);
    setFormOpen(true);
  }

  return (
    <section className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10 2xl:max-w-screen-2xl">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight wrap-break-word sm:text-4xl">
                {activeBrand ? `${activeBrand.name} Products` : "Products"}
              </h1>

              {products && (
                <Badge variant="secondary" className="rounded-full">
                  {products.length}
                </Badge>
              )}
            </div>

            <p className="max-w-2xl text-muted-foreground">
              Manage the products of every brand. Each product belongs to one brand and appears on that
              brand&apos;s page.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {activeBrand && (
              <LinkButton href={`/brands/${activeBrand.slug}`} size="lg" variant="outline">
                View Brand
              </LinkButton>
            )}

            <Button
              size="lg"
              disabled={!canAdd}
              onClick={() => openForm(null)}
              className="bg-brand-gold font-semibold text-black hover:opacity-90"
            >
              <Plus className="mr-2 h-5 w-5" />
              Add Product
            </Button>
          </div>
        </header>

        {brandsResult.error ? (
          // Skip the duplicate when the product list below already shows the same failure.
          brandsResult.error.message !== error?.message && (
            <ApiErrorMessage error={brandsResult.error} compact />
          )
        ) : (
          <ProductBrandFilter brands={brands} activeBrandSlug={activeBrandSlug} />
        )}

        {unknownBrand ? (
          <ApiErrorMessage error={{ status: 404, message: `No brand found for "${activeBrandSlug}".` }} />
        ) : error ? (
          <ApiErrorMessage error={error} />
        ) : products.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onEdit={openForm} onDelete={setDeleting} />
            ))}
          </div>
        ) : (
          <Card className="border-border bg-card shadow-sm">
            <CardContent className="flex flex-col items-center px-5 py-12 text-center sm:py-16">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-gold/10">
                <Package className="h-8 w-8 text-brand-gold" />
              </div>

              <h2 className="mt-6 text-2xl font-bold">No Products Yet</h2>

              <p className="mt-3 max-w-md leading-7 text-muted-foreground">
                {canAdd
                  ? "Add the first product to start building this catalogue."
                  : "Products belong to brands. Create a brand first, then add its products."}
              </p>

              {!canAdd && !brandsResult.error && (
                <LinkButton href="/brands" size="lg" className="mt-8 bg-brand-gold text-black hover:opacity-90">
                  Go to Brands
                </LinkButton>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      <ProductFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        brands={brands}
        product={editing}
        defaultBrandId={activeBrand?.id}
      />

      <DeleteProductDialog product={deleting} onClose={() => setDeleting(null)} />
    </section>
  );
}
