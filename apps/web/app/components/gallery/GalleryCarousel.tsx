"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  Cancel01Icon,
  PauseIcon,
  PlayIcon,
} from "@hugeicons/core-free-icons";

import type { GalleryCard } from "./GalleryGrid";

type GalleryCarouselProps = {
  items: GalleryCard[];
};

const AUTOPLAY_INTERVAL = 6500;
const MAX_VISIBLE_OFFSET = 2;
const SWIPE_THRESHOLD = 52;

const CARD_SIZE_CLASSES =
  "h-[clamp(330px,54vh,540px)] w-[min(76vw,320px)] sm:w-[min(56vw,400px)] lg:w-[min(36vw,460px)] xl:w-[470px]";

const CONTROL_BUTTON_CLASSES =
  "flex h-11 w-11 items-center justify-center rounded-full border border-[var(--portfolio-border)] bg-[var(--portfolio-surface)] text-[var(--portfolio-text-primary)] shadow-[0_3px_12px_rgba(0,0,0,0.03)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--portfolio-accent)] hover:text-[var(--portfolio-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--portfolio-background)]";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

/**
 * Circular offset so slides can wrap in both directions.
 * e.g. for 5 slides, offsets are -2, -1, 0, 1, 2.
 */
function getOffset(index: number, activeIndex: number, total: number) {
  if (total === 0) return 0;

  const half = Math.floor(total / 2);

  return ((index - activeIndex + total + half) % total) - half;
}

function ExternalArrow() {
  return (
    <HugeiconsIcon
      icon={ArrowUpRight01Icon}
      size={16}
      strokeWidth={1.7}
      aria-hidden="true"
    />
  );
}

