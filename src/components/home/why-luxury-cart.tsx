import { Globe2, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";

import { SectionHeader } from "@/components/common/section-header";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "Authentic",
    description: "Verified brands",
    icon: ShieldCheck,
  },
  {
    title: "Exclusive",
    description: "Limited collections",
    icon: Sparkles,
  },
  {
    title: "Worldwide",
    description: "Global delivery",
    icon: Globe2,
  },
  {
    title: "Secure",
    description: "Protected checkout",
    icon: LockKeyhole,
  },
];

export function WhyLuxuryCart() {
  return (
    <section className="container mx-auto px-4 py-12 sm:px-6 sm:py-20">
      <SectionHeader
        title="Experience"
        description="Designed for luxury."
        align="center"
      />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {features.map(({ title, description, icon: Icon }) => (
          <Card
            key={title}
            className="group rounded-3xl border-border bg-card/70 transition-all duration-300 hover:-translate-y-2 hover:border-brand-gold/40 hover:shadow-[0_0_40px_rgba(212,175,55,0.12)]"
          >
            <CardContent className="space-y-8 p-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gold/10 transition-all duration-300 group-hover:bg-brand-gold">
                <Icon className="h-8 w-8 text-brand-gold transition-colors duration-300 group-hover:text-black" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-foreground">
                  {title}
                </h3>

                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
