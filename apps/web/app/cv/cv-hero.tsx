"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  ArrowUpRight01Icon,
  Download01Icon,
} from "@hugeicons/core-free-icons";

export function CVHero() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[var(--portfolio-background)]
        text-[var(--portfolio-text-primary)]
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[20%]
          h-[420px]
          w-[420px]
          -translate-x-1/2
          rounded-full
          bg-[var(--portfolio-accent)]
          opacity-[0.025]
          blur-[120px]
          dark:opacity-[0.055]
        "
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[calc(100vh-80px)]
          w-full
          max-w-[1180px]
          items-center
          px-5
          py-24
          sm:px-8
          sm:py-28
          lg:px-10
        "
      >
        <div
          className="
            grid
            w-full
            items-center
            gap-12
            lg:grid-cols-[0.7fr_1.3fr]
            lg:gap-20
          "
        >
          {/* =================================================
              PROFILE IMAGE
          ================================================= */}

          <div className="mx-auto w-full max-w-[360px] lg:mx-0">
            <div
              className="
                group
                relative
                aspect-[4/5]
                overflow-hidden
                rounded-[var(--portfolio-radius-lg)]
                border
                border-[var(--portfolio-border)]
                bg-[var(--portfolio-surface)]
                p-2
                shadow-[0_25px_80px_rgba(0,0,0,0.05)]
                dark:shadow-none
              "
            >
              <div
                className="
                  relative
                  h-full
                  w-full
                  overflow-hidden
                  rounded-[var(--portfolio-radius-md)]
                  bg-[var(--portfolio-dark)]
                "
              >
                <img
                  src="/images/about/photo Franck.jpg"
                  alt="Ngoka Franck — Web & Brand Designer"
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                    grayscale
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-[1.025]
                  "
                />

                {/* Image overlay */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/40
                    via-transparent
                    to-transparent
                  "
                />

                {/* Availability */}

                <div
                  className="
                    absolute
                    bottom-5
                    left-5
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/10
                    bg-black/65
                    px-3
                    py-2
                    backdrop-blur-md
                  "
                >
                  <span className="relative flex h-2 w-2">
                    <span
                      className="
                        absolute
                        inset-0
                        animate-ping
                        rounded-full
                        bg-[var(--portfolio-accent)]
                        opacity-70
                      "
                    />

                    <span
                      className="
                        relative
                        h-2
                        w-2
                        rounded-full
                        bg-[var(--portfolio-accent)]
                      "
                    />
                  </span>

                  <span
                    className="
                      font-body
                      text-[11px]
                      font-medium
                      text-white
                    "
                  >
                    Available for projects
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              INTRODUCTION
          ================================================= */}

          <div className="max-w-[760px]">
            {/* LABEL */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[var(--portfolio-border)]
                bg-[var(--portfolio-surface)]
                px-3.5
                py-2
                font-body
                text-xs
                font-medium
                text-[var(--portfolio-text-secondary)]
                shadow-[0_4px_20px_rgba(0,0,0,0.025)]
              "
            >
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-[var(--portfolio-accent)]
                  shadow-[0_0_0_3px_var(--portfolio-accent-soft)]
                "
              />

              <span>Curriculum Vitae</span>
            </div>

            {/* NAME */}

            <h1
              className="
                mt-7
                font-display
                text-[clamp(3.5rem,8vw,7.5rem)]
                font-bold
                leading-[0.86]
                tracking-[-0.06em]
              "
            >
              Ngoka
              <br />

              <span
                className="
                  font-normal
                  text-[var(--portfolio-text-secondary)]
                "
              >
                Franck.
              </span>
            </h1>

            {/* ROLE */}

            <div
              className="
                mt-8
                flex
                flex-wrap
                items-center
                gap-x-3
                gap-y-2
              "
            >
              <span
                className="
                  font-display
                  text-lg
                  font-semibold
                  tracking-[-0.025em]
                  text-[var(--portfolio-text-primary)]
                  sm:text-xl
                "
              >
                Web & Brand Designer
              </span>

              <span
                className="
                  hidden
                  h-1
                  w-1
                  rounded-full
                  bg-[var(--portfolio-text-muted)]
                  sm:block
                "
              />

              <span
                className="
                  font-body
                  text-sm
                  text-[var(--portfolio-text-secondary)]
                "
              >
                UI / UX · Product · Branding
              </span>
            </div>

            {/* DESCRIPTION */}

            <p
              className="
                mt-6
                max-w-[650px]
                font-body
                text-base
                leading-7
                text-[var(--portfolio-text-secondary)]
                sm:text-lg
                sm:leading-8
              "
            >
              Je conçois des identités visuelles, des interfaces
              et des expériences digitales qui transforment les
              idées en solutions claires, cohérentes et mémorables.
            </p>

            {/* =================================================
                ACTIONS
            ================================================= */}

            <div
              className="
                mt-8
                flex
                flex-col
                gap-3
                sm:flex-row
              "
            >
              {/* DOWNLOAD */}

              <a
                href="/cv/Ngoka-Franck-CV.pdf"
                download
                className="
                  group
                  inline-flex
                  h-12
                  items-center
                  justify-center
                  gap-2.5
                  rounded-full
                  bg-[var(--portfolio-dark)]
                  px-6
                  font-body
                  text-sm
                  font-medium
                  text-[var(--portfolio-dark-text)]
                  transition-all
                  duration-[var(--portfolio-motion-fast)]
                  hover:-translate-y-[1px]
                  hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]
                  dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)]
                "
              >
                <HugeiconsIcon
                  icon={Download01Icon}
                  size={16}
                  strokeWidth={1.7}
                />

                <span>Télécharger mon CV</span>
              </a>

              {/* CONTACT */}

              <a
                href="#contact"
                className="
                  group
                  inline-flex
                  h-12
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  border
                  border-[var(--portfolio-border)]
                  bg-[var(--portfolio-surface)]
                  px-6
                  font-body
                  text-sm
                  font-medium
                  text-[var(--portfolio-text-primary)]
                  transition-all
                  duration-[var(--portfolio-motion-fast)]
                  hover:-translate-y-[1px]
                  hover:bg-[var(--portfolio-border)]
                "
              >
                <span>Travaillons ensemble</span>

                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  size={15}
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

            {/* =================================================
                META
            ================================================= */}

            <div
              className="
                mt-10
                flex
                flex-wrap
                gap-x-8
                gap-y-4
                border-t
                border-[var(--portfolio-border)]
                pt-6
              "
            >
              <div>
                <span
                  className="
                    block
                    font-body
                    text-[11px]
                    uppercase
                    tracking-[0.12em]
                    text-[var(--portfolio-text-muted)]
                  "
                >
                  Location
                </span>

                <span
                  className="
                    mt-1
                    block
                    font-body
                    text-sm
                    font-medium
                    text-[var(--portfolio-text-primary)]
                  "
                >
                  Cameroon · Remote
                </span>
              </div>

              <div>
                <span
                  className="
                    block
                    font-body
                    text-[11px]
                    uppercase
                    tracking-[0.12em]
                    text-[var(--portfolio-text-muted)]
                  "
                >
                  Experience
                </span>

                <span
                  className="
                    mt-1
                    block
                    font-body
                    text-sm
                    font-medium
                    text-[var(--portfolio-text-primary)]
                  "
                >
                  3+ years
                </span>
              </div>

              <div>
                <span
                  className="
                    block
                    font-body
                    text-[11px]
                    uppercase
                    tracking-[0.12em]
                    text-[var(--portfolio-text-muted)]
                  "
                >
                  Focus
                </span>

                <span
                  className="
                    mt-1
                    block
                    font-body
                    text-sm
                    font-medium
                    text-[var(--portfolio-text-primary)]
                  "
                >
                  Brand · Digital · Product
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            SCROLL INDICATOR
        ===================================================== */}

        <div
          className="
            absolute
            bottom-8
            left-1/2
            hidden
            -translate-x-1/2
            flex-col
            items-center
            gap-2
            sm:flex
          "
        >
          <span
            className="
              font-body
              text-[10px]
              uppercase
              tracking-[0.16em]
              text-[var(--portfolio-text-muted)]
            "
          >
            Scroll
          </span>

          <HugeiconsIcon
            icon={ArrowDown01Icon}
            size={14}
            strokeWidth={1.5}
            className="
              animate-bounce
              text-[var(--portfolio-text-muted)]
            "
          />
        </div>
      </div>
    </section>
  );
}