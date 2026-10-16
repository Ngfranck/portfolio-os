import Link from "next/link";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  ArrowDown01Icon,
  ArrowUpRight01Icon,
  Download01Icon,
  Mail01Icon,
  Linkedin01Icon,
} from "@hugeicons/core-free-icons";

export default function CVPage() {
  return (
    <main
      className="
        min-h-screen
        bg-[var(--portfolio-background)]
        text-[var(--portfolio-text-primary)]
        transition-colors
        duration-[var(--portfolio-motion-normal)]
      "
    >
      {/* =====================================================
          TOP NAVIGATION
      ===================================================== */}

      <header
        className="
          sticky
          top-0
          z-50
          border-b
          border-[var(--portfolio-border)]
          bg-[var(--portfolio-background)]/85
          backdrop-blur-xl
        "
      >
        <div
          className="
            mx-auto
            flex
            h-16
            max-w-[1180px]
            items-center
            justify-between
            px-5
            sm:px-8
          "
        >
          <Link
            href="/"
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
              hover:text-[var(--portfolio-text-primary)]
            "
          >
            <HugeiconsIcon
              icon={ArrowLeft01Icon}
              size={15}
              strokeWidth={1.7}
              className="
                transition-transform
                duration-[var(--portfolio-motion-fast)]
                group-hover:-translate-x-1
              "
            />

            Retour au portfolio
          </Link>

          <a
            href="/documents/cv-franck-ngoka.pdf"
            download
            className="
              group
              inline-flex
              h-10
              items-center
              gap-2
              rounded-full
              bg-[var(--portfolio-text-primary)]
              px-4
              font-display
              text-[12px]
              font-medium
              text-[var(--portfolio-background)]
              transition-all
              duration-[var(--portfolio-motion-fast)]
              hover:-translate-y-[1px]
              hover:shadow-[0_8px_25px_rgba(0,0,0,0.12)]

              dark:bg-white
              dark:text-[#111111]
            "
          >
            <HugeiconsIcon
              icon={Download01Icon}
              size={14}
              strokeWidth={1.7}
              className="
                transition-transform
                duration-[var(--portfolio-motion-fast)]
                group-hover:translate-y-0.5
              "
            />

            Télécharger
          </a>
        </div>
      </header>

      {/* =====================================================
          CV CONTENT
      ===================================================== */}

      <div
        className="
          mx-auto
          max-w-[1180px]
          px-5
          py-16
          sm:px-8
          sm:py-20
          lg:py-28
        "
      >
        {/* ===================================================
            INTRO
        =================================================== */}

        <section
          className="
            border-b
            border-[var(--portfolio-border)]
            pb-12
            lg:pb-16
          "
        >
          <div
            className="
              flex
              flex-col
              gap-10
              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >
            <div className="max-w-[760px]">
              <p
                className="
                  mb-5
                  font-display
                  text-[12px]
                  font-medium
                  uppercase
                  tracking-[0.12em]
                  text-[var(--portfolio-accent)]
                "
              >
                Curriculum Vitae
              </p>

              <h1
                className="
                  font-display
                  text-[clamp(3.5rem,8vw,7rem)]
                  font-semibold
                  leading-[0.9]
                  tracking-[var(--portfolio-tracking-display)]
                "
              >
                <span className="text-[var(--portfolio-text-primary)]">
                  Ngoka
                </span>{" "}
                <span
                  className="
                    font-normal
                    text-[var(--portfolio-text-secondary)]
                  "
                >
                  Franck
                </span>
              </h1>

              <p
                className="
                  mt-6
                  max-w-[650px]
                  font-body
                  text-[17px]
                  leading-[1.6]
                  text-[var(--portfolio-text-secondary)]
                "
              >
                Web & Brand Designer spécialisé dans la création
                d'identités visuelles, d'interfaces et
                d'expériences digitales cohérentes.
              </p>
            </div>

            {/* CONTACT */}

            <div
              className="
                flex
                flex-col
                gap-2
                font-display
                text-[13px]
                text-[var(--portfolio-text-secondary)]
              "
            >
              <a
                href="mailto:hello@franck.ui"
                className="
                  flex
                  items-center
                  gap-2
                  transition-colors
                  hover:text-[var(--portfolio-accent)]
                "
              >
                <HugeiconsIcon
                  icon={Mail01Icon}
                  size={15}
                  strokeWidth={1.6}
                />

                hello@franck.ui
              </a>

              <a
                href="#"
                className="
                  flex
                  items-center
                  gap-2
                  transition-colors
                  hover:text-[var(--portfolio-accent)]
                "
              >
                <HugeiconsIcon
                  icon={Linkedin01Icon}
                  size={15}
                  strokeWidth={1.6}
                />

                LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* ===================================================
            PROFILE
        =================================================== */}

        <section
          className="
            grid
            grid-cols-1
            gap-8
            border-b
            border-[var(--portfolio-border)]
            py-12
            lg:grid-cols-[220px_1fr]
            lg:py-16
          "
        >
          <h2
            className="
              font-display
              text-[13px]
              font-semibold
              uppercase
              tracking-[0.08em]
              text-[var(--portfolio-text-muted)]
            "
          >
            Profil
          </h2>

          <p
            className="
              max-w-[760px]
              font-body
              text-[17px]
              leading-[1.7]
              text-[var(--portfolio-text-secondary)]
            "
          >
            Je conçois des marques, des produits digitaux et des
            expériences web en combinant stratégie, direction
            artistique, UX et UI design. Mon approche cherche à
            transformer des problématiques complexes en
            expériences simples, cohérentes et mémorables.
          </p>
        </section>

        {/* ===================================================
            EXPERIENCE
        =================================================== */}

        <section
          className="
            border-b
            border-[var(--portfolio-border)]
            py-12
            lg:py-16
          "
        >
          <div
            className="
              grid
              grid-cols-1
              gap-8
              lg:grid-cols-[220px_1fr]
            "
          >
            <h2
              className="
                font-display
                text-[13px]
                font-semibold
                uppercase
                tracking-[0.08em]
                text-[var(--portfolio-text-muted)]
              "
            >
              Expérience
            </h2>

            <div className="space-y-10">
              {/* EXPERIENCE 01 */}

              <article
                className="
                  grid
                  grid-cols-1
                  gap-3
                  sm:grid-cols-[150px_1fr]
                "
              >
                <span
                  className="
                    font-display
                    text-[12px]
                    font-medium
                    text-[var(--portfolio-text-muted)]
                  "
                >
                  2026 — Aujourd'hui
                </span>

                <div>
                  <h3
                    className="
                      font-display
                      text-[20px]
                      font-semibold
                      tracking-[-0.02em]
                    "
                  >
                    Web & Brand Designer
                  </h3>

                  <p
                    className="
                      mt-1
                      font-display
                      text-[13px]
                      text-[var(--portfolio-text-secondary)]
                    "
                  >
                    Agence / Freelance
                  </p>

                  <p
                    className="
                      mt-4
                      max-w-[650px]
                      font-body
                      text-[14px]
                      leading-[1.65]
                      text-[var(--portfolio-text-secondary)]
                    "
                  >
                    Conception d'identités visuelles, interfaces
                    digitales et expériences web pour différents
                    projets et marques.
                  </p>
                </div>
              </article>

              {/* EXPERIENCE 02 */}

              <article
                className="
                  grid
                  grid-cols-1
                  gap-3
                  sm:grid-cols-[150px_1fr]
                "
              >
                <span
                  className="
                    font-display
                    text-[12px]
                    font-medium
                    text-[var(--portfolio-text-muted)]
                  "
                >
                  Expérience précédente
                </span>

                <div>
                  <h3
                    className="
                      font-display
                      text-[20px]
                      font-semibold
                      tracking-[-0.02em]
                    "
                  >
                    UI/UX Designer
                  </h3>

                  <p
                    className="
                      mt-1
                      font-display
                      text-[13px]
                      text-[var(--portfolio-text-secondary)]
                    "
                  >
                    Product Design
                  </p>

                  <p
                    className="
                      mt-4
                      max-w-[650px]
                      font-body
                      text-[14px]
                      leading-[1.65]
                      text-[var(--portfolio-text-secondary)]
                    "
                  >
                    Recherche, architecture de l'information,
                    conception d'interfaces et création de
                    systèmes de design pour des produits digitaux.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ===================================================
            SKILLS
        =================================================== */}

        <section
          className="
            grid
            grid-cols-1
            gap-8
            border-b
            border-[var(--portfolio-border)]
            py-12
            lg:grid-cols-[220px_1fr]
            lg:py-16
          "
        >
          <h2
            className="
              font-display
              text-[13px]
              font-semibold
              uppercase
              tracking-[0.08em]
              text-[var(--portfolio-text-muted)]
            "
          >
            Compétences
          </h2>

          <div
            className="
              grid
              grid-cols-1
              gap-8
              sm:grid-cols-2
            "
          >
            {[
              {
                title: "Brand Design",
                items: [
                  "Brand Identity",
                  "Art Direction",
                  "Visual Systems",
                  "Brand Guidelines",
                ],
              },
              {
                title: "Product Design",
                items: [
                  "UX Design",
                  "UI Design",
                  "Design Systems",
                  "Prototyping",
                ],
              },
              {
                title: "Web Design",
                items: [
                  "Web Design",
                  "Responsive Design",
                  "Landing Pages",
                  "Digital Experiences",
                ],
              },
              {
                title: "Outils",
                items: [
                  "Figma",
                  "Adobe Illustrator",
                  "Adobe Photoshop",
                  "Notion",
                ],
              },
            ].map((skill) => (
              <div key={skill.title}>
                <h3
                  className="
                    font-display
                    text-[16px]
                    font-semibold
                  "
                >
                  {skill.title}
                </h3>

                <ul
                  className="
                    mt-4
                    space-y-2
                    font-body
                    text-[14px]
                    text-[var(--portfolio-text-secondary)]
                  "
                >
                  {skill.items.map((item) => (
                    <li key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================
            EDUCATION
        =================================================== */}

        <section
          className="
            grid
            grid-cols-1
            gap-8
            border-b
            border-[var(--portfolio-border)]
            py-12
            lg:grid-cols-[220px_1fr]
            lg:py-16
          "
        >
          <h2
            className="
              font-display
              text-[13px]
              font-semibold
              uppercase
              tracking-[0.08em]
              text-[var(--portfolio-text-muted)]
            "
          >
            Formation
          </h2>

          <div>
            <h3
              className="
                font-display
                text-[20px]
                font-semibold
              "
            >
              Licence en Génie Logiciel
            </h3>

            <p
              className="
                mt-2
                font-body
                text-[14px]
                text-[var(--portfolio-text-secondary)]
              "
            >
              Génie logiciel & développement informatique
            </p>
          </div>
        </section>

        {/* ===================================================
            SELECTED WORK
        =================================================== */}

        <section
          className="
            grid
            grid-cols-1
            gap-8
            py-12
            lg:grid-cols-[220px_1fr]
            lg:py-16
          "
        >
          <h2
            className="
              font-display
              text-[13px]
              font-semibold
              uppercase
              tracking-[0.08em]
              text-[var(--portfolio-text-muted)]
            "
          >
            Projets sélectionnés
          </h2>

          <div className="space-y-3">
            {[
              "Plumage",
              "Safara",
              "Gestro",
              "Nexma",
            ].map((project) => (
              <Link
                key={project}
                href="/#projects"
                className="
                  group
                  flex
                  items-center
                  justify-between
                  border-b
                  border-[var(--portfolio-border)]
                  py-4
                  transition-colors
                  hover:text-[var(--portfolio-accent)]
                "
              >
                <span
                  className="
                    font-display
                    text-[16px]
                    font-medium
                  "
                >
                  {project}
                </span>

                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  size={16}
                  strokeWidth={1.6}
                  className="
                    transition-transform
                    duration-[var(--portfolio-motion-fast)]
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                />
              </Link>
            ))}
          </div>
        </section>

        {/* ===================================================
            DOWNLOAD CTA
        =================================================== */}

        <section
          className="
            mt-8
            overflow-hidden
            rounded-[var(--portfolio-radius-lg)]
            border
            border-[var(--portfolio-border)]
            bg-[var(--portfolio-surface)]
            p-7
            sm:p-10
          "
        >
          <div
            className="
              flex
              flex-col
              gap-6
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div>
              <p
                className="
                  font-display
                  text-[18px]
                  font-semibold
                "
              >
                Besoin de mon CV ?
              </p>

              <p
                className="
                  mt-2
                  font-body
                  text-[13px]
                  text-[var(--portfolio-text-secondary)]
                "
              >
                Téléchargez la version PDF pour la conserver ou
                la partager.
              </p>
            </div>

            <a
              href="/documents/cv-franck-ngoka.pdf"
              download
              className="
                group
                inline-flex
                h-12
                shrink-0
                items-center
                justify-center
                gap-2
                rounded-full
                bg-[var(--portfolio-text-primary)]
                px-6
                font-display
                text-[13px]
                font-medium
                text-[var(--portfolio-background)]
                transition-all
                duration-[var(--portfolio-motion-fast)]
                hover:-translate-y-1
                hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]

                dark:bg-white
                dark:text-[#111111]
              "
            >
              <HugeiconsIcon
                icon={Download01Icon}
                size={15}
                strokeWidth={1.7}
              />

              Télécharger mon CV

              <HugeiconsIcon
                icon={ArrowUpRight01Icon}
                size={14}
                strokeWidth={1.7}
                className="
                  text-[var(--portfolio-accent)]
                  transition-transform
                  duration-[var(--portfolio-motion-fast)]
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}