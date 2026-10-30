"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export type GalleryLayout = "PORTRAIT" | "SQUARE" | "LANDSCAPE";

export type GalleryCard = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  imageUrl: string;
  imageAlt: string;
  linkUrl: string | null;
  layout: GalleryLayout;
};

type GalleryGridProps = {
  items: GalleryCard[];
  variant?: "section" | "page";
};

/* =========================================================
   MASONRY (style Pinterest)
   Chaque carte garde un ratio lié à son format, ce qui crée
   des hauteurs variables et un flux en colonnes compact.
   ========================================================= */

const ASPECT_CLASSES: Record<GalleryLayout, string> = {
  PORTRAIT: "aspect-[3/4]",
  SQUARE: "aspect-square",
  LANDSCAPE: "aspect-[4/3]",
};

const COLUMNS_CLASSES: Record<
  NonNullable<GalleryGridProps["variant"]>,
  string
> = {
  section: "columns-2 md:columns-3",
  page: "columns-2 md:columns-3",
};

const PAGE_WIDE_COLUMNS = "lg:columns-4";

function GalleryCardContent({
  item,
  index,
}: {
  item: GalleryCard;
  index: number;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.35rem] bg-[#d9d8d3] ${
        ASPECT_CLASSES[item.layout] ?? ASPECT_CLASSES.PORTRAIT
      }`}
    >
      <img
        src={item.imageUrl}
        alt={item.imageAlt}
        loading={index === 0 ? "eager" : "lazy"}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
      />
    </div>
  );
}

function ExternalArrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-3.5 w-3.5 sm:h-4 sm:w-4"
    >
      <path
        d="M8 16 16 8M9.5 8H16v6.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GalleryGrid({ items, variant = "page" }: GalleryGridProps) {
  const [preview, setPreview] = useState<GalleryCard | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (preview && !dialog.open) {
      dialog.showModal();
    } else if (!preview && dialog.open) {
      dialog.close();
    }
  }, [preview]);

  useGSAP(
    () => {
      const grid = gridRef.current;

      if (!grid) return;

      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const cards = gsap.utils.toArray<HTMLElement>(
        "[data-gallery-card]",
        grid,
      );

      if (cards.length === 0) return;

      gsap.set(cards, {
        opacity: 0,
        y: 28,
        scale: 0.985,
      });

      const reveal = gsap.timeline({
        scrollTrigger: {
          trigger: grid,
          start: "top 88%",
          once: true,
        },
      });

      reveal.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        clearProps: "transform,opacity",
      });

      // The masonry column height depends on the loaded images, so keep the
      // trigger positions accurate once the web fonts and assets are ready.
      const refresh = () => ScrollTrigger.refresh();

      requestAnimationFrame(refresh);

      if (document.fonts?.ready) {
        document.fonts.ready.then(refresh).catch(() => {});
      }

      return () => reveal.kill();
    },
    { scope: gridRef },
  );

  return (
    <>
      <div
        ref={gridRef}
        className={`${COLUMNS_CLASSES[variant]} ${
          variant === "page" && items.length >= 7 ? PAGE_WIDE_COLUMNS : ""
        } gap-3 sm:gap-4 lg:gap-5`}
      >
        {items.map((item, index) => {
          const linkClasses =
            "absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-black/30 text-white backdrop-blur-md transition hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-4 sm:top-4 sm:h-9 sm:w-9";

          return (
            <article
              key={item.id}
              data-gallery-card
              className="group relative mb-3 break-inside-avoid sm:mb-4 lg:mb-5"
            >
              <div className="relative">
                <GalleryCardContent item={item} index={index} />

                <button
                  type="button"
                  aria-label={`Preview image: ${item.title}`}
                  onClick={() => setPreview(item)}
                  className="absolute inset-0 z-10 w-full rounded-[1.35rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--portfolio-background)]"
                />

                {item.linkUrl && (
                  item.linkUrl.startsWith("/") ? (
                    <Link
                      href={item.linkUrl}
                      aria-label={`Open ${item.title}`}
                      className={linkClasses}
                    >
                      <ExternalArrow />
                    </Link>
                  ) : (
                    <a
                      href={item.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${item.title} in a new tab`}
                      className={linkClasses}
                    >
                      <ExternalArrow />
                    </a>
                  )
                )}
              </div>

            </article>
          );
        })}
        {items.length === 1 && (
          <aside
            data-gallery-card
            aria-label="About this visual archive"
            className="relative mb-3 flex break-inside-avoid flex-col justify-between gap-14 overflow-hidden rounded-[1.35rem] bg-[#111] p-6 text-white sm:mb-4 sm:p-7 lg:mb-5"
          >
            <span
              aria-hidden="true"
              className="absolute -right-16 -top-20 h-56 w-56 rounded-full border-[34px] border-white/[0.07]"
            />
            <span
              aria-hidden="true"
              className="absolute -right-5 top-16 h-28 w-28 rounded-full border border-[#E30613]/60"
            />
            <p className="relative flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E30613]" />
              Notes from the studio
            </p>
            <div className="relative">
              <p className="font-display text-2xl font-medium leading-tight tracking-[-0.04em] sm:text-3xl">
                A space for the in-between.
              </p>
              <p className="mt-3 max-w-xs text-sm leading-6 text-white/60">
                Loose thoughts, visual experiments and work beyond the brief.
              </p>
            </div>
            <span className="relative font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
              Gonar.ui · Visual archive
            </span>
          </aside>
        )}
      </div>
      <dialog
        ref={dialogRef}
        aria-label={preview ? `Image preview: ${preview.title}` : "Image preview"}
        onClose={() => setPreview(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setPreview(null);
        }}
        className="fixed inset-0 m-auto max-h-[92vh] max-w-[94vw] overflow-visible bg-transparent p-0 text-white backdrop:bg-black/85"
      >
        {preview && (
          <div className="relative flex max-h-[92vh] max-w-[94vw] flex-col items-center">
            <button
              type="button"
              autoFocus
              aria-label="Close image preview"
              onClick={() => setPreview(null)}
              className="absolute -right-2 -top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl leading-none text-[#111] shadow-lg sm:-right-3 sm:-top-3"
            >
              ×
            </button>
            <img
              src={preview.imageUrl}
              alt={preview.imageAlt}
              className="max-h-[78vh] max-w-[94vw] rounded-xl object-contain sm:max-h-[82vh]"
            />
          </div>
        )}
      </dialog>
    </>
  );
}
