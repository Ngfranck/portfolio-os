"use client";

import { useRef } from "react";

import Image from "next/image";

import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useGSAP } from "@gsap/react";

import { HugeiconsIcon } from "@hugeicons/react";

import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";

gsap.registerPlugin(ScrollTrigger);

type HeroProps = {
  siteName: string;
  ownerName: string | null;
  siteTagline: string | null;
  siteDescription: string | null;
  isAvailableForProjects: boolean;
};

export function Hero({
  siteName,
  ownerName,
  siteTagline,
  siteDescription,
  isAvailableForProjects,
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  const imageRef = useRef<HTMLImageElement>(null);

  const imageGlowRef = useRef<HTMLDivElement>(null);

  const imageVignetteRef = useRef<HTMLDivElement>(null);

  const contentRef = useRef<HTMLDivElement>(null);

  const nameRef = useRef<HTMLHeadingElement>(null);

  const badgeRef = useRef<HTMLDivElement>(null);

  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const actionsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        !heroRef.current ||
        !imageRef.current ||
        !imageGlowRef.current ||
        !imageVignetteRef.current ||
        !contentRef.current ||
        !nameRef.current ||
        !badgeRef.current ||
        !descriptionRef.current ||
        !actionsRef.current
      ) {
        return;
      }

      const hero = heroRef.current;

      const image = imageRef.current;

      const imageGlow = imageGlowRef.current;

      const imageVignette = imageVignetteRef.current;

      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 768px)",
          reducedMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { desktop, reducedMotion } = context.conditions as {
            desktop: boolean;
            reducedMotion: boolean;
          };

          /*
           * --------------------------------------------------
           * REDUCED MOTION
           * --------------------------------------------------
           */

          if (reducedMotion) {
            gsap.set(
              [
                image,
                imageGlow,
                imageVignette,
                nameRef.current,
                badgeRef.current,
                descriptionRef.current,
                actionsRef.current,
              ],
              {
                clearProps: "all",
              }
            );

            return;
          }

          /*
           * --------------------------------------------------
           * INITIAL STATES
           * --------------------------------------------------
           */

          gsap.set(image, {
            scale: 1.1,
            x: 0,
            y: 0,
            yPercent: 0,
            transformOrigin: "center center",
          });

          gsap.set(imageGlow, {
            xPercent: -50,
            yPercent: -50,
            opacity: 0,
            scale: 0.8,
          });

          gsap.set(imageVignette, {
            opacity: 0.35,
          });

          gsap.set(nameRef.current, {
            y: 100,
            opacity: 0,
            clipPath: "inset(100% 0% 0% 0%)",
          });

          gsap.set(badgeRef.current, {
            y: 40,
            opacity: 0,
          });

          gsap.set(descriptionRef.current, {
            y: 40,
            opacity: 0,
          });

          gsap.set(actionsRef.current, {
            y: 35,
            opacity: 0,
          });

          /*
           * --------------------------------------------------
           * HERO ENTRANCE
           * --------------------------------------------------
           */

          const entrance = gsap.timeline({
            defaults: {
              ease: "power2.out",
            },
          });

          entrance
            .to(
              image,
              {
                scale: 1,
                duration: 3.2,
                ease: "power2.inOut",
              },
              0
            )
            .to(
              imageGlow,
              {
                opacity: 0.5,
                scale: 1,
                duration: 2.4,
                ease: "power2.out",
              },
              0.6
            )
            .to(
              imageVignette,
              {
                opacity: 0.65,
                duration: 2.2,
                ease: "power2.out",
              },
              0.4
            )
            .to(
              nameRef.current,
              {
                y: 0,
                opacity: 1,
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1.8,
                ease: "power3.out",
              },
              0.45
            )
            .to(
              badgeRef.current,
              {
                y: 0,
                opacity: 1,
                duration: 1.15,
                ease: "power2.out",
              },
              1.05
            )
            .to(
              descriptionRef.current,
              {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power2.out",
              },
              1.25
            )
            .to(
              actionsRef.current,
              {
                y: 0,
                opacity: 1,
                duration: 1.15,
                ease: "power2.out",
              },
              1.5
            );

          /*
           * --------------------------------------------------
           * CINEMATIC IMAGE BREATHING
           * --------------------------------------------------
           */

          const breathing = gsap.to(image, {
            scale: 1.035,
            duration: 7,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });

          /*
           * --------------------------------------------------
           * DESKTOP PARALLAX
           * --------------------------------------------------
           */

          if (desktop) {
            gsap.to(image, {
              yPercent: 7,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: 2.2,
              },
            });

            gsap.to(contentRef.current, {
              yPercent: -3,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: 2.4,
              },
            });

            /*
             * ------------------------------------------------
             * DYNAMIC CINEMATIC SPOTLIGHT
             * ------------------------------------------------
             */

            const handleMouseMove = (event: MouseEvent) => {
              const rect = hero.getBoundingClientRect();

              const x = event.clientX - rect.left;

              const y = event.clientY - rect.top;

              const normalizedX = x / rect.width;

              const normalizedY = y / rect.height;

              gsap.to(imageGlow, {
                x,
                y,
                opacity: 0.7,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
                overwrite: true,
              });

              /*
               * Subtle image movement
               */

              gsap.to(image, {
                x: (normalizedX - 0.5) * -10,
                y: (normalizedY - 0.5) * -7,
                duration: 1.2,
                ease: "power3.out",
                overwrite: "auto",
              });
            };

            const handleMouseLeave = () => {
              gsap.to(imageGlow, {
                opacity: 0,
                scale: 0.75,
                duration: 0.8,
                ease: "power3.out",
                overwrite: true,
              });

              gsap.to(image, {
                x: 0,
                y: 0,
                duration: 1.2,
                ease: "power3.out",
                overwrite: "auto",
              });
            };

            hero.addEventListener("mousemove", handleMouseMove, {
              passive: true,
            });

            hero.addEventListener("mouseleave", handleMouseLeave);

            return () => {
              hero.removeEventListener("mousemove", handleMouseMove);

              hero.removeEventListener("mouseleave", handleMouseLeave);

              entrance.kill();

              breathing.kill();

              gsap.killTweensOf([
                image,
                imageGlow,
                imageVignette,
                contentRef.current,
              ]);
            };
          }

          return () => {
            entrance.kill();

            breathing.kill();

            gsap.killTweensOf([
              image,
              imageGlow,
              imageVignette,
              contentRef.current,
            ]);
          };
        }
      );

      return () => {
        mm.revert();
      };
    },
    {
      scope: heroRef,
    }
  );

  const displayName = ownerName?.trim() || siteName;

  const displayTagline =
    siteTagline?.trim() || "Web & Brand Designer";

  const displayDescription =
    siteDescription?.trim() ||
    "Je conçois des identités, des interfaces et des expériences digitales qui transforment les idées en marques mémorables.";

  return (
    <section
      ref={heroRef}
      id="home"
      aria-labelledby="hero-title"
      className="
        relative
        min-h-[calc(100vh+96px)]
        overflow-hidden
        bg-[var(--portfolio-background)]
        text-[var(--portfolio-text-primary)]
        transition-colors
        duration-[var(--portfolio-motion-normal)]
      "
    >
      {/* =====================================================
          HERO IMAGE
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          z-0
          overflow-hidden
          bg-[#0a0a0a]
        "
      >
        <Image
          ref={imageRef}
          src="/images/hero/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="
            object-cover
            object-center
            opacity-100
            will-change-transform
          "
        />

        {/* -------------------------------------------------
            CINEMATIC SPOTLIGHT
        ------------------------------------------------- */}

        <div
          ref={imageGlowRef}
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            h-[420px]
            w-[420px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[radial-gradient(circle,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.055)_28%,transparent_68%)]
            mix-blend-screen
            blur-[45px]
            opacity-0
            will-change-transform
          "
        />

        {/* -------------------------------------------------
            IMAGE ATMOSPHERE
        ------------------------------------------------- */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-black/25
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_15%,rgba(0,0,0,0.58)_100%)]
          "
        />

        {/* -------------------------------------------------
            CINEMATIC VIGNETTE
        ------------------------------------------------- */}

        <div
          ref={imageVignetteRef}
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]
            mix-blend-multiply
          "
        />

        {/* -------------------------------------------------
            BOTTOM CONTENT GRADIENT
        ------------------------------------------------- */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-[65%]
            bg-gradient-to-t
            from-black
            via-black/65
            to-transparent
            opacity-[0.92]
          "
        />

        {/* -------------------------------------------------
            TOP ATMOSPHERIC FADE
        ------------------------------------------------- */}

        <div
          className="
            absolute
            inset-x-0
            top-0
            h-[220px]
            bg-gradient-to-b
            from-black/55
            to-transparent
          "
        />

        {/* -------------------------------------------------
            TECHNICAL GRID
        ------------------------------------------------- */}

        <div
          className="
            absolute
            inset-0
            text-white/[0.035]
          "
          style={{
            backgroundImage: `
              linear-gradient(currentColor 1px, transparent 1px),
              linear-gradient(90deg, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 20%, black 72%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 20%, black 72%, transparent 100%)",
            animation: "heroGridMove 28s linear infinite",
          }}
        />

        {/* -------------------------------------------------
            RED ATMOSPHERIC GLOW
        ------------------------------------------------- */}

        <div
          className="
            absolute
            left-[5%]
            top-[30%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-[radial-gradient(circle,var(--portfolio-accent)_0%,transparent_70%)]
            opacity-[0.035]
            blur-[100px]
            animate-[heroGlowSecondary_16s_ease-in-out_infinite]
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-[20%]
            h-[700px]
            w-[700px]
            -translate-x-1/2
            rounded-full
            bg-[radial-gradient(circle,var(--portfolio-accent-soft)_0%,transparent_68%)]
            opacity-[0.12]
            blur-[20px]
            animate-[heroGlow_12s_ease-in-out_infinite]
          "
        />
      </div>

      {/* =====================================================
          HERO CONTENT
      ===================================================== */}

      <div
        ref={contentRef}
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[calc(100vh+96px)]
          w-full
          max-w-none
          flex-col
          justify-end
          px-4
          pb-16
          pt-[140px]
          sm:px-6
          sm:pb-20
          lg:px-8
          lg:pb-24
          xl:px-10
          xl:pb-28
        "
      >
        {/* =================================================
            BOTTOM CONTENT GRID
        ================================================= */}

        <div
          className="
            grid
            w-full
            grid-cols-1
            items-end
            gap-8
            lg:grid-cols-[minmax(0,1fr)_minmax(420px,520px)]
            lg:gap-12
            xl:grid-cols-[minmax(0,1fr)_540px]
            xl:gap-16
          "
        >
          {/* =================================================
              NAME
          ================================================= */}

          <div
            className="
              flex
              h-full
              min-w-0
              items-end
              self-end
            "
          >
            <h1
              ref={nameRef}
              id="hero-title"
              className="
                w-full
                whitespace-nowrap
                font-display
                text-[clamp(3rem,8.8vw,9.5rem)]
                font-semibold
                leading-[0.9]
                tracking-[-0.07em]
                text-white
                will-change-[transform,opacity,clip-path]
              "
            >
              {displayName}
            </h1>
          </div>

          {/* =================================================
              INFORMATION / CTA
          ================================================= */}

          <div
            className="
              flex
              w-full
              max-w-[540px]
              flex-col
              items-start
              lg:justify-self-end
            "
          >
            {/* -------------------------------------------------
                BADGE
            ------------------------------------------------- */}

            <div
              ref={badgeRef}
              className="
                mb-6
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/15
                bg-black/25
                px-3.5
                py-2
                font-body
                text-[13px]
                font-medium
                text-white
                backdrop-blur-md
                will-change-[transform,opacity]
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-2
                  w-2
                  animate-[pulse_1.8s_ease-in-out_infinite]
                  rounded-full
                  bg-[var(--portfolio-accent)]
                  shadow-[0_0_0_3px_rgba(227,6,19,0.15)]
                "
              />

              <span>{displayTagline}</span>

              <span
                aria-hidden="true"
                className="text-white/35"
              >
                ·
              </span>

              <span className="text-white/55">
                {isAvailableForProjects
                  ? "Available for projects"
                  : "Currently unavailable"}
              </span>
            </div>

            {/* -------------------------------------------------
                DESCRIPTION
            ------------------------------------------------- */}

            <p
              ref={descriptionRef}
              className="
                max-w-[520px]
                font-body
                text-[clamp(1rem,1.5vw,1.25rem)]
                leading-[1.45]
                tracking-[-0.01em]
                text-white/70
                will-change-[transform,opacity]
              "
            >
              {displayDescription}
            </p>

            {/* -------------------------------------------------
                CTA
            ------------------------------------------------- */}

            <div
              ref={actionsRef}
              className="
                mt-7
                flex
                flex-col
                gap-3
                sm:flex-row
                will-change-[transform,opacity]
              "
            >
              {/* PRIMARY */}

              <a
                href="#projects"
                data-cursor="magnetic"
                className="
                  group
                  inline-flex
                  h-12
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-white
                  px-6
                  font-body
                  text-sm
                  font-medium
                  text-black
                  shadow-[0_8px_30px_rgba(0,0,0,0.18)]
                  transition-all
                  duration-[var(--portfolio-motion-fast)]
                  hover:-translate-y-[1px]
                  hover:scale-[1.02]
                  hover:shadow-[0_14px_35px_rgba(0,0,0,0.25)]
                "
              >
                Voir mes projets

                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  size={14}
                  strokeWidth={1.8}
                  color="var(--portfolio-accent)"
                  aria-hidden="true"
                  className="
                    transition-transform
                    duration-[var(--portfolio-motion-fast)]
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                />
              </a>

              {/* SECONDARY */}

              <a
                href="#about"
                data-cursor="magnetic"
                className="
                  inline-flex
                  h-12
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  bg-white/[0.06]
                  px-6
                  font-body
                  text-sm
                  font-medium
                  text-white
                  backdrop-blur-md
                  transition-all
                  duration-[var(--portfolio-motion-fast)]
                  hover:-translate-y-[1px]
                  hover:border-white/35
                  hover:bg-white/[0.1]
                "
              >
                À propos de moi
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}