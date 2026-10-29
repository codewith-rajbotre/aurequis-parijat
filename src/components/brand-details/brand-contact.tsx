import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface BrandContactProps {
  brand: any;
  theme: any;
  content: any;
}

export default function BrandContact({
  brand,
  theme,
  content,
}: BrandContactProps) {
  return (
    <section
      id="contact"
      className="py-20 md:py-32"
      style={{
        backgroundColor: theme.background_color,
      }}
    >
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p
          className="text-sm uppercase tracking-[0.4em]"
          style={{
            color: theme.primary_color,
          }}
        >
          {content?.contact_eyebrow ?? "Discover More"}
        </p>

        <h2
          className="mt-6 text-4xl font-light sm:text-5xl md:text-6xl"
          style={{
            color: theme.text_primary,
          }}
        >
          {content?.contact_title ?? `Discover ${brand.name}`}
        </h2>

        <p
          className="mx-auto mt-8 max-w-2xl text-lg leading-8"
          style={{
            color: theme.text_secondary,
          }}
        >
          {content?.contact_description ?? brand.description}
        </p>

        {brand.website_url && (
          <Link
            href={brand.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 border px-7 py-4 text-sm uppercase tracking-[0.2em] transition-opacity hover:opacity-70"
            style={{
              borderColor: theme.border_color,
              color: theme.text_primary,
            }}
          >
            Official Website
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </section>
  );
}
