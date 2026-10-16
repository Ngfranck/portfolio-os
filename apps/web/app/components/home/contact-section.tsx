"use client";

import { useRef } from "react";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  Mail01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) {
        return;
      }

      const section = sectionRef.current;

      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const ctx = gsap.context(() => {
        const badge = section.querySelector("[data-contact-badge]");
        const title = section.querySelector("[data-contact-title]");
        const description = section.querySelector(
          "[data-contact-description]"
        );
        const cta = section.querySelector("[data-contact-cta]");

        const availabilityCard = section.querySelector(
          "[data-contact-availability]"
        );
        const availabilityContent = section.querySelector(
          "[data-contact-availability-content]"
        );

        const contactLinks = section.querySelector(
          "[data-contact-links]"
        );
        const contactItems = section.querySelectorAll(
          "[data-contact-item]"
        );

        const footerLine = section.querySelector(
          "[data-contact-footer]"
        );
        const footerMessage = section.querySelector(
          "[data-contact-footer-message]"
        );
        const backToTop = section.querySelector(
          "[data-contact-back-top]"
        );

        /*
         * =====================================================
         * INITIAL STATES
         * =====================================================
         */

        if (badge) {
          gsap.set(badge, {
            opacity: 0,
            y: 25,
          });
        }

        if (title) {
          gsap.set(title, {
            opacity: 0,
            y: 45,
          });
        }

        if (description) {
          gsap.set(description, {
            opacity: 0,
            y: 25,
          });
        }

        if (cta) {
          gsap.set(cta, {
            opacity: 0,
            y: 25,
            scale: 0.97,
          });
        }

        if (availabilityCard) {
          gsap.set(availabilityCard, {
            opacity: 0,
            x: 35,
            y: 20,
          });
        }

        if (availabilityContent) {
          gsap.set(availabilityContent, {
            opacity: 0,
            y: 18,
          });
        }

        if (contactLinks) {
          gsap.set(contactLinks, {
            opacity: 0,
            x: 35,
            y: 20,
          });
        }

        if (contactItems.length > 0) {
          gsap.set(contactItems, {
            opacity: 0,
            x: 25,
          });
        }

        if (footerLine) {
          gsap.set(footerLine, {
            opacity: 0,
            y: 20,
          });
        }

        if (footerMessage) {
          gsap.set(footerMessage, {
            opacity: 0,
            x: -20,
          });
        }

        if (backToTop) {
          gsap.set(backToTop, {
            opacity: 0,
            x: 20,
          });
        }

        /*
         * =====================================================
         * LEFT SIDE — INTRO
         * =====================================================
         */

        if (badge && title && description && cta) {
          const introTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
          });

          introTimeline
            .to(badge, {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "power3.out",
            })
            .to(
              title,
              {
                opacity: 1,
                y: 0,
                duration: 0.85,
                ease: "power3.out",
              },
              "-=0.25"
            )
            .to(
              description,
              {
                opacity: 1,
                y: 0,
                duration: 0.65,
                ease: "power3.out",
              },
              "-=0.4"
            )
            .to(
              cta,
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "power3.out",
              },
              "-=0.3"
            );
        }

        /*
         * =====================================================
         * RIGHT SIDE — AVAILABILITY
         * =====================================================
         */

        if (availabilityCard && availabilityContent) {
          const availabilityTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: availabilityCard,
              start: "top 82%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
          });

          availabilityTimeline
            .to(availabilityCard, {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.75,
              ease: "power3.out",
            })
            .to(
              availabilityContent,
              {
                opacity: 1,
                y: 0,
                duration: 0.55,
                ease: "power3.out",
              },
              "-=0.4"
            );
        }

        /*
         * =====================================================
         * RIGHT SIDE — CONTACT LINKS
         * =====================================================
         */

        if (contactLinks && contactItems.length > 0) {
          const linksTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: contactLinks,
              start: "top 86%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
          });

          linksTimeline
            .to(contactLinks, {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.65,
              ease: "power3.out",
            })
            .to(
              contactItems,
              {
                opacity: 1,
                x: 0,
                duration: 0.55,
                stagger: 0.1,
                ease: "power3.out",
              },
              "-=0.3"
            );
        }

        /*
         * =====================================================
         * FOOTER LINE
         * =====================================================
         */

        if (footerLine && footerMessage && backToTop) {
          const footerTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: footerLine,
              start: "top 90%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
          });

          footerTimeline
            .to(footerLine, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
            })
            .to(
              footerMessage,
              {
                opacity: 1,
                x: 0,
                duration: 0.5,
                ease: "power3.out",
              },
              "-=0.3"
            )
            .to(
              backToTop,
              {
                opacity: 1,
                x: 0,
                duration: 0.5,
                ease: "power3.out",
              },
              "-=0.35"
            );
        }

        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      }, sectionRef);

      return () => {
        ctx.revert();
      };
    },
    {
      scope: sectionRef,
    }
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="
        relative
        overflow-hidden
        bg-[var(--portfolio-surface)]
        px-4
        py-[var(--portfolio-space-7)]
        text-[var(--portfolio-text-primary)]
        transition-colors
        duration-[var(--portfolio-motion-normal)]
        sm:px-6
        lg:px-8
      "
    >
      <div className="relative mx-auto max-w-[1320px]">
        <div
          className="
            grid
            grid-cols-1
            gap-12
            lg:grid-cols-[1.1fr_0.9fr]
            lg:gap-20
          "
        >
          {/* LEFT */}
          <div>
            {/* BADGE */}
            <div
              data-contact-badge
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[var(--portfolio-border)]
                bg-[var(--portfolio-surface)]
                px-3
                py-2
                font-display
                text-[12px]
                font-medium
                tracking-[-0.01em]
                text-[var(--portfolio-text-primary)]
                shadow-[0_3px_12px_rgba(0,0,0,0.025)]
                backdrop-blur-md
                transition-colors
                duration-[var(--portfolio-motion-normal)]
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
                    contact-pulse
                    absolute
                    h-[7px]
                    w-[7px]
                    rounded-full
                    bg-[var(--portfolio-accent)]
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

              <span>Let's work together</span>
            </div>

            {/* TITLE */}
            <h2
              data-contact-title
              className="
                mt-7
                max-w-[850px]
                font-display
                text-[clamp(3.2rem,7vw,7rem)]
                font-semibold
                leading-[0.9]
                tracking-[var(--portfolio-tracking-display)]
              "
            >
              <span className="text-[var(--portfolio-text-primary)]">
                Have a project
              </span>

              <br />

              <span
                className="
                  font-normal
                  text-[var(--portfolio-text-muted)]
                "
              >
                in mind?
              </span>
            </h2>

            {/* DESCRIPTION */}
            <p
              data-contact-description
              className="
                mt-7
                max-w-[560px]
                font-body
                text-[var(--portfolio-text-body)]
                leading-[var(--portfolio-leading-body)]
                tracking-[var(--portfolio-tracking-body)]
                text-[var(--portfolio-text-secondary)]
              "
            >
              Vous avez une idée, un projet ou simplement
              l'envie d'échanger ? Parlons-en et voyons
              comment transformer votre vision en une
              expérience digitale claire, élégante et
              mémorable.
            </p>

            {/* CTA */}
            <div className="mt-8">
              <a
                data-contact-cta
                data-cursor="magnetic"
                href="mailto:hello@franck.ui"
                className="
                  group
                  inline-flex
                  h-12
                  items-center
                  gap-2.5
                  rounded-full
                  bg-[var(--portfolio-text-primary)]
                  px-6
                  font-display
                  text-[13px]
                  font-medium
                  tracking-[-0.01em]
                  text-[var(--portfolio-background)]
                  transition-all
                  duration-[var(--portfolio-motion-fast)]
                  hover:-translate-y-[1px]
                  hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]
                  dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.25)]
                "
              >
                <HugeiconsIcon
                  icon={Mail01Icon}
                  size={16}
                  strokeWidth={1.7}
                />

                <span>Parlons de votre projet</span>

                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  size={15}
                  strokeWidth={1.7}
                  className="
                    text-[var(--portfolio-accent)]
                    transition-transform
                    duration-[var(--portfolio-motion-fast)]
                    group-hover:-translate-y-[1px]
                    group-hover:translate-x-[1px]
                  "
                />
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div
            className="
              flex
              flex-col
              justify-end
            "
          >
            {/* AVAILABILITY CARD */}
            <div
              data-contact-availability
              className="
                rounded-[var(--portfolio-radius-lg)]
                border
                border-[var(--portfolio-border)]
                bg-[var(--portfolio-surface)]
                p-6
                shadow-[0_8px_30px_rgba(0,0,0,0.025)]
                backdrop-blur-md
                transition-colors
                duration-[var(--portfolio-motion-normal)]
                dark:shadow-none
              "
            >
              <div
                data-contact-availability-content
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2.5
                    font-display
                    text-[14px]
                    font-semibold
                    tracking-[-0.015em]
                    text-[var(--portfolio-text-primary)]
                  "
                >
                  {/* STATUS */}
                  <span
                    className="
                      relative
                      flex
                      h-2
                      w-2
                    "
                  >
                    <span
                      className="
                        absolute
                        inset-0
                        animate-ping
                        rounded-full
                        bg-[var(--portfolio-accent-green)]
                        opacity-30
                      "
                    />

                    <span
                      className="
                        relative
                        h-2
                        w-2
                        rounded-full
                        bg-[var(--portfolio-accent-green)]
                      "
                    />
                  </span>

                  Available for new projects
                </div>

                <HugeiconsIcon
                  icon={SparklesIcon}
                  size={18}
                  strokeWidth={1.5}
                  className="text-[var(--portfolio-accent)]"
                />
              </div>

              <p
                className="
                  mt-3
                  max-w-[420px]
                  font-body
                  text-[13px]
                  leading-[1.55]
                  text-[var(--portfolio-text-secondary)]
                "
              >
                Je suis actuellement disponible pour
                accompagner de nouveaux projets et
                collaborations.
              </p>
            </div>

            {/* CONTACT LINKS */}
            <div
              data-contact-links
              className="
                mt-4
                overflow-hidden
                rounded-[var(--portfolio-radius-lg)]
                border
                border-[var(--portfolio-border)]
                bg-[var(--portfolio-surface)]
                backdrop-blur-md
              "
            >
              {/* EMAIL */}
              <a
                data-contact-item
                data-cursor="magnetic"
                href="mailto:hello@franck.ui"
                className="
                  group
                  flex
                  items-center
                  justify-between
                  gap-4
                  border-b
                  border-[var(--portfolio-border)]
                  p-5
                  transition-colors
                  duration-[var(--portfolio-motion-fast)]
                  hover:bg-black/[0.025]
                  dark:hover:bg-white/[0.04]
                "
              >
                <div className="flex items-center gap-4">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[var(--portfolio-border)]
                      bg-[var(--portfolio-background)]
                    "
                  >
                    <HugeiconsIcon
                      icon={Mail01Icon}
                      size={17}
                      strokeWidth={1.6}
                    />
                  </div>

                  <div>
                    <span
                      className="
                        block
                        font-display
                        text-[12px]
                        font-medium
                        text-[var(--portfolio-text-muted)]
                      "
                    >
                      Email
                    </span>

                    <span
                      className="
                        mt-1
                        block
                        font-display
                        text-[14px]
                        font-medium
                        text-[var(--portfolio-text-primary)]
                      "
                    >
                      hello@franck.ui
                    </span>
                  </div>
                </div>

                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  size={17}
                  strokeWidth={1.5}
                  className="
                    shrink-0
                    text-[var(--portfolio-text-muted)]
                    transition-all
                    duration-[var(--portfolio-motion-fast)]
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                    group-hover:text-[var(--portfolio-accent)]
                  "
                />
              </a>

              {/* WHATSAPP */}
              <a
                data-contact-item
                data-cursor="magnetic"
                href="#"
                className="
                  group
                  flex
                  items-center
                  justify-between
                  gap-4
                  border-b
                  border-[var(--portfolio-border)]
                  p-5
                  transition-colors
                  duration-[var(--portfolio-motion-fast)]
                  hover:bg-black/[0.025]
                  dark:hover:bg-white/[0.04]
                "
              >
                <div className="flex items-center gap-4">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[var(--portfolio-border)]
                      bg-[var(--portfolio-background)]
                      font-display
                      text-[11px]
                      font-semibold
                    "
                  >
                    WA
                  </div>

                  <div>
                    <span
                      className="
                        block
                        font-display
                        text-[12px]
                        font-medium
                        text-[var(--portfolio-text-muted)]
                      "
                    >
                      WhatsApp
                    </span>

                    <span
                      className="
                        mt-1
                        block
                        font-display
                        text-[14px]
                        font-medium
                        text-[var(--portfolio-text-primary)]
                      "
                    >
                      Let's chat
                    </span>
                  </div>
                </div>

                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  size={17}
                  strokeWidth={1.5}
                  className="
                    shrink-0
                    text-[var(--portfolio-text-muted)]
                    transition-all
                    duration-[var(--portfolio-motion-fast)]
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                    group-hover:text-[var(--portfolio-accent)]
                  "
                />
              </a>

              {/* LINKEDIN */}
              <a
                data-contact-item
                data-cursor="magnetic"
                href="#"
                className="
                  group
                  flex
                  items-center
                  justify-between
                  gap-4
                  p-5
                  transition-colors
                  duration-[var(--portfolio-motion-fast)]
                  hover:bg-black/[0.025]
                  dark:hover:bg-white/[0.04]
                "
              >
                <div className="flex items-center gap-4">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[var(--portfolio-border)]
                      bg-[var(--portfolio-background)]
                      font-display
                      text-[11px]
                      font-semibold
                    "
                  >
                    in
                  </div>

                  <div>
                    <span
                      className="
                        block
                        font-display
                        text-[12px]
                        font-medium
                        text-[var(--portfolio-text-muted)]
                      "
                    >
                      LinkedIn
                    </span>

                    <span
                      className="
                        mt-1
                        block
                        font-display
                        text-[14px]
                        font-medium
                        text-[var(--portfolio-text-primary)]
                      "
                    >
                      Connect with me
                    </span>
                  </div>
                </div>

                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  size={17}
                  strokeWidth={1.5}
                  className="
                    shrink-0
                    text-[var(--portfolio-text-muted)]
                    transition-all
                    duration-[var(--portfolio-motion-fast)]
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                    group-hover:text-[var(--portfolio-accent)]
                  "
                />
              </a>
            </div>
          </div>
        </div>

        {/* FOOTER LINE */}
        <div
          data-contact-footer
          className="
            mt-20
            flex
            flex-col
            gap-5
            border-t
            border-[var(--portfolio-border)]
            pt-7
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div
            data-contact-footer-message
            className="
              flex
              items-center
              gap-2.5
              font-display
              text-[13px]
              font-medium
              text-[var(--portfolio-text-secondary)]
            "
          >
            <HugeiconsIcon
              icon={SparklesIcon}
              size={15}
              strokeWidth={1.5}
              className="text-[var(--portfolio-accent)]"
            />

            <span>
              The right design for the right problem.
            </span>
          </div>

          <a
            data-contact-back-top
            data-cursor="magnetic"
            href="/#top"
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
              duration-[var(--portfolio-motion-fast)]
              hover:text-[var(--portfolio-text-primary)]
            "
          >
            <span>Back to top</span>

            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={15}
              strokeWidth={1.6}
              className="
                rotate-[-90deg]
                text-[var(--portfolio-accent)]
                transition-transform
                duration-[var(--portfolio-motion-fast)]
                group-hover:-translate-y-0.5
              "
            />
          </a>
        </div>
      </div>
    </section>
  );
}