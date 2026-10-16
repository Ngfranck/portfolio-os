"use client";

import Link from "next/link";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  ArrowUpRight01Icon,
  Compass01Icon,
} from "@hugeicons/core-free-icons";

export default function NotFound() {
  return (
    <main
      className="
        relative
        flex
        min-h-screen
        overflow-hidden
        bg-[var(--portfolio-background)]
        text-[var(--portfolio-text-primary)]
        transition-colors
        duration-[var(--portfolio-motion-normal)]
      "
    >
      {/* =====================================================
          BACKGROUND DETAILS
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[var(--portfolio-accent)]
          opacity-[0.025]
          blur-[120px]
        "
      />

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-screen
          w-full
          max-w-[1320px]
          flex-col
          px-5
          py-6
          sm:px-8
          lg:px-10
        "
      >

        {/* ===================================================
            HEADER
        =================================================== */}

        <header className="flex items-center justify-between">

          {/* BRAND */}

          <Link
            href="/"
            className="
              group
              inline-flex
              items-center
              gap-2
              font-display
              text-[15px]
              font-semibold
              tracking-[-0.03em]
              text-[var(--portfolio-text-primary)]
            "
          >
            <span
              className="
                relative
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                border
                border-black/[0.08]
                dark:border-white/[0.1]
              "
            >
              <span
                className="
                  h-[6px]
                  w-[6px]
                  rounded-full
                  bg-[var(--portfolio-accent)]
                  shadow-[0_0_14px_var(--portfolio-accent)]
                "
              />
            </span>

            <span>Gonar.ui</span>
          </Link>

          {/* STATUS */}

          <div
            className="
              hidden
              items-center
              gap-2
              rounded-full
              border
              border-black/[0.07]
              bg-white/[0.55]
              px-3
              py-2
              font-display
              text-[11px]
              font-medium
              text-[var(--portfolio-text-secondary)]
              shadow-[0_3px_12px_rgba(0,0,0,0.025)]
              backdrop-blur-md

              dark:border-white/[0.08]
              dark:bg-white/[0.04]
              dark:shadow-none

              sm:inline-flex
            "
          >
            <span
              className="
                h-[6px]
                w-[6px]
                rounded-full
                bg-[var(--portfolio-accent)]
                shadow-[0_0_10px_var(--portfolio-accent)]
              "
            />

            <span>Still designing</span>
          </div>

        </header>

        {/* ===================================================
            CONTENT
        =================================================== */}

        <div
          className="
            flex
            flex-1
            items-center
            justify-center
            py-20
          "
        >

          <div
            className="
              flex
              w-full
              max-w-[900px]
              flex-col
              items-center
              text-center
            "
          >

            {/* =================================================
                BADGE
            ================================================= */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-black/[0.07]
                bg-white/[0.55]
                px-3
                py-2
                font-display
                text-[12px]
                font-medium
                tracking-[-0.01em]
                text-[var(--portfolio-text-secondary)]
                shadow-[0_3px_12px_rgba(0,0,0,0.025)]
                backdrop-blur-md

                dark:border-white/[0.08]
                dark:bg-white/[0.04]
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
                  className="
                    absolute
                    h-[7px]
                    w-[7px]
                    rounded-full
                    bg-[var(--portfolio-accent)]
                    animate-ping
                    opacity-40
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

              <span>Page not found</span>
            </div>

            {/* =================================================
                404
            ================================================= */}

            <div
              className="
                mt-8
                font-display
                text-[clamp(7rem,22vw,16rem)]
                font-semibold
                leading-[0.72]
                tracking-[-0.09em]
                text-[var(--portfolio-text-primary)]
                select-none
              "
            >
              404
            </div>

            {/* =================================================
                HEADING
            ================================================= */}

            <h1
              className="
                mt-10
                max-w-[700px]
                font-display
                text-[clamp(2rem,4vw,3.5rem)]
                font-semibold
                leading-[0.98]
                tracking-[var(--portfolio-tracking-display)]
              "
            >
              <span className="text-[var(--portfolio-text-primary)]">
                This page
              </span>{" "}
              <span className="font-normal text-[var(--portfolio-text-secondary)]">
                doesn't exist.
              </span>
            </h1>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <p
              className="
                mt-5
                max-w-[520px]
                font-body
                text-[15px]
                leading-[1.6]
                tracking-[var(--portfolio-tracking-body)]
                text-[var(--portfolio-text-secondary)]
              "
            >
              La page que vous recherchez n'existe pas ou a peut-être
              été déplacée. Mais votre prochain projet peut toujours
              commencer ici.
            </p>

            {/* =================================================
                ACTIONS
            ================================================= */}

            <div
              className="
                mt-8
                flex
                flex-col
                items-center
                justify-center
                gap-3
                sm:flex-row
              "
            >

              {/* HOME */}

              <Link
                href="/"
                className="
                  group
                  inline-flex
                  h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-[var(--portfolio-text-primary)]
                  px-5
                  font-display
                  text-[13px]
                  font-medium
                  text-[var(--portfolio-background)]
                  transition-all
                  duration-[var(--portfolio-motion-fast)]
                  hover:-translate-y-[1px]
                  hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)]
                "
              >
                <HugeiconsIcon
                  icon={ArrowLeft01Icon}
                  size={16}
                  strokeWidth={1.7}
                  className="
                    transition-transform
                    duration-[var(--portfolio-motion-fast)]
                    group-hover:-translate-x-1
                  "
                />

                <span>Retour à l'accueil</span>
              </Link>

              {/* PROJECTS */}

              <Link
                href="/#projects"
                className="
                  group
                  inline-flex
                  h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  border
                  border-black/[0.08]
                  bg-white/[0.55]
                  px-5
                  font-display
                  text-[13px]
                  font-medium
                  text-[var(--portfolio-text-primary)]
                  shadow-[0_3px_12px_rgba(0,0,0,0.025)]
                  backdrop-blur-md
                  transition-all
                  duration-[var(--portfolio-motion-fast)]
                  hover:-translate-y-[1px]
                  hover:border-black/[0.14]
                  hover:bg-white

                  dark:border-white/[0.09]
                  dark:bg-white/[0.04]
                  dark:shadow-none
                  dark:hover:border-white/[0.16]
                  dark:hover:bg-white/[0.08]
                "
              >
                <span>Voir mes projets</span>

                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  size={15}
                  strokeWidth={1.7}
                  color="var(--portfolio-accent)"
                  className="
                    transition-transform
                    duration-[var(--portfolio-motion-fast)]
                    group-hover:-translate-y-[1px]
                    group-hover:translate-x-[1px]
                  "
                />
              </Link>

            </div>

            {/* =================================================
                SMALL MESSAGE
            ================================================= */}

            <div
              className="
                mt-12
                flex
                items-center
                gap-2
                font-display
                text-[12px]
                font-medium
                text-[var(--portfolio-text-muted)]
              "
            >
              <HugeiconsIcon
                icon={Compass01Icon}
                size={15}
                strokeWidth={1.5}
              />

              <span>
                Lost somewhere between an idea and the final pixel.
              </span>
            </div>

          </div>
        </div>

        {/* ===================================================
            FOOTER
        =================================================== */}

        <footer
          className="
            flex
            flex-col
            gap-3
            border-t
            border-black/[0.06]
            py-5
            font-display
            text-[11px]
            text-[var(--portfolio-text-muted)]

            dark:border-white/[0.07]

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <span>
            © {new Date().getFullYear()} Franck.ui
          </span>

          <span>
            Design · Brand · Digital
          </span>
        </footer>

      </div>
    </main>
  );
}