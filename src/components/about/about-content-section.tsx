import { Crown, Gem, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

import { LinkButton } from "@/components/common/link-button";
import { Card, CardContent } from "@/components/ui/card";

const brandHighlights = [
  {
    title: "Prestigious Brands",
    description:
      "Discover globally respected names known for excellence, innovation, and timeless appeal.",
    icon: Crown,
  },
  {
    title: "Curated Collections",
    description:
      "Every category is thoughtfully organized to make exploring luxury effortless.",
    icon: Gem,
  },
  {
    title: "Trusted Experience",
    description:
      "Every interaction is designed with elegance, simplicity, and attention to detail.",
    icon: ShieldCheck,
  },
  {
    title: "Timeless Luxury",
    description:
      "We celebrate brands that have shaped industries and inspired generations.",
    icon: Sparkles,
  },
];

export default function AboutContentSection() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl space-y-20 px-6">
        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Crafted Around the World's Finest Brands
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            AUREQUIS PARIJAT is built to showcase exceptional brands through a
            refined experience that values heritage, craftsmanship, and timeless
            design.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {brandHighlights.map((feature) => {
            const FeatureIcon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:border-brand-gold/40"
              >
                <CardContent className="space-y-6 p-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gold/10">
                    <FeatureIcon className="h-7 w-7 text-brand-gold" />
                  </div>

                  <h3 className="text-xl font-semibold text-card-foreground">
                    {feature.title}
                  </h3>

                  <p className="leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="border-border bg-card">
          <CardContent className="px-8 py-12 text-center">
            <h3 className="text-3xl font-bold text-foreground">
              More Than Shopping
            </h3>

            <p className="mx-auto mt-6 max-w-3xl leading-8 text-muted-foreground">
             AUREQUIS PARIJAT is a destination where remarkable brands, exceptional
              craftsmanship, and premium experiences come together in one
              elegant platform.
            </p>
          </CardContent>
        </Card>

        <div className="text-center">
          <h3 className="text-3xl font-bold text-foreground">
            Begin Your Luxury Journey
          </h3>

          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Discover collections that celebrate heritage, craftsmanship, and
            timeless excellence.
          </p>

          <LinkButton
            href="/brands"
            size="lg"
            className="mt-8 bg-brand-gold px-8 text-black hover:opacity-90"
          >
            Explore Collections
            <ArrowRight className="ml-2 h-5 w-5" />
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
