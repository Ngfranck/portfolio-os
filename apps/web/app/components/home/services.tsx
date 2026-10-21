"use client";

import { useRef } from "react";

import { HugeiconsIcon } from "@hugeicons/react";

import {
  ArrowUpRight01Icon,
  Idea01Icon,
  PencilEdit01Icon,
  Rocket01Icon,
  SparklesIcon,
  CodeIcon,
  Video01Icon,
  Image01Icon,
  Layout01Icon,
  MagicWand01Icon,
  Megaphone01Icon,
  GlobalSearchIcon,
} from "@hugeicons/core-free-icons";

import { useTheme } from "../theme/theme-provider";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   PUBLIC SERVICE TYPES
============================================================ */

type PublicService = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string | null;
  icon: string | null;
  featured: boolean;
  sortOrder: number;
};

type ServiceDisplay = Pick<
  PublicService,
  "title" | "shortDescription"
>;

type ServicesSectionProps = {
  services?: PublicService[];
};

type ServicesDisplayTuple = [
  ServiceDisplay,
  ServiceDisplay,
  ServiceDisplay,
  ServiceDisplay,
];

/* ============================================================
   FALLBACK SERVICES
============================================================ */

/**
 * Contenu de secours utilisé pendant la transition
 * vers les données venant du Back Office.
 *
 * L'ordre correspond aux quatre cartes visuelles
 * de la section.
 */
const fallbackServices: ServiceDisplay[] = [
  {
    title: "Website Design",
    shortDescription:
      "Des interfaces web élégantes, intuitives et orientées conversion, pensées autour de votre marque et de vos utilisateurs.",
  },
  {
    title: "Graphic Design",
    shortDescription:
      "Des créations graphiques fortes et polyvalentes qui renforcent votre image et captivent votre audience.",
  },
  {
    title: "Logo Design",
    shortDescription:
      "Des identités visuelles distinctives, cohérentes et mémorables qui donnent une véritable personnalité à votre marque.",
  },
  {
    title: "Framer Design",
    shortDescription:
      "Des expériences digitales modernes, interactives et performantes conçues pour donner vie à vos idées.",
  },
];

/**
 * Prépare exactement quatre services pour les cartes
 * de la homepage.
 *
 * Priorité :
 * 1. Services venant du Back Office.
 * 2. Fallbacks uniquement pour compléter les cartes manquantes.
 */
function getDisplayedServices(
  services: PublicService[],
): ServicesDisplayTuple {
  const displayed: ServiceDisplay[] = services
    .map(({ title, shortDescription }) => ({
      title,
      shortDescription,
    }))
    .slice(0, 4);

  const usedTitles = new Set(
    displayed.map((service) => service.title.trim().toLowerCase()),
  );

  for (const fallback of fallbackServices) {
    if (displayed.length >= 4) {
      break;
    }

    const normalizedTitle = fallback.title.trim().toLowerCase();

    if (!usedTitles.has(normalizedTitle)) {
      displayed.push(fallback);
      usedTitles.add(normalizedTitle);
    }
  }

  /**
   * Sécurité supplémentaire :
   * le design de cette section nécessite toujours quatre cartes.
   */
  while (displayed.length < 4) {
    displayed.push(
      fallbackServices[displayed.length] ??
        fallbackServices[0],
    );
  }

  return [
    displayed[0],
    displayed[1],
    displayed[2],
    displayed[3],
  ];
}

/* ============================================================
   MOVING PILLS
============================================================ */

const pillsRowOne = [
  {
    label: "Copywriting",
    icon: PencilEdit01Icon,
  },
  {
    label: "Posters",
    icon: Image01Icon,
  },
  {
    label: "Framer Migration",
    icon: Rocket01Icon,
  },
  {
    label: "Video & Motion Graphics",
    icon: Video01Icon,
  },
  {
    label: "Copywriting",
    icon: PencilEdit01Icon,
  },
  {
    label: "Posters",
    icon: Image01Icon,
  },
];

const pillsRowTwo = [
  {
    label: "Landing Pages",
    icon: Layout01Icon,
  },
  {
    label: "Optimization",
    icon: MagicWand01Icon,
  },
  {
    label: "Custom Code",
    icon: CodeIcon,
  },
  {
    label: "SEO",
    icon: GlobalSearchIcon,
  },
  {
    label: "Icons",
    icon: SparklesIcon,
  },
  {
    label: "Social Media",
    icon: Megaphone01Icon,
  },
  {
    label: "Landing Pages",
    icon: Layout01Icon,
  },
];

