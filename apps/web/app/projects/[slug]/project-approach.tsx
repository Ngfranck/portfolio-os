"use client";

import { useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { HugeiconsIcon } from "@hugeicons/react";

import {
  ArrowDown01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";

import type { ProjectApproach } from "../../components/data/projects";

gsap.registerPlugin(ScrollTrigger);

interface ProjectApproachProps {
  approach: ProjectApproach[];
}

export function ProjectApproach({
  approach,
}: ProjectApproachProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const sectionRef = useRef<HTMLElement | null>(null);

  const toggleStep = (index: number) => {
    setOpenIndex((current) =>
      current === index ? null : index
    );
  };

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) return;

      const headerLabel = section.querySelector(
        "[data-approach-label]"
      );

      const headerTitle = section.querySelector(
        "[data-approach-title]"
      );

      const headerDescription = section.querySelector(
        "[data-approach-description]"
      );

      const accordion = section.querySelector(
        "[data-approach-accordion]"
      );

      const accordionItems = section.querySelectorAll(
        "[data-approach-item]"
      );

      const numbers = section.querySelectorAll(
        "[data-approach-number]"
      );

      const titles = section.querySelectorAll(
        "[data-approach-item-title]"
      );

      const arrows = section.querySelectorAll(
        "[data-approach-arrow]"
      );

      const microStatement = section.querySelector(
        "[data-approach-micro]"
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

      gsap.set(accordion, {
        opacity: 0,
        y: 45,
      });

      gsap.set(accordionItems, {
        opacity: 0,
        y: 25,
      });

      gsap.set(numbers, {
        opacity: 0,
        scale: 0.8,
      });

      gsap.set(titles, {
        opacity: 0,
        x: 15,
      });

      gsap.set(arrows, {
        opacity: 0,
        scale: 0.8,
        rotate: -20,
      });

      gsap.set(microStatement, {
        opacity: 0,
        y: 20,
      });

      /*
       * -------------------------------------------------------
       * HEADER ANIMATION
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
       * ACCORDION REVEAL
       * -------------------------------------------------------
       */

      const accordionTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: accordion,
          start: "top 82%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      accordionTimeline
        .to(accordion, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
        })
        .to(
          accordionItems,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          numbers,
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.5)",
          },
          "-=0.45"
        )
        .to(
          titles,
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          arrows,
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.4)",
          },
          "-=0.4"
        );

      /*
       * -------------------------------------------------------
       * MICRO STATEMENT
       * -------------------------------------------------------
       */

      const microTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: microStatement,
          start: "top 90%",
          end: "bottom 25%",
          toggleActions: "play reverse play reverse",
        },
      });

      microTimeline.to(microStatement, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      });

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
            {/* LABEL */}

            <div
              data-approach-label
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
                transition-colors
                dark:bg-white/[0.035]
                dark:shadow-none
              "
            >
              <HugeiconsIcon
                icon={SparklesIcon}
                size={13}
                strokeWidth={1.6}
                color="var(--portfolio-accent)"
              />

              <span>My approach</span>
            </div>

            {/* TITLE */}

            <h2
              data-approach-title
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
              <span
                className="
                  text-[var(--portfolio-text-primary)]
                "
              >
                From idea
              </span>{" "}
              <span
                className="
                  font-normal
                  text-[var(--portfolio-text-muted)]
                "
              >
                to impact.
              </span>
            </h2>
          </div>

          {/* RIGHT */}

          <div className="flex items-end">
            <p
              data-approach-description
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
              Chaque projet suit une approche structurée qui permet
              de transformer une problématique en une solution claire,
              cohérente et adaptée aux objectifs de la marque ou du
              produit.
            </p>
          </div>
        </div>

        {/* =====================================================
            APPROACH ACCORDION
        ===================================================== */}

        <div
          data-approach-accordion
          className="
            mt-16
            overflow-hidden
            rounded-[var(--portfolio-radius-lg)]
            border
            border-[var(--portfolio-border)]
            bg-[var(--portfolio-surface)]
            shadow-[0_15px_50px_rgba(0,0,0,0.025)]
            transition-colors
            dark:bg-white/[0.025]
            dark:shadow-none
            sm:mt-20
          "
        >
          {approach.map((step, index) => {
            const isOpen = openIndex === index;
            const isLast = index === approach.length - 1;

            return (
              <div
                key={`${step.number}-${step.title}`}
                data-approach-item
                className={`
                  group
                  transition-colors
                  duration-[var(--portfolio-motion-fast)]
                  ${
                    !isLast
                      ? "border-b border-[var(--portfolio-border)]"
                      : ""
                  }
                `}
              >
                {/* =================================================
                    ACCORDION HEADER
                ================================================= */}

                <button
                  type="button"
                  onClick={() => toggleStep(index)}
                  aria-expanded={isOpen}
                  className="
                    flex
                    w-full
                    items-center
                    gap-5
                    p-6
                    text-left
                    outline-none
                    transition-colors
                    duration-[var(--portfolio-motion-fast)]
                    hover:bg-black/[0.018]
                    focus-visible:bg-black/[0.018]
                    focus-visible:ring-2
                    focus-visible:ring-inset
                    focus-visible:ring-black/10
                    dark:hover:bg-white/[0.025]
                    dark:focus-visible:bg-white/[0.025]
                    dark:focus-visible:ring-white/10
                    sm:gap-8
                    sm:p-8
                    lg:p-10
                  "
                >
                  {/* NUMBER */}

                  <span
                    data-approach-number
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[var(--portfolio-border)]
                      bg-[var(--portfolio-background)]
                      font-display
                      text-[11px]
                      font-semibold
                      tracking-[0.02em]
                      text-[var(--portfolio-text-muted)]
                      transition-colors
                      duration-[var(--portfolio-motion-fast)]
                      sm:h-12
                      sm:w-12
                    "
                  >
                    {step.number}
                  </span>

                  {/* TITLE */}

                  <span
                    data-approach-item-title
                    className="
                      flex-1
                      font-display
                      text-[20px]
                      font-semibold
                      leading-[1.1]
                      tracking-[-0.025em]
                      text-[var(--portfolio-text-primary)]
                      sm:text-[23px]
                    "
                  >
                    {step.title}
                  </span>

                  {/* ARROW */}

                  <span
                    data-approach-arrow
                    className={`
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[var(--portfolio-border)]
                      bg-[var(--portfolio-background)]
                      text-[var(--portfolio-text-muted)]
                      transition-all
                      duration-[var(--portfolio-motion-fast)]
                      ${
                        isOpen
                          ? "rotate-180"
                          : "rotate-0"
                      }
                    `}
                  >
                    <HugeiconsIcon
                      icon={ArrowDown01Icon}
                      size={14}
                      strokeWidth={1.6}
                    />
                  </span>
                </button>

                {/* =================================================
                    ACCORDION CONTENT
                ================================================= */}

                <div
                  className={`
                    grid
                    transition-[grid-template-rows]
                    duration-300
                    ease-out
                    ${
                      isOpen
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }
                  `}
                >
                  <div className="overflow-hidden">
                    <div
                      className="
                        grid
                        grid-cols-[40px_1fr]
                        gap-5
                        px-6
                        pb-7
                        sm:grid-cols-[48px_1fr]
                        sm:gap-8
                        sm:px-8
                        sm:pb-9
                        lg:px-10
                        lg:pb-10
                      "
                    >
                      {/* ALIGNMENT */}

                      <div />

                      {/* DESCRIPTION */}

                      <p
                        className="
                          max-w-[680px]
                          font-body
                          text-[13px]
                          leading-[1.7]
                          text-[var(--portfolio-text-secondary)]
                          sm:text-[14px]
                          lg:text-[15px]
                        "
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* =====================================================
            MICRO STATEMENT
        ===================================================== */}

        <div
          data-approach-micro
          className="
            mt-8
            flex
            items-center
            gap-3
            font-display
            text-[12px]
            font-medium
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

          <span>
            Strategy · Design · Iteration · Delivery
          </span>
        </div>
      </div>
    </section>
  );
}