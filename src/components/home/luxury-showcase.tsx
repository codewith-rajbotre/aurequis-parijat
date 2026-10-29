import { ArrowRight } from "lucide-react";

import type { Result } from "@/lib/errors";
import type { Brand } from "@/lib/validations/brand";

import { BrandTile } from "@/components/brands/brand-tile";
import { LinkButton } from "@/components/common/link-button";
import { SectionHeader } from "@/components/common/section-header";
import { ApiErrorMessage } from "@/components/errors";
import { Card, CardContent } from "@/components/ui/card";

const HEADER = {
  title: "Featured",
  description: "Handpicked by our curators.",
};

interface LuxuryShowcaseProps {
  brandsResult: Result<Brand[]>;
}

export function LuxuryShowcase({ brandsResult }: LuxuryShowcaseProps) {
  if (brandsResult.error) {
    return (
      <section className="container mx-auto px-4 py-12 sm:px-6 sm:py-20">
        <SectionHeader {...HEADER} />

        <ApiErrorMessage error={brandsResult.error} />
      </section>
    );
  }

  const [spotlight, ...others] = brandsResult.data.filter(
    (brand) => brand.isFeatured,
  );

  if (!spotlight) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 py-12 sm:px-6 sm:py-20">
      <SectionHeader {...HEADER} />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Large Card */}

        <Card className="overflow-hidden rounded-3xl border-border bg-card/70 lg:col-span-2">
          <CardContent className="flex min-h-80 flex-col justify-between gap-10 p-6 sm:p-10 lg:min-h-105">
            <div>
              <span className="rounded-full border border-brand-gold/30 bg-brand-gold/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-brand-gold">
                Featured
              </span>
            </div>

            <div className="space-y-5">
              <h3 className="font-serif text-3xl leading-tight wrap-break-word text-foreground sm:text-4xl md:text-5xl">
                {spotlight.name}
              </h3>

              {spotlight.description && (
                <p className="line-clamp-3 max-w-xl text-muted-foreground">
                  {spotlight.description}
                </p>
              )}

              <LinkButton
                href={`/brands/${spotlight.slug}`}
                className="rounded-xl bg-brand-gold text-black hover:opacity-90"
              >
                Discover
                <ArrowRight className="ml-2 h-4 w-4" />
              </LinkButton>
            </div>
          </CardContent>
        </Card>

        {/* Right Side */}

        {others.length > 0 && (
          <div className="grid gap-6">
            {others.slice(0, 2).map((brand) => (
              <BrandTile key={brand.id} brand={brand} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
