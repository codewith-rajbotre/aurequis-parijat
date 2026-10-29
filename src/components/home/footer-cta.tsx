import { ArrowRight } from "lucide-react";

import { LinkButton } from "@/components/common/link-button";
import { Card, CardContent } from "@/components/ui/card";

export function FooterCTA() {
  return (
    <section className="container mx-auto px-4 py-16 sm:px-6 sm:py-24">
      <Card className="relative overflow-hidden rounded-[2rem] border border-brand-gold/20 bg-card/80 backdrop-blur-xl">
        {/* Background Glow */}

        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-gold/10 blur-3xl" />

        <CardContent className="relative flex flex-col items-center gap-8 px-5 py-14 text-center sm:px-8 sm:py-20">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.35em] text-brand-gold">
              AUREQUIS PARIJAT
            </span>

            <h2 className="font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
              Elevate Every Purchase.
            </h2>

            <p className="mx-auto max-w-md text-muted-foreground">
              Curated brands. Exceptional experiences.
            </p>
          </div>

          <LinkButton
            href="/brands"
            size="lg"
            className="rounded-xl bg-brand-gold px-8 text-black hover:opacity-90"
          >
            Explore Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </LinkButton>
        </CardContent>
      </Card>
    </section>
  );
}
