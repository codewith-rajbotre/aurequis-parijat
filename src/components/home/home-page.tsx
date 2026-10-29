import type { Result } from "@/lib/errors";
import { BrandStatus } from "@/lib/types/brand";
import type { Brand } from "@/lib/validations/brand";

import { FooterCTA } from "./footer-cta";
import { FeaturedBrands } from "./featured-brands";
import { HomeHero } from "./home-hero";
import { LuxuryShowcase } from "./luxury-showcase";
import { WhyLuxuryCart } from "./why-luxury-cart";

interface HomePageProps {
  brandsResult: Result<Brand[]>;
}

export function HomePage({ brandsResult }: HomePageProps) {
  // Sections receive the error too, so each shows it in place while the rest of the page renders.
  const publishedBrands: Result<Brand[]> = brandsResult.error
    ? brandsResult
    : {
        data: brandsResult.data.filter(
          (brand) => brand.status === BrandStatus.PUBLISHED,
        ),
        error: null,
      };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.15),transparent_45%)]" />

      <div className="pointer-events-none absolute left-1/2 top-0 h-152 w-152 -translate-x-1/2 rounded-full bg-brand-gold/10 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-112 w-md rounded-full bg-brand-gold/5 blur-3xl" />

      {/* Content */}
      <div className="relative z-10">
        <HomeHero brandsResult={publishedBrands} />

        <FeaturedBrands brandsResult={publishedBrands} />

        <LuxuryShowcase brandsResult={publishedBrands} />

        <WhyLuxuryCart />

        <FooterCTA />
      </div>
    </main>
  );
}
