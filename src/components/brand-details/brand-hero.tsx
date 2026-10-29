import { ArrowDown, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface BrandHeroProps {
  brand: any;
  theme: any;
  content: any;
}

export default function BrandHero({
  brand,
  theme,
  content,
}: BrandHeroProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: theme.background_color,
      }}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:gap-16 md:py-24 lg:min-h-[calc(100dvh-10rem)] lg:grid-cols-2">
        <div>
          <p
            className="mb-6 text-xs uppercase tracking-[0.45em]"
            style={{
              color: theme.primary_color,
            }}
          >
            {content?.hero_eyebrow ?? brand.name}
          </p>

          <h1
            className="text-4xl font-light leading-tight tracking-tight wrap-break-word sm:text-5xl md:text-7xl"
            style={{
              color: theme.text_primary,
            }}
          >
            {content?.hero_title ?? brand.name}
          </h1>

          <p
            className="mt-8 max-w-2xl text-lg leading-8"
            style={{
              color: theme.text_secondary,
            }}
          >
            {content?.hero_description ??
              brand.description ??
              "Discover the legacy, craftsmanship and philosophy behind this extraordinary brand."}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              className="rounded-none px-7"
              style={{
                backgroundColor: theme.primary_color,
                color: theme.button_text,
              }}
              onClick={() => {
                document
                  .getElementById("collections")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
            >
              Discover Collection
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div
            className="mt-16 flex items-center gap-3 text-xs uppercase tracking-[0.3em]"
            style={{
              color: theme.text_muted,
            }}
          >
            <ArrowDown className="h-4 w-4" />
            Explore
          </div>
        </div>

        {/* <div className="relative h-150 overflow-hidden">
          {brand.banner_url ? (
            <Image
              src={brand.banner_url}
              alt={brand.name}
              fill
              priority
              className="object-cover"
            />
          ) : (
            <div
              className="flex h-full items-center justify-center"
              style={{
                backgroundColor: theme.surface_color,
              }}
            >
              <span
                className="text-3xl font-light tracking-[0.3em]"
                style={{
                  color: theme.text_muted,
                }}
              >
                {brand.name}
              </span>
            </div>
          )}
        </div> */}
      </div>
    </section>
  );
}