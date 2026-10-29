"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type GalleryCard = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  imageUrl: string;
  imageAlt: string;
  linkUrl: string | null;
  layout: "PORTRAIT" | "SQUARE" | "LANDSCAPE";
};

const tileClasses = [
  "col-span-2 row-span-3 sm:col-span-4 lg:col-span-7",
  "col-span-1 row-span-2 sm:col-span-2 lg:col-span-5",
  "col-span-1 row-span-2 sm:col-span-2 lg:col-span-5",
  "col-span-1 row-span-2 sm:col-span-3 lg:col-span-4",
  "col-span-1 row-span-3 sm:col-span-3 lg:col-span-4",
  "col-span-2 row-span-2 sm:col-span-6 lg:col-span-4",
];

function getTileClass(
  index: number,
  layout: GalleryCard["layout"],
  itemCount: number,
) {
  if (itemCount === 1) {
    return "col-span-2 row-span-3 sm:col-span-4 lg:col-span-8";
  }

  const tileClass = tileClasses[index % tileClasses.length];

  if (layout === "LANDSCAPE") {
    return tileClass.replace("row-span-3", "row-span-2");
  }

  if (layout === "PORTRAIT") {
    return tileClass.replace("row-span-2", "row-span-3");
  }

  return tileClass;
}

function GalleryCardContent({
  item,
  index,
}: {
  item: GalleryCard;
  index: number;
}) {
  return (
    <div className="group relative isolate h-full min-h-0 overflow-hidden rounded-[1.35rem] bg-[#d9d8d3]">
      <img
        src={item.imageUrl}
        alt={item.imageAlt}
        loading={index === 0 ? "eager" : "lazy"}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/5 transition-colors duration-500 group-hover:from-black/55" />

      <span className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/25 bg-black/20 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-[#E30613]" />
        {item.category || "Visual study"} · {String(index + 1).padStart(2, "0")}
      </span>

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
        <div className="min-w-0">
          <h2 className="font-display text-xl font-medium leading-tight tracking-[-0.035em] text-white sm:text-2xl">
            {item.title}
          </h2>
          {item.description && (
            <p className="mt-2 line-clamp-2 max-w-xl text-xs leading-5 text-white/75 sm:text-sm">
              {item.description}
            </p>
          )}
        </div>
        {item.linkUrl && (
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-lg text-[#111] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
          >
            ↗
          </span>
        )}
      </div>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 rounded-[1rem] border border-white/0 transition-colors duration-500 group-hover:border-white/25"
      />
    </div>
  );
}

export function GalleryGrid({
  items,
}: {
  items: GalleryCard[];
}) {
  const [preview, setPreview] = useState<GalleryCard | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (preview && !dialog.open) {
      dialog.showModal();
    } else if (!preview && dialog.open) {
      dialog.close();
    }
  }, [preview]);

  return (
    <>
      <div className="grid auto-rows-[clamp(7.5rem,19vw,12rem)] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[clamp(8.5rem,16vw,13rem)] sm:gap-4 lg:auto-rows-[clamp(9rem,12vw,11rem)] lg:grid-cols-12 lg:gap-5">
        {items.map((item, index) => {
          const content = (
            <GalleryCardContent item={item} index={index} />
          );
          const className = `${getTileClass(index, item.layout, items.length)} relative min-h-0`;
          const focusClass =
            "block h-full rounded-[1.35rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-accent)] focus-visible:ring-offset-4";

          return (
            <article key={item.id} className={className}>
              {item.linkUrl ? (
                item.linkUrl.startsWith("/") ? (
                  <Link href={item.linkUrl} className={focusClass}>
                    {content}
                  </Link>
                ) : (
                  <a
                    href={item.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={focusClass}
                  >
                    {content}
                  </a>
                )
              ) : (
                content
              )}
              <button
                type="button"
                aria-label={`Preview image: ${item.title}`}
                onClick={() => setPreview(item)}
                className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/25 text-white backdrop-blur-sm transition hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.7" />
                  <path d="m16 16 4.2 4.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </button>
            </article>
          );
        })}
        {items.length === 1 && (
          <aside
            aria-label="About this visual archive"
            className="relative col-span-2 row-span-2 flex min-h-0 flex-col justify-between overflow-hidden rounded-[1.35rem] bg-[#111] p-6 text-white sm:col-span-2 sm:row-span-3 sm:p-7 lg:col-span-4"
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
              className="absolute -right-3 -top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl leading-none text-[#111] shadow-lg"
            >
              ×
            </button>
            <img
              src={preview.imageUrl}
              alt={preview.imageAlt}
              className="max-h-[82vh] max-w-[94vw] rounded-xl object-contain"
            />
            <p className="mt-3 text-center text-sm text-white/90">{preview.title}</p>
          </div>
        )}
      </dialog>
    </>
  );
}
