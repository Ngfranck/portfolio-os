import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  ArrowUpRight01Icon,
  Download01Icon,
} from "@hugeicons/core-free-icons";

export function CVProfile() {
  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[var(--portfolio-radius-lg)]
        border
        border-[var(--portfolio-border)]
        bg-[var(--portfolio-surface)]
        p-5
        sm:p-8
        lg:p-10
      "
    >
    
      {/* =====================================================
          PROFILE GRID
      ===================================================== */}

      <div
        className="
          relative
          grid
          gap-8
          lg:grid-cols-[260px_1fr]
          lg:gap-12
        "
      >

        {/* ===================================================
            PROFILE IMAGE
        =================================================== */}

        <div>

          <div
            className="
              relative
              aspect-[4/4.7]
              overflow-hidden
              rounded-[var(--portfolio-radius-md)]
              bg-[var(--portfolio-dark)]
            "
          >
<img
  src="/images/about/photo-franck.jpg"
  alt="Ngoka Franck Junior"
  className="
    absolute
    inset-0
    h-full
    w-full
    object-cover
    grayscale
    transition-transform
    duration-700
  "
/>

            {/* Availability */}

            <div
              className="
                absolute
                bottom-4
                left-4
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-black/70
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

          {/* PERSONAL META */}

          <div
            className="
              mt-4
              flex
              flex-wrap
              gap-x-4
              gap-y-2
              font-body
              text-xs
              text-[var(--portfolio-text-muted)]
            "
          >
            <span>Douala, Cameroon</span>

            <span className="opacity-40">•</span>

            <span>2026</span>
          </div>

        </div>


        {/* ===================================================
            PROFILE CONTENT
        =================================================== */}

        <div className="flex flex-col justify-center">

          {/* LABEL */}

          <div
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-full
              border
              border-[var(--portfolio-border)]
              bg-[var(--portfolio-background)]
              px-3
              py-2
              font-body
              text-xs
              font-medium
              text-[var(--portfolio-text-secondary)]
            "
          >

            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[var(--portfolio-accent)]
              "
            />

            About me

          </div>


          {/* NAME */}

          <h1
            className="
              mt-7
              font-display
              text-h1
              font-bold
              leading-[0.9]
              tracking-[-0.06em]
              text-[var(--portfolio-text-primary)]
            "
          >
            Ngoka Franck
            <span
              className="
                font-normal
                text-[var(--portfolio-text-secondary)]
              "
            >
              {" "}Junior
            </span>
          </h1>


          {/* ROLE */}

          <p
            className="
              mt-5
              font-display
              text-[clamp(1.3rem,2.5vw,2rem)]
              tracking-[-0.035em]
              text-[var(--portfolio-text-secondary)]
            "
          >
            Web & Brand Designer
            <span className="mx-2 text-[var(--portfolio-text-muted)]">
              ·
            </span>
            UX/UI Designer
          </p>


          {/* DESCRIPTION */}

          <p
            className="
              mt-7
              max-w-[680px]
              font-body
              text-base
              leading-7
              text-[var(--portfolio-text-secondary)]
              sm:text-lg
              sm:leading-8
            "
          >
            UX/UI, web and brand designer with over three years of experience
            across visual identity and digital product design. I help startups
            and businesses turn ideas into useful digital experiences through
            thoughtful strategy, clear interfaces and distinctive visual
            direction.
          </p>


          {/* ACTIONS */}

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

                <span>Download my CV</span>
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


          {/* QUICK INFO */}

          <div
            className="
              mt-10
              grid
              gap-4
              border-t
              border-[var(--portfolio-border)]
              pt-6
              sm:grid-cols-3
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
                Experience
              </span>

              <span
                className="
                  mt-1
                  block
                  font-display
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
                  font-display
                  text-sm
                  font-medium
                  text-[var(--portfolio-text-primary)]
                "
              >
                Brand · Digital · Product
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
                Location
              </span>

              <span
                className="
                  mt-1
                  block
                  font-display
                  text-sm
                  font-medium
                  text-[var(--portfolio-text-primary)]
                "
              >
                Douala, Cameroon
              </span>
            </div>

          </div>

        </div>
          
      </div>
    </section>
  );
}