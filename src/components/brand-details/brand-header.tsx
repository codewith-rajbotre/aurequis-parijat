"use client";

import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

interface BrandHeaderProps {
  brand: any;
  theme: any;
}

const sectionLinks = [
  { href: "#story", label: "Story" },
  { href: "#products", label: "Products" },
  { href: "#collections", label: "Collections" },
  { href: "#heritage", label: "Heritage" },
];

// Sticks below the site navbar (h-20); on small screens the links wrap to a scrollable second row.
export default function BrandHeader({ brand, theme }: BrandHeaderProps) {
  return (
    <header
      className="sticky top-20 z-40 border-b backdrop-blur-xl"
      style={{
        backgroundColor: `${theme.navbar_color}E6`,
        borderColor: theme.border_color,
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 md:h-20 md:flex-row md:items-center md:justify-between md:py-0">
        <Link
          href={`/brands/${brand.slug}`}
          className="flex min-w-0 items-center gap-4"
        >
          {brand.logo_url ? (
            <img
              src={brand.logo_url}
              alt={brand.name}
              className="h-8 w-auto object-contain md:h-10"
            />
          ) : (
            <div
              className="truncate text-lg font-medium tracking-[0.2em] md:text-xl"
              style={{
                color: theme.text_primary,
              }}
            >
              {brand.name}
            </div>
          )}
        </Link>

        <nav className="-mx-1 flex items-center gap-6 overflow-x-auto px-1 md:gap-8">
          {sectionLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              style={{ color: theme.text_secondary }}
              className="shrink-0 text-sm transition-opacity hover:opacity-70"
            >
              {label}
            </a>
          ))}

          <a
            href="#contact"
            className="flex shrink-0 items-center gap-2 text-sm"
            style={{ color: theme.primary_color }}
          >
            Contact
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </header>
  );
}
