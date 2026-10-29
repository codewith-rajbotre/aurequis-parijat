
interface BrandGalleryProps {
  theme: any;
  gallery: any[];
}

export default function BrandGallery({ theme, gallery }: BrandGalleryProps) {
  if (gallery.length === 0) {
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
        <p
          className="text-sm uppercase tracking-[0.35em]"
          style={{
            color: theme.primary_color,
          }}
        >
          Gallery
        </p>

        <h2
          className="mt-5 text-4xl font-light md:text-5xl"
          style={{
            color: theme.text_primary,
          }}
        >
          The World of {gallery.length > 0 ? "the Brand" : ""}
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
          {gallery.map((item) => (
            <article key={item.id}>
              {/* <div className="relative h-96 overflow-hidden">
                <Image
                  src={item.image_url}
                  alt={item.title ?? "Brand image"}
                  fill
                  className="object-cover transition duration-700 hover:scale-105"
                />
              </div> */}

              {item.title && (
                <h3
                  className="mt-5 text-xl font-medium"
                  style={{
                    color: theme.text_primary,
                  }}
                >
                  {item.title}
                </h3>
              )}

              {item.description && (
                <p
                  className="mt-2"
                  style={{
                    color: theme.text_secondary,
                  }}
                >
                  {item.description}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
