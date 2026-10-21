"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import { HugeiconsIcon } from "@hugeicons/react";

import {
  ArrowLeft01Icon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  category: string;
  year: string;
  description: string;
  services: string[];
  role?: string[];
  image: string;
  website?: string;
}

interface ProjectHeroProps {
  project: Project;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      /*
       * =====================================================
       * SELECTORS
       * =====================================================
       */

      const backLink = section.querySelector(
        "[data-project-back]"
      );

      const meta = section.querySelector(
        "[data-project-meta]"
      );

      const title = section.querySelector(
        "[data-project-title]"
      );

      const description = section.querySelector(
        "[data-project-description]"
      );

      const websiteCta = section.querySelector(
        "[data-project-website]"
      );

      const infoCard = section.querySelector(
        "[data-project-info]"
      );

      const infoSections = section.querySelectorAll(
        "[data-project-info-section]"
      );

      const roleItems = section.querySelectorAll(
        "[data-project-role]"
      );

      const serviceItems = section.querySelectorAll(
        "[data-project-service]"
      );

      const year = section.querySelector(
        "[data-project-year]"
      );

      const heroImageContainer = section.querySelector(
        "[data-project-image-container]"
      );

      const heroImage = section.querySelector(
        "[data-project-image]"
      );

      /*
       * =====================================================
       * INITIAL STATES
       * =====================================================
       */

      gsap.set(backLink, {
        opacity: 0,
        x: -20,
      });

      gsap.set(meta, {
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

      gsap.set(websiteCta, {
        opacity: 0,
        y: 20,
        scale: 0.97,
      });

      gsap.set(infoCard, {
        opacity: 0,
        x: 35,
        y: 20,
      });

      gsap.set(infoSections, {
        opacity: 0,
        y: 15,
      });

      gsap.set(
        [...roleItems, ...serviceItems],
        {
          opacity: 0,
          y: 10,
          scale: 0.96,
        }
      );

      gsap.set(year, {
        opacity: 0,
        y: 10,
      });

      gsap.set(heroImageContainer, {
        opacity: 0,
        y: 45,
        clipPath: "inset(8% 0 8% 0)",
      });

      gsap.set(heroImage, {
        scale: 1.08,
      });

      /*
       * =====================================================
       * HERO INTRO
       * =====================================================
       */

      const introTimeline = gsap.timeline();

      introTimeline
        .to(backLink, {
          opacity: 1,
          x: 0,
          duration: 0.55,
          ease: "power3.out",
        })
        .to(
          meta,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.25"
        )
        .to(
          title,
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 1,
            ease: "power4.out",
          },
          "-=0.2"
        )
        .to(
          description,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
          },
          "-=0.45"
        );

      if (websiteCta) {
        introTimeline.to(
          websiteCta,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3"
        );
      }

      /*
       * =====================================================
       * PROJECT INFO CARD
       * =====================================================
       */

