"use client";

import { useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface ProjectCTAProps {
  projectTitle: string;
}

export function ProjectCTA({ projectTitle }: ProjectCTAProps) {
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

      const glow = section.querySelector<HTMLElement>(
        "[data-project-cta-glow]"
      );
      const secondaryGlow = section.querySelector<HTMLElement>(
        "[data-project-cta-secondary-glow]"
      );
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
      const bottomLabel = section.querySelector<HTMLElement>(
        "[data-project-cta-bottom]"
      );
      const bottomLabelItems = section.querySelectorAll<HTMLElement>(
        "[data-project-cta-bottom-item]"
      );

      // ------------------------------------------------------------
      // INITIAL STATES
      // ------------------------------------------------------------

      gsap.set([glow, secondaryGlow].filter(Boolean), {
        opacity: 0,
        scale: 0.8,
      });

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

      gsap.set(bottomLabel, {
        opacity: 0,
        y: 20,
      });

      gsap.set(bottomLabelItems, {
        opacity: 0,
        y: 10,
      });

      // ------------------------------------------------------------
      // BACKGROUND GLOW
      // ------------------------------------------------------------

      const glowTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      if (glow) {
        glowTimeline.to(glow, {
          opacity: 0.4,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
        });
      }

      if (secondaryGlow) {
        glowTimeline.to(
          secondaryGlow,
          {
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
          },
          "-=1"
        );
      }

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
      // BOTTOM PROJECT LABEL
      // ------------------------------------------------------------

      const bottomTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: bottomLabel,
          start: "top 92%",
          end: "bottom 30%",
          toggleActions: "play reverse play reverse",
        },
      });

      if (bottomLabel) {
        bottomTimeline.to(bottomLabel, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
        });
      }

      if (bottomLabelItems.length > 0) {
        bottomTimeline.to(
          bottomLabelItems,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.08,
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
          BACKGROUND — RADIAL GLOW
      ===================================================== */}

      <div
        data-project-cta-glow
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          -z-10
          h-[520px]
          w-[520px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[radial-gradient(circle,var(--portfolio-accent-soft)_0%,transparent_68%)]
          opacity-40
          blur-3xl
          transition-opacity
          duration-700
          dark:opacity-25
        "
      />

      {/* Subtle secondary glow */}

      <div
        data-project-cta-secondary-glow
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[20%]
          top-[15%]
          -z-10
          h-40
          w-40
          rounded-full
          bg-[var(--portfolio-accent)]
          opacity-[0.025]
          blur-[90px]
          dark:opacity-[0.045]
        "
      />

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
          <HugeiconsIcon
            icon={SparklesIcon}
            size={15}
            strokeWidth={1.7}
            color="var(--portfolio-accent)"
          />

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
            text-[clamp(3.4rem,8vw,7.8rem)]
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
            Let's create
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
            text-[15px]
            leading-[1.65]
            tracking-[-0.01em]
            text-[var(--portfolio-text-secondary)]
            sm:text-[16px]
          "
        >
          Ce projet est une illustration de mon approche. Si vous recherchez
          une identité, une interface ou une expérience digitale pensée avec
          précision, parlons de votre projet.
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

          <a
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
            <span>Parlons de votre projet</span>

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
          </a>

          {/* SECONDARY */}

          <a
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
            <span>Voir d'autres projets</span>

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
          </a>
        </div>

        {/* ===================================================
            BOTTOM PROJECT LABEL
        =================================================== */}

        <div
          data-project-cta-bottom
          className="
            mt-20
            flex
            items-center
            gap-3
            font-body
            text-[10px]
            font-medium
            uppercase
            tracking-[0.16em]
            text-[var(--portfolio-text-muted)]
            sm:mt-24
          "
        >
          <span data-project-cta-bottom-item>Project</span>

          <span
            data-project-cta-bottom-item
            aria-hidden="true"
            className="
              h-1
              w-1
              rounded-full
              bg-[var(--portfolio-accent)]
            "
          />

          <span data-project-cta-bottom-item>{projectTitle}</span>
        </div>
      </div>
    </section>
  );
}