export function GalleryCarousel({ items }: GalleryCarouselProps) {
  const total = items.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [preview, setPreview] = useState<GalleryCard | null>(null);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const dragged = useRef(false);

  const resolvedActiveIndex =
    total === 0 ? 0 : Math.min(activeIndex, total - 1);

  const activeItem = items[resolvedActiveIndex] ?? items[0];

  const goTo = useCallback(
    (index: number) => {
      if (total === 0) return;

      setActiveIndex(((index % total) + total) % total);
    },
    [total],
  );

  const step = useCallback(
    (direction: number) => {
      setActiveIndex((current) =>
        total === 0 ? 0 : (current + direction + total) % total,
      );
    },
    [total],
  );

  /* =========================================================
     REDUCED MOTION
     ========================================================= */

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  /* =========================================================
     AUTOPLAY — only while the carousel is visible and idle
     ========================================================= */

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.35 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (
      total < 2 ||
      !autoplayEnabled ||
      reducedMotion ||
      isHovered ||
      isFocused ||
      preview !== null ||
      !isInView
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % total);
    }, AUTOPLAY_INTERVAL);

    return () => window.clearInterval(timer);
  }, [
    activeIndex,
    total,
    autoplayEnabled,
    reducedMotion,
    isHovered,
    isFocused,
    preview,
    isInView,
  ]);

  /* =========================================================
     PREVIEW DIALOG
     ========================================================= */

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (preview && !dialog.open) {
      dialog.showModal();
    } else if (!preview && dialog.open) {
      dialog.close();
    }
  }, [preview]);

  /* =========================================================
     KEYBOARD
     ========================================================= */

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (total < 2) return;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    } else if (event.key === "Home") {
      event.preventDefault();
      goTo(0);
    } else if (event.key === "End") {
      event.preventDefault();
      goTo(total - 1);
    }
  };

  /* =========================================================
     DRAG / SWIPE
     ========================================================= */

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (total < 2) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;

    pointerStart.current = { x: event.clientX, y: event.clientY };
    dragged.current = false;
  };

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    const start = pointerStart.current;
    if (!start) return;

    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;

    if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
      dragged.current = true;
    }
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;

    if (!start || total < 2) return;

    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;

    if (
      Math.abs(dx) >= SWIPE_THRESHOLD &&
      Math.abs(dx) > Math.abs(dy) * 1.2
    ) {
      if (dx < 0) {
        step(1);
      } else {
        step(-1);
      }
    }
  };

  const handleClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!dragged.current) return;

    dragged.current = false;
    event.preventDefault();
    event.stopPropagation();
  };

  if (!activeItem) {
    return null;
  }

  return (
    <div className="relative">
      {/* =====================================================
          STAGE
          ===================================================== */}

      <div
        ref={stageRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Creative gallery carousel"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          pointerStart.current = null;
        }}
        onPointerLeave={() => {
          pointerStart.current = null;
        }}
        onClickCapture={handleClickCapture}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocusCapture={() => setIsFocused(true)}
        onBlurCapture={(event) => {
          if (
            !event.currentTarget.contains(
              event.relatedTarget as Node | null,
            )
          ) {
            setIsFocused(false);
          }
        }}
        className="relative mx-auto h-[clamp(330px,54vh,540px)] w-full max-w-[1200px] cursor-grab touch-pan-y select-none [perspective:1600px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-accent)] focus-visible:ring-offset-8 focus-visible:ring-offset-[var(--portfolio-background)] active:cursor-grabbing [--carousel-shift:46%] sm:[--carousel-shift:52%] lg:[--carousel-shift:56%]"
      >
        {/* AMBIENT GLOW */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[85%] w-[min(78%,760px)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(227,6,19,0.13),transparent_66%)] blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[2%] left-1/2 h-10 w-[min(52%,460px)] -translate-x-1/2 rounded-[50%] bg-[#111111]/10 blur-2xl"
        />

        {/* ===================================================
            CARDS
            =================================================== */}

        <div className="relative h-full w-full [transform-style:preserve-3d]">
          {items.map((item, index) => {
            const offset = getOffset(index, resolvedActiveIndex, total);
            const depth = Math.abs(offset);
            const isActive = offset === 0;
            const visible = depth <= MAX_VISIBLE_OFFSET;

            const transform = [
              "translate(-50%, -50%)",
              `translateX(calc(${offset} * var(--carousel-shift)))`,
              `translateZ(${-depth * 190}px)`,
              `rotateY(${-offset * 24}deg)`,
              `scale(${(1 - depth * 0.07).toFixed(2)})`,
            ].join(" ");

            const opacity = isActive
              ? 1
              : depth === 1
                ? 0.86
                : 0.5;

            const linkClasses =
              "absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-md transition hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-5 sm:top-5";

            return (
              <article
                key={item.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${total}: ${item.title}`}
                aria-hidden={!visible}
                inert={!visible}
                style={{
                  transform,
                  opacity: visible ? opacity : 0,
                  zIndex: 40 - depth * 10,
                  pointerEvents: visible ? "auto" : "none",
                  transition: reducedMotion
                    ? "none"
                    : "transform 760ms cubic-bezier(0.16, 1, 0.3, 1), opacity 520ms ease",
                }}
                className={`group absolute left-1/2 top-1/2 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0d0d0d] shadow-[0_45px_110px_-35px_rgba(0,0,0,0.55)] [backface-visibility:hidden] will-change-transform ${CARD_SIZE_CLASSES}`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  loading={depth <= 1 ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                  className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out ${
                    isActive ? "group-hover:scale-[1.035]" : ""
                  }`}
                />

                {/* DEPTH VEIL */}

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/10"
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-black transition-opacity duration-500"
                  style={{ opacity: isActive ? 0 : 0.18 + depth * 0.09 }}
                />

                {/* ACTIVE RING */}

                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset transition-colors duration-500 ${
                    isActive ? "ring-white/25" : "ring-white/10"
                  }`}
                />

                {/* TOP META */}

                <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-4 sm:p-5">
                  <span className="rounded-full border border-white/20 bg-black/25 px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.14em] text-white/85 backdrop-blur-md">
                    {pad(index + 1)}
                  </span>
                </div>

                {/* BOTTOM CAPTION */}

                <div
                  className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 p-5 transition-all duration-500 sm:p-7 ${
                    isActive
                      ? "translate-y-0 opacity-100"
                      : "translate-y-3 opacity-0"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--portfolio-accent)]" />
                    <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/60">
                      {item.category ?? "Visual experiment"}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-[clamp(1.4rem,2.4vw,1.9rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-white">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="mt-2 line-clamp-2 max-w-[32ch] text-[13px] leading-6 text-white/60">
                      {item.description}
                    </p>
                  )}

                  <p className="mt-4 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white/70">
                    Open preview
                    <HugeiconsIcon
                      icon={ArrowUpRight01Icon}
                      size={14}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </p>
                </div>

                {/* CLICK TARGET */}

                <button
                  type="button"
                  aria-label={
                    isActive
                      ? `Enlarge ${item.title}`
                      : `Bring ${item.title} to the center`
                  }
                  onClick={() => {
                    if (isActive) {
                      setPreview(item);
                    } else {
                      goTo(index);
                    }
                  }}
                  className={`absolute inset-0 z-20 w-full rounded-[1.75rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white ${
                    isActive ? "cursor-zoom-in" : "cursor-pointer"
                  }`}
                />

                {/* EXTERNAL LINK */}

                {item.linkUrl &&
                  (item.linkUrl.startsWith("/") ? (
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
                  ))}
              </article>
            );
          })}
        </div>
      </div>

      {/* =====================================================
          CONTROLS
          ===================================================== */}

      <div className="mx-auto mt-8 flex max-w-[1200px] flex-wrap items-center justify-between gap-4 border-t border-[var(--portfolio-border)] pt-5 sm:mt-10 sm:pt-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] tracking-[0.14em] text-[var(--portfolio-text-muted)]">
            <span className="text-[var(--portfolio-text-primary)]">
              {pad(resolvedActiveIndex + 1)}
            </span>
            <span className="mx-1.5 text-[var(--portfolio-border)]">/</span>
            {pad(total)}
          </span>

          <span
            aria-hidden="true"
            className="hidden h-3 w-px bg-[var(--portfolio-border)] sm:block"
          />

          <span className="hidden text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--portfolio-text-muted)] sm:block">
            Drag or use arrow keys
          </span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          {total > 1 && (
            <div className="hidden items-center gap-0.5 sm:flex">
              {items.map((item, index) => {
                const isActive = index === resolvedActiveIndex;

                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Show image ${index + 1}: ${item.title}`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => goTo(index)}
                    className="group flex h-7 items-center px-1 focus-visible:outline-none"
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 ${
                        isActive
                          ? "h-1.5 w-6 bg-[var(--portfolio-accent)]"
                          : "h-1.5 w-1.5 bg-[var(--portfolio-border)] group-hover:bg-[var(--portfolio-text-muted)]"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          )}

          {total > 1 && (
            <div className="flex items-center gap-2">
              {!reducedMotion && (
                <button
                  type="button"
                  aria-label={
                    autoplayEnabled
                      ? "Pause slideshow"
                      : "Play slideshow"
                  }
                  onClick={() =>
                    setAutoplayEnabled((enabled) => !enabled)
                  }
                  className={CONTROL_BUTTON_CLASSES}
                >
                  <HugeiconsIcon
                    icon={autoplayEnabled ? PauseIcon : PlayIcon}
                    size={16}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </button>
              )}

              <button
                type="button"
                aria-label="Previous image"
                onClick={() => step(-1)}
                className={CONTROL_BUTTON_CLASSES}
              >
                <HugeiconsIcon
                  icon={ArrowLeft01Icon}
                  size={18}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </button>

              <button
                type="button"
                aria-label="Next image"
                onClick={() => step(1)}
                className={CONTROL_BUTTON_CLASSES}
              >
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={18}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Image {resolvedActiveIndex + 1} of {total}: {activeItem.title}
      </p>

      {/* =====================================================
          PREVIEW
          ===================================================== */}

      <dialog
        ref={dialogRef}
        aria-label={
          preview ? `Image preview: ${preview.title}` : "Image preview"
        }
        onClose={() => setPreview(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setPreview(null);
        }}
        className="fixed inset-0 m-auto max-h-[92vh] w-[min(94vw,1100px)] overflow-visible bg-transparent p-0 text-white backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        {preview && (
          <div className="relative flex max-h-[92vh] flex-col items-center">
            <button
              type="button"
              autoFocus
              aria-label="Close image preview"
              onClick={() => setPreview(null)}
              className="absolute -right-2 -top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#111] shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-accent)] focus-visible:ring-offset-2 sm:-right-3 sm:-top-3"
            >
              <HugeiconsIcon
                icon={Cancel01Icon}
                size={20}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </button>

            <div className="w-full overflow-hidden rounded-2xl bg-[#0b0b0b] shadow-2xl">
              <img
                src={preview.imageUrl}
                alt={preview.imageAlt}
                className="mx-auto max-h-[76vh] w-auto max-w-full object-contain sm:max-h-[80vh]"
              />

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-4">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/45">
                    {preview.category ?? "Visual experiment"}
                  </p>
                  <p className="mt-1 font-display text-lg font-medium tracking-[-0.02em] text-white">
                    {preview.title}
                  </p>
                </div>

                {preview.linkUrl &&
                  (preview.linkUrl.startsWith("/") ? (
                    <Link
                      href={preview.linkUrl}
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-medium text-white transition hover:border-white/50 hover:bg-white/5"
                    >
                      Open project
                      <ExternalArrow />
                    </Link>
                  ) : (
                    <a
                      href={preview.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-medium text-white transition hover:border-white/50 hover:bg-white/5"
                    >
                      Open link
                      <ExternalArrow />
                    </a>
                  ))}
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
