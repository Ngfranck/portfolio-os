"use client";

import Link from "next/link";
import { useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function ProjectCTA() {
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

      const eyebrow = section.querySelector<HTMLElement>(
        "[data-project-cta-eyebrow]"
      );
      const title = section.querySelector<HTMLElement>(
        "[data-project-cta-title]"
      );
      const description = section.querySelector<HTMLElement>(
        "[data-project-cta-description]"
      );
      const actions = section.querySelector<HTMLElement>(
        "[data-project-cta-actions]"
      );
      const actionLinks = section.querySelectorAll<HTMLElement>(
        "[data-project-cta-action]"
      );
      // ------------------------------------------------------------
      // INITIAL STATES
      // ------------------------------------------------------------

      gsap.set(eyebrow, {
        opacity: 0,
        y: 20,
      });

      gsap.set(title, {
        opacity: 0,
        y: 55,
        clipPath: "inset(0 0 100% 0)",
      });

      gsap.set(description, {
        opacity: 0,
        y: 25,
      });

      gsap.set(actions, {
        opacity: 0,
        y: 25,
      });

      gsap.set(actionLinks, {
        opacity: 0,
        y: 18,
        scale: 0.97,
      });

      // ------------------------------------------------------------
      // MAIN CONTENT
      // ------------------------------------------------------------

      const contentTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 76%",
          end: "bottom 18%",
          toggleActions: "play reverse play reverse",
        },
      });

      if (eyebrow) {
        contentTimeline.to(eyebrow, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      }

      if (title) {
        contentTimeline.to(
          title,
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 1,
            ease: "power4.out",
          },
          "-=0.25"
        );
      }

      if (description) {
        contentTimeline.to(
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

      if (actions) {
        contentTimeline.to(
          actions,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
          },
          "-=0.35"
        );
      }

      if (actionLinks.length > 0) {
        contentTimeline.to(
          actionLinks,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.3"
        );
      }

      // ------------------------------------------------------------
      // REFRESH SCROLLTRIGGER
      // ------------------------------------------------------------

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
      id="project-cta"
      className="
        relative
        isolate
        overflow-hidden
        border-t
        border-[var(--portfolio-border)]
        bg-[var(--portfolio-background)]
        px-5
        py-28
        text-[var(--portfolio-text-primary)]
        transition-colors
        duration-[var(--portfolio-motion-normal)]
        sm:px-8
        sm:py-36
        lg:px-12
        lg:py-44
      "
    >
      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          relative
          mx-auto
          flex
          max-w-[1120px]
          flex-col
          items-center
          text-center
        "
      >
        {/* ===================================================
            EYEBROW
        =================================================== */}

        <div
          data-project-cta-eyebrow
          className="
            flex
            items-center
            gap-2
            font-body
            text-[12px]
            font-medium
            tracking-[-0.01em]
            text-[var(--portfolio-text-muted)]
          "
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--portfolio-accent)]" />

          <span>Have something in mind?</span>
        </div>

        {/* ===================================================
            TITLE
        =================================================== */}

        <h2
          data-project-cta-title
          className="
            mt-8
            max-w-[950px]
            font-display
            text-[clamp(3.1rem,7.2vw,7rem)]
            font-semibold
            leading-[0.88]
            tracking-[-0.065em]
          "
        >
          <span
            className="
              block
              text-[var(--portfolio-text-primary)]
            "
          >
            Let&apos;s create
          </span>

          <span
            className="
              block
              font-normal
              text-[var(--portfolio-text-secondary)]
            "
          >
            something meaningful.
          </span>
        </h2>

        {/* ===================================================
            DESCRIPTION
        =================================================== */}

        <p
          data-project-cta-description
          className="
            mt-8
            max-w-[650px]
            font-body
            text-[14px]
            leading-[1.65]
            tracking-[-0.01em]
            text-[var(--portfolio-text-secondary)]
            sm:text-[15px]
          "
        >
          Need a brand identity, a thoughtful UI/UX design, or a digital
          product experience? Let’s discuss your goals and create a solution
          tailored to your audience.
        </p>

        {/* ===================================================
            ACTIONS
        =================================================== */}

        <div
          data-project-cta-actions
          className="
            mt-9
            flex
            flex-col
            items-center
            gap-4
            sm:flex-row
          "
        >
          {/* PRIMARY */}

          <Link
            data-project-cta-action
            href="/#contact"
            className="
              group
              inline-flex
              h-13
              items-center
              justify-center
              gap-3
              rounded-full
              bg-[var(--portfolio-text-primary)]
              px-7
              font-body
              text-[13px]
              font-medium
              text-[var(--portfolio-background)]
              shadow-[0_10px_35px_rgba(0,0,0,0.08)]
              transition-all
              duration-[var(--portfolio-motion-fast)]
              hover:-translate-y-0.5
              hover:shadow-[0_16px_45px_rgba(0,0,0,0.12)]
              dark:shadow-[0_10px_35px_rgba(0,0,0,0.2)]
              dark:hover:shadow-[0_16px_45px_rgba(0,0,0,0.3)]
            "
          >
            <span>Start a project</span>

            <HugeiconsIcon
              icon={ArrowUpRight01Icon}
              size={15}
              strokeWidth={1.8}
              color="var(--portfolio-accent)"
              className="
                transition-transform
                duration-[var(--portfolio-motion-fast)]
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </Link>

          {/* SECONDARY */}

          <Link
            data-project-cta-action
            href="/#projects"
            className="
              group
              inline-flex
              h-13
              items-center
              justify-center
              gap-2
              rounded-full
              border
              border-[var(--portfolio-border)]
              bg-[var(--portfolio-surface)]
              px-7
              font-body
              text-[13px]
              font-medium
              text-[var(--portfolio-text-secondary)]
              transition-all
              duration-[var(--portfolio-motion-fast)]
              hover:-translate-y-0.5
              hover:border-[var(--portfolio-text-secondary)]
              hover:text-[var(--portfolio-text-primary)]
              dark:hover:border-[var(--portfolio-text-muted)]
            "
          >
            <span>Explore more projects</span>

            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={15}
              strokeWidth={1.7}
              className="
                text-[var(--portfolio-text-muted)]
                transition-transform
                duration-[var(--portfolio-motion-fast)]
                group-hover:translate-x-0.5
              "
            />
          </Link>
        </div>

      </div>
    </section>
  );
}