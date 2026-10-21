"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "UX / UI Design",
  "Product Design",
  "Web Design",
  "Brand Design",
  "Visual Design",
  "Digital Experience",
];

const experiences = [
  {
    role: "UX/UI & Graphic Designer",
    company: "Agency",
    year: "2026",
  },
  {
    role: "UX/UI & Web Designer",
    company: "Freelance",
    year: "2024",
  },
  {
    role: "Designer",
    company: "Independent Projects",
    year: "2023",
  },
];

type AboutSettings = {
  linkedinUrl: string | null;
  behanceUrl: string | null;
  instagramUrl: string | null;
};

export function About({ settings }: { settings: AboutSettings }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) {
        return;
      }

      const section = sectionRef.current;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        return;
      }

      const ctx = gsap.context(() => {
        /*
         * =====================================================
         * HEADER
         * =====================================================
         */

        const badge = section.querySelector("[data-about-badge]");
        const intro = section.querySelector("[data-about-intro]");
        const title = section.querySelector("[data-about-title]");

        /*
         * =====================================================
         * CARDS
         * =====================================================
         */

        const cards = Array.from(section.querySelectorAll("[data-about-card]"));

        /*
         * =====================================================
         * PROFILE CARD
         * =====================================================
         */

        const profileImage = section.querySelector("[data-about-image]");
        const availability = section.querySelector(
          "[data-about-availability]",
        );
        const profileContent = section.querySelector("[data-about-profile]");
        const socials = Array.from(section.querySelectorAll("[data-about-social]"));
        const cvButton = section.querySelector("[data-about-cv]");

        /*
         * =====================================================
         * INFORMATION CARD
         * =====================================================
         */

        const informationContent = section.querySelector(
          "[data-about-information]",
        );

        const skillsElements = Array.from(section.querySelectorAll(
          "[data-about-skill]",
        ));

        const experienceElements = Array.from(section.querySelectorAll(
          "[data-about-experience]",
        ));

        /*
         * =====================================================
         * INITIAL STATES
         * =====================================================
         */

        if (badge) {
          gsap.set(badge, {
            y: 30,
            opacity: 0,
          });
        }

        if (intro) {
          gsap.set(intro, {
            y: 35,
            opacity: 0,
          });
        }

        if (title) {
          gsap.set(title, {
            y: 55,
            opacity: 0,
          });
        }

        if (cards.length) {
          gsap.set(cards, {
            y: 75,
            opacity: 0,
          });
        }

        if (profileImage) {
          gsap.set(profileImage, {
            scale: 1.08,
          });
        }

        if (availability) {
          gsap.set(availability, {
            y: 20,
            opacity: 0,
          });
        }

        if (profileContent) {
          gsap.set(profileContent, {
            y: 25,
            opacity: 0,
          });
        }

        if (socials.length) {
          gsap.set(socials, {
            y: 15,
            opacity: 0,
          });
        }

        if (cvButton) {
          gsap.set(cvButton, {
            y: 15,
            opacity: 0,
          });
        }

        if (informationContent) {
          gsap.set(informationContent, {
            y: 30,
            opacity: 0,
          });
        }

        if (skillsElements.length) {
          gsap.set(skillsElements, {
            y: 18,
            opacity: 0,
          });
        }

        if (experienceElements.length) {
          gsap.set(experienceElements, {
            y: 18,
            opacity: 0,
          });
        }

        /*
         * =====================================================
         * HEADER ANIMATION
         * =====================================================
         */

        const headerTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          },
        });

        if (badge) {
          headerTimeline.to(badge, {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
          });
        }

        if (intro) {
          headerTimeline.to(
            intro,
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
            },
            "-=0.65",
          );
        }

        if (title) {
          headerTimeline.to(
            title,
            {
              y: 0,
              opacity: 1,
              duration: 1.1,
              ease: "power3.out",
            },
            "-=0.65",
          );
        }

        /*
         * =====================================================
         * CARDS
         * =====================================================
         */

        cards.forEach((card, index) => {
          const cardTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 84%",
              end: "bottom 18%",
              toggleActions: "play reverse play reverse",
            },
          });

          cardTimeline.to(card, {
            y: 0,
            opacity: 1,
            duration: 1.15,
            delay: index * 0.12,
            ease: "power3.out",
          });
        });

        /*
         * =====================================================
         * PROFILE IMAGE
         * =====================================================
         */

        if (profileImage) {
          gsap.to(profileImage, {
            scale: 1,
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: profileImage,
              start: "top 86%",
              end: "bottom 25%",
              toggleActions: "play reverse play reverse",
            },
          });
        }

        /*
         * =====================================================
         * AVAILABILITY
         * =====================================================
         */

        if (availability) {
          gsap.to(availability, {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: availability,
              start: "top 88%",
              end: "bottom 30%",
              toggleActions: "play reverse play reverse",
            },
          });
        }

        /*
         * =====================================================
         * PROFILE CONTENT
         * =====================================================
         */

        if (profileContent) {
          gsap.to(profileContent, {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: profileContent,
              start: "top 88%",
              end: "bottom 30%",
              toggleActions: "play reverse play reverse",
            },
          });
        }

        /*
         * =====================================================
         * SOCIAL LINKS
         * =====================================================
         */

        if (socials.length) {
          gsap.to(socials, {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: socials[0],
              start: "top 90%",
              end: "bottom 30%",
              toggleActions: "play reverse play reverse",
            },
          });
        }

        /*
         * =====================================================
         * CV BUTTON
         * =====================================================
         */

        if (cvButton) {
          gsap.to(cvButton, {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cvButton,
              start: "top 92%",
              end: "bottom 30%",
              toggleActions: "play reverse play reverse",
            },
          });
        }

        /*
         * =====================================================
         * INFORMATION CARD
         * =====================================================
         */

        if (informationContent) {
          gsap.to(informationContent, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: informationContent,
              start: "top 88%",
              end: "bottom 25%",
              toggleActions: "play reverse play reverse",
            },
          });
        }

        /*
         * =====================================================
         * SKILLS
         * =====================================================
         */

        if (skillsElements.length) {
          gsap.to(skillsElements, {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.07,
            ease: "power2.out",
            scrollTrigger: {
              trigger: skillsElements[0],
              start: "top 91%",
              end: "bottom 25%",
              toggleActions: "play reverse play reverse",
            },
          });
        }

        /*
         * =====================================================
         * EXPERIENCES
         * =====================================================
         */

        if (experienceElements.length) {
          gsap.to(experienceElements, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.09,
            ease: "power2.out",
            scrollTrigger: {
              trigger: experienceElements[0],
              start: "top 91%",
              end: "bottom 25%",
              toggleActions: "play reverse play reverse",
            },
          });
        }

        /*
         * =====================================================
         * REFRESH
         * =====================================================
         */

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
    },
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="
        relative
        overflow-hidden
        bg-[var(--portfolio-background)]
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1440px]
          px-5
          py-24
          sm:px-8
          sm:py-32
          lg:px-12
          lg:py-10
        "
      >
        {/* SECTION HEADER */}

        <div className="mx-auto max-w-[900px] text-center">
          <div
            data-about-badge
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[var(--portfolio-border)]
              bg-[var(--portfolio-surface)]
              px-4
              py-2
              shadow-[0_4px_20px_rgba(0,0,0,0.03)]
              will-change-transform
            "
          >
            <span className="relative flex h-2 w-2">
              <span
                className="
                  absolute
                  inline-flex
                  h-full
                  w-full
                  animate-ping
                  rounded-full
                  bg-[var(--portfolio-accent)]
                  opacity-60
                "
              />

              <span
                className="
                  relative
                  inline-flex
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
                text-xs
                font-medium
                text-[var(--portfolio-text-primary)]
              "
            >
              About me
            </span>

            <span className="text-[var(--portfolio-text-muted)]">·</span>

            <span
              className="
                font-body
                text-xs
                text-[var(--portfolio-text-secondary)]
              "
            >
              UX/UI & Brand Designer
            </span>
          </div>

          <p
            data-about-intro
            className="
              mt-8
              font-body
              text-sm
              text-[var(--portfolio-text-muted)]
              will-change-transform
            "
          >
            A designer focused on turning complexity into clarity.
          </p>

          <h2
            data-about-title
            className="
              mt-5
              font-display
              text-[clamp(2.75rem,6vw,5.5rem)]
              font-bold
              leading-[0.95]
              tracking-[-0.055em]
              will-change-transform
            "
          >
            Designing with purpose,{" "}
            <span
              className="
                font-normal
                text-[var(--portfolio-text-secondary)]
              "
            >
              not just aesthetics.
            </span>
          </h2>
        </div>

        {/* ABOUT GRID */}

        <div
          className="
            mx-auto
            mt-16
            grid
            max-w-[1180px]
            gap-5
            lg:grid-cols-[0.8fr_1.2fr]
          "
        >
          {/* PROFILE CARD */}

          <article
            data-about-card
            className="
              overflow-hidden
              rounded-[var(--portfolio-radius-lg)]
              border
              border-[var(--portfolio-border)]
              bg-[var(--portfolio-surface)]
              p-4
              shadow-[0_20px_60px_rgba(0,0,0,0.04)]
              will-change-transform
            "
          >
            {/* PHOTO */}

            <div
              className="
                relative
                aspect-[4/4.2]
                overflow-hidden
                rounded-[var(--portfolio-radius-md)]
                bg-[var(--portfolio-dark)]
              "
            >
              <Image
                data-about-image
                src="/images/about/photo Franck.jpg"
                alt="Ngoka Franck"
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="
                  object-cover
                  grayscale
                  will-change-transform
                "
              />

              {/* AVAILABILITY */}

              <div
                data-about-availability
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
                  will-change-transform
                "
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="
                      absolute
                      inline-flex
                      h-full
                      w-full
                      animate-ping
                      rounded-full
                      bg-[var(--portfolio-accent)]
                      opacity-70
                    "
                  />

                  <span
                    className="
                      relative
                      inline-flex
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
                    text-xs
                    font-medium
                    text-white
                  "
                >
                  Available for selected projects
                </span>
              </div>
            </div>

            {/* PROFILE CONTENT */}

            <div
              data-about-profile
              className="px-1 pb-1 pt-6 will-change-transform"
            >
              <h3
                className="
                  font-display
                  text-2xl
                  font-bold
                  tracking-[-0.035em]
                  text-[var(--portfolio-text-primary)]
                "
              >
                Hello, I&apos;m Franck.
              </h3>

              <p
                className="
                  mt-2
                  font-body
                  text-sm
                  leading-6
                  text-[var(--portfolio-text-secondary)]
                "
              >
                UX/UI & Web & Brand Designer focused on creating purposeful
                digital experiences.
              </p>

              {/* SOCIALS */}

              {(settings.linkedinUrl ||
                settings.behanceUrl ||
                settings.instagramUrl) && (
                <div
                  className="
                    mt-6
                    flex
                    items-center
                    gap-3
                    border-b
                    border-[var(--portfolio-border)]
                    pb-6
                  "
                >
                  {settings.linkedinUrl && (
                    <a
                      data-about-social
                      data-cursor="magnetic"
                      href={settings.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[var(--portfolio-border)]
                        font-body
                        text-xs
                        text-[var(--portfolio-text-primary)]
                        transition-all
                        duration-[var(--portfolio-motion-fast)]
                        hover:-translate-y-[1px]
                        hover:bg-[var(--portfolio-background)]
                        will-change-transform
                      "
                    >
                      in
                    </a>
                  )}

                  {settings.behanceUrl && (
                    <a
                      data-about-social
                      data-cursor="magnetic"
                      href={settings.behanceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Behance"
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[var(--portfolio-border)]
                        font-body
                        text-xs
                        text-[var(--portfolio-text-primary)]
                        transition-all
                        duration-[var(--portfolio-motion-fast)]
                        hover:-translate-y-[1px]
                        hover:bg-[var(--portfolio-background)]
                        will-change-transform
                      "
                    >
                      Be
                    </a>
                  )}

                  {settings.instagramUrl && (
                    <a
                      data-about-social
                      data-cursor="magnetic"
                      href={settings.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[var(--portfolio-border)]
                        font-body
                        text-xs
                        text-[var(--portfolio-text-primary)]
                        transition-all
                        duration-[var(--portfolio-motion-fast)]
                        hover:-translate-y-[1px]
                        hover:bg-[var(--portfolio-background)]
                        will-change-transform
                      "
                    >
                      Ig
                    </a>
                  )}
                </div>
              )}

              <Link
                href="/cv"
                data-about-cv
                data-cursor="magnetic"
                className="
                  group
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-[var(--portfolio-dark)]
                  px-5
                  py-3
                  font-display
                  text-sm
                  font-medium
                  text-[var(--portfolio-dark-text)]
                  transition-all
                  duration-[var(--portfolio-motion-fast)]
                  hover:-translate-y-[1px]
                  will-change-transform
                "
              >
                <span>View my CV</span>

                <span
                  aria-hidden="true"
                  className="
                    text-[var(--portfolio-accent)]
                    transition-transform
                    duration-[var(--portfolio-motion-fast)]
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                >
                  ↗
                </span>
              </Link>
            </div>
          </article>

          {/* INFORMATION CARD */}

          <article
            data-about-card
            className="
              rounded-[var(--portfolio-radius-lg)]
              border
              border-[var(--portfolio-border)]
              bg-[var(--portfolio-surface)]
              p-6
              shadow-[0_20px_60px_rgba(0,0,0,0.04)]
              sm:p-8
              lg:p-10
              will-change-transform
            "
          >
            {/* DESCRIPTION */}

            <div data-about-information>
              <p
                className="
                  max-w-[720px]
                  font-body
                  text-base
                  font-medium
                  leading-7
                  text-[var(--portfolio-text-secondary)]
                  sm:text-lg
                  sm:leading-8
                "
              >
                I&apos;m Franck, a UX/UI and Web & Brand Designer based in
                Cameroon. With 3+ years of experience, I design digital
                experiences and visual identities that bring clarity to
                complex ideas.
                <br />
                <br />
                My approach sits at the intersection of user experience,
                visual design and brand thinking. I care about how a product
                works, how it feels and how consistently its identity comes
                through every interaction.
                <br />
                <br />
                From early concepts and user flows to polished interfaces and
                visual systems, I turn ideas into purposeful experiences that
                are clear, functional and memorable.
              </p>

              <div
                className="
                  my-8
                  h-px
                  w-full
                  bg-[var(--portfolio-border)]
                "
              />

              {/* SKILLS */}

              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    data-about-skill
                    className="
                      rounded-[var(--portfolio-radius-sm)]
                      bg-[var(--portfolio-background)]
                      px-4
                      py-2.5
                      font-body
                      text-sm
                      text-[var(--portfolio-text-secondary)]
                      transition-colors
                      hover:text-[var(--portfolio-text-primary)]
                      will-change-transform
                    "
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div
                className="
                  my-8
                  h-px
                  w-full
                  bg-[var(--portfolio-border)]
                "
              />

              {/* EXPERIENCE */}

              <div className="space-y-2">
                {experiences.map((experience) => (
                  <div
                    key={`${experience.company}-${experience.year}`}
                    data-about-experience
                    className="
                      grid
                      grid-cols-[1fr_auto]
                      gap-4
                      rounded-[var(--portfolio-radius-sm)]
                      px-4
                      py-4
                      transition-colors
                      hover:bg-[var(--portfolio-background)]
                      sm:grid-cols-[1fr_1fr_auto]
                      will-change-transform
                    "
                  >
                    <span
                      className="
                        font-body
                        text-sm
                        font-medium
                        text-[var(--portfolio-text-primary)]
                      "
                    >
                      {experience.role}
                    </span>

                    <span
                      className="
                        hidden
                        font-body
                        text-sm
                        text-[var(--portfolio-text-secondary)]
                        sm:block
                      "
                    >
                      {experience.company}
                    </span>

                    <span
                      className="
                        font-body
                        text-sm
                        text-[var(--portfolio-text-muted)]
                      "
                    >
                      {experience.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}