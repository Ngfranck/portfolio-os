import Link from "next/link";
import type { Metadata } from "next";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  Download04Icon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";
import { CVProfile } from "./cv-profile";
import { CVExperience } from "./cv-experience";
import { CVSkills } from "./cv-skills";
import { CVEducation } from "./cv-education";

export const metadata: Metadata = {
  title: "About Franck Ngoka | UX/UI, Web & Brand Designer",
  description:
    "Explore Franck Ngoka's experience, education and expertise in UX/UI design, visual identity, web design and digital product design.",
  alternates: {
    canonical: "/cv",
  },
};

export default function CVPage() {
  return (
    <main
  className="
    min-h-screen
    bg-[var(--portfolio-background)]
    text-[var(--portfolio-text-primary)]
  "
>
  <div
    className="
      mx-auto
      w-full
      max-w-[1200px]
      px-5
      py-8
      sm:px-8
      lg:px-10
      lg:py-12
    "
  >

    {/* Header */}
<header className="flex items-center justify-between pb-20">

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
    {/* CV Hero */}
   
    <CVProfile />
    <CVExperience />
    <CVSkills />
    <CVEducation />

  </div>
</main>
  );
}