"use client";

import { useTheme } from "next-themes";

import BrandHeader from "./brand-header";
import BrandHero from "./brand-hero";
import BrandStory from "./brand-story";
import BrandStatistics from "./brand-statistics";
import BrandCollections from "./brand-collections";
import BrandFeatures from "./brand-features";
import BrandHeritage from "./brand-heritage";
import BrandGallery from "./brand-gallery";
import BrandSection from "./brand-section";
import BrandContact from "./brand-contact";
import BrandFooter from "./brand-footer";
import BrandProducts from "./brand-products";

import type { Result } from "@/lib/errors";
import type { Product } from "@/lib/types/product";

interface BrandPageProps {
  brand: any;
  productsResult: Result<Product[]>;
}

export default function BrandPage({ brand, productsResult }: BrandPageProps) {
  const { resolvedTheme } = useTheme();

  const currentThemeName = resolvedTheme === "dark" ? "dark" : "light";

  const theme =
    brand.brand_themes?.find(
      (item: any) => item.theme_name === currentThemeName,
    ) ?? brand.brand_themes?.[0];

  if (!theme) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-semibold">Brand theme not configured.</h1>
      </main>
    );
  }

  const content = brand.brand_content?.[0] ?? null;

  const statistics = [...(brand.brand_statistics ?? [])].sort(
    (a: any, b: any) => a.display_order - b.display_order,
  );

  const heritage = [...(brand.brand_heritage ?? [])].sort(
    (a: any, b: any) => a.display_order - b.display_order,
  );

  const collections = [...(brand.brand_collections ?? [])].sort(
    (a: any, b: any) => a.display_order - b.display_order,
  );

  const features = [...(brand.brand_features ?? [])].sort(
    (a: any, b: any) => a.display_order - b.display_order,
  );

  const gallery = [...(brand.brand_gallery ?? [])].sort(
    (a: any, b: any) => a.display_order - b.display_order,
  );

  const sections = [...(brand.brand_sections ?? [])]
    .filter((section: any) => section.is_visible)
    .sort((a: any, b: any) => a.display_order - b.display_order);

  return (
    <main
      // Anchor targets land below the two sticky headers (site navbar + brand header).
      className="min-h-screen [&_[id]]:scroll-mt-48 md:[&_[id]]:scroll-mt-44"
      style={{
        backgroundColor: theme.background_color,
        color: theme.text_primary,
      }}
    >
      <BrandHeader brand={brand} theme={theme} />

      <BrandHero brand={brand} theme={theme} content={content} />

      <BrandStory brand={brand} theme={theme} content={content} />

      <BrandStatistics theme={theme} statistics={statistics} />

      <BrandProducts brand={brand} theme={theme} productsResult={productsResult} />

      <BrandCollections theme={theme} collections={collections} />

      <BrandFeatures theme={theme} features={features} />

      <BrandHeritage theme={theme} heritage={heritage} />

      <BrandGallery theme={theme} gallery={gallery} />

      {sections.map((section: any) => (
        <BrandSection key={section.id} section={section} theme={theme} />
      ))}

      <BrandContact brand={brand} theme={theme} content={content} />

      <BrandFooter brand={brand} theme={theme} />
    </main>
  );
}
