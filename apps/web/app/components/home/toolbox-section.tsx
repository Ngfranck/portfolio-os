"use client";

import { useRef } from "react";

import { HugeiconsIcon } from "@hugeicons/react";

import {
  ArrowUpRight01Icon,
  CheckmarkCircle02Icon,
  CodeIcon,
  FigmaIcon,
  GithubIcon,
  AdobeIllustratorIcon,
  Notion01Icon,
  Photo,
  SparklesIcon,
  WebflowIcon,
} from "@hugeicons/core-free-icons";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   TYPES
============================================================ */

type Tool = {
  name: string;
  description: string;
  icon: typeof FigmaIcon;
};

type ToolboxCategory = {
  title: string;
  description: string;
  tools: Tool[];
};

/* ============================================================
   DATA
============================================================ */

const categories: ToolboxCategory[] = [
  {
    title: "Design",
    description: "Visual design & interface",
    tools: [
      {
        name: "Figma",
        description: "UI / UX Design",
        icon: FigmaIcon,
      },
      {
        name: "Illustrator",
        description: "Brand & Vector",
        icon: AdobeIllustratorIcon,
      },
      {
        name: "Photoshop",
        description: "Visual Design",
        icon: Photo,
      },
    ],
  },
  {
    title: "Web & No-code",
    description: "Digital experiences",
    tools: [
      {
        name: "Framer",
        description: "Web Design",
        icon: SparklesIcon,
      },
      {
        name: "Webflow",
        description: "No-code Development",
        icon: WebflowIcon,
      },
    ],
  },
  {
    title: "Development",
    description: "Build & ship",
    tools: [
      {
        name: "Next.js",
        description: "Web Development",
        icon: CodeIcon,
      },
      {
        name: "GitHub",
        description: "Version Control",
        icon: GithubIcon,
      },
    ],
  },
  {
    title: "Productivity",
    description: "Organize & collaborate",
    tools: [
      {
        name: "Notion",
        description: "Workspace",
        icon: Notion01Icon,
      },
      {
        name: "Figma",
        description: "Collaboration",
        icon: FigmaIcon,
      },
    ],
  },
];

/* ============================================================
   MARQUEE ITEMS
============================================================ */

const marqueeItems = [
  "Figma",
  "Next.js",
  "GitHub",
  "Notion",
  "Webflow",
  "Figma",
  "Framer",
  "Illustrator",
  "Photoshop",
  "Next.js",
  "GitHub",
  "Notion",
  "Webflow",
  "Figma",
  "Framer",
  "Illustrator",
];

/* ============================================================
   TOOL ITEM
============================================================ */

