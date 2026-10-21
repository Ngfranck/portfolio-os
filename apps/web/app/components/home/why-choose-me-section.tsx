"use client";

import { useRef } from "react";

import { HugeiconsIcon } from "@hugeicons/react";

import {
  ArrowUpRight01Icon,
  CheckmarkCircle02Icon,
  UserGroupIcon,
  SparklesIcon,
  Target02Icon,
} from "@hugeicons/core-free-icons";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const statistics = [
  {
    value: 3,
    suffix: "+",
    label: "Years",
    description: "of design experience",
  },
  {
    value: 40,
    suffix: "+",
    label: "Projects",
    description: "designed and delivered",
  },
  {
    value: 20,
    suffix: "+",
    label: "Brands",
    description: "built and strengthened",
  },
  {
    value: 100,
    suffix: "%",
    label: "Design",
    description: "focused on your goals",
  },
];

const reasons = [
  {
    number: "01",
    title: "Strategic thinking",
    description:
      "I begin with the problem, the people and the goals—not the screen. That context gives every design decision a clear purpose.",
    icon: Target02Icon,
  },
  {
    number: "02",
    title: "Design precision",
    description:
      "Typography, spacing, hierarchy and interaction work together to make each experience feel clear, considered and unmistakably on-brand.",
    icon: SparklesIcon,
  },
  {
    number: "03",
    title: "Collaborative process",
    description:
      "Regular, focused feedback keeps decisions transparent, ideas moving and the final experience aligned with your goals.",
    icon: UserGroupIcon,
  },
];

