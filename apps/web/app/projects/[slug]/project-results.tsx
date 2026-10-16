"use client";

import { useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { HugeiconsIcon } from "@hugeicons/react";

import {
  CheckmarkCircle02Icon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";

gsap.registerPlugin(ScrollTrigger);

interface ProjectResultsProps {
  results: string[];
}

export function ProjectResults({
  results,
}: ProjectResultsProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) return;

      const backgroundGlow = section.querySelector(
        "[data-results-glow]"
      );

      const headerLabel = section.querySelector(
        "[data-results-label]"
      );

      const headerTitle = section.querySelector(
        "[data-results-title]"
      );

      const headerDescription = section.querySelector(
        "[data-results-description]"
      );

      const resultsGrid = section.querySelector(
        "[data-results-grid]"
      );

      const resultCards = section.querySelectorAll(
        "[data-results-card]"
      );

      const resultNumbers = section.querySelectorAll(
        "[data-results-number]"
      );

      const resultIcons = section.querySelectorAll(
        "[data-results-icon]"
      );

      const resultTexts = section.querySelectorAll(
        "[data-results-text]"
      );

      const bottomStatement = section.querySelector(
        "[data-results-bottom]"
      );

      const bottomIcon = section.querySelector(
        "[data-results-bottom-icon]"
      );

      const bottomOutcome = section.querySelector(
        "[data-results-outcome]"
      );

      /*
       * -------------------------------------------------------
       * INITIAL STATES
       * -------------------------------------------------------
       */

      gsap.set(backgroundGlow, {
        opacity: 0,
        scale: 0.8,
      });

      gsap.set(headerLabel, {
        opacity: 0,
        y: 20,
      });

      gsap.set(headerTitle, {
        opacity: 0,
        y: 50,
        clipPath: "inset(0 0 100% 0)",
      });

      gsap.set(headerDescription, {
        opacity: 0,
        y: 25,
      });

      gsap.set(resultsGrid, {
        opacity: 0,
        y: 40,
      });

      gsap.set(resultCards, {
        opacity: 0,
        y: 45,
        scale: 0.97,
      });

      gsap.set(resultNumbers, {
        opacity: 0,
        y: 10,
      });

      gsap.set(resultIcons, {
        opacity: 0,
        scale: 0.75,
        rotate: -12,
      });

      gsap.set(resultTexts, {
        opacity: 0,
        y: 18,
      });

      gsap.set(bottomStatement, {
        opacity: 0,
        x: -20,
      });

      gsap.set(bottomIcon, {
        opacity: 0,
        scale: 0.8,
      });

      gsap.set(bottomOutcome, {
        opacity: 0,
        x: 20,
      });

      /*
       * -------------------------------------------------------
       * HEADER
       * -------------------------------------------------------
       */

      const headerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          end: "bottom 25%",
          toggleActions: "play reverse play reverse",
        },
      });

      headerTimeline
        .to(backgroundGlow, {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
        })
        .to(
          headerLabel,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .to(
          headerTitle,
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.9,
            ease: "power4.out",
          },
          "-=0.25"
        )
        .to(
          headerDescription,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
          },
          "-=0.45"
        );

      /*
       * -------------------------------------------------------
       * RESULTS CARDS
       * -------------------------------------------------------
       */

      const resultsTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: resultsGrid,
          start: "top 82%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      resultsTimeline
        .to(resultsGrid, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
        })
        .to(
          resultCards,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.35"
        )
        .to(
          resultNumbers,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.45"
        )
        .to(
          resultIcons,
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.55,
            stagger: 0.1,
            ease: "back.out(1.4)",
          },
          "-=0.4"
        )
        .to(
          resultTexts,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.4"
        );

      /*
       * -------------------------------------------------------
       * BOTTOM STATEMENT
       * -------------------------------------------------------
       */

      const bottomTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: bottomStatement,
          start: "top 90%",
          end: "bottom 25%",
          toggleActions: "play reverse play reverse",
        },
      });

      bottomTimeline
        .to(bottomStatement, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
        })
        .to(
          bottomIcon,
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.4)",
          },
          "-=0.35"
        )
        .to(
          bottomOutcome,
          {
            opacity: 1,
            x: 0,
            duration: 0.55,
            ease: "power3.out",
          },
          "-=0.3"
        );

      /*
       * -------------------------------------------------------
       * REFRESH SCROLLTRIGGER
       * -------------------------------------------------------
       */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    },
    {
      scope: sectionRef,
    }
  );

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
      {/* =====================================================
          BACKGROUND DETAIL
      ===================================================== */}

      <div
        data-results-glow
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-120px]
          top-[25%]
          h-[360px]
          w-[360px]
          rounded-full
          bg-[var(--portfolio-accent)]
          opacity-[0.018]
          blur-[110px]
          dark:opacity-[0.04]
        "
      />

      {/* =====================================================
          CONTAINER
      ===================================================== */}

      <div
        className="
          relative
          mx-auto
          max-w-[1180px]
        "
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-10
            lg:grid-cols-[0.8fr_1.2fr]
            lg:gap-20
          "
        >
          {/* LEFT */}

          <div>
            <div
              data-results-label
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

              <span>Results</span>
            </div>

            <h2
              data-results-title
              className="
                mt-6
                max-w-[520px]
                font-display
                text-[clamp(2.7rem,5vw,5rem)]
                font-semibold
                leading-[0.94]
                tracking-[var(--portfolio-tracking-display)]
              "
            >
              <span className="text-[var(--portfolio-text-primary)]">
                Designed
              </span>{" "}
              <span className="font-normal text-[var(--portfolio-text-muted)]">
                to make an impact.
              </span>
            </h2>
          </div>

          {/* RIGHT */}

          <div className="flex items-end">
            <p
              data-results-description
              className="
                max-w-[620px]
                font-body
                text-[15px]
                leading-[1.7]
                tracking-[var(--portfolio-tracking-body)]
                text-[var(--portfolio-text-secondary)]
                sm:text-[16px]
              "
            >
              Le résultat ne se limite pas à une interface ou à une
              identité visuelle. Chaque décision a été pensée pour
              apporter plus de clarté, de cohérence et de valeur à
              l'expérience finale.
            </p>
          </div>
        </div>

        {/* =====================================================
            RESULTS GRID
        ===================================================== */}

        <div
          data-results-grid
          className="
            mt-16
            grid
            grid-cols-1
            gap-3
            sm:grid-cols-2
            sm:gap-4
            lg:mt-20
            lg:grid-cols-4
          "
        >
          {results.map((result, index) => (
            <article
              key={`${index}-${result}`}
              data-results-card
              className="
                group
                relative
                min-h-[220px]
                overflow-hidden
                rounded-[var(--portfolio-radius-lg)]
                border
                border-[var(--portfolio-border)]
                bg-[var(--portfolio-surface)]
                p-6
                transition-all
                duration-[var(--portfolio-motion-fast)]
                hover:-translate-y-[2px]
                hover:bg-[var(--portfolio-background)]
                dark:bg-white/[0.025]
                dark:hover:bg-white/[0.04]
                sm:p-7
                lg:min-h-[250px]
                lg:p-8
              "
            >
              {/* NUMBER */}

              <div
                data-results-number
                className="
                  font-display
                  text-[11px]
                  font-medium
                  tracking-[0.08em]
                  text-[var(--portfolio-text-muted)]
                "
              >
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* ICON */}

              <div
                data-results-icon
                className="
                  absolute
                  right-6
                  top-6
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[var(--portfolio-border)]
                  bg-[var(--portfolio-background)]
                  text-[var(--portfolio-text-muted)]
                  transition-colors
                  duration-[var(--portfolio-motion-fast)]
                  group-hover:text-[var(--portfolio-text-secondary)]
                  sm:right-7
                  sm:top-7
                  lg:right-8
                  lg:top-8
                "
              >
                <HugeiconsIcon
                  icon={CheckmarkCircle02Icon}
                  size={16}
                  strokeWidth={1.6}
                />
              </div>

              {/* RESULT */}

              <div
                className="
                  absolute
                  inset-x-6
                  bottom-6
                  sm:inset-x-7
                  sm:bottom-7
                  lg:inset-x-8
                  lg:bottom-8
                "
              >
                <p
                  data-results-text
                  className="
                    max-w-[250px]
                    font-display
                    text-[18px]
                    font-semibold
                    leading-[1.15]
                    tracking-[-0.025em]
                    text-[var(--portfolio-text-primary)]
                    sm:text-[19px]
                  "
                >
                  {result}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* =====================================================
            BOTTOM STATEMENT
        ===================================================== */}

        <div
          data-results-bottom
          className="
            mt-10
            flex
            flex-col
            gap-5
            border-t
            border-[var(--portfolio-border)]
            pt-7
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div
            className="
              flex
              items-center
              gap-2.5
              font-display
              text-[12px]
              font-medium
              text-[var(--portfolio-text-muted)]
            "
          >
            <HugeiconsIcon
              data-results-bottom-icon
              icon={CheckmarkCircle02Icon}
              size={15}
              strokeWidth={1.6}
            />

            <span>
              Built with clarity, intention and consistency.
            </span>
          </div>

          <span
            data-results-outcome
            className="
              inline-flex
              items-center
              gap-2
              font-display
              text-[12px]
              font-medium
              text-[var(--portfolio-text-muted)]
            "
          >
            <span>Outcome</span>

            <HugeiconsIcon
              icon={ArrowUpRight01Icon}
              size={14}
              strokeWidth={1.6}
              color="var(--portfolio-accent)"
            />
          </span>
        </div>
      </div>
    </section>
  );
}