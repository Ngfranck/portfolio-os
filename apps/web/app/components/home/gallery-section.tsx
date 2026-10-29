import Link from "next/link";

import { GalleryGrid } from "../gallery/GalleryGrid";

type GalleryItem = Parameters<typeof GalleryGrid>[0]["items"][number];

export function GallerySection({
  items,
}: {
  items: GalleryItem[];
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-section-title"
      className="mx-auto w-full max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40"
    >
      <div className="mb-10 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--portfolio-accent)]">
            Selected visual experiments
          </p>
          <h2
            id="gallery-section-title"
            className="font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold tracking-[-0.055em] text-[var(--portfolio-text-primary)]"
          >
            A creative <span className="text-[var(--portfolio-text-muted)]">canvas.</span>
          </h2>
        </div>
        <Link
          href="/gallery"
          className="w-fit rounded-full border border-[var(--portfolio-border)] px-5 py-3 text-sm font-medium text-[var(--portfolio-text-primary)] transition-colors hover:border-[var(--portfolio-text-primary)]"
        >
          Explore the gallery <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <GalleryGrid items={items} />
    </section>
  );
}
