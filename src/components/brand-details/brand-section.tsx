interface BrandSectionProps {
  section: any;
  theme: any;
}

export default function BrandSection({ section, theme }: BrandSectionProps) {
  return (
    <section
      className="py-16 md:py-28"
      style={{
        backgroundColor: theme.background_color,
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        {section.eyebrow && (
          <p
            className="text-sm uppercase tracking-[0.35em]"
            style={{
              color: theme.primary_color,
            }}
          >
            {section.eyebrow}
          </p>
        )}

        {section.title && (
          <h2
            className="mt-5 text-4xl font-light md:text-5xl"
            style={{
              color: theme.text_primary,
            }}
          >
            {section.title}
          </h2>
        )}

        {section.subtitle && (
          <p
            className="mt-4 text-xl"
            style={{
              color: theme.text_secondary,
            }}
          >
            {section.subtitle}
          </p>
        )}

        {section.description && (
          <p
            className="mt-8 max-w-3xl text-lg leading-8"
            style={{
              color: theme.text_secondary,
            }}
          >
            {section.description}
          </p>
        )}

        {section.image_url && (
          <div className="mt-12 overflow-hidden">
            <img
              src={section.image_url}
              alt={section.title ?? ""}
              className="max-h-150 w-full object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