      const infoTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: infoCard,
          start: "top 88%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      infoTimeline
        .to(infoCard, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        })
        .to(
          infoSections,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.35"
        )
        .to(
          roleItems,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            stagger: 0.06,
            ease: "power3.out",
          },
          "-=0.25"
        )
        .to(
          serviceItems,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            stagger: 0.06,
            ease: "power3.out",
          },
          "-=0.25"
        )
        .to(
          year,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
          },
          "-=0.2"
        );

      /*
       * =====================================================
       * HERO IMAGE REVEAL
       * =====================================================
       */

      const imageTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroImageContainer,
          start: "top 88%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      imageTimeline
        .to(heroImageContainer, {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0 0% 0)",
          duration: 1.1,
          ease: "power4.out",
        })
        .to(
          heroImage,
          {
            scale: 1,
            duration: 1.25,
            ease: "power3.out",
          },
          "-=0.9"
        );

      /*
       * =====================================================
       * IMAGE PARALLAX
       * =====================================================
       */

      gsap.to(heroImage, {
        yPercent: 4,
        ease: "none",
        scrollTrigger: {
          trigger: heroImageContainer,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      /*
       * =====================================================
       * REFRESH
       * =====================================================
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
        pb-16
        pt-32
        text-[var(--portfolio-text-primary)]
        transition-colors
        duration-[var(--portfolio-motion-normal)]
        sm:px-8
        lg:px-16
        lg:pb-24
        lg:pt-40
      "
    >
      <div className="mx-auto max-w-[1320px]">
        {/* =====================================================
            BACK
        ===================================================== */}

        <Link
          data-project-back
          href="/#projects"
          className="
            group
            inline-flex
            items-center
            gap-2
            font-display
            text-[13px]
            font-medium
            text-[var(--portfolio-text-secondary)]
            transition-colors
            duration-[var(--portfolio-motion-fast)]
            hover:text-[var(--portfolio-text-primary)]
          "
        >
          <HugeiconsIcon
            icon={ArrowLeft01Icon}
            size={15}
            strokeWidth={1.6}
            className="
              transition-transform
              duration-[var(--portfolio-motion-fast)]
              group-hover:-translate-x-1
            "
          />

          <span>Back to selected projects</span>
        </Link>

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          {/* LEFT */}

          <div>
            {/* META */}

            <div
              data-project-meta
              className="
                flex
                flex-wrap
                items-center
                gap-3
                font-display
                text-[11px]
                font-medium
              "
            >
              <span
                className="
                  rounded-full
                  border
                  border-[var(--portfolio-border)]
                  bg-[var(--portfolio-surface)]
                  px-3
                  py-1.5
                  text-[var(--portfolio-text-secondary)]
                "
              >
                {project.category}
              </span>

              <span className="text-[var(--portfolio-text-muted)]">
                /
              </span>

              <span className="text-[var(--portfolio-text-muted)]">
                {project.year}
              </span>
            </div>

            {/* TITLE */}

            <h1
              data-project-title
              className="
                mt-7
                max-w-[900px]
                font-display
                text-[clamp(3.2rem,7.5vw,7.2rem)]
                font-semibold
                leading-[0.88]
                tracking-[var(--portfolio-tracking-display)]
              "
            >
              {project.title}
            </h1>

            {/* DESCRIPTION */}

            <p
              data-project-description
              className="
                mt-7
                max-w-[650px]
                font-body
                text-[clamp(0.95rem,1.25vw,1.1rem)]
                leading-[1.55]
                tracking-[var(--portfolio-tracking-body)]
                text-[var(--portfolio-text-secondary)]
              "
            >
              {project.description}
            </p>

            {/* CTA */}

            {project.website && (
              <div className="mt-8">
                <a
                  data-project-website
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group
                    inline-flex
                    h-12
                    items-center
                    gap-2.5
                    rounded-full
                    bg-[var(--portfolio-dark)]
                    px-6
                    font-display
                    text-[13px]
                    font-medium
                    text-[var(--portfolio-dark-text)]
                    transition-all
                    duration-[var(--portfolio-motion-fast)]
                    hover:-translate-y-[2px]
                    hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]
                  "
                >
                  <span>Visit live project</span>

                  <HugeiconsIcon
                    icon={ArrowUpRight01Icon}
                    size={15}
                    strokeWidth={1.7}
                    className="
                      text-[var(--portfolio-accent)]
                      transition-transform
                      duration-[var(--portfolio-motion-fast)]
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                    "
                  />
                </a>
              </div>
            )}
          </div>

          {/* RIGHT — PROJECT INFO */}

          <div className="lg:pt-4">
            <div
              data-project-info
              className="
                overflow-hidden
                rounded-[var(--portfolio-radius-lg)]
                border
                border-[var(--portfolio-border)]
                bg-[var(--portfolio-surface)]
              "
            >
              {/* ROLE */}

              <div
                data-project-info-section
                className="
                  border-b
                  border-[var(--portfolio-border)]
                  p-6
                "
              >
                <span
                  className="
                    font-display
                    text-[11px]
                    font-medium
                    uppercase
                    tracking-[0.12em]
                    text-[var(--portfolio-text-muted)]
                  "
                >
                  Role
                </span>

                <div className="mt-3 flex flex-wrap gap-2">
                  {project.role?.map((role) => (
                    <span
                      key={role}
                      data-project-role
                      className="
                        rounded-full
                        bg-[var(--portfolio-background)]
                        px-3
                        py-1.5
                        font-display
                        text-[11px]
                        font-medium
                        text-[var(--portfolio-text-primary)]
                      "
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* SERVICES */}

              <div
                data-project-info-section
                className="
                  border-b
                  border-[var(--portfolio-border)]
                  p-6
                "
              >
                <span
                  className="
                    font-display
                    text-[11px]
                    font-medium
                    uppercase
                    tracking-[0.12em]
                    text-[var(--portfolio-text-muted)]
                  "
                >
                  Services
                </span>

                <div className="mt-3 flex flex-wrap gap-2">
                  {project.services.map((service) => (
                    <span
                      key={service}
                      data-project-service
                      className="
                        rounded-full
                        bg-[var(--portfolio-background)]
                        px-3
                        py-1.5
                        font-display
                        text-[11px]
                        font-medium
                        text-[var(--portfolio-text-secondary)]
                      "
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* YEAR */}

              <div
                data-project-info-section
                className="p-6"
              >
                <span
                  className="
                    font-display
                    text-[11px]
                    font-medium
                    uppercase
                    tracking-[0.12em]
                    text-[var(--portfolio-text-muted)]
                  "
                >
                  Year
                </span>

                <p
                  data-project-year
                  className="
                    mt-2
                    font-display
                    text-[14px]
                    font-medium
                    text-[var(--portfolio-text-primary)]
                  "
                >
                  {project.year}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            HERO IMAGE
        ===================================================== */}

        <div
          data-project-image-container
          className="
            relative
            mt-16
            aspect-[16/9]
            overflow-hidden
            rounded-[var(--portfolio-radius-lg)]
            border
            border-[var(--portfolio-border)]
            bg-[var(--portfolio-surface)]
            lg:mt-24
          "
        >
          <Image
            data-project-image
            src={project.image}
            alt={`${project.title} ${project.category} design case study`}
            fill
            priority
            sizes="(max-width: 1320px) 100vw, 1320px"
            className="
              object-cover
              will-change-transform
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-black/20
              via-transparent
              to-transparent
            "
          />
        </div>
      </div>
    </section>
  );
}