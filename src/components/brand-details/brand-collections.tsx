
interface BrandCollectionsProps {
  theme: any;
  collections: any[];
}

export default function BrandCollections({
  theme,
  collections,
}: BrandCollectionsProps) {
  if (collections.length === 0) {
    return null;
  }

  return (
    <section
      id="collections"
      className="py-20 md:py-32"
      style={{
        backgroundColor: theme.background_color,
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <p
          className="text-sm uppercase tracking-[0.4em]"
          style={{
            color: theme.primary_color,
          }}
        >
          Collections
        </p>

        <h2
          className="mt-5 text-4xl font-light md:text-5xl"
          style={{
            color: theme.text_primary,
          }}
        >
          Discover the Collection
        </h2>

        {/* <div className="mt-12 grid gap-8 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {collections.map((collection) => (
            <article key={collection.id}>
              <div
                className="relative h-80 overflow-hidden"
                style={{
                  backgroundColor: theme.surface_color,
                }}
              >
                {collection.image_url ? (
                  <Image
                    src={collection.image_url}
                    alt={collection.name}
                    fill
                    className="object-cover transition duration-700 hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span
                      style={{
                        color: theme.text_muted,
                      }}
                    >
                      {collection.name}
                    </span>
                  </div>
                )}
              </div>

              <h3
                className="mt-6 text-2xl font-light"
                style={{
                  color: theme.text_primary,
                }}
              >
                {collection.name}
              </h3>

              {collection.description && (
                <p
                  className="mt-3 leading-7"
                  style={{
                    color: theme.text_secondary,
                  }}
                >
                  {collection.description}
                </p>
              )}
            </article>
          ))}
        </div> */}
      </div>
    </section>
  );
}
