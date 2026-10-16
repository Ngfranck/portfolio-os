"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUpRight01Icon,
  Briefcase01Icon,
} from "@hugeicons/core-free-icons";

const experiences = [
  {
    period: "2025",
    role: "Web & Brand Designer",
    company: "Polaris",
    location: "Douala, Cameroun",
    type: "Freelance",
    description:
      "Conception d'identités visuelles et d'expériences web pour des marques tech et lifestyle, avec une approche orientée branding, UX et conversion.",
    skills: [
      "Brand Identity",
      "Web Design",
      "Webflow",
      "Figma",
      "SEO",
      "Conversion",
    ],
    highlights: [
      "Rebranding complet d'une startup SaaS",
      "Site e-commerce avec +35% de taux de conversion après refonte",
      "Création d'un mini design system pour les assets marketing",
    ],
    current: false,
  },

  {
    period: "Nov. 2024 — Août 2025",
    role: "Graphic Designer",
    company: "AIC Cameroun",
    location: "Douala, Cameroun",
    type: "Professional Experience",
    description:
      "Conception de supports visuels destinés aux réseaux sociaux, campagnes publicitaires et supports print, tout en participant à la stratégie de communication visuelle.",
    skills: [
      "Graphic Design",
      "Social Media",
      "Advertising",
      "Print Design",
      "Presentation Design",
    ],
    highlights: [
      "Création de visuels pour les réseaux sociaux",
      "Conception de supports pour les campagnes publicitaires",
      "Réalisation de présentations PowerPoint",
    ],
    current: false,
  },

  {
    period: "Jan. 2023 — Août 2023",
    role: "Junior Web Designer",
    company: "Eureka Design & Konsulding",
    location: "",
    type: "Professional Experience",
    description:
      "Conception d'interfaces mobiles et desktop pour des startups en phase de lancement, de la recherche et du wireframing jusqu'aux prototypes et maquettes haute fidélité.",
    skills: [
      "UX Design",
      "UI Design",
      "Wireframing",
      "Prototyping",
      "Design System",
    ],
    highlights: [
      "Design UX complet d'une application mobile de gestion de tâches",
      "Landing page fintech ayant généré +45% de leads",
      "Création d'un kit UI réutilisable pour plusieurs projets internes",
    ],
    current: false,
  },

  {
    period: "Juin 2022 — Août 2022",
    role: "Beginner Web Designer",
    company: "Crystal Art Technology",
    location: "",
    type: "Professional Experience",
    description:
      "Participation à la conception de maquettes web et mobile, aux brainstormings créatifs et à la production d'éléments graphiques destinés aux expériences digitales.",
    skills: [
      "Web Design",
      "Mobile Design",
      "Motion Design",
      "Photo Retouching",
      "Graphic Design",
    ],
    highlights: [
      "Première maquette de page d'accueil validée et intégrée",
      "Animation d'un logo pour une vidéo d'introduction",
      "Création d'icônes personnalisées pour une application interne",
    ],
    current: false,
  },
];

