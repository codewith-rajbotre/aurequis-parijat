interface BrandStatisticsProps {
  theme: any;
  statistics: any[];
}

export default function BrandStatistics({
  theme,
  statistics,
}: BrandStatisticsProps) {
  if (statistics.length === 0) {
    return null;
  }

  return (
    <section
      className="border-y py-14 md:py-20"
      style={{
        backgroundColor: theme.background_color,
        borderColor: theme.divider_color,
      }}
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-2 sm:px-6 md:gap-10 lg:grid-cols-4">
        {statistics.map((stat) => (
          <div key={stat.id}>
            <p
              className="text-4xl font-light"
              style={{
                color: theme.secondary_color,
              }}
            >
              {stat.value}
            </p>

            <p
              className="mt-3 text-sm font-medium"
              style={{
                color: theme.text_primary,
              }}
            >
              {stat.label}
            </p>

            {stat.description && (
              <p
                className="mt-2 text-sm leading-6"
                style={{
                  color: theme.text_muted,
                }}
              >
                {stat.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
