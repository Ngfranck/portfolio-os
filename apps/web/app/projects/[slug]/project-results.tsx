"use client";

import { useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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

      const resultTexts = section.querySelectorAll(
        "[data-results-text]"
      );

      /*
       * -------------------------------------------------------
       * INITIAL STATES
       * -------------------------------------------------------
       */

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

      gsap.set(resultTexts, {
        opacity: 0,
        y: 18,
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
        .to(headerLabel, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
        })
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

              <span>Impact</span>
            </div>

            <h2
              data-results-title
              className="
                mt-6
                max-w-[520px]
                font-display
                text-[clamp(2.5rem,4.6vw,4.6rem)]
                font-semibold
                leading-[0.94]
                tracking-[var(--portfolio-tracking-display)]
              "
            >
              <span className="text-[var(--portfolio-text-primary)]">
                Project
              </span>{" "}
              <span className="font-normal text-[var(--portfolio-text-muted)]">
                outcomes
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
                text-[14px]
                leading-[1.7]
                tracking-[var(--portfolio-tracking-body)]
                text-[var(--portfolio-text-secondary)]
                sm:text-[15px]
              "
            >
              The project outcomes reflect its goals, from a clearer
              user experience to a more consistent visual system.
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
            gap-4
            sm:grid-cols-2
            sm:gap-5
            lg:mt-20
            lg:grid-cols-4
          "
        >
          {results.map((result, index) => (
            <article
              key={`${index}-${result}`}
              data-results-card
              className="
                relative
                min-h-[180px]
                overflow-hidden
                rounded-2xl
                border
                border-[var(--portfolio-border)]
                bg-[var(--portfolio-surface)]
                p-6
                transition-colors
                duration-[var(--portfolio-motion-fast)]
                hover:border-[var(--portfolio-border-strong)]
                sm:p-7
                lg:min-h-[200px]
                lg:p-8
              "
            >
              <span
                data-results-number
                className="
                  font-display
                  text-[12px]
                  font-semibold
                  tracking-[0.08em]
                  text-[var(--portfolio-accent)]
                "
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <p
                data-results-text
                className="
                  mt-10
                  max-w-[300px]
                  font-display
                  text-[16px]
                  font-medium
                  leading-[1.3]
                  tracking-[-0.025em]
                  text-[var(--portfolio-text-primary)]
                  sm:text-[17px]
                "
              >
                {result}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}