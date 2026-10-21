"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUpRight01Icon,
  SparklesIcon,
  FigmaIcon,
  AdobeIllustratorIcon,
  AdobePhotoshopIcon,
} from "@hugeicons/core-free-icons";

const expertise = [
  {
    number: "01",
    title: "Brand Design",
    description:
      "Developing distinctive, cohesive brand identities that build recognition and create a consistent presence across every touchpoint.",
    skills: [
      "Brand Identity",
      "Visual Identity",
      "Art Direction",
      "Visual Systems",
    ],
  },
  {
    number: "02",
    title: "Web Design",
    description:
      "Designing modern, responsive websites with clear navigation, purposeful content hierarchy and a strong connection to the brand.",
    skills: [
      "Web Design",
      "Landing Pages",
      "Digital Experience",
      "Responsive Design",
    ],
  },
  {
    number: "03",
    title: "UI / UX Design",
    description:
      "Shaping intuitive interfaces and user journeys that make complex tasks easier to understand and complete.",
    skills: [
      "UX Design",
      "UI Design",
      "User Flows",
      "Prototyping",
    ],
  },
  {
    number: "04",
    title: "Product Design",
    description:
      "Connecting product strategy, user experience, interface design and reusable systems to create coherent digital products.",
    skills: [
      "Product Design",
      "Design Systems",
      "Wireframing",
      "Interaction Design",
    ],
  },
];

const tools = [
  {
    name: "Figma",
    category: "UI · UX · Prototyping",
    icon: FigmaIcon,
  },
  {
    name: "Illustrator",
    category: "Brand · Vector Design",
    icon: AdobeIllustratorIcon,
  },
  {
    name: "Photoshop",
    category: "Visual · Art Direction",
    icon: AdobePhotoshopIcon,
  },
  {
    name: "Next.js",
    category: "Web · Front-end",
    icon: null,
  },
  {
    name: "Framer",
    category: "Web · Prototyping",
    icon: null,
  },
];

