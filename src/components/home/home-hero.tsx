import { ArrowRight } from "lucide-react";

import type { Result } from "@/lib/errors";
import type { Brand } from "@/lib/validations/brand";

import { LinkButton } from "@/components/common/link-button";
import { StatCard } from "@/components/common/stat-card";
import { Card, CardContent } from "@/components/ui/card";

interface HomeHeroProps {
  brandsResult: Result<Brand[]>;
}

export function HomeHero({ brandsResult }: HomeHeroProps) {
  const { data: brands, error } = brandsResult;

  const stats = [
    { label: "Brands", value: brands?.length ?? null },
    {
      label: "Featured",
      value: brands?.filter((brand) => brand.isFeatured).length ?? null,
    },
    {
      label: "Countries",
      value: brands
        ? new Set(brands.map((brand) => brand.country).filter(Boolean)).size
        : null,
    },
  ];

  return (
    <section className="container mx-auto px-4 pt-12 pb-16 sm:px-6 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Left */}

        <div className="space-y-8">
          <div className="inline-flex rounded-full border border-brand-gold/20 bg-brand-gold/10 px-4 py-2">
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-brand-gold">
              AUREQUIS PARIJAT
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
              Luxury.
              <br />
              <span className="text-brand-gold">Curated.</span>
            </h1>

            <p className="max-w-md text-lg text-muted-foreground">
              Finest brands. Timeless experiences.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <LinkButton
              href="/brands"
              size="lg"
              className="rounded-xl bg-brand-gold px-7 text-black hover:opacity-90"
            >
              Explore Brands
              <ArrowRight className="ml-2 h-4 w-4" />
            </LinkButton>

            <LinkButton
              href="/about"
              size="lg"
              variant="outline"
              className="rounded-xl border-brand-gold/30 bg-transparent text-brand-gold hover:bg-brand-gold/10"
            >
              About Us
            </LinkButton>
          </div>
        </div>

        {/* Right */}

        <div className="grid grid-cols-2 gap-3 sm:gap-5">
          {stats.map(({ label, value }) => (
            <StatCard key={label} label={label} value={value} error={error} />
          ))}

          <Card className="rounded-3xl border-border bg-brand-gold text-black transition-all duration-300 hover:-translate-y-1">
            <CardContent className="flex h-full items-center justify-center p-4 text-center sm:p-6">
              <span className="text-base font-semibold sm:text-lg">100% Authentic</span>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