function ToolItem({ tool }: { tool: Tool }) {
  return (
    <div
      className="
        group
        flex
        items-center
        gap-3
        rounded-xl
        px-3
        py-3
        transition-all
        duration-300
        hover:bg-[var(--portfolio-surface-hover)]
      "
    >
      {/* ICON */}
      <div
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-lg
          border
          border-[var(--portfolio-border)]
          bg-[var(--portfolio-bg)]
          text-[var(--portfolio-icon)]
          transition-all
          duration-300
          group-hover:border-[var(--portfolio-border-strong)]
        "
      >
        <HugeiconsIcon
          icon={tool.icon}
          size={17}
          strokeWidth={1.5}
        />
      </div>

      {/* TEXT */}
      <div className="min-w-0">
        <div
          className="
            font-display
            text-[13px]
            font-medium
            tracking-[-0.015em]
            text-[var(--portfolio-text-primary)]
          "
        >
          {tool.name}
        </div>

        <div
          className="
            mt-[2px]
            font-body
            text-[11px]
            leading-[1.4]
            text-[var(--portfolio-text-muted)]
          "
        >
          {tool.description}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   CATEGORY CARD
============================================================ */

function ToolboxCategoryCard({
  category,
}: {
  category: ToolboxCategory;
}) {
  return (
    <article
      data-toolbox-card
      className="
        relative
        min-h-[310px]
        overflow-hidden
        rounded-[var(--portfolio-radius-lg)]
        border
        border-[var(--portfolio-border)]
        bg-[var(--portfolio-surface)]
        p-6
        transition-all
        duration-500
        hover:-translate-y-[2px]
        hover:border-[var(--portfolio-border-strong)]
      "
    >
      {/* CATEGORY HEADER */}
      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div>
          <h3
            className="
              font-display
              text-[16px]
              font-semibold
              tracking-[-0.025em]
              text-[var(--portfolio-text-primary)]
            "
          >
            {category.title}
          </h3>

          <p
            className="
              mt-2
              font-body
              text-[12px]
              leading-[1.5]
              text-[var(--portfolio-text-muted)]
            "
          >
            {category.description}
          </p>
        </div>

        {/* RED DOT */}
        <span
          className="
            relative
            mt-1
            flex
            h-2
            w-2
            shrink-0
            items-center
            justify-center
          "
        >
          <span
            className="
              absolute
              h-2
              w-2
              rounded-full
              bg-[var(--portfolio-accent)]
              toolbox-pulse
            "
          />

          <span
            className="
              relative
              h-1.5
              w-1.5
              rounded-full
              bg-[var(--portfolio-accent)]
            "
          />
        </span>
      </div>

      {/* TOOLS */}
      <div className="mt-7 space-y-1">
        {category.tools.map((tool) => (
          <ToolItem
            key={`${category.title}-${tool.name}`}
            tool={tool}
          />
        ))}
      </div>
    </article>
  );
}

/* ============================================================
   MARQUEE ITEM
============================================================ */

function MarqueeItem({ name }: { name: string }) {
  return (
    <div
      className="
        flex
        shrink-0
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
          h-1
          w-1
          rounded-full
          bg-[var(--portfolio-accent)]
        "
      />

      <span>{name}</span>
    </div>
  );
}

/* ============================================================
   TOOLBOX SECTION
============================================================ */

export function ToolboxSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const ctx = gsap.context(() => {
        const header = section.querySelector(
          "[data-toolbox-header]"
        );

        const badge = section.querySelector(
          "[data-toolbox-badge]"
        );

        const title = section.querySelector(
          "[data-toolbox-title]"
        );

        const description = section.querySelector(
          "[data-toolbox-description]"
        );

        const supportLine = section.querySelector(
          "[data-toolbox-support]"
        );

        const cards = section.querySelectorAll(
          "[data-toolbox-card]"
        );

        const bottomMessage = section.querySelector(
          "[data-toolbox-bottom]"
        );

        const bottomLeft = section.querySelector(
          "[data-toolbox-bottom-left]"
        );

        const bottomCta = section.querySelector(
          "[data-toolbox-bottom-cta]"
        );

        const marquee = section.querySelector(
          "[data-toolbox-marquee]"
        );

        /* ============================================================
           INITIAL STATES
        ============================================================ */

        gsap.set(
          [
            badge,
            title,
            description,
            supportLine,
            bottomMessage,
            marquee,
          ],
          {
            opacity: 0,
            y: 30,
          }
        );

        if (cards.length > 0) {
          gsap.set(cards, {
            opacity: 0,
            y: 45,
            scale: 0.97,
          });
        }

        if (bottomLeft) {
          gsap.set(bottomLeft, {
            opacity: 0,
            x: -25,
          });
        }

        if (bottomCta) {
          gsap.set(bottomCta, {
            opacity: 0,
            x: 25,
          });
        }

        /* ============================================================
           HEADER
        ============================================================ */

        if (header) {
          const headerTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: header,
              start: "top 82%",
              end: "bottom 25%",
              toggleActions: "play reverse play reverse",
            },
          });

          headerTimeline
            .to(badge, {
              opacity: 1,
              y: 0,
              duration: 0.6,
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
                duration: 0.7,
                ease: "power3.out",
              },
              "-=0.5"
            )
            .to(
              supportLine,
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power3.out",
              },
              "-=0.35"
            );
        }

        /* ============================================================
           TOOLBOX CARDS
        ============================================================ */

        if (cards.length > 0) {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cards[0],
              start: "top 82%",
              end: "bottom 25%",
              toggleActions: "play reverse play reverse",
            },
          });
        }

        /* ============================================================
           BOTTOM MESSAGE
        ============================================================ */

        if (bottomMessage) {
          const bottomTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: bottomMessage,
              start: "top 86%",
              end: "bottom 30%",
              toggleActions: "play reverse play reverse",
            },
          });

          if (bottomLeft) {
            bottomTimeline.to(bottomLeft, {
              opacity: 1,
              x: 0,
              duration: 0.7,
              ease: "power3.out",
            });
          }

          if (bottomCta) {
            bottomTimeline.to(
              bottomCta,
              {
                opacity: 1,
                x: 0,
                duration: 0.65,
                ease: "power3.out",
              },
              "-=0.35"
            );
          }
        }

        /* ============================================================
           MARQUEE REVEAL
        ============================================================ */

        if (marquee) {
          gsap.to(marquee, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: marquee,
              start: "top 92%",
              end: "bottom 35%",
              toggleActions: "play reverse play reverse",
            },
          });
        }

        /* ============================================================
           REFRESH SCROLLTRIGGER
        ============================================================ */

        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      }, section);

      return () => {
        ctx.revert();
      };
    },
    {
      scope: sectionRef,
    }
  );

  return (
    <section
      ref={sectionRef}
      id="toolbox"
      className="
        relative
        overflow-hidden
        bg-[var(--portfolio-bg)]
        px-4
        py-[var(--portfolio-space-7)]
        text-[var(--portfolio-text-primary)]
        transition-colors
        duration-500
        sm:px-6
        lg:px-8
      "
    >
      <div className="mx-auto max-w-[1240px]">
        {/* ==================================================
            HEADER
        ================================================== */}

        <div
          data-toolbox-header
          className="
            grid
            grid-cols-1
            gap-10
            lg:grid-cols-[1.05fr_0.95fr]
            lg:items-end
          "
        >
          {/* LEFT */}

          <div>
            {/* BADGE */}

            <div
              data-toolbox-badge
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
                text-[var(--portfolio-text-primary)]
              "
            >
              <span
                className="
                  relative
                  flex
                  h-2
                  w-2
                  items-center
                  justify-center
                "
              >
                <span
                  className="
                    absolute
                    h-2
                    w-2
                    rounded-full
                    bg-[var(--portfolio-accent)]
                    toolbox-pulse
                  "
                />

                <span
                  className="
                    relative
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[var(--portfolio-accent)]
                  "
                />
              </span>

              <span>My toolbox</span>
            </div>

            {/* TITLE */}

            <h2
              data-toolbox-title
              className="
                mt-7
                max-w-[720px]
                font-display
                text-[clamp(3rem,6.5vw,5.8rem)]
                font-semibold
                leading-[0.91]
                tracking-[var(--portfolio-tracking-display)]
              "
            >
              <span className="text-[var(--portfolio-text-primary)]">
                The tools
              </span>{" "}
              <span className="font-normal text-[var(--portfolio-text-muted)]">
                behind the
              </span>
              <br />
              <span className="font-normal text-[var(--portfolio-text-muted)]">
                work
              </span>
            </h2>
          </div>

          {/* RIGHT */}

          <div className="max-w-[500px] lg:ml-auto">
            <p
              data-toolbox-description
              className="
                font-body
                text-[15px]
                leading-[1.65]
                tracking-[var(--portfolio-tracking-body)]
                text-[var(--portfolio-text-secondary)]
              "
            >
              Une sélection d'outils que j'utilise pour
              transformer une idée en identité, interface et
              expérience digitale cohérente.
            </p>

            {/* SUPPORT LINE */}

            <div
              data-toolbox-support
              className="
                mt-5
                flex
                items-center
                gap-2
                font-body
                text-[11px]
                font-medium
                text-[var(--portfolio-text-muted)]
              "
            >
              <HugeiconsIcon
                icon={CheckmarkCircle02Icon}
                size={15}
                strokeWidth={1.5}
                color="var(--portfolio-accent)"
              />

              <span>Tools adaptés à chaque projet</span>
            </div>
          </div>
        </div>

        {/* ==================================================
            TOOLBOX GRID
        ================================================== */}

        <div
          className="
            mt-16
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {categories.map((category) => (
            <ToolboxCategoryCard
              key={category.title}
              category={category}
            />
          ))}
        </div>

        {/* ==================================================
            BOTTOM MESSAGE
        ================================================== */}

        <div
          data-toolbox-bottom
          className="
            mt-14
            flex
            flex-col
            gap-5
            border-t
            border-[var(--portfolio-border)]
            pt-6
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          {/* LEFT */}

          <div
            data-toolbox-bottom-left
            className="
              flex
              items-center
              gap-3
              font-display
              text-[12px]
              font-medium
              text-[var(--portfolio-text-muted)]
            "
          >
            <HugeiconsIcon
              icon={SparklesIcon}
              size={16}
              strokeWidth={1.5}
            />

            <span>
              The right tool for the right problem.
            </span>
          </div>

          {/* RIGHT */}

          <a
            data-toolbox-bottom-cta
            data-cursor="magnetic"
            href="/#contact"
            className="
              group
              inline-flex
              items-center
              gap-2
              font-display
              text-[12px]
              font-medium
              text-[var(--portfolio-text-secondary)]
              transition-colors
              duration-300
              hover:text-[var(--portfolio-text-primary)]
            "
          >
            <span>Start a project</span>

            <HugeiconsIcon
              icon={ArrowUpRight01Icon}
              size={14}
              strokeWidth={1.7}
              color="var(--portfolio-accent)"
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />
          </a>
        </div>
      </div>

      {/* ====================================================
          MARQUEE
      ==================================================== */}

      <div
        data-toolbox-marquee
        className="
          relative
          mt-16
          w-full
          overflow-hidden
          border-y
          border-[var(--portfolio-border)]
          py-5
        "
      >
        {/* LEFT FADE */}

        <div
          className="
            pointer-events-none
            absolute
            inset-y-0
            left-0
            z-10
            w-20
            bg-gradient-to-r
            from-[var(--portfolio-bg)]
            to-transparent
            sm:w-32
          "
        />

        {/* RIGHT FADE */}

        <div
          className="
            pointer-events-none
            absolute
            inset-y-0
            right-0
            z-10
            w-20
            bg-gradient-to-l
            from-[var(--portfolio-bg)]
            to-transparent
            sm:w-32
          "
        />

        <div className="overflow-hidden">
          <div
            className="
              toolbox-marquee
              flex
              w-max
              items-center
              gap-10
              px-4
            "
          >
            {[...marqueeItems, ...marqueeItems].map(
              (item, index) => (
                <MarqueeItem
                  key={`${item}-${index}`}
                  name={item}
                />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}