export function CVSkills() {
  return (
    <section
      id="skills"
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
                icon={SparklesIcon}
                size={14}
                strokeWidth={1.6}
              />

              <span>Skills</span>
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
              Skills
              <span
                className="
                  font-normal
                  text-[var(--portfolio-text-secondary)]
                "
              >
                {" "}
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
            A blend of strategy, creative direction and product thinking for
            useful, distinctive digital experiences.
          </p>
        </div>

        {/* =====================================================
            EXPERTISE
        ===================================================== */}

        <div className="relative">
          <div
            className="
              divide-y
              divide-[var(--portfolio-border)]
              border-y
              border-[var(--portfolio-border)]
            "
          >
            {expertise.map((item) => (
              <article
                key={item.number}
                className="
                  group
                  relative
                  grid
                  gap-6
                  py-8
                  transition-all
                  duration-[var(--portfolio-motion-normal)]
                  sm:grid-cols-[80px_1fr_auto]
                  sm:items-start
                  sm:gap-8
                  sm:py-10
                  lg:grid-cols-[100px_1fr_360px]
                  lg:gap-10
                "
              >
                {/* NUMBER */}

                <span
                  className="
                    font-body
                    text-xs
                    font-medium
                    tracking-[0.04em]
                    text-[var(--portfolio-text-muted)]
                  "
                >
                  {item.number}
                </span>

                {/* MAIN CONTENT */}

                <div>
                  <div
                    className="
                      flex
                      items-center
                      gap-3
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
                      {item.title}
                    </h3>

                    <span
                      className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[var(--portfolio-border)]
                        opacity-0
                        transition-all
                        duration-[var(--portfolio-motion-fast)]
                        group-hover:translate-x-1
                        group-hover:opacity-100
                      "
                    >
                      <HugeiconsIcon
                        icon={ArrowUpRight01Icon}
                        size={13}
                        strokeWidth={1.7}
                      />
                    </span>
                  </div>

                  <p
                    className="
                      mt-3
                      max-w-[600px]
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
                </div>

                {/* SKILLS */}

                <div
                  className="
                    flex
                    flex-wrap
                    gap-2
                    lg:justify-end
                  "
                >
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="
                        rounded-full
                        bg-[var(--portfolio-surface)]
                        px-3
                        py-1.5
                        font-body
                        text-[11px]
                        font-medium
                        text-[var(--portfolio-text-secondary)]
                        ring-1
                        ring-inset
                        ring-[var(--portfolio-border)]
                        transition-colors
                        duration-[var(--portfolio-motion-fast)]
                        group-hover:text-[var(--portfolio-text-primary)]
                      "
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* =====================================================
            TOOLS
        ===================================================== */}

        <div className="mt-20">
          {/* TOOLS HEADER */}

          <div
            className="
              mb-8
              flex
              items-end
              justify-between
              gap-6
              border-b
              border-[var(--portfolio-border)]
              pb-5
            "
          >
            <div>
              <span
                className="
                  font-body
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.08em]
                  text-[var(--portfolio-text-muted)]
                "
              >
                Tools
              </span>

              <h3
                className="
                  mt-2
                  font-display
                  text-2xl
                  font-semibold
                  tracking-[-0.035em]
                  text-[var(--portfolio-text-primary)]
                "
              >
                Tools I use.
              </h3>
            </div>

            <span
              className="
                hidden
                font-body
                text-xs
                text-[var(--portfolio-text-muted)]
                sm:block
              "
            >
              Design · Prototype · Build
            </span>
          </div>

          {/* TOOL GRID */}

          <div
            className="
              grid
              grid-cols-1
              gap-3
              sm:grid-cols-2
              lg:grid-cols-5
            "
          >
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="
                  group
                  rounded-[var(--portfolio-radius-md)]
                  border
                  border-[var(--portfolio-border)]
                  bg-[var(--portfolio-surface)]
                  p-5
                  transition-all
                  duration-[var(--portfolio-motion-fast)]
                  hover:-translate-y-px
                  hover:shadow-[0_15px_40px_rgba(0,0,0,0.04)]
                "
              >
                {/* ICON */}

                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-[var(--portfolio-radius-sm)]
                    bg-[var(--portfolio-background)]
                    text-[var(--portfolio-text-primary)]
                  "
                >
                  {tool.icon ? (
                    <HugeiconsIcon
                      icon={tool.icon}
                      size={19}
                      strokeWidth={1.6}
                    />
                  ) : (
                    <span
                      className="
                        font-display
                        text-sm
                        font-bold
                        tracking-[-0.04em]
                      "
                    >
                      {tool.name === "Next.js" ? "N" : "Fr"}
                    </span>
                  )}
                </div>

                {/* NAME */}

                <h4
                  className="
                    mt-5
                    font-display
                    text-base
                    font-semibold
                    tracking-[-0.025em]
                    text-[var(--portfolio-text-primary)]
                  "
                >
                  {tool.name}
                </h4>

                {/* CATEGORY */}

                <p
                  className="
                    mt-1
                    font-body
                    text-[11px]
                    leading-5
                    text-[var(--portfolio-text-muted)]
                  "
                >
                  {tool.category}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* =====================================================
            BOTTOM STATEMENT
        ===================================================== */}

        <div
          className="
            mt-16
            overflow-hidden
            rounded-[var(--portfolio-radius-lg)]
            border
            border-[var(--portfolio-border)]
            bg-[var(--portfolio-surface)]
            p-6
            sm:p-8
            lg:p-10
          "
        >
          <div
            className="
              flex
              flex-col
              gap-8
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div className="max-w-[700px]">
              <span
                className="
                  font-body
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.08em]
                  text-[var(--portfolio-text-muted)]
                "
              >
                My approach
              </span>

              <p
                className="
                  mt-4
                  font-display
                  text-2xl
                  font-semibold
                  leading-tight
                  tracking-[-0.035em]
                  text-[var(--portfolio-text-primary)]
                  sm:text-3xl
                "
              >
                I combine{" "}
                <span className="text-[var(--portfolio-accent)]">
                  strategy
                </span>
                , visual thinking and technology to
                create meaningful digital experiences.
              </p>
            </div>

            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[var(--portfolio-dark)]
              "
            >
              <HugeiconsIcon
                icon={ArrowUpRight01Icon}
                size={18}
                strokeWidth={1.7}
                className="text-[var(--portfolio-dark-text)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}