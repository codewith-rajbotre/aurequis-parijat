import { ArrowRight, Headphones, Mail, MessageSquare } from "lucide-react";

import { LinkButton } from "@/components/common/link-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const supportOptions = [
  {
    title: "Customer Support",
    description:
      "Our dedicated team is ready to assist with your questions and provide a premium experience.",
    icon: Headphones,
  },
  {
    title: "Brand Assistance",
    description:
      "Need help finding the right luxury brand or collection? We're here to guide you.",
    icon: MessageSquare,
  },
  {
    title: "Contact Us",
    description:
      "Reach out anytime for assistance, feedback, or partnership opportunities.",
    icon: Mail,
  },
];

export default function AboutSupportSection() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-gold">
            Support
          </p>

          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            We're Here Whenever You Need Us
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Luxury is more than exceptional brands. It is also about exceptional
            service before, during, and after every experience.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {supportOptions.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.title}
                className="border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gold/10">
                    <Icon className="h-7 w-7 text-brand-gold" />
                  </div>

                  <CardTitle className="mt-6">{item.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mt-20 border-border bg-card">
          <CardContent className="flex flex-col items-center justify-between gap-8 px-8 py-12 text-center lg:flex-row lg:text-left">
            <div>
              <h3 className="text-3xl font-bold text-foreground">
                Continue Exploring AUREQUIS PARIJAT
              </h3>

              <p className="mt-3 max-w-2xl text-muted-foreground">
                Discover world-renowned brands, thoughtfully curated
                collections, and a premium shopping experience designed around
                excellence.
              </p>
            </div>

            <LinkButton
              href="/brands"
              size="lg"
              className="bg-brand-gold text-black hover:opacity-90"
            >
              Explore Collections
              <ArrowRight className="ml-2 h-5 w-5" />
            </LinkButton>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
