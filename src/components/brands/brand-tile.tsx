import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import type { Brand } from "@/lib/validations/brand";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface BrandTileProps {
  brand: Brand;
  className?: string;
}

// Compact brand card that links to the brand's detail page.
export function BrandTile({ brand, className }: BrandTileProps) {
  const details = [brand.country, brand.foundedYear && `Est. ${brand.foundedYear}`]
    .filter(Boolean)
    .join(" · ");

  return (
    <Link href={`/brands/${brand.slug}`} className="group block h-full">
      <Card
        className={cn(
          "h-full rounded-3xl border-border bg-card/70 transition-all duration-300 group-hover:-translate-y-2 group-hover:border-brand-gold/40 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.12)]",
          className,
        )}
      >
        <CardContent className="flex h-full min-h-44 flex-col justify-between gap-6 p-6">
          <div className="flex items-start justify-between gap-4">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-gold">
              {details}
            </span>

            <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand-gold" />
          </div>

          <div>
            <h3 className="font-serif text-2xl text-foreground transition-colors duration-300 group-hover:text-brand-gold">
              {brand.name}
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">Explore</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
