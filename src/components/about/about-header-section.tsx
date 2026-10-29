import { ArrowRight } from "lucide-react";

import { LinkButton } from "@/components/common/link-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutHeaderSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute left-1/2 top-0 h-144 w-xl -translate-x-1/2 rounded-full bg-brand-gold/10 blur-3xl" />

      <div className="mx-auto flex max-w-7xl items-center px-4 py-12 sm:px-6 md:py-20 lg:min-h-[calc(100dvh-5rem)]">
        <Card className="w-full border-border bg-card/90 shadow-2xl backdrop-blur-xl">
          <CardContent className="px-5 py-12 text-center sm:px-8 sm:py-16 md:px-16 md:py-20">
            <Badge
              variant="outline"
              className="border-border bg-muted px-4 py-1 text-xs font-medium uppercase tracking-[0.3em] text-brand-gold"
            >
              About AUREQUIS PARIJAT
            </Badge>

            <h1 className="mt-8 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-7xl">
              The Home of
              <span className="mt-3 block bg-linear-to-r from-brand-gold via-yellow-300 to-brand-gold bg-clip-text text-transparent">
                Extraordinary Brands
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-muted-foreground">
              AUREQUIS PARIJAT brings together the world's most prestigious brands
              into one refined destination, making discovery effortless while
              celebrating craftsmanship, heritage, and timeless excellence.
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <LinkButton
                href="/brands"
                size="lg"
                className="bg-brand-gold px-8 font-semibold text-black hover:opacity-90"
              >
                Discover Brands
                <ArrowRight className="ml-2 h-5 w-5" />
              </LinkButton>

              <LinkButton
                href="/contact"
                variant="outline"
                size="lg"
                className="border-border px-8 text-brand-gold hover:bg-muted"
              >
                Contact Us
              </LinkButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
