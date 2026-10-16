"use client";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  GraduationScrollIcon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";
const education = [
  {
    period: "En cours",
    degree: "Licence en Génie Logiciel",
    school: "Institut Universitaire de la Côte",
    type: "Formation supérieure",
    description:
      "Approfondissement en développement logiciel, architecture web et conception orientée objet. Les projets académiques sont axés sur l’UX et le design d’interfaces interactives.",
    skills: [
      "Software Engineering",
      "Web Development",
      "Object-Oriented Design",
      "UX Design",
      "Interactive Interfaces",
    ],
    current: true,
  },
  {
    period: "2022",
    degree: "BTS Génie Logiciel",
    school: "Institut Universitaire de la Côte",
    type: "Formation supérieure",
    description:
      "Formation ayant permis d’acquérir des bases solides en développement logiciel et en architecture web, avec des projets de fin d’études axés sur l’UX et les interfaces interactives.",
    skills: [
      "Software Engineering",
      "Web Architecture",
      "UX Design",
      "Interactive Interfaces",
    ],
    current: false,
  },
];
export function CVEducation() {
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
                icon={GraduationScrollIcon}
                size={14}
                strokeWidth={1.6}
              />

              <span>Education</span>
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
              Education
              <span
                className="
                  font-normal
                  text-[var(--portfolio-text-secondary)]
                "
              >
                {" "}
                & learning.
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
            Un parcours en génie logiciel qui constitue une base technique
            solide pour ma pratique du design digital.
          </p>
        </div>
        {/* =====================================================
            EDUCATION LIST
        ===================================================== */}
        <div className="space-y-4">
          {education.map((item, index) => (
            <article
              key={`${item.degree}-${item.period}`}
              className="
                group
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
                sm:p-8
                lg:p-10
              "
            >
              {/* =================================================
                  ACCENT TOP LINE
              ================================================= */}
              <div
                className="
                  absolute
                  left-0
                  top-0
                  h-px
                  w-full
                  origin-left
                  scale-x-0
                  bg-[var(--portfolio-accent)]
                  transition-transform
                  duration-500
                  group-hover:scale-x-100
                "
              />
              {/* =================================================
                  HEADER
              ================================================= */}
              <div
                className="
                  flex
                  flex-col
                  gap-5
                  sm:flex-row
                  sm:items-start
                  sm:justify-between
                "
              >
                {/* PERIOD */}
                <div>
                  <span
                    className="
                      font-body
                      text-xs
                      font-medium
                      tracking-[0.02em]
                      text-[var(--portfolio-text-muted)]
                    "
                  >
                    {item.period}
                  </span>
                  <div
                    className="
                      mt-3
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <span
                      className="
                        h-2
                        w-2
                        rounded-full
                        bg-[var(--portfolio-accent)]
                      "
                    />

                    <span
                      className="
                        font-body
                        text-[11px]
                        font-medium
                        text-[var(--portfolio-text-secondary)]
                      "
                    >
                      {item.type}
                    </span>
                  </div>
                </div>
              </div>
              {/* =================================================
                  CONTENT
              ================================================= */}
              <div className="mt-7">
                {/* DEGREE + SCHOOL */}
                <div
                  className="
                    flex
                    flex-col
                    gap-1
                    sm:flex-row
                    sm:items-baseline
                    sm:gap-3
                  "
                >
                  <h3
                    className="
                      font-display
                      text-2xl
                      font-semibold
                      tracking-[-0.035em]
                      text-[var(--portfolio-text-primary)]
                      sm:text-3xl
                    "
                  >
                    {item.degree}
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
                    {item.school}
                  </span>
                </div>

                {/* DESCRIPTION */}

                <p
                  className="
                    mt-4
                    max-w-[720px]
                    font-body
                    text-sm
                    leading-6
                    text-[var(--portfolio-text-secondary)]
                    sm:text-base
                    sm:leading-7
                  "
                >
                  {item.description}
                </p>

                {/* SKILLS */}

                {item.skills.length > 0 && (
                  <div
                    className="
                      mt-6
                      flex
                      flex-wrap
                      gap-2
                    "
                  >
                    {item.skills.map((skill) => (
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
                )}
              </div>
              {/* =================================================
                  CURRENT STATUS
              ================================================= */}
              {item.current && (
                <div
                  className="
                    mt-7
                    flex
                    items-center
                    gap-2
                    border-t
                    border-[var(--portfolio-border)]
                    pt-5
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
                  <span
                    className="
                      font-body
                      text-[11px]
                      font-medium
                      text-[var(--portfolio-text-secondary)]
                    "
                  >
                    Formation en cours
                  </span>
                </div>
              )}
              {/* =================================================
                  INDEX
              ================================================= */}
              <span
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
            </article>
          ))}
        </div>
        {/* =====================================================
            BOTTOM MESSAGE
        ===================================================== */}
        <div
          className="
            mt-10
            rounded-[var(--portfolio-radius-lg)]
            border
            border-[var(--portfolio-border)]
            bg-[var(--portfolio-surface)]
            p-6
            sm:p-7
          "
        >
          <p
            className="
              max-w-[720px]
              font-body
              text-sm
              leading-6
              text-[var(--portfolio-text-secondary)]
            "
          >
            Mon parcours en génie logiciel constitue une base importante de ma
            pratique du design. Il me permet de comprendre aussi bien les enjeux
            visuels et UX que les contraintes techniques liées aux produits
            digitaux.
          </p>
        </div>
      </div>
    </section>
  );
}
