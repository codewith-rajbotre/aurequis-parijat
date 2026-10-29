interface BrandFeaturesProps {
  theme: any;
  features: any[];
}

export default function BrandFeatures({ theme, features }: BrandFeaturesProps) {
  if (features.length === 0) {
    return null;
  }

  return (
    <section
      className="py-20 md:py-32"
      style={{
        backgroundColor: theme.surface_color,
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:gap-10 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="border-t pt-8"
              style={{
                borderColor: theme.border_color,
              }}
            >
              {feature.icon && (
                <div
                  className="mb-6 text-sm uppercase tracking-[0.2em]"
                  style={{
                    color: theme.accent_color,
                  }}
                >
                  {feature.icon}
                </div>
              )}

              <h3
                className="text-2xl font-light"
                style={{
                  color: theme.text_primary,
                }}
              >
                {feature.title}
              </h3>

              {feature.description && (
                <p
                  className="mt-4 leading-7"
                  style={{
                    color: theme.text_secondary,
                  }}
                >
                  {feature.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
