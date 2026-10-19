"use client";

import { useRef } from "react";

import Link from "next/link";

import { HugeiconsIcon } from "@hugeicons/react";

import {
  ArrowUpRight01Icon,
  ArrowRight01Icon,
  Mail01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type FooterSettings = {
  linkedinUrl: string | null;
  behanceUrl: string | null;
  githubUrl: string | null;
};

export function Footer({
  settings,
}: {
  settings: FooterSettings;
}) {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!footerRef.current) {
        return;
      }

      const footer = footerRef.current;

      if (
        window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches
      ) {
        return;
      }

      const badge = footer.querySelector("[data-footer-badge]");
      const titlePrimary = footer.querySelector(
        "[data-footer-title-primary]",
      );
      const titleSecondary = footer.querySelector(
        "[data-footer-title-secondary]",
      );
      const description = footer.querySelector(
        "[data-footer-description]",
      );
      const cta = footer.querySelector("[data-footer-cta]");
      const brand = footer.querySelector("[data-footer-brand]");
      const navigation = footer.querySelector(
        "[data-footer-navigation]",
      );
      const socials = footer.querySelector("[data-footer-socials]");
      const navigationItems = footer.querySelectorAll(
        "[data-footer-navigation-item]",
      );
      const socialItems = footer.querySelectorAll(
        "[data-footer-social-item]",
      );
      const bottomBar = footer.querySelector(
        "[data-footer-bottom]",
      );
      const copyright = footer.querySelector(
        "[data-footer-copyright]",
      );
      const microMessage = footer.querySelector(
        "[data-footer-message]",
      );
      const backToTop = footer.querySelector(
        "[data-footer-back-top]",
      );

      // =====================================================
      // INITIAL STATES
      // =====================================================

      if (badge) {
        gsap.set(badge, {
          opacity: 0,
          y: 25,
        });
      }

      if (titlePrimary) {
        gsap.set(titlePrimary, {
          opacity: 0,
          y: 45,
        });
      }

      if (titleSecondary) {
        gsap.set(titleSecondary, {
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
          x: 30,
          scale: 0.97,
        });
      }

      if (brand || navigation || socials) {
        gsap.set([brand, navigation, socials].filter(Boolean), {
          opacity: 0,
          y: 30,
        });
      }

      if (navigationItems.length) {
        gsap.set(navigationItems, {
          opacity: 0,
          x: -15,
        });
      }

      if (socialItems.length) {
        gsap.set(socialItems, {
          opacity: 0,
          x: 15,
        });
      }

      if (bottomBar) {
        gsap.set(bottomBar, {
          opacity: 0,
          y: 20,
        });
      }

      if (copyright || microMessage || backToTop) {
        gsap.set(
          [copyright, microMessage, backToTop].filter(Boolean),
          {
            opacity: 0,
            y: 10,
          },
        );
      }

      // =====================================================
      // CTA — MAIN FOOTER INTRO
      // =====================================================

      const ctaTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: "top 82%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      if (badge) {
        ctaTimeline.to(badge, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
        });
      }

      if (titlePrimary) {
        ctaTimeline.to(
          titlePrimary,
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
          },
          "-=0.25",
        );
      }

      if (titleSecondary) {
        ctaTimeline.to(
          titleSecondary,
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
          },
          "-=0.48",
        );
      }

      if (description) {
        ctaTimeline.to(
          description,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3",
        );
      }

      if (cta) {
        ctaTimeline.to(
          cta,
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.65,
            ease: "power3.out",
          },
          "-=0.3",
        );
      }

      // =====================================================
      // FOOTER MAIN — COLUMNS
      // =====================================================

      const columnsTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: brand,
          start: "top 88%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      if (brand) {
        columnsTimeline.to(brand, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
        });
      }

      if (navigation) {
        columnsTimeline.to(
          navigation,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4",
        );
      }

      if (socials) {
        columnsTimeline.to(
          socials,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4",
        );
      }

      if (navigationItems.length) {
        columnsTimeline.to(
          navigationItems,
          {
            opacity: 1,
            x: 0,
            duration: 0.45,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.25",
        );
      }

      if (socialItems.length) {
        columnsTimeline.to(
          socialItems,
          {
            opacity: 1,
            x: 0,
            duration: 0.45,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.3",
        );
      }

      // =====================================================
      // BOTTOM BAR
      // =====================================================

      const bottomTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: bottomBar,
          start: "top 92%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      if (bottomBar) {
        bottomTimeline.to(bottomBar, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      }

      if (copyright) {
        bottomTimeline.to(
          copyright,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
          },
          "-=0.3",
        );
      }

      if (microMessage) {
        bottomTimeline.to(
          microMessage,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
          },
          "-=0.3",
        );
      }

      if (backToTop) {
        bottomTimeline.to(
          backToTop,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
          },
          "-=0.3",
        );
      }

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    },
    {
      scope: footerRef,
    },
  );

  return (
    <footer
      ref={footerRef}
      className="
        relative
        overflow-hidden
        border-t
        border-black/[0.07]
        bg-[var(--portfolio-background)]
        text-[var(--portfolio-text-primary)]
        transition-colors
        duration-[var(--portfolio-motion-normal)]
        dark:border-white/[0.08]
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[520px]
          w-[520px]
          -translate-x-1/2
          -translate-y-[35%]
          rounded-full
          opacity-[0.025]
          blur-[120px]
          dark:opacity-[0.055]
        "
      />

      <div
        className="
          relative
          mx-auto
          max-w-[1320px]
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* =====================================================
            CTA
        ===================================================== */}

        <div
          className="
            border-b
            border-black/[0.07]
            py-20
            dark:border-white/[0.08]
            sm:py-24
            lg:py-28
          "
        >
          <div
            data-footer-badge
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-black/[0.07]
              bg-black/[0.025]
              px-3
              py-2
              font-display
              text-[12px]
              font-medium
              tracking-[-0.01em]
              text-[var(--portfolio-text-primary)]
              backdrop-blur-md
              dark:border-white/[0.08]
              dark:bg-white/[0.04]
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
                  animate-ping
                  rounded-full
                  bg-[var(--portfolio-accent)]
                  opacity-30
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

            <span>Have a project in mind?</span>
          </div>

          <div
            className="
              mt-7
              flex
              flex-col
              gap-10
              lg:flex-row
              lg:items-end
              lg:justify-between
              lg:gap-16
            "
          >
            <div className="max-w-[760px]">
              <h2
                data-footer-title-primary
                className="
                  font-display
                  text-[clamp(3.4rem,7vw,7rem)]
                  font-semibold
                  leading-[0.9]
                  tracking-[var(--portfolio-tracking-display)]
                  text-[var(--portfolio-text-primary)]
                "
              >
                Let's create
              </h2>

              <h2
                data-footer-title-secondary
                className="
                  font-display
                  text-[clamp(3.4rem,7vw,7rem)]
                  font-normal
                  leading-[0.9]
                  tracking-[var(--portfolio-tracking-display)]
                  text-[var(--portfolio-text-muted)]
                "
              >
                something
                <br />
                meaningful.
              </h2>

              <p
                data-footer-description
                className="
                  mt-7
                  max-w-[560px]
                  font-body
                  text-[15px]
                  leading-[1.6]
                  tracking-[var(--portfolio-tracking-body)]
                  text-[var(--portfolio-text-secondary)]
                "
              >
                Une idée, une marque ou un produit digital ?
                Construisons ensemble une expérience claire,
                cohérente et mémorable.
              </p>
            </div>

            <Link
              data-footer-cta
              data-cursor="magnetic"
              href="/#contact"
              className="
                group
                inline-flex
                h-12
                shrink-0
                items-center
                justify-center
                gap-2.5
                self-start
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
                hover:-translate-y-[2px]
                hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]
                lg:self-end
              "
            >
              <HugeiconsIcon
                icon={Mail01Icon}
                size={16}
                strokeWidth={1.7}
                aria-hidden="true"
              />

              <span>Me contacter</span>

              <HugeiconsIcon
                icon={ArrowUpRight01Icon}
                size={15}
                strokeWidth={1.7}
                aria-hidden="true"
                className="
                  text-[var(--portfolio-accent)]
                  transition-transform
                  duration-[var(--portfolio-motion-fast)]
                  group-hover:-translate-y-[1px]
                  group-hover:translate-x-[1px]
                "
              />
            </Link>
          </div>
        </div>

        {/* =====================================================
            FOOTER MAIN
        ===================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-12
            py-14
            sm:grid-cols-2
            lg:grid-cols-[1.4fr_0.7fr_0.7fr]
            lg:gap-16
            lg:py-16
          "
        >
          {/* BRAND */}

          <div data-footer-brand>
            <Link
              data-cursor="magnetic"
              href="/#top"
              className="
                inline-flex
                font-display
                text-[22px]
                font-semibold
                tracking-[-0.04em]
                text-[var(--portfolio-text-primary)]
                transition-opacity
                duration-[var(--portfolio-motion-fast)]
                hover:opacity-70
              "
            >
              Gonar
              <span className="ml-[2px]">.ui</span>
            </Link>

            <p
              className="
                mt-4
                max-w-[400px]
                font-body
                text-[13px]
                leading-[1.6]
                text-[var(--portfolio-text-secondary)]
              "
            >
              Web & Brand Designer spécialisé dans la création
              d&apos;identités, d&apos;interfaces et d&apos;expériences
              digitales pensées avec intention.
            </p>

            <div
              className="
                mt-6
                inline-flex
                items-center
                gap-2.5
                font-display
                text-[12px]
                font-medium
                text-[var(--portfolio-text-secondary)]
              "
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="
                    absolute
                    inset-0
                    animate-ping
                    rounded-full
                    bg-[#22c55e]
                    opacity-30
                  "
                />

                <span
                  className="
                    relative
                    h-2
                    w-2
                    rounded-full
                    bg-[#22c55e]
                  "
                />
              </span>

              <span>Available for new projects</span>
            </div>
          </div>

          {/* NAVIGATION */}

          <div data-footer-navigation>
            <p
              className="
                font-display
                text-[11px]
                font-medium
                uppercase
                tracking-[0.08em]
                text-[var(--portfolio-text-muted)]
              "
            >
              Navigation
            </p>

            <nav className="mt-5 flex flex-col gap-3">
              {[
                ["Home", "/#top"],
                ["About", "/#about"],
                ["Services", "/#services"],
                ["Projects", "/#projects"],
                ["Contact", "/#contact"],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  data-footer-navigation-item
                  data-cursor="magnetic"
                  href={href}
                  className="
                    w-fit
                    font-display
                    text-[13px]
                    font-medium
                    text-[var(--portfolio-text-secondary)]
                    transition-colors
                    duration-[var(--portfolio-motion-fast)]
                    hover:text-[var(--portfolio-text-primary)]
                  "
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* SOCIALS */}

          <div data-footer-socials>
            <p
              className="
                font-display
                text-[11px]
                font-medium
                uppercase
                tracking-[0.08em]
                text-[var(--portfolio-text-muted)]
              "
            >
              Connect
            </p>

            {(settings.linkedinUrl ||
              settings.behanceUrl ||
              settings.githubUrl) && (
              <nav className="mt-5 flex flex-col gap-3">
                {settings.linkedinUrl && (
                  <a
                    data-footer-social-item
                    data-cursor="open"
                    href={settings.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="
                      group
                      flex
                      w-fit
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
                    LinkedIn

                    <HugeiconsIcon
                      icon={ArrowUpRight01Icon}
                      size={13}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className="
                        text-[var(--portfolio-accent)]
                        opacity-0
                        transition-all
                        duration-[var(--portfolio-motion-fast)]
                        group-hover:translate-x-[2px]
                        group-hover:-translate-y-[2px]
                        group-hover:opacity-100
                      "
                    />
                  </a>
                )}

                {settings.behanceUrl && (
                  <a
                    data-footer-social-item
                    data-cursor="open"
                    href={settings.behanceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Behance"
                    className="
                      group
                      flex
                      w-fit
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
                    Behance

                    <HugeiconsIcon
                      icon={ArrowUpRight01Icon}
                      size={13}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className="
                        text-[var(--portfolio-accent)]
                        opacity-0
                        transition-all
                        duration-[var(--portfolio-motion-fast)]
                        group-hover:translate-x-[2px]
                        group-hover:-translate-y-[2px]
                        group-hover:opacity-100
                      "
                    />
                  </a>
                )}

                {settings.githubUrl && (
                  <a
                    data-footer-social-item
                    data-cursor="open"
                    href={settings.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="
                      group
                      flex
                      w-fit
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
                    GitHub

                    <HugeiconsIcon
                      icon={ArrowUpRight01Icon}
                      size={13}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className="
                        text-[var(--portfolio-accent)]
                        opacity-0
                        transition-all
                        duration-[var(--portfolio-motion-fast)]
                        group-hover:translate-x-[2px]
                        group-hover:-translate-y-[2px]
                        group-hover:opacity-100
                      "
                    />
                  </a>
                )}
              </nav>
            )}
          </div>
        </div>

        {/* =====================================================
            BOTTOM BAR
        ===================================================== */}

        <div
          data-footer-bottom
          className="
            flex
            flex-col
            gap-5
            border-t
            border-black/[0.07]
            py-6
            dark:border-white/[0.08]
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div
            data-footer-copyright
            className="
              font-display
              text-[11px]
              font-medium
              text-[var(--portfolio-text-muted)]
            "
          >
            © {new Date().getFullYear()} Gonar.ui.
            All rights reserved.
          </div>

          <div
            data-footer-message
            className="
              flex
              items-center
              gap-2
              font-display
              text-[11px]
              font-medium
              text-[var(--portfolio-text-muted)]
            "
          >
            <HugeiconsIcon
              icon={SparklesIcon}
              size={13}
              strokeWidth={1.5}
              aria-hidden="true"
              className="text-[var(--portfolio-accent)]"
            />

            <span>
              The right design for the right problem.
            </span>
          </div>

          <Link
            data-footer-back-top
            data-cursor="magnetic"
            href="/#top"
            className="
              group
              inline-flex
              items-center
              gap-2
              font-display
              text-[11px]
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
              size={14}
              strokeWidth={1.5}
              aria-hidden="true"
              className="
                rotate-[-90deg]
                text-[var(--portfolio-accent)]
                transition-transform
                duration-[var(--portfolio-motion-fast)]
                group-hover:-translate-y-0.5
              "
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}