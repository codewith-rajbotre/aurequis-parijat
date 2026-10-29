import Link from "next/link";

import { ArrowUpRight, Package } from "lucide-react";

import type { Result } from "@/lib/errors";
import type { BrandTheme } from "@/lib/types/brand";
import { type Product, ProductStatus } from "@/lib/types/product";
import { formatPrice } from "@/lib/validations/product";

import { ApiErrorMessage } from "@/components/errors";

interface BrandProductsProps {
  brand: { name: string; slug: string };
  theme: BrandTheme;
  productsResult: Result<Product[]>;
}

// The brand's published products, read from the same products API as the Products tab.
export default function BrandProducts({ brand, theme, productsResult }: BrandProductsProps) {
  const products = productsResult.data?.filter((product) => product.status === ProductStatus.PUBLISHED);

  return (
    <section
      id="products"
      className="py-20 md:py-32"
      style={{
        backgroundColor: theme.surface_color ?? undefined,
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em]" style={{ color: theme.primary_color ?? undefined }}>
              Products
            </p>

            <h2 className="mt-5 text-3xl font-light sm:text-4xl md:text-5xl" style={{ color: theme.text_primary ?? undefined }}>
              Shop {brand.name}
            </h2>
          </div>

          <Link
            href={`/products?brand=${encodeURIComponent(brand.slug)}`}
            className="inline-flex shrink-0 items-center gap-2 text-sm hover:opacity-70"
            style={{ color: theme.primary_color ?? undefined }}
          >
            Manage products
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 md:mt-14">
          {productsResult.error ? (
            <ApiErrorMessage error={productsResult.error} />
          ) : products && products.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="min-w-0 overflow-hidden rounded-2xl border"
                  style={{
                    backgroundColor: theme.card_color ?? undefined,
                    borderColor: theme.border_color ?? undefined,
                  }}
                >
                  <div className="aspect-4/3" style={{ backgroundColor: theme.background_color ?? undefined }}>
                    {product.imageUrl ? (
                      // Product images can come from any host, which next/image would need configured per domain.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Package className="h-10 w-10 opacity-40" style={{ color: theme.text_muted ?? undefined }} />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 p-5">
                    <h3 className="text-lg font-light wrap-break-word" style={{ color: theme.text_primary ?? undefined }}>
                      {product.name}
                    </h3>

                    <p className="font-medium" style={{ color: theme.primary_color ?? undefined }}>
                      {formatPrice(product.price, product.currency)}
                    </p>

                    {product.stock === 0 && (
                      <p className="text-sm" style={{ color: theme.text_muted ?? undefined }}>
                        Out of stock
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p style={{ color: theme.text_secondary ?? undefined }}>No products have been added for {brand.name} yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
