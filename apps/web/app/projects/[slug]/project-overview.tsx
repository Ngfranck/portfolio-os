"use client";

import { useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { HugeiconsIcon } from "@hugeicons/react";

import { Target02Icon, Alert02Icon, Idea01Icon } from "@hugeicons/core-free-icons";

gsap.registerPlugin(ScrollTrigger);

interface ProjectOverviewProps {
  overview?: {
    context?: string;
    challenge?: string;
    objective?: string;
  };
}

export function ProjectOverview({
  overview,
}: ProjectOverviewProps) {
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
        "[data-overview-label]"
      );

      const headerTitle = section.querySelector(
        "[data-overview-title]"
      );

      const cards = section.querySelectorAll(
        "[data-overview-card]"
      );

      const cardIcons = section.querySelectorAll(
        "[data-overview-icon]"
      );

      const cardNumbers = section.querySelectorAll(
        "[data-overview-number]"
      );

      const cardTitles = section.querySelectorAll(
        "[data-overview-card-title]"
      );

      const cardDescriptions = section.querySelectorAll(
        "[data-overview-card-description]"
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
        y: 45,
        clipPath: "inset(0 0 100% 0)",
      });

      gsap.set(cards, {
        opacity: 0,
        y: 45,
      });

      gsap.set(cardIcons, {
        opacity: 0,
        scale: 0.8,
        rotate: -8,
      });

      gsap.set(cardNumbers, {
        opacity: 0,
        x: 10,
      });

      gsap.set(cardTitles, {
        opacity: 0,
        y: 15,
      });

      gsap.set(cardDescriptions, {
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
        );

      /*
       * -------------------------------------------------------
       * OVERVIEW CARDS
       * -------------------------------------------------------
       */

      const cardsTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: cards[0]?.parentElement,
          start: "top 82%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      cardsTimeline
        .to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
        })
        .to(
          cardIcons,
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.55,
            stagger: 0.12,
            ease: "back.out(1.5)",
          },
          "-=0.45"
        )
        .to(
          cardNumbers,
          {
            opacity: 1,
            x: 0,
            duration: 0.45,
            stagger: 0.12,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          cardTitles,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.35"
        )
        .to(
          cardDescriptions,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.3"
        );

      /*
       * -------------------------------------------------------
       * REFRESH
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
        bg-[var(--portfolio-background)]
        px-5
        text-[var(--portfolio-text-primary)]
        transition-colors
        duration-[var(--portfolio-motion-normal)]
        sm:px-8
        sm:py-24
        lg:px-16
        lg:py-32
      "
    >
      <div className="mx-auto max-w-[1200px]">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className="
            grid
            gap-10
            py-20
            lg:grid-cols-[0.7fr_1.3fr]
            lg:gap-20
          "
        >
          {/* LABEL */}

          <div>
            <div
              data-overview-label
              className="
                inline-flex
                items-center
                gap-2
                font-display
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-[var(--portfolio-text-muted)]
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

              <span>Project overview</span>
            </div>
          </div>

          {/* INTRO */}

          <div>
            <h2
              data-overview-title
              className="
                max-w-[850px]
                font-display
                text-[clamp(2rem,4vw,4rem)]
                font-semibold
                leading-[0.95]
                tracking-[var(--portfolio-tracking-display)]
              "
            >
              Understanding the challenge
              <span className="font-normal text-[var(--portfolio-text-muted)]">
                {" "}before shaping the solution.
              </span>
            </h2>
          </div>
        </div>

        {/* =====================================================
            OVERVIEW GRID
        ===================================================== */}

        <div
          className="
            grid
            gap-px
            overflow-hidden
            rounded-[var(--portfolio-radius-lg)]
            border
            border-[var(--portfolio-border)]
            bg-[var(--portfolio-border)]
            md:grid-cols-3
          "
        >
          {/* ===================================================
              CONTEXT
          =================================================== */}

          <article
            data-overview-card
            className="
              bg-[var(--portfolio-background)]
              p-7
              sm:p-9
              lg:p-10
            "
          >
            <div className="flex items-center justify-between">
              <div
                data-overview-icon
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[var(--portfolio-border)]
                  bg-[var(--portfolio-surface)]
                "
              >
                <HugeiconsIcon
                  icon={Idea01Icon}
                  size={18}
                  strokeWidth={1.5}
                />
              </div>

              <span
                data-overview-number
                className="
                  font-display
                  text-[11px]
                  font-medium
                  text-[var(--portfolio-text-muted)]
                "
              >
                01
              </span>
            </div>

            <h3
              data-overview-card-title
              className="
                mt-10
                font-display
                text-[18px]
                font-semibold
                tracking-[-0.025em]
              "
            >
              Context
            </h3>

            <p
              data-overview-card-description
              className="
                mt-4
                font-body
                text-[13px]
                leading-[1.7]
                text-[var(--portfolio-text-secondary)]
              "
            >
              {overview?.context || ""}
            </p>
          </article>

          {/* ===================================================
              CHALLENGE
          =================================================== */}

          <article
            data-overview-card
            className="
              bg-[var(--portfolio-background)]
              p-7
              sm:p-9
              lg:p-10
            "
          >
            <div className="flex items-center justify-between">
              <div
                data-overview-icon
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[var(--portfolio-border)]
                  bg-[var(--portfolio-surface)]
                "
              >
                <HugeiconsIcon
                  icon={Alert02Icon}
                  size={18}
                  strokeWidth={1.5}
                />
              </div>

              <span
                data-overview-number
                className="
                  font-display
                  text-[11px]
                  font-medium
                  text-[var(--portfolio-text-muted)]
                "
              >
                02
              </span>
            </div>

            <h3
              data-overview-card-title
              className="
                mt-10
                font-display
                text-[18px]
                font-semibold
                tracking-[-0.025em]
              "
            >
              Challenge
            </h3>

            <p
              data-overview-card-description
              className="
                mt-4
                font-body
                text-[13px]
                leading-[1.7]
                text-[var(--portfolio-text-secondary)]
              "
            >
              {overview?.challenge || ""}
            </p>
          </article>

          {/* ===================================================
              OBJECTIVE
          =================================================== */}

          <article
            data-overview-card
            className="
              bg-[var(--portfolio-background)]
              p-7
              sm:p-9
              lg:p-10
            "
          >
            <div className="flex items-center justify-between">
              <div
                data-overview-icon
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[var(--portfolio-border)]
                  bg-[var(--portfolio-surface)]
                "
              >
                <HugeiconsIcon
                  icon={Target02Icon}
                  size={18}
                  strokeWidth={1.5}
                />
              </div>

              <span
                data-overview-number
                className="
                  font-display
                  text-[11px]
                  font-medium
                  text-[var(--portfolio-text-muted)]
                "
              >
                03
              </span>
            </div>

            <h3
              data-overview-card-title
              className="
                mt-10
                font-display
                text-[18px]
                font-semibold
                tracking-[-0.025em]
              "
            >
              Objective
            </h3>

            <p
              data-overview-card-description
              className="
                mt-4
                font-body
                text-[13px]
                leading-[1.7]
                text-[var(--portfolio-text-secondary)]
              "
            >
              {overview?.objective || ""}
            </p>
          </article>
        </div>

        </div>
    </section>
  );
}