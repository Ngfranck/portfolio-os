"use client";

import { useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   PUBLIC TESTIMONIAL TYPES
============================================================ */

type PublicTestimonial = {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  content: string;
  avatar: string | null;
  rating: number | null;
  featured: boolean;
  sortOrder: number;
};

type TestimonialsSectionProps = {
  testimonials?: PublicTestimonial[];
};

/* ============================================================
   TESTIMONIALS SECTION
============================================================ */

export function TestimonialsSection({
  testimonials = [],
}: TestimonialsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    const container = carouselRef.current;

    if (!container) {
      return;
    }

    const cards = container.children;

    if (!cards[index]) {
      return;
    }

    const card = cards[index] as HTMLElement;

    container.scrollTo({
      left: card.offsetLeft - container.offsetLeft,
      behavior: "smooth",
    });

    setActiveIndex(index);
  };

  const scrollCarousel = (direction: "left" | "right") => {
    const container = carouselRef.current;

    if (!container) {
      return;
    }

    if (testimonials.length === 0) {
      return;
    }

    const amount = container.clientWidth * 0.85;

    container.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });

    window.setTimeout(() => {
      const currentContainer = carouselRef.current;

      if (!currentContainer) {
        return;
      }

      const scrollLeft = currentContainer.scrollLeft;

      const firstCard = currentContainer.children[0] as
        | HTMLElement
        | undefined;

      if (!firstCard) {
        return;
      }

      const cardWidth = firstCard.clientWidth || 1;

      const index = Math.round(scrollLeft / cardWidth);

      setActiveIndex(
        Math.min(
          Math.max(index, 0),
          testimonials.length - 1,
        ),
      );
    }, 350);
  };

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      if (
        window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches
      ) {
        return;
      }

      const ctx = gsap.context(() => {
        const badge = section.querySelector(
          "[data-testimonials-badge]",
        );

        const title = section.querySelector(
          "[data-testimonials-title]",
        );

        const description = section.querySelector(
          "[data-testimonials-description]",
        );

        const carousel = section.querySelector(
          "[data-testimonials-carousel]",
        );

        const cards = section.querySelectorAll(
          "[data-testimonial-card]",
        );

        const controls = section.querySelector(
          "[data-testimonials-controls]",
        );

        const bottomCta = section.querySelector(
          "[data-testimonials-cta]",
        );

        const bottomTitle = section.querySelector(
          "[data-testimonials-cta-title]",
        );

        const bottomDescription = section.querySelector(
          "[data-testimonials-cta-description]",
        );

        const bottomButton = section.querySelector(
          "[data-testimonials-cta-button]",
        );

        /* ============================================================
           INITIAL STATES
        ============================================================ */

        gsap.set(
          [
            badge,
            title,
            description,
            carousel,
            controls,
            bottomCta,
          ],
          {
            opacity: 0,
            y: 35,
          },
        );

        if (cards.length > 0) {
          gsap.set(cards, {
            opacity: 0,
            y: 50,
            scale: 0.97,
          });
        }

        gsap.set(
          [bottomTitle, bottomDescription],
          {
            opacity: 0,
            x: -25,
          },
        );

        gsap.set(bottomButton, {
          opacity: 0,
          x: 25,
          scale: 0.96,
        });

        /* ============================================================
           HEADER
        ============================================================ */

        if (badge || title || description) {
          const headerTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
          });

          if (badge) {
            headerTimeline.to(badge, {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "power3.out",
            });
          }

          if (title) {
            headerTimeline.to(
              title,
              {
                opacity: 1,
                y: 0,
                duration: 0.75,
                ease: "power3.out",
              },
              "-=0.3",
            );
          }

          if (description) {
            headerTimeline.to(
              description,
              {
                opacity: 1,
                y: 0,
                duration: 0.65,
                ease: "power3.out",
              },
              "-=0.4",
            );
          }
        }

        /* ============================================================
           CAROUSEL
        ============================================================ */

        if (carousel) {
          gsap.to(carousel, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: carousel,
              start: "top 82%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
          });
        }

        /* ============================================================
           TESTIMONIAL CARDS
        ============================================================ */

        if (cards.length > 0 && carousel) {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: carousel,
              start: "top 76%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
          });
        }

        /* ============================================================
           CONTROLS
        ============================================================ */

        if (controls) {
          gsap.to(controls, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: controls,
              start: "top 88%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
          });
        }

        /* ============================================================
           BOTTOM CTA
        ============================================================ */

        if (bottomCta) {
          const bottomTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: bottomCta,
              start: "top 82%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
          });

          bottomTimeline.to(bottomCta, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          });

          if (bottomTitle) {
            bottomTimeline.to(
              bottomTitle,
              {
                opacity: 1,
                x: 0,
                duration: 0.55,
                ease: "power3.out",
              },
              "-=0.35",
            );
          }

          if (bottomDescription) {
            bottomTimeline.to(
              bottomDescription,
              {
                opacity: 1,
                x: 0,
                duration: 0.5,
                ease: "power3.out",
              },
              "-=0.3",
            );
          }

          if (bottomButton) {
            bottomTimeline.to(
              bottomButton,
              {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.55,
                ease: "power3.out",
              },
              "-=0.35",
            );
          }
        }

        /* ============================================================
           REFRESH SCROLLTRIGGER
        ============================================================ */

        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      }, section);

      return () => {
        ctx.revert();
      };
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="
        relative
        overflow-hidden
        bg-[var(--portfolio-background)]
        px-4
        py-[var(--portfolio-space-7)]
        text-[var(--portfolio-text-primary)]
        sm:px-6
        lg:px-8
      "
    >
      {/* =====================================================
          CONTAINER
      ===================================================== */}

      <div className="mx-auto max-w-[1320px]">
        {/* ===================================================
            HEADER
        =================================================== */}

        <div
          className="
            mx-auto
            max-w-[850px]
            text-center
          "
        >
          {/* BADGE */}

          <div
            data-testimonials-badge
            className="
              mx-auto
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-black/[0.07]
              bg-black/[0.025]
              px-3
              py-2
              font-display
              text-[12px]
              font-medium
              tracking-[-0.01em]
              text-[var(--portfolio-text-primary)]
              dark:border-white/[0.08]
              dark:bg-white/[0.025]
            "
          >
            <span
              className="
                relative
                flex
                h-[7px]
                w-[7px]
                items-center
                justify-center
              "
            >
              <span
                className="
                  services-pulse
                  absolute
                  h-[7px]
                  w-[7px]
                  rounded-full
                  bg-[var(--portfolio-accent)]
                "
              />

              <span
                className="
                  relative
                  h-[5px]
                  w-[5px]
                  rounded-full
                  bg-[var(--portfolio-accent)]
                "
              />
            </span>

            <span>Client feedback</span>
          </div>

          {/* TITLE */}

          <h2
            data-testimonials-title
            className="
              mt-6
              font-display
              text-[clamp(2.7rem,6vw,5.2rem)]
              font-semibold
              leading-[0.94]
              tracking-[var(--portfolio-tracking-display)]
            "
          >
            <span className="text-[var(--portfolio-text-primary)]">
              What clients say
            </span>

            <br />

            <span
              className="
                font-normal
                text-black/30
                dark:text-white/30
              "
            >
              about working with me
            </span>
          </h2>

          {/* DESCRIPTION */}

          <p
            data-testimonials-description
            className="
              mx-auto
              mt-6
              max-w-[560px]
              font-body
              text-[15px]
              leading-[1.6]
              tracking-[var(--portfolio-tracking-body)]
              text-[var(--portfolio-text-secondary)]
            "
          >
            Des collaborations basées sur l'écoute, la
            compréhension des besoins et la recherche
            constante de solutions pertinentes.
          </p>
        </div>

        {/* ===================================================
            TESTIMONIAL CAROUSEL
        =================================================== */}

        <div
          ref={carouselRef}
          data-testimonials-carousel
          className="
            mt-16
            flex
            snap-x
            snap-mandatory
            gap-4
            overflow-x-auto
            pb-4
            scrollbar-none
            lg:gap-5
          "
        >
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              data-testimonial-card
              className="
                group
                relative
                min-w-[88%]
                snap-start
                rounded-[var(--portfolio-radius-lg)]
                border
                border-black/[0.065]
                bg-[#f8f8f8]
                p-6
                transition-all
                duration-[var(--portfolio-motion-normal)]
                hover:-translate-y-[2px]
                hover:border-black/[0.11]
                hover:shadow-[0_20px_50px_rgba(0,0,0,0.055)]
                dark:border-white/[0.08]
                dark:bg-white/[0.025]
                dark:hover:border-white/[0.14]
                dark:hover:bg-white/[0.04]
                dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]
                sm:min-w-[65%]
                md:min-w-[48%]
                lg:min-w-[calc(33.333%-14px)]
                sm:p-7
              "
            >
              {/* QUOTE MARK */}

              <div
                className="
                  font-display
                  text-[54px]
                  font-semibold
                  leading-none
                  tracking-[-0.08em]
                  text-[var(--portfolio-accent)]
                  opacity-80
                "
              >
                “
              </div>

              {/* QUOTE */}

              <blockquote
                className="
                  mt-4
                  max-w-[520px]
                  font-display
                  text-[18px]
                  font-medium
                  leading-[1.45]
                  tracking-[-0.025em]
                  text-[var(--portfolio-text-primary)]
                  sm:text-[20px]
                "
              >
                {testimonial.content}
              </blockquote>

              {/* SEPARATOR */}

              <div
                className="
                  my-8
                  h-px
                  w-full
                  bg-black/[0.07]
                  dark:bg-white/[0.08]
                "
              />

              {/* CLIENT */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                "
              >
                {/* AVATAR */}

                <div
                  className="
                    flex
                    min-w-0
                    items-center
                    gap-3
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-black/[0.07]
                      bg-white
                      font-display
                      text-[12px]
                      font-semibold
                      text-[var(--portfolio-text-primary)]
                      dark:border-white/[0.08]
                      dark:bg-white/[0.06]
                    "
                  >
                    {testimonial.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <div
                      className="
                        truncate
                        font-display
                        text-[13px]
                        font-semibold
                        text-[var(--portfolio-text-primary)]
                      "
                    >
                      {testimonial.name}
                    </div>

                    <div
                      className="
                        mt-1
                        truncate
                        font-body
                        text-[12px]
                        text-[var(--portfolio-text-secondary)]
                      "
                    >
                      {testimonial.role ?? "Client"}
                    </div>
                  </div>
                </div>

                {/* COMPANY */}

                {testimonial.company && (
                  <div
                    className="
                      shrink-0
                      rounded-full
                      border
                      border-black/[0.07]
                      px-3
                      py-2
                      font-display
                      text-[11px]
                      font-medium
                      text-[var(--portfolio-text-secondary)]
                      dark:border-white/[0.08]
                    "
                  >
                    {testimonial.company}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* ===================================================
            CONTROLS
        =================================================== */}

        {testimonials.length > 0 && (
          <div
            data-testimonials-controls
            className="
              mt-7
              flex
              items-center
              justify-between
            "
          >
            {/* PAGINATION */}

            <div className="flex items-center gap-2">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  type="button"
                  aria-label={`Afficher le témoignage ${
                    index + 1
                  }`}
                  aria-current={
                    activeIndex === index
                      ? "true"
                      : undefined
                  }
                  data-cursor="magnetic"
                  onClick={() => scrollToIndex(index)}
                  className={`
                    h-[6px]
                    rounded-full
                    transition-all
                    duration-300
                    ${
                      activeIndex === index
                        ? "w-6 bg-[var(--portfolio-accent)]"
                        : "w-[6px] bg-black/15 dark:bg-white/15"
                    }
                  `}
                />
              ))}
            </div>

            {/* ARROWS */}

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Témoignage précédent"
                data-cursor="magnetic"
                onClick={() => scrollCarousel("left")}
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-black/[0.07]
                  bg-white
                  text-[var(--portfolio-text-primary)]
                  transition-all
                  duration-200
                  hover:-translate-x-[2px]
                  hover:border-black/[0.12]
                  dark:border-white/[0.08]
                  dark:bg-white/[0.025]
                "
              >
                ←
              </button>

              <button
                type="button"
                aria-label="Témoignage suivant"
                data-cursor="magnetic"
                onClick={() => scrollCarousel("right")}
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-black/[0.07]
                  bg-white
                  text-[var(--portfolio-text-primary)]
                  transition-all
                  duration-200
                  hover:translate-x-[2px]
                  hover:border-black/[0.12]
                  dark:border-white/[0.08]
                  dark:bg-white/[0.025]
                "
              >
                →
              </button>
            </div>
          </div>
        )}

        {/* ===================================================
            BOTTOM CTA
        =================================================== */}

        <div
          data-testimonials-cta
          className="
            mx-auto
            mt-16
            flex
            max-w-[820px]
            flex-col
            gap-5
            rounded-[var(--portfolio-radius-lg)]
            border
            border-black/[0.065]
            bg-[#f8f8f8]
            p-6
            dark:border-white/[0.08]
            dark:bg-white/[0.025]
            sm:p-7
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <div>
            <div
              data-testimonials-cta-title
              className="
                flex
                items-center
                gap-2
                font-display
                text-[17px]
                font-semibold
                tracking-[-0.02em]
                text-[var(--portfolio-text-primary)]
              "
            >
              <span
                className="
                  h-[7px]
                  w-[7px]
                  rounded-full
                  bg-[var(--portfolio-accent)]
                "
              />

              Your project could be next
            </div>

            <p
              data-testimonials-cta-description
              className="
                mt-2
                font-body
                text-[13px]
                leading-[1.5]
                text-[var(--portfolio-text-secondary)]
              "
            >
              Parlons de votre prochaine idée.
            </p>
          </div>

          <a
            data-testimonials-cta-button
            data-cursor="magnetic"
            href="/#contact"
            className="
              inline-flex
              h-11
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-full
              bg-[var(--portfolio-dark)]
              px-5
              font-display
              text-[13px]
              font-medium
              text-[var(--portfolio-dark-text)]
              transition-all
              duration-200
              hover:scale-[1.02]
            "
          >
            Start a project

            <span className="text-[var(--portfolio-accent)]">
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}