import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: {
    label: string;
    href: string;
  };
}

export function SectionHeader({
  title,
  description,
  align = "left",
  action,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between sm:gap-6",
        align === "center" && "items-center text-center sm:justify-center",
      )}
    >
      <div>
        <h2 className="font-serif text-3xl text-foreground sm:text-4xl">{title}</h2>

        {description && (
          <p className="mt-2 text-muted-foreground">{description}</p>
        )}
      </div>

      {action && (
        <Link
          href={action.href}
          className="inline-flex shrink-0 items-center gap-2 text-sm uppercase tracking-[0.25em] text-brand-gold transition hover:opacity-80"
        >
          {action.label}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
