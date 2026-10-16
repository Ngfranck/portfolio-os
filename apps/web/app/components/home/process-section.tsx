"use client";

import { useRef } from "react";

import { HugeiconsIcon } from "@hugeicons/react";

import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Compass01Icon,
  Idea01Icon,
  PencilEdit01Icon,
  Rocket01Icon,
} from "@hugeicons/core-free-icons";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Nous commençons par comprendre votre vision, vos objectifs, votre audience et les enjeux de votre projet.",
    icon: Compass01Icon,
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "Nous définissons une direction claire et construisons une stratégie capable de transformer vos idées en résultats.",
    icon: Idea01Icon,
  },
  {
    number: "03",
    title: "Design",
    description:
      "Nous transformons la stratégie en identité, interface et expérience digitale cohérente, élégante et mémorable.",
    icon: PencilEdit01Icon,
  },
  {
    number: "04",
    title: "Deliver",
    description:
      "Nous finalisons, optimisons et préparons une solution prête à être utilisée, développée et déployée.",
    icon: Rocket01Icon,
  },
];

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) return;

      const ctx = gsap.context(() => {
        const headerBadge = sectionRef.current?.querySelector(
          "[data-process-badge]",
        );

        const heading = sectionRef.current?.querySelector(
          "[data-process-heading]",
        );

        const description = sectionRef.current?.querySelector(
          "[data-process-description]",
        );

        const cards = gsap.utils.toArray<HTMLElement>(
          "[data-process-card]",
        );

        const controls = sectionRef.current?.querySelector(
          "[data-process-controls]",
        );

        const bottomCta = sectionRef.current?.querySelector(
          "[data-process-cta]",
        );

        const ctaIcon = sectionRef.current?.querySelector(
          "[data-process-cta-icon]",
        );

        const ctaText = sectionRef.current?.querySelector(
          "[data-process-cta-text]",
        );

        const ctaDescription = sectionRef.current?.querySelector(
          "[data-process-cta-description]",
        );

        const ctaButtons = gsap.utils.toArray<HTMLElement>(
          "[data-process-cta-button]",
        );

        /*
         * =====================================================
         * INITIAL STATES
         * =====================================================
         */

        if (headerBadge) {
          gsap.set(headerBadge, {
            opacity: 0,
            y: 18,
          });
        }

        if (heading) {
          gsap.set(heading, {
            opacity: 0,
            y: 35,
          });
        }

        if (description) {
          gsap.set(description, {
            opacity: 0,
            y: 24,
          });
        }

        cards.forEach((card) => {
          const number = card.querySelector("[data-process-number]");
          const icon = card.querySelector("[data-process-icon]");
          const content = card.querySelector("[data-process-content]");
          const separator = card.querySelector("[data-process-separator]");
          const label = card.querySelector("[data-process-label]");

          gsap.set(card, {
            opacity: 0,
            y: 55,
          });

          if (number) {
            gsap.set(number, {
              opacity: 0,
              scale: 0.85,
            });
          }

          if (icon) {
            gsap.set(icon, {
              opacity: 0,
              y: 18,
              scale: 0.9,
            });
          }

          if (content) {
            gsap.set(content, {
              opacity: 0,
              y: 20,
            });
          }

          if (separator) {
            gsap.set(separator, {
              scaleX: 0,
              transformOrigin: "left center",
            });
          }

          if (label) {
            gsap.set(label, {
              opacity: 0,
              y: 10,
            });
          }
        });

        if (controls) {
          gsap.set(controls, {
            opacity: 0,
            y: 15,
          });
        }

        if (bottomCta) {
          gsap.set(bottomCta, {
            opacity: 0,
            y: 40,
          });
        }

        if (ctaIcon) {
          gsap.set(ctaIcon, {
            opacity: 0,
            scale: 0.8,
            rotate: -8,
          });
        }

        if (ctaText) {
          gsap.set(ctaText, {
            opacity: 0,
            x: -15,
          });
        }

        if (ctaDescription) {
          gsap.set(ctaDescription, {
            opacity: 0,
            x: -15,
          });
        }

        ctaButtons.forEach((button) => {
          gsap.set(button, {
            opacity: 0,
            y: 12,
          });
        });

        /*
         * =====================================================
         * HEADER ANIMATION
         * =====================================================
         */

        if (headerBadge && heading && description) {
          const headerTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: headerBadge,
              start: "top 82%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
          });

          headerTimeline
            .to(headerBadge, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
            })
            .to(
              heading,
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
              },
              "-=0.35",
            )
            .to(
              description,
              {
                opacity: 1,
                y: 0,
                duration: 0.65,
                ease: "power3.out",
              },
              "-=0.45",
            );
        }

        /*
         * =====================================================
         * PROCESS CARDS
         * =====================================================
         */

        cards.forEach((card, index) => {
          const number = card.querySelector("[data-process-number]");
          const icon = card.querySelector("[data-process-icon]");
          const content = card.querySelector("[data-process-content]");
          const separator = card.querySelector("[data-process-separator]");
          const label = card.querySelector("[data-process-label]");

          const cardTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 86%",
              end: "bottom 18%",
              toggleActions: "play reverse play reverse",
            },
          });

          cardTimeline.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: index * 0.04,
            ease: "power3.out",
          });

          if (number) {
            cardTimeline.to(
              number,
              {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "back.out(1.5)",
              },
              "-=0.45",
            );
          }

          if (icon) {
            cardTimeline.to(
              icon,
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.55,
                ease: "power3.out",
              },
              "-=0.35",
            );
          }

          if (content) {
            cardTimeline.to(
              content,
              {
                opacity: 1,
                y: 0,
                duration: 0.55,
                ease: "power3.out",
              },
              "-=0.35",
            );
          }

          if (separator) {
            cardTimeline.to(
              separator,
              {
                scaleX: 1,
                duration: 0.6,
                ease: "power2.out",
              },
              "-=0.25",
            );
          }

          if (label) {
            cardTimeline.to(
              label,
              {
                opacity: 1,
                y: 0,
                duration: 0.45,
                ease: "power2.out",
              },
              "-=0.35",
            );
          }
        });

        /*
         * =====================================================
         * CAROUSEL CONTROLS
         * =====================================================
         */

        if (controls) {
          gsap.to(controls, {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
            scrollTrigger: {
              trigger: controls,
              start: "top 92%",
              end: "bottom 25%",
              toggleActions: "play reverse play reverse",
            },
          });
        }

        /*
         * =====================================================
         * BOTTOM CTA
         * =====================================================
         */

        if (bottomCta) {
          const ctaTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: bottomCta,
              start: "top 88%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
          });

          ctaTimeline.to(bottomCta, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
          });

          if (ctaIcon) {
            ctaTimeline.to(
              ctaIcon,
              {
                opacity: 1,
                scale: 1,
                rotate: 0,
                duration: 0.55,
                ease: "back.out(1.7)",
              },
              "-=0.45",
            );
          }

          if (ctaText) {
            ctaTimeline.to(
              ctaText,
              {
                opacity: 1,
                x: 0,
                duration: 0.5,
                ease: "power3.out",
              },
              "-=0.35",
            );
          }

          if (ctaDescription) {
            ctaTimeline.to(
              ctaDescription,
              {
                opacity: 1,
                x: 0,
                duration: 0.45,
                ease: "power3.out",
              },
              "-=0.3",
            );
          }

          if (ctaButtons.length) {
            ctaTimeline.to(
              ctaButtons,
              {
                opacity: 1,
                y: 0,
                duration: 0.45,
                stagger: 0.08,
                ease: "power3.out",
              },
              "-=0.25",
            );
          }
        }

        /*
         * =====================================================
         * REFRESH SCROLLTRIGGER
         * =====================================================
         */

        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      }, sectionRef);

      return () => ctx.revert();
    },
    { scope: sectionRef },
  );

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;

    const amount = carouselRef.current.clientWidth * 0.85;

    carouselRef.current.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="process"
      className="
        relative
        overflow-hidden
        bg-[var(--portfolio-surface)]
        px-4
        py-10
        text-[var(--portfolio-text-primary)]
        sm:px-6
        lg:px-8
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mx-auto max-w-[900px] text-center">
        {/* Badge */}
        <div
          data-process-badge
          className="
            mb-8
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-[var(--portfolio-border)]
            bg-[var(--portfolio-surface)]/80
            px-3.5
            py-2
            font-body
            text-[13px]
            font-medium
            backdrop-blur-md
            shadow-[0_8px_30px_rgba(0,0,0,0.025)]
            transition-colors
            duration-[var(--portfolio-motion-normal)]
            dark:bg-white/[0.035]
            dark:shadow-none
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
              aria-hidden="true"
              className="
                absolute
                h-[7px]
                w-[7px]
                rounded-full
                bg-[var(--portfolio-accent)]
                process-pulse
              "
            />

            <span
              aria-hidden="true"
              className="
                relative
                h-[5px]
                w-[5px]
                rounded-full
                bg-[var(--portfolio-accent)]
              "
            />
          </span>

          <span>How it works</span>
        </div>

        {/* Heading */}
        <h2
          data-process-heading
          className="
            mt-6
            font-display
            text-[clamp(2.8rem,6vw,5.5rem)]
            font-semibold
            leading-[0.95]
            tracking-[var(--portfolio-tracking-display)]
          "
        >
          <span className="text-[var(--portfolio-text-primary)]">
            Process
          </span>{" "}
          <span className="font-normal text-[var(--portfolio-text-muted)]">
            is Everything
          </span>
        </h2>

        {/* Description */}
        <p
          data-process-description
          className="
            mx-auto
            mt-6
            max-w-[560px]
            font-body
            text-[var(--portfolio-text-body)]
            leading-[var(--portfolio-leading-body)]
            tracking-[var(--portfolio-tracking-body)]
            text-[var(--portfolio-text-secondary)]
          "
        >
          Une méthode claire et structurée pour transformer
          une idée en expérience digitale mémorable.
        </p>
      </div>

      {/* =====================================================
          CAROUSEL
      ===================================================== */}

      <div className="relative mx-auto mt-16 max-w-[1500px]">
        <div
          ref={carouselRef}
          className="
            scrollbar-none
            flex
            snap-x
            snap-mandatory
            gap-4
            overflow-x-auto
            pb-5
            py-20
            lg:gap-5
          "
        >
          {processSteps.map((step) => (
            <article
              key={step.number}
              data-process-card
              data-cursor="view"
              className="
                group
                relative
                min-w-[88%]
                snap-start
                rounded-[var(--portfolio-radius-lg)]
                border
                border-[var(--portfolio-border)]
                bg-[var(--portfolio-surface)]
                p-6
                duration-[var(--portfolio-motion-normal)]
                hover:-translate-y-1
                hover:border-[#d8d8d4]
                hover:shadow-[0_16px_45px_rgba(17,17,17,0.07)]
                sm:min-w-[65%]
                md:min-w-[48%]
                lg:min-w-[calc(25%-15px)]
              "
            >
              {/* Number */}
              <div
                data-process-number
                className="
                  absolute
                  right-5
                  top-5
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[var(--portfolio-border)]
                  bg-[var(--portfolio-background)]
                  font-display
                  text-sm
                  font-medium
                  text-[var(--portfolio-text-primary)]
                "
              >
                {step.number}
              </div>

              {/* Icon */}
              <div
                data-process-icon
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  text-[var(--portfolio-text-primary)]
                  transition-transform
                  duration-[var(--portfolio-motion-normal)]
                  group-hover:-translate-y-1
                "
              >
                <HugeiconsIcon
                  icon={step.icon}
                  size={28}
                  strokeWidth={1.5}
                />
              </div>

              {/* Content */}
              <div data-process-content className="mt-10">
                <h3
                  className="
                    font-display
                    text-[22px]
                    font-semibold
                    leading-[1.1]
                    tracking-[-0.025em]
                    text-[var(--portfolio-text-primary)]
                  "
                >
                  {step.title}
                </h3>

                <p
                  className="
                    mt-4
                    min-h-[105px]
                    font-body
                    text-[15px]
                    leading-[1.55]
                    tracking-[-0.01em]
                    text-[var(--portfolio-text-secondary)]
                  "
                >
                  {step.description}
                </p>
              </div>

              {/* Separator */}
              <div
                data-process-separator
                className="
                  mt-8
                  h-px
                  w-full
                  bg-[var(--portfolio-border)]
                "
              />

              {/* Step label */}
              <div
                data-process-label
                className="
                  mt-5
                  inline-flex
                  rounded-full
                  px-3
                  py-2
                  font-display
                  text-[12px]
                  font-medium
                  text-[var(--portfolio-text-secondary)]
                  transition-all
                  duration-[var(--portfolio-motion-fast)]
                  group-hover:border-[var(--portfolio-text-primary)]
                  group-hover:text-[var(--portfolio-text-primary)]
                "
              >
                Step {step.number}
              </div>
            </article>
          ))}
        </div>

        {/* ===================================================
            CAROUSEL CONTROLS
        =================================================== */}

        <div
          data-process-controls
          className="mt-6 flex items-center justify-end gap-2"
        >
          <button
            type="button"
            aria-label="Étapes précédentes"
            data-cursor="magnetic"
            onClick={() => scrollCarousel("left")}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-[var(--portfolio-border)]
              bg-[var(--portfolio-surface)]
              text-[var(--portfolio-text-secondary)]
              shadow-[0_4px_16px_rgba(17,17,17,0.035)]
              transition-all
              duration-[var(--portfolio-motion-fast)]
              hover:border-[var(--portfolio-text-primary)]
              hover:text-[var(--portfolio-text-primary)]
              hover:shadow-[0_6px_20px_rgba(17,17,17,0.07)]
            "
          >
            <HugeiconsIcon
              icon={ArrowLeft01Icon}
              size={18}
              strokeWidth={1.6}
            />
          </button>

          <button
            type="button"
            aria-label="Étapes suivantes"
            data-cursor="magnetic"
            onClick={() => scrollCarousel("right")}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-[var(--portfolio-border)]
              bg-[var(--portfolio-surface)]
              text-[var(--portfolio-text-secondary)]
              shadow-[0_4px_16px_rgba(17,17,17,0.035)]
              transition-all
              duration-[var(--portfolio-motion-fast)]
              hover:border-[var(--portfolio-text-primary)]
              hover:text-[var(--portfolio-text-primary)]
              hover:shadow-[0_6px_20px_rgba(17,17,17,0.07)]
            "
          >
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={18}
              strokeWidth={1.6}
            />
          </button>
        </div>
      </div>

      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}

      <div
        data-process-cta
        className="
          mx-auto
          mt-14
          flex
          max-w-[820px]
          flex-col
          gap-6
          rounded-[var(--portfolio-radius-lg)]
          border
          border-[var(--portfolio-border)]
          bg-[var(--portfolio-surface)]
          p-6
          shadow-[0_10px_40px_rgba(17,17,17,0.035)]
          sm:p-7
          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        <div>
          <div
            data-process-cta-text
            className="
              flex
              items-center
              gap-2
              font-display
              text-[18px]
              font-semibold
              tracking-[-0.02em]
              text-[var(--portfolio-text-primary)]
            "
          >
            <span data-process-cta-icon>
              <HugeiconsIcon
                icon={Compass01Icon}
                size={20}
                strokeWidth={1.6}
              />
            </span>

            Je vous accompagne à chaque étape
          </div>

          <p
            data-process-cta-description
            className="
              mt-2
              font-body
              text-[14px]
              leading-[1.5]
              text-[var(--portfolio-text-secondary)]
            "
          >
            Une collaboration claire, fluide et sans
            complexité inutile.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-3">
          {/* Secondary CTA */}
          <a
            data-process-cta-button
            data-cursor="magnetic"
            href="#projects"
            className="
              inline-flex
              h-11
              items-center
              justify-center
              rounded-full
              border
              border-[var(--portfolio-border)]
              bg-[var(--portfolio-background)]
              px-5
              font-display
              text-[13px]
              font-medium
              text-[var(--portfolio-text-primary)]
              transition-all
              duration-[var(--portfolio-motion-fast)]
              hover:border-[var(--portfolio-text-primary)]
              hover:bg-[var(--portfolio-surface)]
            "
          >
            Voir mes projets
          </a>

          {/* Primary CTA */}
          <a
            data-process-cta-button
            data-cursor="magnetic"
            href="#contact"
            className="
              inline-flex
              h-11
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
              duration-[var(--portfolio-motion-fast)]
              hover:scale-[1.02]
              hover:shadow-[0_8px_24px_rgba(17,17,17,0.12)]
            "
          >
            <span>Me contacter</span>

            <span
              className="
                text-[var(--portfolio-accent)]
              "
            >
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}