export function WhyChooseMeSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) {
        return;
      }

      const ctx = gsap.context(() => {
        const header = section.querySelector("[data-why-header]");
        const badge = section.querySelector("[data-why-badge]");
        const title = section.querySelector("[data-why-title]");
        const description = section.querySelector(
          "[data-why-description]"
        );
        const cta = section.querySelector("[data-why-cta]");

        const statisticsBlock = section.querySelector(
          "[data-why-statistics]"
        );
        const statisticItems = Array.from(
          section.querySelectorAll("[data-why-stat]")
        );

        const reasonsBlock = section.querySelector(
          "[data-why-reasons]"
        );
        const reasonsLabel = section.querySelector(
          "[data-why-reasons-label]"
        );
        const reasonCards = Array.from(
          section.querySelectorAll("[data-why-reason]")
        );

        const bottomStatement = section.querySelector(
          "[data-why-bottom]"
        );
        const bottomText = section.querySelector(
          "[data-why-bottom-text]"
        );
        const availability = section.querySelector(
          "[data-why-availability]"
        );

        // Initial states

        const headerTargets = [
          badge,
          title,
          description,
          cta,
          statisticsBlock,
          reasonsLabel,
          bottomStatement,
        ].filter((target): target is Element => target !== null);

        if (headerTargets.length) {
          gsap.set(headerTargets, {
            opacity: 0,
            y: 30,
          });
        }

        if (statisticItems.length) {
          gsap.set(statisticItems, {
            opacity: 0,
            y: 35,
          });
        }

        if (reasonCards.length) {
          gsap.set(reasonCards, {
            opacity: 0,
            y: 45,
          });
        }

        if (bottomText) {
          gsap.set(bottomText, {
            opacity: 0,
            x: -25,
          });
        }

        if (availability) {
          gsap.set(availability, {
            opacity: 0,
            x: 25,
          });
        }

        // Header

        if (header && badge && title && description && cta) {
          const headerTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: header,
              start: "top 82%",
              end: "bottom 25%",
              toggleActions: "play none none none",
            },
          });

          headerTimeline
            .to(badge, {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: "power3.out",
            })
            .to(
              title,
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
              },
              "-=0.35"
            )
            .to(
              description,
              {
                opacity: 1,
                y: 0,
                duration: 0.75,
                ease: "power3.out",
              },
              "-=0.5"
            )
            .to(
              cta,
              {
                opacity: 1,
                y: 0,
                duration: 0.65,
                ease: "power3.out",
              },
              "-=0.4"
            );
        }

        // Statistics

        if (statisticsBlock) {
          gsap.to(statisticsBlock, {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statisticsBlock,
              start: "top 82%",
              end: "bottom 30%",
              toggleActions: "play none none none",
            },
          });

          if (statisticItems.length) {
            gsap.to(statisticItems, {
              opacity: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: statisticsBlock,
                start: "top 78%",
                end: "bottom 30%",
                toggleActions: "play none none none",
              },
            });

            const countEls = Array.from(
              section.querySelectorAll("[data-why-count]")
            ) as HTMLElement[];

            if (countEls.length) {
              countEls.forEach((el, index) => {
                const target = Number(el.dataset.target ?? "0");
                const suffix = el.dataset.suffix ?? "";
                const counter = { value: 0 };

                gsap.to(counter, {
                  value: target,
                  duration: 1.8,
                  delay: index * 0.14,
                  ease: "power1.inOut",
                  scrollTrigger: {
                    trigger: statisticsBlock,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                  },
                  onUpdate: () => {
                    const current = Math.floor(counter.value);
                    if (target < 10) {
                      el.textContent = `${String(current).padStart(2, "0")}${suffix}`;
                      return;
                    }
                    el.textContent = `${current}${suffix}`;
                  },
                  onComplete: () => {
                    if (target < 10) {
                      el.textContent = `${String(target).padStart(2, "0")}${suffix}`;
                      return;
                    }
                    el.textContent = `${target}${suffix}`;
                  },
                });
              });
            }
          }
        }

        // Reasons

        if (reasonsBlock) {
          if (reasonsLabel) {
            gsap.to(reasonsLabel, {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: "power3.out",
              scrollTrigger: {
                trigger: reasonsBlock,
                start: "top 82%",
                end: "bottom 30%",
                toggleActions: "play none none none",
              },
            });
          }

          if (reasonCards.length > 0) {
            gsap.to(reasonCards, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.14,
              ease: "power3.out",
              scrollTrigger: {
                trigger: reasonCards[0],
                start: "top 84%",
                end: "bottom 25%",
                toggleActions: "play none none none",
              },
            });
          }
        }

        // Bottom statement

        if (bottomStatement) {
          const bottomTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: bottomStatement,
              start: "top 86%",
              end: "bottom 30%",
              toggleActions: "play none none none",
            },
          });

          if (bottomText) {
            bottomTimeline.to(bottomText, {
              opacity: 1,
              x: 0,
              duration: 0.75,
              ease: "power3.out",
            });
          }

          if (availability) {
            bottomTimeline.to(
              availability,
              {
                opacity: 1,
                x: 0,
                duration: 0.65,
                ease: "power3.out",
              },
              bottomText ? "-=0.4" : undefined
            );
          }
        }

        // Refresh ScrollTrigger

        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      }, section);

      return () => ctx.revert();
    },
    {
      scope: sectionRef,
    }
  );

  return (
    <section
      ref={sectionRef}
      id="why-me"
      className="
        relative
        overflow-hidden
        bg-[var(--portfolio-background)]
        px-4
        py-[var(--portfolio-space-13)]
        text-[var(--portfolio-text-primary)]
        transition-colors
        duration-[var(--portfolio-motion-normal)]
        sm:px-6
        lg:px-8
      "
    >
      {/* Grid */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-100
          [background-image:linear-gradient(to_right,rgba(17,17,17,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,17,17,0.035)_1px,transparent_1px)]
          [background-size:80px_80px]
          dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)]
        "
      />

      {/* Container */}

      <div className="relative mx-auto max-w-[1320px]">
        {/* Header */}

        <div
          data-why-header
          className="
            grid
            grid-cols-1
            gap-8
            lg:grid-cols-[1.1fr_0.9fr]
            lg:items-end
          "
        >
          {/* Left */}

          <div>
            {/* Badge */}

            <div
              data-why-badge
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
                text-[12px]
                font-medium
                tracking-[-0.01em]
                text-[var(--portfolio-text-primary)]
                shadow-[0_3px_12px_rgba(0,0,0,0.025)]
                transition-colors
                duration-[var(--portfolio-motion-normal)]
                dark:border-white/[0.08]
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

              <span>Why work with me</span>
            </div>

            {/* Title */}

            <h2
              data-why-title
              className="
                mt-6
                max-w-[760px]
                font-display
                text-[clamp(2.8rem,6vw,5.5rem)]
                font-semibold
                leading-[0.94]
                tracking-[var(--portfolio-tracking-display)]
              "
            >
              <span className="text-[var(--portfolio-text-primary)]">
                Why work
              </span>{" "}
              <span
                className="
                  font-normal
                  text-[var(--portfolio-text-muted)]
                "
              >
                with me
              </span>
            </h2>
          </div>

          {/* Right */}

          <div className="max-w-[500px] lg:ml-auto">
            <p
              data-why-description
              className="
                font-body
                text-[var(--portfolio-text-body)]
                leading-[var(--portfolio-leading-body)]
                tracking-[var(--portfolio-tracking-body)]
                text-[var(--portfolio-text-secondary)]
              "
            >
              A thoughtful design approach combines brand strategy, user
              experience and visual craft to create digital products that are
              useful, coherent and memorable.
            </p>

            <a
              data-why-cta
              data-cursor="magnetic"
              href="/#contact"
              className="
                group
                mt-6
                inline-flex
                items-center
                gap-2
                font-display
                text-[13px]
                font-medium
                tracking-[-0.01em]
                text-[var(--portfolio-text-primary)]
                transition-colors
                duration-[var(--portfolio-motion-fast)]
                hover:text-[var(--portfolio-accent)]
              "
            >
              <span>Let&apos;s discuss your project</span>

              <HugeiconsIcon
                icon={ArrowUpRight01Icon}
                size={15}
                strokeWidth={1.8}
                color="var(--portfolio-accent)"
                className="
                  transition-transform
                  duration-[var(--portfolio-motion-fast)]
                  group-hover:-translate-y-[1px]
                  group-hover:translate-x-[1px]
                "
              />
            </a>
          </div>
        </div>

        {/* Statistics */}

        <div
          data-why-statistics
          className="
            mt-16
            grid
            grid-cols-2
            border-y
            border-[var(--portfolio-border)]
            transition-colors
            duration-[var(--portfolio-motion-normal)]
            md:grid-cols-4
            dark:border-white/[0.08]
          "
        >
          {statistics.map((stat, index) => (
            <div
              key={stat.label}
              data-why-stat
              className={`
                group
                relative
                px-4
                py-8
                transition-colors
                duration-[var(--portfolio-motion-normal)]
                hover:bg-black/[0.025]
                dark:hover:bg-white/[0.025]
                sm:px-6
                sm:py-10
                lg:px-8
                ${
                  index !== statistics.length - 1
                    ? "border-r border-[var(--portfolio-border)] dark:border-white/[0.08]"
                    : ""
                }
                ${
                  index === 1
                    ? "border-b border-[var(--portfolio-border)] dark:border-white/[0.08] md:border-b-0"
                    : ""
                }
                ${
                  index === 2
                    ? "border-b border-[var(--portfolio-border)] dark:border-white/[0.08] md:border-b-0"
                    : ""
                }
              `}
            >
              {/* Number */}

              <div
                className="
                  font-display
                  text-[clamp(2.5rem,5vw,4.5rem)]
                  font-semibold
                  leading-none
                  tracking-[-0.055em]
                  text-[var(--portfolio-text-primary)]
                  transition-transform
                  duration-[var(--portfolio-motion-normal)]
                  group-hover:-translate-y-1
                "
              >
                <span
                  data-why-count
                  data-target={stat.value}
                  data-suffix={stat.suffix}
                >
                  {stat.value < 10
                    ? String(stat.value).padStart(2, "0")
                    : stat.value}
                  {stat.suffix}
                </span>
              </div>

              {/* Label */}

              <div
                className="
                  mt-4
                  font-display
                  text-[14px]
                  font-semibold
                  tracking-[-0.015em]
                  text-[var(--portfolio-text-primary)]
                "
              >
                {stat.label}
              </div>

              {/* Description */}

              <p
                className="
                  mt-1
                  font-body
                  text-[12px]
                  leading-[1.45]
                  text-[var(--portfolio-text-secondary)]
                "
              >
                {stat.description}
              </p>

              {/* Corner dot */}

              <span
                aria-hidden="true"
                className="
                  absolute
                  right-4
                  top-4
                  h-[4px]
                  w-[4px]
                  rounded-full
                  bg-[var(--portfolio-text-muted)]
                  opacity-50
                  transition-all
                  duration-[var(--portfolio-motion-fast)]
                  group-hover:scale-[1.7]
                  group-hover:bg-[var(--portfolio-accent)]
                  group-hover:opacity-100
                "
              />
            </div>
          ))}
        </div>

        {/* Reasons */}

        <div data-why-reasons className="mt-16">
          {/* Section label */}

          <div
            data-why-reasons-label
            className="
              mb-8
              flex
              items-center
              justify-between
            "
          >
            <p
              className="
                font-display
                text-[12px]
                font-medium
                uppercase
                tracking-[0.08em]
                text-[var(--portfolio-text-muted)]
              "
            >
              What you can expect
            </p>

            <span
              aria-hidden="true"
              className="
                ml-5
                h-px
                flex-1
                bg-[var(--portfolio-border)]
              "
            />
          </div>

          {/* Cards */}

          <div
            className="
              grid
              grid-cols-1
              gap-4
              md:grid-cols-3
            "
          >
            {reasons.map((reason) => (
              <article
                key={reason.number}
                data-why-reason
                data-cursor="view"
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[var(--portfolio-radius-lg)]
                  border
                  border-[var(--portfolio-border)]
                  bg-[var(--portfolio-surface)]
                  p-6
                  transition-all
                  duration-[var(--portfolio-motion-normal)]
                  hover:-translate-y-[3px]
                  hover:border-black/[0.12]
                  hover:shadow-[0_20px_50px_rgba(0,0,0,0.055)]
                  dark:border-white/[0.08]
                  dark:bg-white/[0.025]
                  dark:hover:border-white/[0.14]
                  dark:hover:bg-white/[0.045]
                  dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]
                  sm:p-7
                "
              >
                {/* Top */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[var(--portfolio-border)]
                      bg-[var(--portfolio-background)]
                      text-[var(--portfolio-text-primary)]
                      transition-colors
                      duration-[var(--portfolio-motion-normal)]
                      dark:border-white/[0.08]
                      dark:bg-white/[0.035]
                    "
                  >
                    <HugeiconsIcon
                      icon={reason.icon}
                      size={18}
                      strokeWidth={1.5}
                    />
                  </div>

                  <span
                    className="
                      font-display
                      text-[12px]
                      font-medium
                      text-[var(--portfolio-text-muted)]
                    "
                  >
                    {reason.number}
                  </span>
                </div>

                {/* Content */}

                <div className="mt-10">
                  <h3
                    className="
                      font-display
                      text-[19px]
                      font-semibold
                      leading-[1.1]
                      tracking-[-0.025em]
                      text-[var(--portfolio-text-primary)]
                    "
                  >
                    {reason.title}
                  </h3>

                  <p
                    className="
                      mt-4
                      font-body
                      text-[14px]
                      leading-[1.6]
                      text-[var(--portfolio-text-secondary)]
                    "
                  >
                    {reason.description}
                  </p>
                </div>

                {/* Bottom */}

                <div
                  className="
                    mt-8
                    flex
                    items-center
                    justify-between
                    border-t
                    border-[var(--portfolio-border)]
                    pt-5
                    dark:border-white/[0.08]
                  "
                >
                  <span
                    className="
                      font-display
                      text-[11px]
                      font-medium
                      uppercase
                      tracking-[0.08em]
                      text-[var(--portfolio-text-muted)]
                    "
                  >
                    Principle
                  </span>

                  <HugeiconsIcon
                    icon={CheckmarkCircle02Icon}
                    size={17}
                    strokeWidth={1.5}
                    color="var(--portfolio-accent)"
                    className="
                      opacity-60
                      transition-all
                      duration-[var(--portfolio-motion-fast)]
                      group-hover:scale-110
                      group-hover:opacity-100
                    "
                  />
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Bottom statement */}

        <div
          data-why-bottom
          className="
            mt-16
            flex
            flex-col
            gap-5
            border-t
            border-[var(--portfolio-border)]
            pt-8
            sm:flex-row
            sm:items-center
            sm:justify-between
            dark:border-white/[0.08]
          "
        >
          <p
            data-why-bottom-text
            className="
              max-w-[650px]
              font-display
              text-[clamp(1.2rem,2.2vw,1.7rem)]
              font-medium
              leading-[1.2]
              tracking-[-0.025em]
              text-[var(--portfolio-text-primary)]
            "
          >
            Good design is not just about looking good.
            It is about making the right things easier.
          </p>

          <div
            data-why-availability
            className="
              flex
              shrink-0
              items-center
              gap-2
              font-display
              text-[12px]
              font-medium
              text-[var(--portfolio-text-muted)]
            "
          >
            <span
              aria-hidden="true"
              className="
                h-[6px]
                w-[6px]
                rounded-full
                bg-[var(--portfolio-accent)]
                process-pulse
              "
            />

            Available for selected projects
          </div>
        </div>
      </div>
    </section>
  );
}