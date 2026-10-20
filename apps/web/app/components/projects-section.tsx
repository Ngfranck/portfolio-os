"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUpRight01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";

gsap.registerPlugin(ScrollTrigger);

export type ProjectsSectionProject = {
  slug: string;
  title: string;
  category: string;
  year: string;
  description: string;
  shortDescription: string;
  image: string;
  services: string[];
  featured?: boolean;
};

type ProjectsSectionProps = {
  projects: ProjectsSectionProject[];
};

export function ProjectsSection({
  projects,
}: ProjectsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;

      /* =====================================================
       * REDUCED MOTION
       * ===================================================== */

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        return;
      }

      /* =====================================================
       * HEADER ELEMENTS
       * ===================================================== */

      const badge = section.querySelector("[data-projects-badge]");
      const title = section.querySelector("[data-projects-title]");
      const description = section.querySelector(
        "[data-projects-description]",
      );
      const viewAll = section.querySelector("[data-projects-view-all]");

      /* =====================================================
       * PROJECT CARDS
       * ===================================================== */

      const projectCards = section.querySelectorAll(
        "[data-project-card]",
      );

      /* =====================================================
       * INITIAL STATES
       * ===================================================== */

      if (badge) {
        gsap.set(badge, {
          y: 35,
          opacity: 0,
        });
      }

      if (title) {
        gsap.set(title, {
          y: 55,
          opacity: 0,
        });
      }

      if (description) {
        gsap.set(description, {
          y: 35,
          opacity: 0,
        });
      }

      if (viewAll) {
        gsap.set(viewAll, {
          y: 30,
          opacity: 0,
        });
      }

      gsap.set(projectCards, {
        y: 80,
        opacity: 0,
      });

      /* =====================================================
       * HEADER SCROLL ANIMATION
       * ===================================================== */

      const headerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      headerTimeline
        .to(badge, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        })
        .to(
          title,
          {
            y: 0,
            opacity: 1,
            duration: 1.15,
            ease: "power3.out",
          },
          "-=0.72",
        )
        .to(
          description,
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            ease: "power3.out",
          },
          "-=0.72",
        )
        .to(
          viewAll,
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
          },
          "-=0.7",
        );

      /* =====================================================
       * PROJECT CARDS REVEAL
       * ===================================================== */

      projectCards.forEach((card, index) => {
        const image = card.querySelector("[data-project-image]");
        const content = card.querySelector("[data-project-content]");
        const number = card.querySelector("[data-project-number]");

        /* -------------------------------------------------
         * INITIAL IMAGE STATE
         * ------------------------------------------------- */

        if (image) {
          gsap.set(image, {
            scale: 1.08,
          });
        }

        /* -------------------------------------------------
         * INITIAL CONTENT STATE
         * ------------------------------------------------- */

        if (content) {
          gsap.set(content, {
            y: 30,
            opacity: 0,
          });
        }

        if (number) {
          gsap.set(number, {
            y: -15,
            opacity: 0,
          });
        }

        /* -------------------------------------------------
         * CARD TIMELINE
         * ------------------------------------------------- */

        const cardTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
          },
        });

        /* CARD */

        cardTimeline.to(
          card,
          {
            y: 0,
            opacity: 1,
            duration: 1.15,
            delay: index * 0.08,
            ease: "power3.out",
          },
          0,
        );

        /* IMAGE */

        if (image) {
          cardTimeline.to(
            image,
            {
              scale: 1,
              duration: 1.6,
              ease: "power3.out",
            },
            0,
          );
        }

        /* PROJECT NUMBER */

        if (number) {
          cardTimeline.to(
            number,
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power2.out",
            },
            0.35,
          );
        }

        /* CONTENT */

        if (content) {
          cardTimeline.to(
            content,
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
            },
            0.25,
          );
        }
      });

      /* =====================================================
       * REFRESH SCROLLTRIGGER
       * ===================================================== */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    },
    {
      scope: sectionRef,
    },
  );

  const featuredProjects = projects.filter(
    (project) => project.featured,
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="
        relative
        overflow-hidden
        bg-[var(--portfolio-surface)]
        px-4
        py-[var(--portfolio-space-7)]
        text-[var(--portfolio-text-primary)]
        transition-colors
        duration-[var(--portfolio-motion-normal)]
        sm:px-6
        lg:px-8
      "
    >
      <div className="mx-auto max-w-[1320px]">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className="
            flex
            flex-col
            gap-8
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          {/* ===================================================
              HEADER LEFT
          =================================================== */}

          <div className="max-w-[680px]">
            {/* BADGE */}

            <div
              data-projects-badge
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
                will-change-transform
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
                    absolute
                    h-[7px]
                    w-[7px]
                    rounded-full
                    bg-[var(--portfolio-accent)]
                    projects-pulse
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

              <span>Selected work</span>
            </div>

            {/* TITLE */}

            <h2
              data-projects-title
              className="
                mt-6
                font-display
                text-[clamp(2.8rem,6vw,5.5rem)]
                font-semibold
                leading-[0.94]
                tracking-[var(--portfolio-tracking-display)]
                will-change-transform
              "
            >
              <span className="text-[var(--portfolio-text-primary)]">
                Selected
              </span>{" "}
              <span
                className="
                  font-normal
                  text-[var(--portfolio-text-muted)]
                "
              >
                Projects
              </span>
            </h2>

            {/* DESCRIPTION */}

            <p
              data-projects-description
              className="
                mt-5
                max-w-[560px]
                font-body
                leading-[var(--portfolio-leading-body)]
                tracking-[var(--portfolio-tracking-body)]
                text-[var(--portfolio-text-secondary)]
                will-change-transform
              "
            >
              Explore selected brand identity, UI/UX, website design,
              and digital product projects. Each case study shows how
              thoughtful strategy and user-focused design turn ideas
              into clear, memorable digital experiences.
            </p>
          </div>

          {/* ===================================================
              VIEW ALL
          =================================================== */}

          <Link
            href="/#contact"
            data-projects-view-all
            data-cursor="magnetic"
            className="
              group
              inline-flex
              h-11
              shrink-0
              items-center
              gap-2
              self-start
              rounded-full
              border
              border-[var(--portfolio-border)]
              bg-[var(--portfolio-surface)]
              px-5
              font-display
              text-[13px]
              font-medium
              tracking-[-0.01em]
              text-[var(--portfolio-text-primary)]
              shadow-[0_3px_12px_rgba(0,0,0,0.025)]
              transition-all
              duration-[var(--portfolio-motion-fast)]
              hover:-translate-y-[1px]
              hover:border-[var(--portfolio-border-strong)]
              hover:bg-[var(--portfolio-surface-hover)]
              lg:self-end
              will-change-transform
            "
          >
            <span>Start a project</span>

            <HugeiconsIcon
              icon={ArrowUpRight01Icon}
              size={15}
              strokeWidth={1.7}
              className="
                text-[var(--portfolio-accent)]
                transition-transform
                duration-[var(--portfolio-motion-fast)]
                group-hover:-translate-y-[1px]
                group-hover:translate-x-[1px]
              "
            />
          </Link>
        </div>

        {/* =====================================================
            PROJECT GRID
        ===================================================== */}

        <div
          className="
            mt-14
            grid
            grid-cols-1
            gap-5
            md:grid-cols-2
          "
        >
          {featuredProjects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              data-project-card
              data-cursor="view"
              className="
                group
                block
                focus:outline-none
                will-change-transform
              "
            >
              <article
                className="
                  relative
                  overflow-hidden
                  rounded-[var(--portfolio-radius-lg)]
                  border
                  border-[var(--portfolio-background)]
                  bg-[var(--portfolio-surface)]
                  transition-all
                  duration-[var(--portfolio-motion-normal)]
                  hover:-translate-y-[3px]
                  hover:border-[var(--portfolio-border)]
                  hover:shadow-[0_24px_60px_rgba(0,0,0,0.07)]
                "
              >
                {/* =================================================
                    IMAGE
                ================================================= */}

                <div
                  className="
                    relative
                    aspect-[16/10]
                    overflow-hidden
                    bg-[var(--portfolio-surface-soft)]
                  "
                >
                  <Image
                    data-project-image
                    src={project.image}
                    alt={`${project.title} ${project.category} portfolio project`}
                    fill
                    sizes="(max-width: 768px) 92vw, (max-width: 1280px) 48vw, 620px"
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      ease-out
                      group-hover:scale-[1.035]
                      will-change-transform
                    "
                  />

                  {/* IMAGE OVERLAY */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/25
                      via-transparent
                      to-transparent
                      opacity-70
                    "
                  />

                  {/* PROJECT NUMBER */}

                  <div
                    data-project-number
                    className="
                      absolute
                      left-5
                      top-5
                      flex
                      h-9
                      min-w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/20
                      bg-black/20
                      px-3
                      font-display
                      text-[11px]
                      font-medium
                      text-white
                      backdrop-blur-md
                      will-change-transform
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* VIEW PROJECT */}

                  <div
                    className="
                      absolute
                      bottom-5
                      right-5
                      flex
                      h-11
                      w-11
                      translate-y-2
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      text-[#111111]
                      opacity-0
                      shadow-[0_8px_25px_rgba(0,0,0,0.15)]
                      transition-all
                      duration-[var(--portfolio-motion-fast)]
                      group-hover:translate-y-0
                      group-hover:opacity-100
                    "
                  >
                    <HugeiconsIcon
                      icon={ArrowUpRight01Icon}
                      size={17}
                      strokeWidth={1.7}
                      className="text-[var(--portfolio-accent)]"
                    />
                  </div>
                </div>

                {/* =================================================
                    CONTENT
                ================================================= */}

                <div
                  data-project-content
                  className="
                    p-5
                    sm:p-6
                    will-change-transform
                  "
                >
                  {/* META */}

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-4
                      font-display
                      text-[12px]
                      font-medium
                      tracking-[-0.005em]
                    "
                  >
                    <span className="text-[var(--portfolio-text-secondary)]">
                      {project.category}
                    </span>

                    <span className="text-[var(--portfolio-text-muted)]">
                      {project.year}
                    </span>
                  </div>

                  {/* TITLE */}

                  <div
                    className="
                      mt-4
                      flex
                      items-center
                      justify-between
                      gap-4
                    "
                  >
                    <h3
                      className="
                        font-display
                        text-[24px]
                        font-semibold
                        leading-[1]
                        tracking-[-0.03em]
                        text-[var(--portfolio-text-primary)]
                      "
                    >
                      {project.title}
                    </h3>

                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      size={18}
                      strokeWidth={1.5}
                      className="
                        shrink-0
                        text-[var(--portfolio-text-muted)]
                        transition-all
                        duration-[var(--portfolio-motion-fast)]
                        group-hover:translate-x-1
                        group-hover:text-[var(--portfolio-accent)]
                      "
                    />
                  </div>

                  {/* DESCRIPTION */}

                  <p
                    className="
                      mt-3
                      max-w-[560px]
                      font-body
                      text-[14px]
                      leading-[1.6]
                      text-[var(--portfolio-text-secondary)]
                    "
                  >
                    {project.description}
                  </p>

                  {/* SERVICES */}

                  <div
                    className="
                      mt-5
                      flex
                      flex-wrap
                      gap-2
                    "
                  >
                    {project.services.map((service) => (
                      <span
                        key={service}
                        className="
                          rounded-full
                          border
                          border-[var(--portfolio-border)]
                          bg-[var(--portfolio-background)]
                          px-3
                          py-1.5
                          font-display
                          text-[11px]
                          font-medium
                          text-[var(--portfolio-text-secondary)]
                          transition-colors
                          duration-[var(--portfolio-motion-fast)]
                        "
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}