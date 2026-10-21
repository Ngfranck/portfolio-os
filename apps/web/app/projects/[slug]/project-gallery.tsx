
"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export function ProjectGallery({
  images,
  title,
}: ProjectGalleryProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        return;
      }

      const label = section.querySelector<HTMLElement>(
        "[data-gallery-label]"
      );

      const titleElement = section.querySelector<HTMLElement>(
        "[data-gallery-title]"
      );

      const description = section.querySelector<HTMLElement>(
        "[data-gallery-description]"
      );

      const gallery = section.querySelector<HTMLElement>(
        "[data-gallery-grid]"
      );

      const galleryImages = section.querySelectorAll<HTMLElement>(
        "[data-gallery-image]"
      );

      gsap.set(
        [
          label,
          titleElement,
          description,
          gallery,
        ].filter(Boolean),
        {
          opacity: 0,
          y: 30,
        }
      );

      gsap.set(galleryImages, {
        opacity: 0,
        y: 45,
        scale: 0.975,
      });

      gsap.set(titleElement, {
        opacity: 0,
        y: 50,
        clipPath: "inset(0 0 100% 0)",
      });

      // ------------------------------------------------------------
      // HEADER
      // ------------------------------------------------------------

      const headerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      if (label) {
        headerTimeline.to(label, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      }

      if (titleElement) {
        headerTimeline.to(
          titleElement,
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.9,
            ease: "power4.out",
          },
          "-=0.3"
        );
      }

      if (description) {
        headerTimeline.to(
          description,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.55"
        );
      }

      // ------------------------------------------------------------
      // GALLERY
      // ------------------------------------------------------------

      const galleryTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: gallery,
          start: "top 88%",
          end: "bottom 15%",
          toggleActions: "play reverse play reverse",
        },
      });

      if (gallery) {
        galleryTimeline.to(gallery, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }

      if (galleryImages.length > 0) {
        galleryTimeline.to(
          galleryImages,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.14,
            ease: "power3.out",
          },
          "-=0.25"
        );
      }

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    },
    {
      scope: sectionRef,
    }
  );

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        border-t
        border-[var(--portfolio-border)]
        bg-[var(--portfolio-background)]
        px-5
        py-24
        text-[var(--portfolio-text-primary)]
        transition-colors
        duration-[var(--portfolio-motion-normal)]
        sm:px-8
        sm:py-28
        lg:px-16
        lg:py-36
      "
    >
      <div className="mx-auto max-w-[1320px]">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className="
            mb-14
            flex
            flex-col
            gap-6
            sm:mb-16
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div>
            {/* LABEL */}

            <div
              data-gallery-label
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[var(--portfolio-border)]
                bg-[var(--portfolio-surface)]
                px-3
                py-2
                font-display
                text-[11px]
                font-medium
                uppercase
                tracking-[0.08em]
                text-[var(--portfolio-text-secondary)]
                shadow-[0_4px_18px_rgba(0,0,0,0.025)]
                dark:bg-white/[0.035]
                dark:shadow-none
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[var(--portfolio-accent)]
                "
              />

              <span>Visuals</span>
            </div>

            {/* TITLE */}

            <h2
              data-gallery-title
              className="
                mt-6
                font-display
                text-[clamp(2.6rem,5.3vw,5rem)]
                font-semibold
                leading-[0.92]
                tracking-[var(--portfolio-tracking-display)]
              "
            >
              <span className="text-[var(--portfolio-text-primary)]">
                Inside
              </span>{" "}
              <span
                className="
                  font-normal
                  text-[var(--portfolio-text-muted)]
                "
              >
                the project.
              </span>
            </h2>
          </div>

          {/* DESCRIPTION */}

          <p
            data-gallery-description
            className="
              max-w-[420px]
              font-body
              text-[13px]
              leading-[1.7]
              text-[var(--portfolio-text-secondary)]
              sm:text-[14px]
            "
          >
            A closer look at the visual identity, key screens, and
            product experience.
          </p>
        </div>

        {/* =====================================================
            GALLERY
        ===================================================== */}

        <div
          data-gallery-grid
          className="
            grid
            grid-cols-1
            gap-4
            sm:gap-5
          "
        >
          {/* =================================================
              IMAGE 01 — LARGE
          ================================================= */}

          {images[0] && (
            <GalleryImage
              src={images[0]}
              alt={`${title} project design overview`}
              aspect="aspect-[16/9]"
              priority
            />
          )}

          {/* =================================================
              IMAGES 02 + 03
          ================================================= */}

          {(images[1] || images[2]) && (
            <div
              className="
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-2
                sm:gap-5
              "
            >
              {images[1] && (
                <GalleryImage
                  src={images[1]}
                  alt={`${title} visual identity and interface detail`}
                  aspect="aspect-[4/3]"
                />
              )}

              {images[2] && (
                <GalleryImage
                  src={images[2]}
                  alt={`${title} digital product experience`}
                  aspect="aspect-[4/3]"
                />
              )}
            </div>
          )}

          {/* =================================================
              IMAGE 04 — LARGE
          ================================================= */}

          {images[3] && (
            <GalleryImage
              src={images[3]}
              alt={`${title} final design presentation`}
              aspect="aspect-[16/9]"
            />
          )}

          {/* =================================================
              EXTRA IMAGES
          ================================================= */}

          {images.length > 4 && (
            <div
              className="
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-2
                lg:grid-cols-3
                sm:gap-5
              "
            >
              {images.slice(4).map((image, index) => (
                <GalleryImage
                  key={`${image}-${index}`}
                  src={image}
                  alt={`${title} additional design detail ${index + 5}`}
                  aspect="aspect-[4/3]"
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

/* ============================================================
   GALLERY IMAGE
============================================================ */

interface GalleryImageProps {
  src: string;
  alt: string;
  aspect: string;
  priority?: boolean;
}

function GalleryImage({
  src,
  alt,
  aspect,
  priority = false,
}: GalleryImageProps) {
  return (
    <div
      data-gallery-image
      className={`
        group
        relative
        ${aspect}
        overflow-hidden
        rounded-[var(--portfolio-radius-lg)]
        border
        border-[var(--portfolio-border)]
        bg-[var(--portfolio-surface)]
      `}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 1200px"
        className="
          object-cover
          transition-transform
          duration-700
          ease-out
          group-hover:scale-[1.025]
        "
      />

      {/* SUBTLE OVERLAY */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-black/[0.02]
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
          dark:bg-white/[0.02]
        "
      />
    </div>
  );
}
