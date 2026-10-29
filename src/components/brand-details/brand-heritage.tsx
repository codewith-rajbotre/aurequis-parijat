interface BrandHeritageProps {
  theme: any;
  heritage: any[];
}

export default function BrandHeritage({ theme, heritage }: BrandHeritageProps) {
  if (heritage.length === 0) {
    return null;
  }

  return (
    <section
      id="heritage"
      className="py-20 md:py-32"
      style={{
        backgroundColor: theme.background_color,
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <p
          className="text-sm uppercase tracking-[0.35em]"
          style={{
            color: theme.primary_color,
          }}
        >
          Heritage
        </p>

        <h2
          className="mt-5 text-4xl font-light md:text-5xl"
          style={{
            color: theme.text_primary,
          }}
        >
          A Legacy Through Time
        </h2>

        <div
          className="mt-20 border-l-2 pl-10"
          style={{
            borderColor: theme.primary_color,
          }}
        >
          {heritage.map((item) => (
            <div key={item.id} className="relative mb-16">
              <div
                className="absolute -left-12.25 top-1 h-4 w-4 rounded-full"
                style={{
                  backgroundColor: theme.primary_color,
                }}
              />

              <p
                className="text-3xl font-light"
                style={{
                  color: theme.secondary_color,
                }}
              >
                {item.year}
              </p>

              <h3
                className="mt-3 text-2xl font-medium"
                style={{
                  color: theme.text_primary,
                }}
              >
                {item.title}
              </h3>

              {item.description && (
                <p
                  className="mt-4 max-w-3xl leading-8"
                  style={{
                    color: theme.text_secondary,
                  }}
                >
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