export function CVExperience() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[var(--portfolio-background)]
        text-[var(--portfolio-text-primary)]
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1180px]
          px-5
          py-20
          sm:px-8
          sm:py-28
          lg:px-10
        "
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className="
            mb-14
            flex
            flex-col
            gap-6
            border-b
            border-[var(--portfolio-border)]
            pb-8
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div>
            {/* LABEL */}

            <div
              className="
                mb-5
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[var(--portfolio-border)]
                bg-[var(--portfolio-surface)]
                px-3
                py-2
                font-body
                text-xs
                font-medium
                text-[var(--portfolio-text-secondary)]
              "
            >
              <HugeiconsIcon
                icon={Briefcase01Icon}
                size={14}
                strokeWidth={1.6}
              />

              <span>Experience</span>
            </div>

            {/* TITLE */}

            <h2
              className="
                max-w-[650px]
                font-display
                text-[clamp(2.7rem,6vw,5rem)]
                font-bold
                leading-[0.95]
                tracking-[-0.055em]
              "
            >
              Experience{" "}
              <span
                className="
                  font-normal
                  text-[var(--portfolio-text-secondary)]
                "
              >
                & expertise.
              </span>
            </h2>
          </div>

          {/* DESCRIPTION */}

          <p
            className="
              max-w-[320px]
              font-body
              text-sm
              leading-6
              text-[var(--portfolio-text-secondary)]
            "
          >
            Un parcours professionnel construit autour du
            design visuel, de l'expérience utilisateur et de
            la conception de produits digitaux.
          </p>
        </div>

        {/* =====================================================
            EXPERIENCE TIMELINE
        ===================================================== */}

        <div className="relative">
          {/* ===================================================
              DESKTOP TIMELINE LINE

              Structure :
              160px = période
              72px  = colonne timeline
              1fr   = contenu

              Le trait reste donc visuellement séparé
              des cartes.
          =================================================== */}

          <div
            aria-hidden="true"
            className="
              absolute
              bottom-8
              left-[196px]
              top-8
              hidden
              w-px
              bg-[var(--portfolio-border)]
              sm:block
            "
          />

          {/* ===================================================
              EXPERIENCE ITEMS
          =================================================== */}

          <div className="space-y-10 sm:space-y-12">
            {experiences.map((experience, index) => (
              <article
                key={`${experience.company}-${experience.period}`}
                className="
                  group
                  relative
                  grid
                  gap-5
                  sm:grid-cols-[160px_72px_1fr]
                  sm:gap-0
                "
              >
                {/* =================================================
                    PERIOD
                ================================================= */}

                <div
                  className="
                    pt-2
                    sm:pr-6
                    sm:text-right
                  "
                >
                  <span
                    className="
                      font-body
                      text-xs
                      font-medium
                      tracking-[0.02em]
                      text-[var(--portfolio-text-muted)]
                    "
                  >
                    {experience.period}
                  </span>

                  {/* CURRENT STATUS */}

                  {experience.current && (
                    <div
                      className="
                        mt-3
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        bg-[var(--portfolio-background)]
                        px-2.5
                        py-1.5
                        font-body
                        text-[10px]
                        font-medium
                        text-[var(--portfolio-text-secondary)]
                        sm:float-right
                      "
                    >
                      <span
                        className="
                          h-1.5
                          w-1.5
                          animate-pulse
                          rounded-full
                          bg-[#22c55e]
                        "
                      />

                      Current
                    </div>
                  )}
                </div>

                {/* =================================================
                    TIMELINE COLUMN
                ================================================= */}

                <div
                  aria-hidden="true"
                  className="
                    relative
                    hidden
                    sm:block
                  "
                >
                  {/* TIMELINE DOT */}

                  <div
                    className={`
                      absolute
                      left-1/2
                      top-8
                      z-20
                      h-3
                      w-3
                      -translate-x-1/2
                      rounded-full
                      border-2
                      border-[var(--portfolio-background)]
                      transition-all
                      duration-[var(--portfolio-motion-fast)]
                      ${
                        experience.current
                          ? "bg-[var(--portfolio-accent)] shadow-[0_0_0_4px_var(--portfolio-accent-soft)]"
                          : "bg-[var(--portfolio-text-muted)]"
                      }
                    `}
                  />

                  {/* CONNECTOR */}

                  <div
                    className="
                      absolute
                      left-1/2
                      top-9
                      h-px
                      w-8
                      bg-[var(--portfolio-border)]
                    "
                  />
                </div>

                {/* =================================================
                    EXPERIENCE CARD
                ================================================= */}

                <div
                  className="
                    relative
                    overflow-hidden
                    rounded-[var(--portfolio-radius-lg)]
                    border
                    border-[var(--portfolio-border)]
                    bg-[var(--portfolio-surface)]
                    p-6
                    shadow-[0_15px_50px_rgba(0,0,0,0.025)]
                    transition-all
                    duration-[var(--portfolio-motion-normal)]
                    hover:-translate-y-[2px]
                    hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)]
                    sm:p-7
                    lg:p-8
                  "
                >
                  {/* CARD ACCENT */}

                  {experience.current && (
                    <div
                      className="
                        absolute
                        left-0
                        top-0
                        h-full
                        w-[2px]
                        bg-[var(--portfolio-accent)]
                      "
                    />
                  )}

                  {/* =================================================
                      CARD HEADER
                  ================================================= */}

                  <div
                    className="
                      flex
                      flex-col
                      gap-2
                      sm:flex-row
                      sm:items-start
                      sm:justify-between
                    "
                  >
                    <div>
                      <div
                        className="
                          flex
                          flex-col
                          gap-1
                          sm:flex-row
                          sm:items-center
                          sm:gap-3
                        "
                      >
                        <h3
                          className="
                            font-display
                            text-xl
                            font-semibold
                            tracking-[-0.025em]
                            text-[var(--portfolio-text-primary)]
                            sm:text-2xl
                          "
                        >
                          {experience.role}
                        </h3>

                        <span
                          className="
                            hidden
                            text-[var(--portfolio-text-muted)]
                            sm:block
                          "
                        >
                          /
                        </span>

                        <span
                          className="
                            font-body
                            text-sm
                            text-[var(--portfolio-text-secondary)]
                          "
                        >
                          {experience.company}
                        </span>
                      </div>

                      {/* TYPE / LOCATION */}

                      <div
                        className="
                          mt-1
                          flex
                          flex-wrap
                          items-center
                          gap-2
                        "
                      >
                        <span
                          className="
                            font-body
                            text-xs
                            text-[var(--portfolio-text-muted)]
                          "
                        >
                          {experience.type}
                        </span>

                        {experience.location && (
                          <>
                            <span
                              className="
                                text-[var(--portfolio-text-muted)]
                              "
                            >
                              ·
                            </span>

                            <span
                              className="
                                font-body
                                text-xs
                                text-[var(--portfolio-text-muted)]
                              "
                            >
                              {experience.location}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* =================================================
                        ARROW
                    ================================================= */}

                    <div
                      className="
                        absolute
                        right-6
                        top-6
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[var(--portfolio-border)]
                        bg-[var(--portfolio-background)]
                        opacity-0
                        transition-all
                        duration-[var(--portfolio-motion-fast)]
                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                        group-hover:opacity-100
                        sm:right-7
                        sm:top-7
                      "
                    >
                      <HugeiconsIcon
                        icon={ArrowUpRight01Icon}
                        size={15}
                        strokeWidth={1.7}
                        className="
                          text-[var(--portfolio-text-secondary)]
                        "
                      />
                    </div>
                  </div>

                  {/* =================================================
                      DESCRIPTION
                  ================================================= */}

                  <p
                    className="
                      mt-5
                      max-w-[620px]
                      font-body
                      text-sm
                      leading-6
                      text-[var(--portfolio-text-secondary)]
                    "
                  >
                    {experience.description}
                  </p>

                  {/* =================================================
                      HIGHLIGHTS
                  ================================================= */}

                  {experience.highlights.length > 0 && (
                    <div className="mt-5 space-y-2">
                      {experience.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="
                            flex
                            items-start
                            gap-2.5
                            font-body
                            text-xs
                            leading-5
                            text-[var(--portfolio-text-secondary)]
                          "
                        >
                          <span
                            className="
                              mt-[7px]
                              h-1
                              w-1
                              shrink-0
                              rounded-full
                              bg-[var(--portfolio-accent)]
                            "
                          />

                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* =================================================
                      SKILLS
                  ================================================= */}

                  <div
                    className="
                      mt-6
                      flex
                      flex-wrap
                      gap-2
                    "
                  >
                    {experience.skills.map((skill) => (
                      <span
                        key={skill}
                        className="
                          rounded-full
                          bg-[var(--portfolio-background)]
                          px-3
                          py-1.5
                          font-body
                          text-[11px]
                          font-medium
                          text-[var(--portfolio-text-secondary)]
                        "
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* =================================================
                      INDEX
                  ================================================= */}

                  <span
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      bottom-5
                      right-7
                      font-display
                      text-[4rem]
                      font-bold
                      leading-none
                      tracking-[-0.08em]
                      text-[var(--portfolio-text-muted)]
                      opacity-[0.06]
                      sm:text-[5rem]
                    "
                  >
                    0{index + 1}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}