/* ============================================================
   PILL COMPONENT
============================================================ */

function ServicePill({
  label,
  icon,
  darkMode,
}: {
  label: string;
  icon: typeof PencilEdit01Icon;
  darkMode: boolean;
}) {
  return (
    <div
      className={`
        flex
        shrink-0
        items-center
        gap-2
        whitespace-nowrap
        rounded-full
        border
        px-4
        py-3
        font-display
        text-[13px]
        font-medium
        tracking-[-0.01em]
        transition-colors
        duration-[var(--portfolio-motion-normal)]
        ${
          darkMode
            ? `
              border-white/[0.08]
              bg-white/[0.035]
              text-white/70
              shadow-[0_4px_16px_rgba(0,0,0,0.18)]
            `
            : `
              border-black/[0.055]
              bg-[#fafafa]
              text-[var(--portfolio-text-primary)]
              shadow-[0_3px_12px_rgba(0,0,0,0.025)]
            `
        }
      `}
    >
      <HugeiconsIcon icon={icon} size={15} strokeWidth={1.5} />
      <span>{label}</span>
    </div>
  );
}

/* ============================================================
   SERVICES SECTION
============================================================ */

export function ServicesSection({
  services = [],
}: ServicesSectionProps) {
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  const sectionRef = useRef<HTMLElement>(null);

  const displayedServices = getDisplayedServices(services);

  const websiteService = displayedServices[0];
  const graphicService = displayedServices[1];
  const logoService = displayedServices[2];
  const framerService = displayedServices[3];

  useGSAP(
    () => {
      if (!sectionRef.current) {
        return;
      }

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        return;
      }

      const ctx = gsap.context(() => {
        const badge = sectionRef.current?.querySelector(
          "[data-services-badge]",
        );

        const title = sectionRef.current?.querySelector(
          "[data-services-title]",
        );

        const description = sectionRef.current?.querySelector(
          "[data-services-description]",
        );

        const cta = sectionRef.current?.querySelector(
          "[data-services-cta]",
        );

        const serviceCards = gsap.utils.toArray<HTMLElement>(
          "[data-service-card]",
        );

        const movingPills = sectionRef.current?.querySelector(
          "[data-services-pills]",
        );

        const marqueeRows = gsap.utils.toArray<HTMLElement>(
          "[data-services-marquee]",
        );

        /* =====================================================
           INITIAL STATES
        ===================================================== */

        if (badge) {
          gsap.set(badge, {
            opacity: 0,
            y: 20,
          });
        }

        if (title) {
          gsap.set(title, {
            opacity: 0,
            y: 38,
          });
        }

        if (description) {
          gsap.set(description, {
            opacity: 0,
            y: 24,
          });
        }

        if (cta) {
          gsap.set(cta, {
            opacity: 0,
            y: 22,
            scale: 0.97,
          });
        }

        serviceCards.forEach((card) => {
          const cardHeader = card.querySelector(
            "[data-service-header]",
          );

          const cardDescription = card.querySelector(
            "[data-service-description]",
          );

          const cardVisual = card.querySelector(
            "[data-service-visual]",
          );

          const cardIcon = card.querySelector(
            "[data-service-icon]",
          );

          const cardExtras = card.querySelector(
            "[data-service-extras]",
          );

          gsap.set(card, {
            opacity: 0,
            y: 55,
          });

          if (cardHeader) {
            gsap.set(cardHeader, {
              opacity: 0,
              y: 18,
            });
          }

          if (cardDescription) {
            gsap.set(cardDescription, {
              opacity: 0,
              y: 15,
            });
          }

          if (cardVisual) {
            gsap.set(cardVisual, {
              opacity: 0,
              y: 22,
              scale: 0.97,
            });
          }

          if (cardIcon) {
            gsap.set(cardIcon, {
              opacity: 0,
              scale: 0.8,
              rotate: -8,
            });
          }

          if (cardExtras) {
            gsap.set(cardExtras, {
              opacity: 0,
              y: 12,
            });
          }
        });

        if (movingPills) {
          gsap.set(movingPills, {
            opacity: 0,
            y: 30,
          });
        }

        /* =====================================================
           HEADER
        ===================================================== */

        if (badge && title && description) {
          const headerTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: badge,
              start: "top 82%",
              end: "bottom 20%",
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
                duration: 0.8,
                ease: "power3.out",
              },
              "-=0.35",
            )
            .to(
              description,
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power3.out",
              },
              "-=0.4",
            );
        }

        /* =====================================================
           CTA HEADER
        ===================================================== */

        if (cta) {
          gsap.to(cta, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cta,
              start: "top 84%",
              end: "bottom 25%",
              toggleActions: "play reverse play reverse",
            },
          });
        }

        /* =====================================================
           SERVICE CARDS
        ===================================================== */

        serviceCards.forEach((card, index) => {
          const cardHeader = card.querySelector(
            "[data-service-header]",
          );

          const cardDescription = card.querySelector(
            "[data-service-description]",
          );

          const cardVisual = card.querySelector(
            "[data-service-visual]",
          );

          const cardIcon = card.querySelector(
            "[data-service-icon]",
          );

          const cardExtras = card.querySelector(
            "[data-service-extras]",
          );

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 84%",
              end: "bottom 18%",
              toggleActions: "play reverse play reverse",
            },
          });

          timeline.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: index * 0.04,
            ease: "power3.out",
          });

          if (cardHeader) {
            timeline.to(
              cardHeader,
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power3.out",
              },
              "-=0.42",
            );
          }

          if (cardIcon) {
            timeline.to(
              cardIcon,
              {
                opacity: 1,
                scale: 1,
                rotate: 0,
                duration: 0.5,
                ease: "back.out(1.6)",
              },
              "-=0.35",
            );
          }

          if (cardDescription) {
            timeline.to(
              cardDescription,
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power3.out",
              },
              "-=0.32",
            );
          }

          if (cardVisual) {
            timeline.to(
              cardVisual,
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.75,
                ease: "power3.out",
              },
              "-=0.3",
            );
          }

          if (cardExtras) {
            timeline.to(
              cardExtras,
              {
                opacity: 1,
                y: 0,
                duration: 0.45,
                ease: "power2.out",
              },
              "-=0.35",
            );
          }
        });

        /* =====================================================
           MOVING PILLS CONTAINER
        ===================================================== */

        if (movingPills) {
          gsap.to(movingPills, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: movingPills,
              start: "top 88%",
              end: "bottom 25%",
              toggleActions: "play reverse play reverse",
            },
          });
        }

        /* =====================================================
           MARQUEE ROWS
        ===================================================== */

        marqueeRows.forEach((row) => {
          gsap.fromTo(
            row,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: row,
                start: "top 94%",
                end: "bottom 20%",
                toggleActions: "play reverse play reverse",
              },
            },
          );
        });

        /* =====================================================
           REFRESH
        ===================================================== */

        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      }, sectionRef);

      return () => ctx.revert();
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      className={`
        relative
        overflow-hidden
        px-4
        py-[var(--portfolio-space-7)]
        transition-colors
        duration-[var(--portfolio-motion-normal)]
        sm:px-6
        lg:px-8
        ${
          darkMode
            ? `
              bg-[#090909]
              text-white
            `
            : `
              bg-white
              text-[var(--portfolio-text-primary)]
            `
        }
      `}
    >
      {/* ======================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="mx-auto max-w-[1320px]">
        {/* ====================================================
            HEADER
        ==================================================== */}

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
          {/* LEFT */}

          <div className="max-w-[650px]">
            {/* BADGE */}

            <div
              data-services-badge
              className={`
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                px-3
                py-2
                font-display
                text-[12px]
                font-medium
                tracking-[-0.01em]
                backdrop-blur-md
                transition-colors
                duration-[var(--portfolio-motion-normal)]
                ${
                  darkMode
                    ? `
                      border-white/[0.08]
                      bg-white/[0.025]
                      text-white/80
                    `
                    : `
                      border-black/[0.07]
                      bg-[#fafafa]
                      text-[var(--portfolio-text-primary)]
                      shadow-[0_3px_12px_rgba(0,0,0,0.025)]
                    `
                }
              `}
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
                    services-pulse
                    absolute
                    h-[7px]
                    w-[7px]
                    rounded-full
                    bg-[var(--portfolio-accent)]
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

              <span>Design services</span>
            </div>

            {/* TITLE */}

            <h2
              data-services-title
              className="
                mt-6
                font-display
                text-[clamp(2.7rem,6vw,5.2rem)]
                font-semibold
                leading-[0.94]
                tracking-[var(--portfolio-tracking-display)]
              "
            >
              <span
                className={
                  darkMode
                    ? "text-white"
                    : "text-[var(--portfolio-text-primary)]"
                }
              >
                Design
              </span>{" "}
              <span
                className={
                  darkMode
                    ? "font-normal text-white/35"
                    : "font-normal text-black/35"
                }
              >
                Services
              </span>
            </h2>

            {/* DESCRIPTION */}

            <p
              data-services-description
              className={`
                mt-5
                max-w-[520px]
                font-body
                text-[15px]
                leading-[1.55]
                tracking-[var(--portfolio-tracking-body)]
                transition-colors
                duration-[var(--portfolio-motion-normal)]
                ${
                  darkMode
                    ? "text-white/45"
                    : "text-[var(--portfolio-text-secondary)]"
                }
              `}
            >
              Explorez une suite de services créatifs conçus
              pour construire, renforcer et faire évoluer votre
              marque.
            </p>
          </div>

          {/* CTA */}

          <a
            data-services-cta
            data-cursor="magnetic"
            href="/#contact"
            className={`
              group
              inline-flex
              h-12
              shrink-0
              items-center
              justify-center
              gap-2
              self-start
              rounded-full
              px-6
              font-display
              text-[13px]
              font-medium
              tracking-[-0.01em]
              transition-all
              duration-[var(--portfolio-motion-fast)]
              hover:scale-[1.02]
              lg:self-end
              ${
                darkMode
                  ? `
                    bg-white
                    text-[#111111]
                    hover:shadow-[0_10px_30px_rgba(255,255,255,0.08)]
                  `
                  : `
                    bg-[var(--portfolio-dark)]
                    text-[var(--portfolio-dark-text)]
                    hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)]
                  `
              }
            `}
          >
            <span>Me contacter</span>

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

        {/* ====================================================
            SERVICES GRID
        ==================================================== */}

        <div
          className="
            mt-14
            grid
            grid-cols-1
            gap-4
            lg:grid-cols-[1.05fr_0.95fr]
          "
        >
          {/* ==================================================
              LEFT COLUMN
          ================================================== */}

          <div className="flex flex-col gap-4">
            {/* WEBSITE DESIGN */}

            <article
              data-service-card
              data-cursor="view"
              className={`
                group
                relative
                overflow-hidden
                rounded-[var(--portfolio-radius-lg)]
                border
                p-6
                transition-all
                duration-[var(--portfolio-motion-normal)]
                hover:-translate-y-[2px]
                sm:p-7
                ${
                  darkMode
                    ? `
                      border-white/[0.08]
                      bg-white/[0.025]
                      hover:border-white/[0.14]
                      hover:bg-white/[0.04]
                      hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)]
                    `
                    : `
                      border-black/[0.065]
                      bg-[#f8f8f8]
                      hover:border-black/[0.11]
                      hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]
                    `
                }
              `}
            >
              <div
                data-service-header
                className="relative z-10"
              >
                <div className="flex items-center gap-3">
                  <span data-service-icon>
                    <HugeiconsIcon
                      icon={Layout01Icon}
                      size={22}
                      strokeWidth={1.5}
                    />
                  </span>

                  <h3
                    className="
                      font-display
                      text-[18px]
                      font-semibold
                      tracking-[-0.025em]
                    "
                  >
                    {websiteService.title}
                  </h3>
                </div>

                <p
                  data-service-description
                  className={`
                    mt-4
                    max-w-[560px]
                    font-body
                    text-[14px]
                    leading-[1.6]
                    ${
                      darkMode
                        ? "text-white/45"
                        : "text-[var(--portfolio-text-secondary)]"
                    }
                  `}
                >
                  {websiteService.shortDescription}
                </p>
              </div>

              {/* IMAGE */}

              <div
                data-service-visual
                className={`
                  relative
                  mt-7
                  h-[230px]
                  overflow-hidden
                  rounded-[14px]
                  bg-[#111111]
                `}
              >
                <img
                  src="/images/projects/mobile.jpg"
                  alt="Website design project"
                  loading="lazy"
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                    object-top
                    opacity-90
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-[1.035]
                  "
                />

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/35
                    via-transparent
                    to-transparent
                  "
                />
              </div>
            </article>

            {/* GRAPHIC DESIGN */}

            <article
              data-service-card
              data-cursor="view"
              className={`
                group
                rounded-[var(--portfolio-radius-lg)]
                border
                p-6
                transition-all
                duration-[var(--portfolio-motion-normal)]
                hover:-translate-y-[2px]
                sm:p-7
                ${
                  darkMode
                    ? `
                      border-white/[0.08]
                      bg-white/[0.025]
                      hover:border-white/[0.14]
                      hover:bg-white/[0.04]
                      hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)]
                    `
                    : `
                      border-black/[0.065]
                      bg-[#f8f8f8]
                      hover:border-black/[0.11]
                      hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]
                    `
                }
              `}
            >
              <div
                data-service-header
                className="flex items-center gap-3"
              >
                <span data-service-icon>
                  <HugeiconsIcon
                    icon={Idea01Icon}
                    size={22}
                    strokeWidth={1.5}
                  />
                </span>

                <h3
                  className="
                    font-display
                    text-[18px]
                    font-semibold
                    tracking-[-0.025em]
                  "
                >
                  {graphicService.title}
                </h3>
              </div>

              <p
                data-service-description
                className={`
                  mt-4
                  max-w-[600px]
                  font-body
                  text-[14px]
                  leading-[1.6]
                  ${
                    darkMode
                      ? "text-white/45"
                      : "text-[var(--portfolio-text-secondary)]"
                  }
                `}
              >
                {graphicService.shortDescription}
              </p>
            </article>
          </div>

          {/* ==================================================
              RIGHT COLUMN
          ================================================== */}

          <div className="flex flex-col gap-4">
            {/* LOGO DESIGN */}

            <article
              data-service-card
              data-cursor="view"
              className={`
                group
                rounded-[var(--portfolio-radius-lg)]
                border
                p-6
                transition-all
                duration-[var(--portfolio-motion-normal)]
                hover:-translate-y-[2px]
                sm:p-7
                ${
                  darkMode
                    ? `
                      border-white/[0.08]
                      bg-white/[0.025]
                      hover:border-white/[0.14]
                      hover:bg-white/[0.04]
                      hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)]
                    `
                    : `
                      border-black/[0.065]
                      bg-[#f8f8f8]
                      hover:border-black/[0.11]
                      hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]
                    `
                }
              `}
            >
              <div
                data-service-header
                className="flex items-center gap-3"
              >
                <span data-service-icon>
                  <HugeiconsIcon
                    icon={PencilEdit01Icon}
                    size={22}
                    strokeWidth={1.5}
                  />
                </span>

                <h3
                  className="
                    font-display
                    text-[18px]
                    font-semibold
                    tracking-[-0.025em]
                  "
                >
                  {logoService.title}
                </h3>
              </div>

              <p
                data-service-description
                className={`
                  mt-4
                  max-w-[600px]
                  font-body
                  text-[14px]
                  leading-[1.6]
                  ${
                    darkMode
                      ? "text-white/45"
                      : "text-[var(--portfolio-text-secondary)]"
                  }
                `}
              >
                {logoService.shortDescription}
              </p>

              {/* PULSE */}

              <div
                data-service-extras
                className="mt-3 flex justify-center"
              >
                <span
                  aria-hidden="true"
                  className={`
                    services-pulse-soft
                    h-2
                    w-2
                    rounded-full
                    opacity-80
                    ${darkMode ? "bg-white" : "bg-black"}
                  `}
                />
              </div>
            </article>

            {/* FRAMER DESIGN */}

            <article
              data-service-card
              data-cursor="view"
              className={`
                group
                overflow-hidden
                rounded-[var(--portfolio-radius-lg)]
                border
                p-6
                transition-all
                duration-[var(--portfolio-motion-normal)]
                hover:-translate-y-[2px]
                sm:p-7
                ${
                  darkMode
                    ? `
                      border-white/[0.08]
                      bg-white/[0.025]
                      hover:border-white/[0.14]
                      hover:bg-white/[0.04]
                      hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)]
                    `
                    : `
                      border-black/[0.065]
                      bg-[#f8f8f8]
                      hover:border-black/[0.11]
                      hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]
                    `
                }
              `}
            >
              <div
                data-service-header
                className="flex items-center gap-3"
              >
                <span data-service-icon>
                  <HugeiconsIcon
                    icon={SparklesIcon}
                    size={22}
                    strokeWidth={1.5}
                  />
                </span>

                <h3
                  className="
                    font-display
                    text-[18px]
                    font-semibold
                    tracking-[-0.025em]
                  "
                >
                  {framerService.title}
                </h3>
              </div>

              <p
                data-service-description
                className={`
                  mt-4
                  max-w-[650px]
                  font-body
                  text-[14px]
                  leading-[1.6]
                  ${
                    darkMode
                      ? "text-white/45"
                      : "text-[var(--portfolio-text-secondary)]"
                  }
                `}
              >
                {framerService.shortDescription}
              </p>

              {/* MINI PROJECT CARDS */}

              <div
                data-service-visual
                className="
                  mt-7
                  flex
                  gap-3
                  overflow-hidden
                "
              >
                {/* NEO */}

                <div
                  className="
                    relative
                    h-[190px]
                    min-w-[72%]
                    overflow-hidden
                    rounded-[14px]
                    bg-[#eafcff]
                  "
                >
                  <div
                    className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-center
                      font-display
                      text-[52px]
                      font-semibold
                      italic
                      tracking-[-0.08em]
                      text-[#9de7ef]
                    "
                  >
                    neo
                  </div>
                </div>

                {/* SECOND CARD */}

                <div
                  className={`
                    relative
                    h-[190px]
                    min-w-[42%]
                    overflow-hidden
                    rounded-[14px]
                    ${
                      darkMode
                        ? "bg-[#1a1a1a]"
                        : "bg-[#ededed]"
                    }
                  `}
                >
                  <div
                    className={`
                      absolute
                      left-5
                      top-5
                      h-5
                      w-24
                      rounded-full
                      ${
                        darkMode
                          ? "bg-white/[0.08]"
                          : "bg-black/[0.08]"
                      }
                    `}
                  />

                  <div
                    className={`
                      absolute
                      left-5
                      top-14
                      h-3
                      w-28
                      rounded-full
                      ${
                        darkMode
                          ? "bg-white/[0.08]"
                          : "bg-black/[0.08]"
                      }
                    `}
                  />

                  <div
                    className={`
                      absolute
                      bottom-6
                      left-5
                      right-5
                      h-16
                      rounded-xl
                      ${
                        darkMode
                          ? "bg-white/[0.08]"
                          : "bg-white/80"
                      }
                    `}
                  />
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* ====================================================
            MOVING PILLS
        ==================================================== */}

        <div
          data-services-pills
          className="
            mx-auto
            mt-14
            w-full
            max-w-[1320px]
          "
        >
          <div className="relative overflow-hidden">
            {/* FADE LEFT */}

            <div
              aria-hidden="true"
              className={`
                pointer-events-none
                absolute
                inset-y-0
                left-0
                z-10
                w-16
                sm:w-28
                ${
                  darkMode
                    ? "bg-gradient-to-r from-[#090909] to-transparent"
                    : "bg-gradient-to-r from-white to-transparent"
                }
              `}
            />

            {/* FADE RIGHT */}

            <div
              aria-hidden="true"
              className={`
                pointer-events-none
                absolute
                inset-y-0
                right-0
                z-10
                w-16
                sm:w-28
                ${
                  darkMode
                    ? "bg-gradient-to-l from-[#090909] to-transparent"
                    : "bg-gradient-to-l from-white to-transparent"
                }
              `}
            />

            {/* ROW 1 */}

            <div className="overflow-hidden">
              <div
                data-services-marquee
                className="
                  services-marquee-right
                  flex
                  w-max
                  gap-3
                  py-2
                "
              >
                {[...pillsRowOne, ...pillsRowOne].map(
                  (item, index) => (
                    <ServicePill
                      key={`row-one-${index}`}
                      label={item.label}
                      icon={item.icon}
                      darkMode={darkMode}
                    />
                  ),
                )}
              </div>
            </div>

            {/* ROW 2 */}

            <div className="mt-2 overflow-hidden">
              <div
                data-services-marquee
                className="
                  services-marquee-left
                  flex
                  w-max
                  gap-3
                  py-2
                "
              >
                {[...pillsRowTwo, ...pillsRowTwo].map(
                  (item, index) => (
                    <ServicePill
                      key={`row-two-${index}`}
                      label={item.label}
                      icon={item.icon}
                      darkMode={darkMode}
                    />
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}