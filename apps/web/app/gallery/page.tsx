import type { Metadata } from "next";
import Link from "next/link";

import { GalleryGrid } from "../components/gallery/GalleryGrid";
import { getPublishedGalleryItems } from "../../services/gallery/gallery.service";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Creative Gallery — Visual Experiments & Selected Work",
  description:
    "Explore a creative canvas of visual experiments, selected design work and secondary projects by Franck Ngoka, UX/UI, web and brand designer.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    type: "website",
    title: "Creative Gallery — Gonar.ui",
    description:
      "A curated canvas of visual experiments and selected creative work by Franck Ngoka.",
  },
};

export default async function GalleryPage() {
  const items = await getPublishedGalleryItems();

  return (
    <main className="min-h-screen">
      <header className="mx-auto w-full max-w-[1440px] px-5 pb-10 pt-36 sm:px-8 sm:pb-12 sm:pt-44 lg:px-12 lg:pt-52">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end lg:gap-16">
          <div>
            <p className="mb-5 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--portfolio-accent)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--portfolio-accent)]" />
              Franck Ngoka / Visual archive
            </p>
            <h1 className="max-w-4xl font-display text-h1 font-semibold leading-[0.98] tracking-[-0.055em] text-[var(--portfolio-text-primary)]">
              A creative{" "}
              <span className="text-[var(--portfolio-text-muted)]">canvas.</span>
            </h1>
          </div>
          <p className="max-w-sm text-sm leading-7 text-[var(--portfolio-text-secondary)] sm:text-base lg:pb-1">
            Experiments, visual studies and selected work, arranged as an
            evolving collection beyond the case studies.
          </p>
        </div>
        <div className="mt-9 flex items-center justify-between gap-4 border-y border-[var(--portfolio-border)] py-3.5 text-[9px] font-medium uppercase tracking-[0.16em] text-[var(--portfolio-text-muted)] sm:mt-12 sm:text-[10px]">
          <span>Experiments · Studies · Visual notes</span>
          <span className="shrink-0 font-mono">
            {String(items.length).padStart(2, "0")} works
          </span>
        </div>
      </header>

      <section
        aria-label="Published gallery works"
        className="mx-auto w-full max-w-[1440px] px-5 pb-28 sm:px-8 sm:pb-36 lg:px-12"
      >
        {items.length > 0 ? (
          <GalleryGrid items={items} />
        ) : (
          <div className="rounded-3xl border border-dashed border-[var(--portfolio-border)] px-6 py-20 text-center">
            <p className="font-display text-xl font-medium text-[var(--portfolio-text-primary)]">
              New work is being curated.
            </p>
            <p className="mt-2 text-sm text-[var(--portfolio-text-secondary)]">
              Check back soon to explore the gallery.
            </p>
            <Link
              href="/#projects"
              className="mt-6 inline-flex rounded-full bg-[var(--portfolio-text-primary)] px-5 py-3 text-sm font-medium text-[var(--portfolio-background)]"
            >
              Explore selected projects
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
